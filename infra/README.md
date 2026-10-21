# TP8: infraestructura de preprod

Preprod se declara con Terraform y los providers `kislerdm/neon` 0.18.0 y
`render-oss/render` 1.9.1. Incluye un proyecto, un usuario y una base nuevos
en Neon, mas una API y un frontend gratuitos en Render. QA y produccion
no se importan ni se administran desde esta configuracion.

Los servicios usan las imagenes publicas del cierre del TP7, commit
`77f8897ce0ab1542c8f8e8a9d56933a9218c8cbb` (tag Git `v7.0.0`).
El repositorio de cada imagen y su etiqueta se declaran por separado en
`variables.tf`; crear preprod no reconstruye imagenes.

## Preparacion local

Terraform 1.16.6 se instalo desde el binario oficial para macOS ARM64 en
`~/.local/bin/terraform`, verificando el SHA-256 contra la formula oficial
de HashiCorp. Homebrew no pudo completar la instalacion porque las herramientas
de Xcode instaladas estan desactualizadas.

En una terminal, desde la raiz del repositorio:

```sh
export PATH="$HOME/.local/bin:$PATH"
terraform version
```

En una copia nueva del repositorio, crear el archivo local de claves:

```sh
cp infra/.env.example infra/.env
chmod 600 infra/.env
```

No repetir la copia si `infra/.env` ya tiene las claves cargadas. Completar
ese archivo local, usando `infra/.env.example` como modelo.
Neon usa `NEON_API_KEY`; Render usa `RENDER_API_KEY` y `RENDER_OWNER_ID`.
No pegar estos valores en el chat ni en archivos versionados.

```sh
source infra/.env
cd infra
terraform init
terraform fmt -check
terraform validate
terraform plan -out=preprod.tfplan
```

`init` descarga los providers y genera `.terraform.lock.hcl`, que se sube a Git.
`validate` comprueba la configuracion sin crear recursos.
`plan` consulta al proveedor y muestra los cambios propuestos sin ejecutarlos.
Desde cero se esperan cinco altas: proyecto, usuario, base, API y frontend.
Si la base ya existe en el estado, solo se crean los dos servicios faltantes.
Los recursos de QA y produccion no deben aparecer en el plan.

Solo despues de leer y entender el plan:

```sh
terraform apply preprod.tfplan
terraform output
terraform plan
```

La segunda pasada debe indicar que no hay cambios. El estado queda en
`infra/terraform.tfstate`: contiene secretos, no se versiona y se debe conservar
mientras existan los recursos que administra. No se ejecuta Terraform desde CI
con este estado local.

## Conexion entre los recursos

La API recibe `ConnectionStrings__DefaultConnection`, que es el nombre que lee
nuestra app .NET. El host, el nombre de la base, el usuario y la clave generada
por Neon se derivan de referencias a sus recursos en `main.tf`.

El frontend recibe `BACKEND_URL` desde `render_web_service.api.url`, quitando
una posible barra final. Nginx reenvia `/api/...` a esa API. No hay direcciones
de QA o produccion copiadas en esta configuracion.

Terraform crea la base vacia; la API crea las tablas y los datos iniciales al
arrancar mediante `EnsureCreated()` y `SeedData.EnsureSeeded()`.

## Comprobar el entorno

Los servicios gratuitos pueden tardar en arrancar. La creacion del recurso no
significa que el primer despliegue ya haya terminado: comprobar el estado Live
en Render y luego las respuestas HTTP. En los ensayos una URL nueva aun devolvia
404 temporalmente con el despliegue Live; esperar y reintentar las comprobaciones
antes de considerar que el entorno esta listo.

Desde `infra/`, con las mismas variables de entorno cargadas:

```sh
PREPROD_API_URL="$(terraform output -raw api_url)"
PREPROD_FRONT_URL="$(terraform output -raw front_url)"
curl -fsS "$PREPROD_API_URL/api/products"
curl -fsS "$PREPROD_API_URL/api/dashboard"
curl -fsS "$PREPROD_FRONT_URL/"
curl -fsS "$PREPROD_FRONT_URL/api/products"
```

La imagen del TP7 no tiene `/health`: usamos `/api/products` como health check
de Render y comprobamos tambien `/api/dashboard`. Ambos consultan PostgreSQL.
Abrir el valor de `front_url` y comprobar que aparezcan los productos.

Para repetir las seis pruebas del TP7 exclusivamente contra preprod:

```sh
export API_BASE_URL="$PREPROD_API_URL"
export E2E_BASE_URL="$PREPROD_FRONT_URL"
cd ../frontend
./node_modules/.bin/playwright test --reporter=line --output=/private/tmp/ingsoft3-tp8-playwright
```

Las pruebas necesitan las dependencias y el navegador de Playwright instalados.
Crean datos propios en preprod y los limpian al finalizar.

## Practicar drift

Hacer el ejercicio solo sobre el proyecto `ingsoft3-preprod`:

1. Comprobar con `terraform plan` que no haya cambios pendientes.
2. Pausar **solo** `ingsoft3-api-preprod` desde Render. Nuestra API ejecuta
   `EnsureCreated()` al arrancar: puede recrear una base faltante antes que
   Terraform. La pausa evita esa carrera durante la demostracion.
3. Desde Neon, borrar la base `stock_preprod`, conservando el proyecto y el rol.
   Esto elimina los datos de prueba. No usar `terraform destroy` en este paso:
   el cambio debe producirse por fuera de Terraform.
4. Ejecutar `terraform plan -out=drift-repair.tfplan` y leerlo. Debe proponer
   recrear unicamente `neon_database.preprod`.
5. Ejecutar `terraform apply drift-repair.tfplan`. La base se recrea vacia.
6. Reactivar la API en Render. Al arrancar crea las tablas y los datos iniciales.
7. Repetir los chequeos HTTP y `terraform plan`: la app debe responder y no
   deben quedar cambios pendientes.

Limite del control: crear desde Neon una base temporal `base_intrusa_tp8` en el
mismo proyecto, con propietario `stock_preprod_owner`, sin agregarla al HCL.
Comprobar su existencia y ejecutar `terraform plan`: no propone cambios por
esa base, porque no la administra. Borrarla desde Neon al terminar.
Un plan limpio no es una auditoria de toda la cuenta ni de todos sus atributos.

## Practicar prevent_destroy

Con preprod creado, agregar temporalmente dentro de `neon_database.preprod`:

```hcl
lifecycle {
  prevent_destroy = true
}
```

Ejecutar `terraform plan -destroy`. Terraform debe rechazar el plan por la
proteccion de la base, sin ejecutar ningun borrado. No hace falta un apply para
activar esta regla: Terraform la lee de la configuracion al calcular el plan.

Retirar solo el bloque `lifecycle` del ejercicio y conservar el recurso de la
base. La configuracion final permite destruir preprod porque es un entorno
efimero. Esta regla protege las operaciones de Terraform: no bloquea borrados
externos desde Neon, como el que practicamos en el drift.

## Fin de la sesion

Desde `infra/`, con las claves cargadas:

```sh
terraform plan -destroy -out=destroy.tfplan
terraform apply destroy.tfplan
```

El destroy elimina los recursos de preprod declarados en este estado y sus datos.
Antes de confirmarlo, revisar los nombres. Los recursos de QA y produccion
no deben aparecer en el plan.

Para recrear, generar un plan NUEVO y aplicarlo:

```sh
terraform plan -out=preprod.tfplan
terraform apply preprod.tfplan
```

Las URLs pueden cambiar al recrear los servicios; siempre leerlas de los outputs.
La base vuelve a nacer con los datos iniciales, no con los datos de prueba previos.

El provider de Render fijado puede fallar al actualizar servicios gratuitos.
Si se cambia la imagen, leer el plan: cambiar `tag` no implica automaticamente
un reemplazo. Para preprod se usa el ciclo destroy/apply o un reemplazo explicito,
revisando antes que solo afecte recursos de este estado.

## Avance comprobado

Creacion de los cinco recursos, despliegues Live con las dos imagenes del TP7,
cuatro respuestas HTTP correctas, seis pruebas de integracion/navegador y
segundo plan sin cambios. La configuracion de referencia de los servicios
existentes de QA y produccion se conservo.

Tambien se comprobaron el borrado externo de la base, su deteccion por el plan,
su recreacion con apply, la recuperacion de la app y el regreso al plan sin
cambios. Una base temporal no declarada resulto invisible al plan y se elimino
despues del experimento.

Durante el primer ensayo la base reaparecio antes del apply y este fallo con
`DATABASE_ALREADY_EXISTS`. Se observo un reinicio de la API, cuyo
`EnsureCreated()` puede crear bases faltantes. Se volvio a asociar esa base de
preprod al estado mediante import y se repitio el ejercicio con la API pausada;
esta vez Terraform la recreo. La API quedo reactivada y los cuatro chequeos
HTTP volvieron a responder correctamente, con los tres productos iniciales.

Se comprobo `prevent_destroy` temporalmente en la base: el plan de destruccion
fue rechazado sin borrar recursos. Despues se retiro la regla y se completaron
dos ciclos destroy/apply con exactamente los mismos archivos de infraestructura
y las mismas imagenes del TP7. En ambos se verificaron los cinco recursos, los
despliegues Live, los cuatro chequeos HTTP y el plan sin cambios. En la primera
recreacion tambien se ejecutaron las seis pruebas existentes, todas aprobadas.

Los IDs, hosts y URLs nuevos fueron distintos; la configuracion y las conexiones
se reconstruyeron desde el codigo, y la base volvio a sus datos iniciales.
En cada destruccion se comprobaron el estado vacio y la ausencia del proyecto
en Neon y de ambos servicios en Render. Los servicios existentes conservaron
su configuracion, y QA/PROD respondieron en API, frontend y proxy.

Al terminar se destruyo preprod nuevamente. Las URLs de los ensayos ya no son
vigentes: en la proxima creacion se obtienen con `terraform output`. Se conserva
el estado local vacio y las claves locales para poder repetir el procedimiento.

Version de entrega: [`v8.0.0`](https://github.com/Geronimo2001/ingsoft3/releases/tag/v8.0.0).
La carpeta `infra/` se integra a `main` mediante PR. Se versiona el lockfile,
pero no el estado, las claves ni los planes locales. La release del TP8 etiqueta
estos archivos de infraestructura; preprod sigue usando las imagenes del TP7
fijadas en `variables.tf`.
