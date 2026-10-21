# Decisiones 

## Enlaces del TP7 — en curso

- Paquete backend: [ingsoft3-tp01-backend](https://github.com/users/Geronimo2001/packages/container/package/ingsoft3-tp01-backend).
- Paquete frontend: [ingsoft3-tp01-frontend](https://github.com/users/Geronimo2001/packages/container/package/ingsoft3-tp01-frontend).
- Etiqueta inicial comprobada en ambos: `sha-5233120fd1f938f890b8712275adef6c37dab39f`, publicada por la [corrida de cierre del TP6](https://github.com/Geronimo2001/ingsoft3/actions/runs/39455587456).
- Frontend QA: [ingsoft3-front-qa-6z2e.onrender.com](https://ingsoft3-front-qa-6z2e.onrender.com/).
- API QA: [ingsoft3.onrender.com](https://ingsoft3.onrender.com/api/products).
- Frontend PROD: [ingsoft3-front-prod-553q.onrender.com](https://ingsoft3-front-prod-553q.onrender.com/).
- API PROD: [ingsoft3-api-prod-3hji.onrender.com](https://ingsoft3-api-prod-3hji.onrender.com/api/products).
- Pendientes: corrida de despliegue por imágenes, integración verde con e2e roja y sus dos reportes, corrida completa verde posterior y release `v7.0.0`. No se dan por verificados.

## Enlaces de este TP — TP6

- Paquete backend: [ingsoft3-tp01-backend](https://github.com/users/Geronimo2001/packages/container/package/ingsoft3-tp01-backend).
- Paquete frontend: [ingsoft3-tp01-frontend](https://github.com/users/Geronimo2001/packages/container/package/ingsoft3-tp01-frontend).
- PR verde con «Entrar al registry» salteado: [job backend](https://github.com/Geronimo2001/ingsoft3/actions/runs/39294504328/job/118203402056) y [job frontend](https://github.com/Geronimo2001/ingsoft3/actions/runs/39294504328/job/118203401680).
- Corrida de `main` con publicación como último paso propio, después de tests y reportes: [job backend](https://github.com/Geronimo2001/ingsoft3/actions/runs/39294777182/job/118204323201) y [job frontend](https://github.com/Geronimo2001/ingsoft3/actions/runs/39294777182/job/118204323636).
- Backend QA: [ingsoft3.onrender.com](https://ingsoft3.onrender.com), con [consulta de productos](https://ingsoft3.onrender.com/api/products).
- Backend PROD: [ingsoft3-api-prod-3hji.onrender.com](https://ingsoft3-api-prod-3hji.onrender.com), con [consulta de productos](https://ingsoft3-api-prod-3hji.onrender.com/api/products).
- Frontend QA: [ingsoft3-front-qa-6z2e.onrender.com](https://ingsoft3-front-qa-6z2e.onrender.com/).
- Frontend PROD: [ingsoft3-front-prod-553q.onrender.com](https://ingsoft3-front-prod-553q.onrender.com/).
- Release: [v6.0.0](https://github.com/Geronimo2001/ingsoft3/releases/tag/v6.0.0).
- Rechazo confirmado por el estudiante: [corrida 39447789648](https://github.com/Geronimo2001/ingsoft3/actions/runs/39447789648).
- Promoción aprobada y posterior rollback: [corrida 39449301367](https://github.com/Geronimo2001/ingsoft3/actions/runs/39449301367) (intento 1: promoción; intento 2: rollback).

Las imágenes de esta primera publicación automática llevan la etiqueta
`sha-ac66ccb785b2155c45a8a095901804a1e81e24b9`, correspondiente al commit
integrado mediante el PR #34. Sus referencias completas son:

```text
ghcr.io/geronimo2001/ingsoft3-tp01-backend:sha-ac66ccb785b2155c45a8a095901804a1e81e24b9
ghcr.io/geronimo2001/ingsoft3-tp01-frontend:sha-ac66ccb785b2155c45a8a095901804a1e81e24b9
```

Estado: publicación exitosa comprobada en Actions el 19/10/2026. El estudiante
confirmó la descarga exitosa de ambas imágenes al realizar la comprobación de
acceso sin credenciales propuesta para este paso. Esta confirmación es del
estudiante; no se repitió la descarga desde el asistente, cuyo intento previo
no pudo conectarse al daemon de Docker. La consulta de visibilidad por API
devolvió 403 porque el token local no tiene el alcance `read:packages`;
esa limitación es independiente de la prueba de descarga.

## Resolución del conflicto

El conflicto apareció porque dos ramas diferentes modificaron la misma línea
del archivo `README.md`.

Git pudo detectar que existían dos versiones distintas, pero no podía decidir
automáticamente cuál de las dos era la correcta, ya que esa decisión depende
del significado del contenido y no solamente de una comparación técnica.

Para resolverlo fue necesario revisar ambas versiones, elegir manualmente
qué contenido debía quedar y eliminar los marcadores de conflicto.

El conflicto podría haberse evitado manteniendo las ramas actualizadas con
`main`, integrando cambios con mayor frecuencia o evitando que dos cambios
modifiquen simultáneamente la misma parte del archivo. En un proyecto real,
las ramas cortas y los cambios pequeños reducen este tipo de problemas.

## Problemas encontrados

Uno de los principales problemas durante el TP fue el manejo de las ramas.
Al repetir algunas partes del ejercicio terminé creando más ramas de las
necesarias, por ejemplo distintas versiones de las ramas utilizadas para
modificar el título del README.

Esto me ayudó a entender mejor que una rama de feature debería ser temporal:
se crea desde `main`, se realiza el cambio, se abre un Pull Request, se
mergea y luego se elimina.

También aprendí que después de realizar un merge en GitHub es importante
actualizar la copia local de `main` antes de comenzar una nueva rama, para
evitar trabajar sobre una versión desactualizada del repositorio.

Otro error fue dejar algunas ramas existentes después de haber mergeado sus
Pull Requests. Luego revisé cuáles ya habían sido integradas y podían
eliminarse sin perder cambios.

## Estrategia de integración

Los cambios se incorporaron a `main` mediante Pull Requests en lugar de
realizar pushes directos.

Se utilizó `Squash and merge` para que los cambios realizados dentro de una
rama queden representados como un único commit en `main`, manteniendo un
historial más simple y legible.

Una vez integrada una rama, ésta deja de ser necesaria y puede eliminarse.

## Versionado

Al finalizar el práctico se utilizó versionado semántico para identificar la
primera versión estable del repositorio mediante el tag:

`v1.0.0`

El tag identifica un commit concreto del historial, mientras que la Release
permite presentar esa versión de forma visible dentro de GitHub.

## Uso de IA

Utilicé inteligencia artificial principalmente como apoyo para entender el
funcionamiento de Git y GitHub, interpretar algunos errores y saber cómo
continuar cuando tuve problemas con ramas, merges y conflictos.

Las acciones propuestas fueron verificadas revisando el estado del
repositorio, los Pull Requests y el historial de GitHub antes de continuar.

## App elegida
Control de productos, stock y proveedores.

## Justificacion
Tiene backend API en .NET 8, frontend SPA en React/Vite y PostgreSQL. Es chica, entendible y modificable en vivo: CRUD de productos/proveedores, dashboard y movimientos de stock.

## Imagenes base
Backend: sdk:8.0 para build y aspnet:8.0 para runtime.
Frontend: node:22-alpine para build y nginx:1.27-alpine para servir la SPA.

## Persistencia
La base PostgreSQL persiste en el volumen db_data.

## Problemas esperados
No usar localhost dentro de contenedores: backend conecta a Host=db. El frontend llama a /api y nginx reenvia al backend.


# Decisiones TP3

## Duración del sprint

Se definió una duración de una semana debido a que el proyecto
es individual y la historia seleccionada tiene un alcance reducido.
Esto permite tener ciclos de trabajo cortos y revisar el progreso
frecuentemente.

## Límite de WIP

Se estableció un límite de WIP de 2 elementos en la columna
In Progress. Al trabajar de forma individual, este límite permite
mantener el foco y deja un segundo espacio disponible en caso de
que una tarea quede bloqueada.

## Diagnóstico de la historia mal escrita

Diagnóstico de la historia mal escrita

Historia analizada:

> Como desarrollador quiero crear una tabla de proveedores en PostgreSQL
> para guardar los proveedores.

La historia está mal formulada porque describe una decisión técnica en lugar
de una necesidad de un usuario. El rol "desarrollador" no representa al
beneficiario de la funcionalidad y la historia ya fija el cómo de la
implementación al mencionar PostgreSQL y una tabla.

Además, se trata en realidad de una tarea técnica disfrazada de historia de
usuario. En términos de INVEST, principalmente falla en Valuable, Negotiable
y Testable.

## Problemas encontrados
Este TP no presento mayores problemas ya que se hizo todo por web.
## Uso de IA
Lo use cuando no encontraba ciertas cosas en github, porque estaban con otro nombre, o directamente no los busque de manera correcta

# Decisiones — TP4 CI

## Estructura del pipeline

Se separó el pipeline en dos jobs: `build-backend` y `build-frontend`.

Se ejecutan en paralelo porque son independientes. Así se reduce el tiempo total y también es más fácil identificar qué parte falla.

## Caché

Se configuró caché en el frontend para reutilizar capas de Docker, especialmente la instalación de dependencias.

Si la caché desaparece, el pipeline sigue funcionando, pero tarda más porque debe reconstruir todo.

En el backend no se configuró caché persistente en GitHub Actions.

## Uso de Dockerfile

El pipeline construye usando los Dockerfiles del frontend y backend para validar exactamente la misma forma en que se construye la aplicación.

Así se evita que el proyecto compile de una manera en CI pero falle al generar la imagen Docker.

## Problemas encontrados

Durante el TP tuve algunos problemas con ramas y Pull Requests. En un momento seguí trabajando sobre una rama cuyo PR ya había sido mergeado, y también creé una rama desde un `main` desactualizado.

Además, durante la prueba del gate hice commits por error sobre `main` local.

Se solucionó sincronizando `main`, recreando las ramas correctamente y verificando el historial antes de hacer push.

Para probar el gate agregué a propósito `using NoExiste;` en el backend. El job del backend falló y el frontend siguió en verde. Después eliminé el error, hice otro push y ambos checks pasaron correctamente.

# Decisiones — TP5 Calidad automatizada

## Qué consideramos crítico y por qué

Priorizamos las reglas que pueden alterar el inventario, aceptar datos inválidos,
permitir un borrado indebido o comunicar mal una operación a la API. Empezamos con
el mínimo de 8 métodos de backend y 4 tests de frontend. Al revisar la guía completa,
reemplazamos los tests con DOM y ampliamos la suite con autorización: el mínimo no
alcanzaba para proteger las otras reglas importantes que ya tenía la aplicación.

| Código incluido en backend | Comportamiento dentro del alcance |
| --- | --- |
| `Services/StockService.cs` | Entradas y salidas, cantidad positiva, producto existente, stock suficiente, retiro exacto del stock y guardado del movimiento. Los rechazos no deben guardar ni alterar stock. |
| `Domain/ProductRules.cs` | Nombre, SKU y categoría obligatorios; stocks y precio no negativos; proveedor existente; SKU duplicado sin distinguir mayúsculas y excluyendo el producto que se edita; filtros combinados de nombre/SKU, stock bajo y proveedor. |
| `Domain/SupplierRules.cs` | Nombre obligatorio, validación existente del email opcional y prohibición de eliminar proveedores que tienen productos. |
| `Domain/InventorySummary.cs` | Valor monetario del inventario, conteo de stock bajo incluyendo el límite, selección de los cinco productos con mayor faltante e inventario vacío. |
| `Models/MappingExtensions.cs` | Estado de stock bajo, datos que recibe el frontend, proveedor opcional y detalle de productos asociados solo cuando se solicita. |

| Código incluido en frontend | Comportamiento dentro del alcance |
| --- | --- |
| `lib/stockMovements.ts` | Producto, tipo y cantidad enviados al registrar un movimiento; descripción recortada o ausente si está vacía. |
| `lib/productForm.ts` | Datos iniciales al crear/editar, conservación del proveedor existente, selección inicial, conversión de cantidades/precio/IDs a número y bloqueo de guardado sin proveedores o mientras se guarda. |
| `lib/deletion.ts` | Cancelar no borra; confirmar espera la respuesta; un rechazo del backend se propaga sin anunciar éxito. La misma función se usa para productos y proveedores. |
| `services/api.ts` | Rutas, métodos, IDs y cuerpos de las operaciones; filtros sin parámetros vacíos; respuesta 204; mensajes de error con y sin JSON útil; errores de conexión. |

## Separación de la lógica y tests unitarios

Movimos validaciones y cálculos que estaban en los controladores a `Domain`.
Los controladores reales llaman a esas clases: no creamos funciones solo para los
tests. Para filtros y duplicados usamos expresiones que EF recibe directamente;
los unit tests compilan la misma expresión y comprueban resultados con productos
concretos. También comprobamos que Npgsql traduce cinco consultas representativas
a SQL, sin abrir conexiones. Esto no comprueba el resultado contra PostgreSQL.

`StockService` recibe `IStockRepository`: producción usa EF y los tests usan Moq.
Verificamos el stock final y las interacciones, incluyendo que un rechazo no
solicite un guardado. En frontend usamos Vitest en Node, sin DOM. El formulario
consume las funciones probadas de `lib`; `createApi(fetcher, baseUrl)` recibe un
`vi.fn()` en tests y usa el cliente real en producción. No llamamos a la red.

La suite ampliada después del rojo tiene **22 métodos de backend y 42 casos ejecutados**, y **12 tests
escritos de frontend y 20 casos ejecutados**. El estado rojo tenía 14 métodos/22 casos
de backend y 7 tests/8 casos de frontend. Hay parametrización, errores, bordes y
mocks en los dos proyectos. AAA significa preparar datos y dependencias, ejecutar
el comportamiento y verificar el resultado; no contamos cada dato de una teoría
como un método nuevo.

## Recorte de la suite antes del PR

Por decisión del estudiante primero retiramos cinco métodos de backend y siete
tests de frontend. Después retiramos otros tres métodos de backend y dos tests
de frontend, además de reducir los datos parametrizados. No fusionamos tests
ni cambiamos las reglas de conteo. Conservamos más de
cuatro reglas de backend y las tres técnicas obligatorias en ambos proyectos.

En backend retiramos los tests específicos del proveedor opcional en el DTO, el
detalle de productos del proveedor, el inventario vacío, la aceptación de valores
cero en la validación de productos y la descripción del movimiento. En frontend
retiramos el contrato parametrizado de operaciones adicionales de la API, los
errores sin JSON útil, el error de conexión, la inicialización explícita de
creación/edición/sin proveedores y el borrado confirmado con espera.

En el segundo recorte retiramos los dos tests restantes de `InventorySummary`
y el test de filtros combinados del backend; en frontend, la respuesta 204 y la
propagación de un rechazo en el borrado. También retiramos los datos de stock
mínimo negativo, estado disponible, email opcional vacío/blanco y cantidad -10.
En frontend redujimos la conversión de campos a cantidad/precio y la búsqueda
vacía a espacios. Quedan menos variantes y caminos probados, sin cambiar las
funciones que queremos medir. La suite aún cumple los mínimos y técnicas del TP.

Después ajustamos solo las variantes para acercar la cobertura de ramas al 70 %.
En backend dejamos pendientes proveedor existente, borrado permitido sin productos
y email válido. En frontend dejamos pendientes descripción con texto, permiso de
guardado sin operación pendiente, filtro de stock bajo y serialización de un
cuerpo HTTP; el caso de error ahora comprueba una consulta GET del dashboard.
Conservamos los 14 métodos y 7 tests escritos y las técnicas exigidas. Cuando
una prueba quedó con un único dato la convertimos en un test normal, manteniendo
otros tests realmente parametrizados.

Los archivos y esos comportamientos siguen dentro del alcance, aunque algunos
ahora no estén cubiertos o no tengan una verificación específica. No recortamos
producción, filtros de cobertura ni umbrales para compensarlo. Este cambio deja
huecos conocidos y reduce la suite. Las dos ejecuciones locales ya fallan por
cobertura; el PR rojo ya está registrado más abajo. La regla nueva inicialmente sin tests
se describe en la sección de PR y evidencias.

## Alcance de cobertura: lógica de negocio y cliente API

Elegimos este alcance porque queremos que el gate proteja decisiones que afectan
al inventario y a las operaciones del usuario. Una salida que deja stock negativo,
un SKU duplicado o un cálculo incorrecto del valor del stock son fallos del negocio;
por eso sus reglas entran aunque alguna prueba esté temporalmente retirada.

No usamos toda la aplicación como denominador porque este TP trabaja la base de
pruebas unitarias: el arranque, el acceso a PostgreSQL y el comportamiento visual
necesitan integración o navegador. Medirlos junto con la lógica aislada mezclaría
responsabilidades que esta suite no comprueba. No afirmamos que esas partes estén
verificadas; las listamos abajo con su motivo. Antes de excluir controladores y
pantallas movimos sus reglas importantes a módulos que sí participan del gate.

Elegimos medir el código que decide reglas, calcula resultados y prepara o
interpreta operaciones de la aplicación. El criterio es su responsabilidad,
no si ya tiene tests. Antes de excluir los controladores y la UI, extraímos
las validaciones y cálculos importantes y agregamos sus pruebas. Las tablas
anteriores enumeran los sectores críticos incluidos.

En backend se mide el ensamblado `StockControl.Api` con exclusiones específicas.
Entran `Domain/ProductRules.cs`, `Domain/SupplierRules.cs`,
`Domain/InventorySummary.cs`, `Services/StockService.cs` y
`Models/MappingExtensions.cs`. Una clase nueva de negocio entra automáticamente.

En frontend partimos de `src/**/*.{ts,tsx}` y excluimos arranque y pantallas:
entran `lib/stockMovements.ts`, `lib/productForm.ts`, `lib/deletion.ts` y
`services/api.ts`, además de nuevos módulos que no coincidan con las exclusiones.
Esto incluye tanto funciones puras como código que depende de una frontera:
no excluimos `StockService` por usar un repositorio ni el cliente API por usar
`fetch`; los probamos con mocks.

| Queda fuera | Por qué |
| --- | --- |
| Backend: `Program*` | Arranque, configuración y registro de dependencias. |
| Backend: `Data.*` y `StockRepository*` | Configuración de EF, datos iniciales y acceso a PostgreSQL; requieren pruebas de integración. |
| Backend: `Controllers.*` | Consultas y adaptación HTTP. Las reglas de validación, filtros, duplicados y dashboard fueron extraídas a `Domain` y sí se miden. Queda pendiente verificar la integración HTTP/EF. |
| Backend: `Models/Product.cs`, `Supplier.cs`, `StockMovement.cs`, `Dtos.cs` | Propiedades, enum y DTO sin reglas propias. `MappingExtensions` sigue incluido por su comportamiento. |
| Frontend: `main.tsx` y `App.tsx` | Montaje y selección de pantallas. |
| Frontend: `components/**` y `pages/**` | Presentación, estado y eventos de React. La preparación de datos, permisos de guardado y confirmación de borrados viven en los módulos incluidos; falta verificar la conexión visual con pruebas de componentes/E2E. |
| Tests, declaraciones de tipos y dependencias de terceros | No son código ejecutable propio que deba entrar en el porcentaje de aplicación. |

Excluir infraestructura no significa que esté verificada ni que carezca de
importancia. El gate unitario no comprueba la base real, los códigos HTTP o que
un botón esté conectado al callback correcto. Si aparece una regla nueva en un
controlador o pantalla, debe extraerse al núcleo con sus tests o revisarse la
exclusión; no se la puede dejar invisible por conveniencia.

Umbral, reportes y resumen usan el mismo alcance; el resumen no aplica otro filtro.

## Medición y umbrales

Usamos Coverlet en backend y V8 con Vitest 4.1.12 en frontend. También medimos la
aplicación completa como diagnóstico: dio 27,07 % de líneas y 40,38 % de ramas en
backend, y 15,35 % / 33,33 % en frontend. Esos porcentajes incluían arranque,
persistencia, DTO y pantallas. Elegimos finalmente el alcance funcional anterior.

Resultado local después del recorte de tests, antes de agregar `UnitsToRestock`:

| Proyecto | Líneas | Ramas | Mínimo de líneas | Mínimo de ramas |
| --- | --- | --- | --- | --- |
| Backend | 68,88 % (62/90) | 71,42 % (30/42) | 80 % | 80 % |
| Frontend | 64,86 % (24/37) | 71,05 % (27/38) | 70 % | 75 % |

Después de agregar `UnitsToRestock` sin tests, verificamos en Docker la
compilación de producción y los mismos 22 casos de backend pasando. La cobertura
del backend queda en 64,58 % de líneas (62/96) y 68,18 % de ramas (30/44):
el comando termina con error únicamente por ambos mínimos de 80 %. La regla nueva
no tiene líneas ni ramas cubiertas. El frontend no cambió y conserva los valores
de la tabla anterior. Éste es el estado con el que abrimos el primer PR rojo.

Después de guardar esa evidencia ampliamos solo los tests, manteniendo producción,
alcance y umbrales. `UnitsToRestock` queda verificado con stock inferior, igual y
superior al mínimo, y el caso cero/cero. Recuperamos los cálculos y el inventario
vacío del dashboard, los filtros por nombre/SKU/stock/proveedor, la aceptación
de productos y proveedores válidos, la eliminación permitida y el estado disponible.
En frontend cubrimos confirmación de borrado, conversión numérica y de texto,
guardado según estado/proveedores, edición sin perder proveedor, respuesta 204,
envío JSON, filtro de stock bajo y errores sin mensaje o sin JSON válido.

La comprobación local y en las etapas de tests de Docker pasa los dos gates:
backend 89,58 % de líneas (86/96) y
93,18 % de ramas (41/44), con 42 casos pasando; frontend 78,37 % de líneas
(29/37) y 100 % de ramas (38/38), con 20 casos pasando. No pretendemos cubrir
todas las operaciones de la API ni el detalle del DTO de proveedor: siguen en el
denominador aunque no tengan pruebas específicas. El verde de GitHub aún requiere
el push y una nueva corrida del mismo PR #31. Ambas compilaciones de producción
también finalizaron correctamente en Docker.

Los 22 casos de backend y los 8 de frontend pasan, pero ambos comandos de
cobertura fallan por líneas y por ramas. Antes del recorte, el mismo alcance tenía 100 % de líneas y ramas.
Confirmamos como umbrales finales 80 % de líneas y ramas en backend, y 70 % de
líneas y 75 % de ramas en frontend. Son los mínimos aprobados antes de retirar
pruebas, no valores elevados para fabricar el rojo. Agregamos la regla nueva
`ProductRules.UnitsToRestock` sin tests para demostrar §3.5. El backend exige ambas métricas sobre su único
ensamblado (`ThresholdStat=total`); el frontend también exige líneas y ramas.
Una vez iniciado el PR no cambiaremos el alcance ni los mínimos para corregirlo:
se agregarán las pruebas faltantes en ese mismo PR.

Coverage mide ejecución, no verificación: un test que llame al servicio sin
comprobar el stock también puede cubrir líneas. Por eso verificamos resultados,
mensajes y efectos. El caso que permite retirar exactamente el stock protege el
borde: cambiar `>` por `>=` en el rechazo de salidas lo haría fallar. No corrimos
una herramienta de mutantes.

## Ejercicio de la rama sin cubrir

En la medición anterior vimos un camino sin cubrir de
`frontend/src/services/api.ts`, línea 29: `error.message ?? message`.
El test existente recorría el caso con mensaje, pero faltaba la alternativa cuando
la respuesta no lo trae. Una entrada concreta es una respuesta HTTP 503 con cuerpo
JSON `{}`; debe usarse `Ocurrio un error inesperado.`.

Inicialmente agregamos el caso porque un backend o proxy puede devolver un
error sin el campo esperado. Con el recorte a nueve tests del frontend retiramos
esa prueba y la dejamos pendiente, conservando el comportamiento en el alcance.
Después de guardar el rojo la repusimos en la ampliación de la suite: el caso
HTTP 503 con `{}` ahora verifica explícitamente ese mensaje alternativo.
Las tres partes del ejercicio quedan documentadas: línea, entrada concreta y
decisión. Es una rama de código, no una rama de Git.

## Docker, pipeline y comprobaciones

Extendimos los Dockerfiles existentes con una etapa `test`, conservando la etapa
final. Los mismos jobs `build-backend` y `build-frontend` del TP4 construyen la
aplicación, construyen esa etapa con `load: true` y ejecutan los tests en Docker.
Coverlet MSBuild y Vitest terminan con error si los tests o los mínimos fallan;
no usamos `continue-on-error` para esconder el resultado.

Con el volumen `/out` recuperamos TRX y Cobertura/JSON en backend, y JUnit más
cobertura HTML/Cobertura/JSON resumido en frontend. Vitest escribe en `/out/coverage`
porque no puede eliminar el propio punto de montaje al limpiar sus reportes.
La ejecución de tests quita la variable de URL heredada de la construcción para
usar el mismo entorno local. Los `.dockerignore` evitan copiar dependencias,
compilaciones y reportes locales a las imágenes.

`scripts/coverage-summary.py` escribe líneas y ramas en `GITHUB_STEP_SUMMARY` y
rechaza reportes ausentes o vacíos. Los pasos de resumen, HTML y artifacts usan
`!cancelled()` cuando los tests llegaron a ejecutarse, para conservar el diagnóstico
tras un fallo sin seguir una corrida cancelada manualmente. El artifact del backend
incluye `html/index.html`, XML, JSON y TRX; el del frontend incluye JUnit y el
HTML/XML/JSON de cobertura.

Activamos `coverage.reportOnFailure` de Vitest para generar reportes si falla un
test. En backend detectamos que VSTest interrumpía MSBuild antes de generar el XML.
Extendimos su target `VSTest` con `OnError` para llamar a `GenerateCoverageResult`
de Coverlet: se conserva la medición y el error original sigue haciendo fallar
el comando. Los imports explícitos del SDK permiten extender ese target después
de cargar los targets estándar de .NET 8. Este ajuste está ligado a ese SDK y
debe revisarse si cambiamos de plataforma de tests.

ReportGenerator 5.5.11 se instala en la etapa `test` del Dockerfile, no en la imagen
final de la aplicación. Otro contenedor de esa misma imagen lee el XML de `/out`
y las fuentes de `/src` para producir el HTML, sin aplicar filtros nuevos.
Referencias: [reportOnFailure de Vitest](https://vitest.dev/config/coverage.html#coverage-reportonfailure)
y [ReportGenerator](https://github.com/danielpalme/ReportGenerator).
La publicación y descarga real en Actions todavía deben comprobarse.

Comprobamos los dos tipos de fallo de forma separada. Con la suite real, Docker
reportó 22/22 casos de backend y 8/8 de frontend pasando, y salida 1 por los
mínimos de cobertura; el HTML se generó correctamente. También usamos pruebas
fallidas temporales: frontend conservó JUnit, HTML, XML y JSON; backend conservó
TRX y cobertura y permitió generar HTML aun con un test fallido. La prueba de
backend se montó solo en un contenedor y la de frontend se retiró al terminar.
La suite del repositorio sigue teniendo 14 métodos y 7 tests escritos.

Verificamos que el XML del backend enumera las cinco clases previstas y mantiene
62/90 líneas y 30/42 ramas, tanto en el fallo de umbral como en el fallo temporal
de test. ReportGenerator no agrega exclusiones y el resumen usa la precisión de
los logs, sin redondear hacia arriba. Así evitamos presentar números distintos
para el gate y los reportes. Estos resultados locales no son enlaces de evidencia
de GitHub: falta ejecutar el workflow y descargar allí los artifacts.

La suite anterior de 46/46 casos de backend y 32/32 de frontend pasó localmente
y en Docker, junto con la compilación de producción. Después del recorte comprobamos
localmente 22/22 casos de backend y 8/8 de frontend; ambos comandos devolvieron
error únicamente por los mínimos de cobertura, con la tabla anterior al método nuevo. Las mediciones globales mostraron que ambos comandos devuelven error por
cobertura aunque los tests pasen; esto no sustituye la evidencia del PR bloqueado
con código nuevo sin tests. Hubo un aviso local NU1900 de acceso a NuGet; la restauración
en Docker y sus tests finalizaron correctamente.

Para repetir localmente, desde la raíz (o usar `dotnet` si está instalado globalmente):

```sh
DOTNET_CLI_HOME="$PWD/.dotnet-home" .dotnet/dotnet test backend/tests/StockControl.Api.Tests/StockControl.Api.Tests.csproj
```

Desde `frontend`:

```sh
npm run test:coverage
npm run build
```

Reportes locales: `backend/TestResults/coverage/coverage.cobertura.xml` y
`frontend/coverage/index.html`. No se versionan. La configuración está en el
proyecto de tests y en `frontend/vitest.config.ts`.

## PR, evidencias y cierre pendientes

Para cumplir el requisito de código nuevo sin tests de §3.5 agregamos
`ProductRules.UnitsToRestock(currentStock, minimumStock)`: calcula las unidades
que faltan para alcanzar el stock mínimo. Con stocks válidos no negativos,
devuelve cero si el stock alcanza o supera el mínimo; en caso contrario devuelve
la diferencia. Por ejemplo, (3, 5) devuelve 2, (5, 5) devuelve 0 y (7, 5)
devuelve 0. Es una regla de reposición del dominio, incluida automáticamente en
el alcance de cobertura; todavía no está conectada a la API ni a la interfaz.
La dejamos sin pruebas en el primer estado del PR y cubriremos sus caminos y
el borde de igualdad después de guardar la evidencia roja. La cobertura ya era
insuficiente antes de agregarla: no atribuimos toda la caída a este método.

Abrimos el [PR 1 #31](https://github.com/Geronimo2001/ingsoft3/pull/31), de
`feature/tp5-testing` hacia `main`, con la preparación del pipeline y la regla
nueva sin tests. La [corrida roja 38924460266](https://github.com/Geronimo2001/ingsoft3/actions/runs/38924460266)
confirma que ambas imágenes se construyeron correctamente y pasaron todos los
tests (22 backend y 8 frontend). Fallaron exclusivamente los umbrales:

- [build-backend](https://github.com/Geronimo2001/ingsoft3/actions/runs/38924460266/job/117052349935?pr=31):
  64,58 % de líneas y 68,18 % de ramas, contra 80 % en ambas métricas.
- [build-frontend](https://github.com/Geronimo2001/ingsoft3/actions/runs/38924460266/job/117052349728):
  64,86 % de líneas contra 70 % y 71,05 % de ramas contra 75 %.

Los pasos de resumen, generación de HTML del backend y publicación de reportes
de ambos proyectos finalizaron correctamente a pesar del rojo. Consultamos el
PR en ese estado y GitHub informó `OPEN` y `mergeStateStatus=BLOCKED`.

Con confirmación del estudiante agregamos los tests faltantes en la misma rama,
incluidos los caminos del código nuevo, sin cambiar alcance ni umbrales. La
[corrida verde 38926894369](https://github.com/Geronimo2001/ingsoft3/actions/runs/38926894369)
finalizó con ambos jobs exitosos. El estudiante mergeó el PR #31 y verificamos
el commit de merge `1500a0c498fbab7d5bcf68aae9b2a8aa82375975`.

El [segundo PR #32](https://github.com/Geronimo2001/ingsoft3/pull/32) sale de ese
`main` actualizado y agrega `frontend/src/lib/replenishment.ts` sin tests. La
regla recomienda unidades para alcanzar el mínimo, prioriza productos agotados y
rechaza stocks negativos o no enteros; todavía no está conectada a la interfaz.
En Docker compila y pasan los 20 casos existentes, pero las líneas bajan a
61,70 % frente al mínimo de 70 %; las ramas quedan en 76 %, sobre el mínimo de
75 %. No se modificaron tests, alcance ni umbrales.

El estudiante confirmó que en la
[corrida del PR 2](https://github.com/Geronimo2001/ingsoft3/actions/runs/38929793194)
falló frontend y pasó backend, y aportó este
[log del job](https://github.com/Geronimo2001/ingsoft3/actions/runs/38929793194/job/117070539901?pr=32).
Registramos esa confirmación sin volver a consultar la corrida. El PR #32 debe
permanecer abierto y rojo hasta la defensa, sin mergearse ni entrar en `v5.0.0`.
Previamente comprobamos por la API de protección de `main` que `build-backend`
y `build-frontend` son required checks y `strict=true` exige la rama actualizada.

Estado de los cuatro enlaces de entrega:

1. [Corrida verde con summaries y publicación de reportes](https://github.com/Geronimo2001/ingsoft3/actions/runs/38926894369): pasos exitosos. El estudiante descargó los artifacts de la corrida roja anterior.
2. [Corrida roja por el umbral](https://github.com/Geronimo2001/ingsoft3/actions/runs/38924460266): porcentajes y mínimos comprobados en los logs.
3. [Primer PR #31](https://github.com/Geronimo2001/ingsoft3/pull/31): rojo → tests → verde → merge completados.
4. [Segundo PR #32](https://github.com/Geronimo2001/ingsoft3/pull/32): rojo de frontend confirmado por el estudiante; se deja abierto hasta la defensa.

Los enlaces serán a corridas y PR concretos, no a las pestañas generales. Las
capturas que guardemos son respaldo personal; la guía exige enlaces en este
archivo. El tag `v5.0.0` y su Release se harán tras revisar el commit final y con
autorización. El segundo PR no formará parte de esa versión.

## Uso de IA

Usamos Codex para revisar la consigna, separar lógica de infraestructura, proponer
y escribir tests y configurar la medición. Revisamos el alcance con la guía y
ampliamos la suite sobre los sectores importantes, en lugar de limitarnos al
mínimo numérico. Comprobamos resultados y reportes ejecutando los comandos locales
y los contenedores. Queda pendiente validar en GitHub el gate y registrar sus
links; no damos por demostrados resultados que todavía no ocurrieron.

# Decisiones — TP6 Entrega continua

## Publicación automática del artefacto

Antes el pipeline verificaba el código y construía imágenes sin publicarlas.
La publicación manual usada en el TP2 quedaba separada de esas verificaciones.
Ahora cada job publica su imagen en GHCR después de ejecutar los tests, exigir
la cobertura y generar los reportes. La publicación de cada componente depende
del éxito de su propio job; todavía no hay jobs de despliegue.

La garantía combina tres controles: la protección de `main` y sus checks del
TP anterior, la condición que permite publicar únicamente en un evento `push`
a `main`, y la publicación como último paso del job que verifica ese componente.
Los pasos de login y publicación no usan `always()`, `!cancelled()` ni se ignoran
los errores de tests. Si falla una verificación, no se ejecuta la publicación.
Los reportes sí conservan sus condiciones para mostrar resultados aunque fallen
los tests.

Si publicáramos aunque fallaran las verificaciones, una imagen publicada por
el pipeline dejaría de indicar que su código pasó nuestros controles. Esta
garantía no impide que alguien con credenciales publique manualmente otra imagen.
Además, los tests no garantizan la ausencia de errores: verifican los casos y
umbrales definidos en el TP5.

## Permisos y autenticación

Agregamos `contents: read` y `packages: write` dentro de `build-backend` y
`build-frontend`. El primero permite leer el repositorio y el segundo publicar
paquetes. Los permisos se declaran por job para no extender escritura de paquetes
a futuros jobs que no la necesiten.

El login usa `GITHUB_TOKEN`, generado por GitHub para la corrida; no creamos un
token personal ni agregamos una contraseña al repositorio. Tanto el login como
el parámetro `push` exigen evento `push` y rama `main`.

## Identificación de las imágenes

Cada imagen se etiqueta con `sha-${{ github.sha }}` para relacionarla con el
commit que la produjo, en lugar de depender de una etiqueta móvil como `latest`.
Los nombres de los paquetes se escribieron en minúsculas porque GHCR lo exige,
aunque el usuario de GitHub contiene mayúsculas. Conservan el nombre
`ingsoft3-tp01` configurado en el workflow.

La etiqueta identifica el commit, pero por sí sola no es una garantía técnica
de inmutabilidad: alguien con permiso podría sobrescribirla. Un digest identifica
el contenido concreto de la imagen. En esta etapa tampoco afirmamos que esa
imagen ya esté desplegada en QA o PROD.

## Verificación del primer paso

El [PR #34](https://github.com/Geronimo2001/ingsoft3/pull/34) quedó integrado.
Revisamos los pasos de las dos corridas enlazadas arriba:

- En el PR, ambos jobs pasaron los tests y controles, y «Entrar al registry»
  quedó salteado. El paso final construyó con `push: false`: su nombre incluye
  «publicar», pero en los PR no sube la imagen.
- En `main`, ambos jobs pasaron, iniciaron sesión en GHCR y completaron la
  construcción y publicación. Después de ese paso solo aparecen las tareas
  automáticas `Post …` y `Complete job` de GitHub.
- El estudiante confirmó que ambas imágenes se descargan en la comprobación
  de acceso sin credenciales. Registramos esa confirmación como verificación
  de accesibilidad pública, además del resultado verde de Actions.

## Bases de datos de QA y PROD

Creamos el proyecto `ingsoft3` en Neon con dos bases, `app_qa` y `app_prod`,
en la misma branch. El estudiante confirmó que ambas aparecen en la lista de
esa rama, guardó sus conexiones de forma privada y comprobó cada conexión
desde SQL Editor con `SELECT current_database();`.

Usamos bases distintas para separar los datos de pruebas de los de producción.
El estudiante confirmó el aislamiento: insertó el proveedor
`SOLO PROD - prueba TP6` en `app_prod` desde SQL Editor y comprobó que aparece
en `/api/suppliers` de PROD, pero no en el mismo endpoint de QA.

Nuestro backend lee `ConnectionStrings__DefaultConnection`, no el nombre
`ConnectionStrings__Default` del ejemplo de la guía. Al arrancar ejecuta
`EnsureCreated()` y `SeedData.EnsureSeeded(db)`: crea el esquema si corresponde
y carga los datos iniciales. Las consultas exitosas de productos en ambas APIs
y la prueba del proveedor confirman el acceso a las tablas utilizadas.
No guardamos contraseñas ni cadenas de conexión en este archivo.

## Primer backend en Render: QA

El estudiante compartió `https://ingsoft3.onrender.com` como URL del backend de
QA. Comprobamos que `GET /api/products` devuelve HTTP 200 y una respuesta JSON.
Este endpoint consulta productos mediante el contexto de Entity Framework,
por lo que comprueba una lectura real de la base, además de que la API responde.
La prueba posterior del proveedor exclusivo de PROD, confirmada por el estudiante,
comprobó el aislamiento. También confirmó Auto-Deploy en Off en este servicio.
El primer despliegue corresponde a la creación del servicio; todavía falta
implementar el despliegue desde GitHub Actions.

## Backend de PROD en Render

El estudiante compartió `https://ingsoft3-api-prod-3hji.onrender.com` como URL
de PROD. Comprobamos que `GET /api/products` devuelve HTTP 200 y una lista JSON
con tres productos. Tener datos iniciales iguales no demostraba el aislamiento;
por eso hicimos la prueba posterior con el proveedor exclusivo de PROD.
El estudiante confirmó que ese proveedor aparece solo en PROD y que Auto-Deploy
está en Off en ambos backends. Estas comprobaciones manuales fueron confirmadas
por el estudiante, no inspeccionadas en las consolas por el asistente.

## Configuración del frontend al arrancar

Reemplazamos `frontend/nginx.conf` por `frontend/default.conf.template` y
modificamos el Dockerfile para copiarla a `/etc/nginx/templates/`. El arranque
de la imagen oficial de nginx sustituye las variables de entorno de la plantilla
y genera la configuración en `conf.d`.

La dirección del backend llega mediante `BACKEND_URL`, sin barra final ni ruta.
`DNS_RESOLVER` permite resolver su nombre mientras nginx está funcionando.
El proxy conserva la ruta `/api/...` y activa SNI para las conexiones HTTPS
al backend de Render mediante `proxy_ssl_server_name on`.

Los valores predeterminados de la imagen son `BACKEND_URL=http://backend:8080`
y `DNS_RESOLVER=127.0.0.11`, para mantener el funcionamiento de Docker Compose.
En Render configuraremos `DNS_RESOLVER=8.8.8.8` y estas direcciones:

- QA: `BACKEND_URL=https://ingsoft3.onrender.com`.
- PROD: `BACKEND_URL=https://ingsoft3-api-prod-3hji.onrender.com`.

Dentro de la imagen quedan los archivos compilados de la interfaz y la ruta
relativa `/api` que usa el navegador por defecto. La dirección concreta del
backend se configura al arrancar nginx, sin recompilar el frontend. Esto permite
usar una misma imagen con distintas configuraciones por entorno.

Verificación local realizada el 19/10/2026: construimos una sola imagen
`ingsoft3-front-tp6-check` (compilación TypeScript y Vite exitosa) y ejecutamos
dos contenedores temporales con esa imagen. Sin variables explícitas, la plantilla
generó `http://backend:8080` y el DNS `127.0.0.11`; con las variables de QA,
generó `https://ingsoft3.onrender.com` y `8.8.8.8`. `nginx -t` pasó en ambos casos.
En el segundo contenedor arrancamos nginx y comprobamos HTTP 200 tanto en `/`
como en `/api/products`, pasando por el proxy hasta la API real de QA.
Los contenedores se eliminaron automáticamente al terminar. No probamos aquí
el backend local de Compose ni la interfaz en un navegador.
El estudiante confirmó la integración del PR #35. Después compartió el frontend
de QA en `https://ingsoft3-front-qa-6z2e.onrender.com/`. Comprobamos HTTP 200
en `/` y en `/api/products` sobre ese mismo dominio; la segunda respuesta es una
lista JSON con cuatro productos. Esto verifica que el servidor entrega la página
y que el proxy consulta la API desde Render. No equivale todavía a comprobar
la interacción completa en el navegador ni la escritura de datos desde la UI.
El estudiante confirmó Auto-Deploy en Off en ambos frontends al completar
la configuración del environment de QA.

## Error inicial al abrir el frontend de PROD

El estudiante informó un error en la interfaz aunque Render mostraba el despliegue
exitoso. La comprobación HTTP encontró `/` con estado 200, pero `/api/dashboard`
a través del frontend devolvía 502. La consulta directa al backend tardó en
responder y finalmente devolvió 200. Al repetir por el frontend, tanto
`/api/dashboard` como `/api/products` devolvieron 200, sin cambiar código ni
configuración. El dashboard devolvió un objeto JSON válido.

El comportamiento es compatible con un arranque en frío del backend; no se
confirmó esa causa en los logs de Render. El resultado demuestra por qué un
deploy exitoso no basta para afirmar que la app está disponible: también hay
que verificar sus dependencias. La revisión visual del navegador queda a cargo
del estudiante; las comprobaciones anteriores fueron HTTP.

## Despliegue automático a QA

Creamos la rama `feature/deploy-qa` desde `origin/main` actualizado, conservando
las notas locales. El job `deploy-qa` espera el éxito de `build-backend` y
`build-frontend` mediante `needs`. Solo se ejecuta en un `push` a `main`;
los PR verifican el código sin desplegar.

El estudiante creó el environment `qa` y guardó los hooks. Al revisar sus nombres
detectamos que el del frontend estaba en Variables, mientras que el del backend
estaba en Secrets. El estudiante corrigió esa ubicación y verificamos por API
que `RENDER_HOOK_API_QA` y `RENDER_HOOK_FRONT_QA` existen como secrets del
environment. No leímos ni imprimimos sus valores.

El job declara `environment: qa`, recibe esos secretos y solicita ambos deploys
agregando `&ref=$GITHUB_SHA` a cada hook: Render debe construir el commit que
verificó esa corrida, aunque `main` haya avanzado después. La URL del frontend
queda asociada al environment en Actions. Este job no necesita permisos sobre
el token de GitHub, por lo que declara `permissions: {}`.

El smoke test usa las rutas de nuestra app, que no tiene `/health` ni `/api/tareas`:

- `/api/products` y `/api/dashboard` del backend: comprueban API y consultas a BD.
- `/` del frontend: comprueba que responde el servidor de la interfaz.
- `/api/products` del frontend: comprueba además el proxy hacia la API.

Cada consulta tiene un máximo de 10 segundos. Hay hasta 30 intentos separados
por 20 segundos; si ninguno completa todas las consultas, el script sale con
código 1 y falla el job. El job tiene un límite total de 30 minutos. Los reintentos
permiten esperar el arranque de los servicios, como ocurrió con PROD.

Estos chequeos HTTP no prueban toda la funcionalidad ni identifican el commit
en ejecución. Un hook responde antes de que Render termine de construir y el
smoke puede pasar contra la versión anterior. En el primer despliegue habrá que
comparar el commit y el estado Live de ambos servicios en Render con la corrida.
Además, Render reconstruye desde el repositorio: promovemos el mismo commit,
no la misma imagen publicada en GHCR. Las dependencias o imágenes base pueden
cambiar entre construcciones; desplegar la imagen del registry queda para TP7.

Validamos la sintaxis YAML y la de los dos scripts Bash. Ejecutamos el mismo
script de smoke contra QA, sin disparar hooks: los primeros dos intentos
agotaron el tiempo de una consulta y el tercero completó los cuatro chequeos
con éxito. Esto comprueba la disponibilidad actual y el mecanismo de reintento,
no un nuevo despliegue.

El PR #36 se integró en el commit `b4441e202086d0817c409e8825c9705dc9d2614e`.
El 20/10/2026 revisamos la [corrida posterior al merge](https://github.com/Geronimo2001/ingsoft3/actions/runs/39347206657):
ambos jobs de construcción y publicación pasaron; el [job deploy-qa](https://github.com/Geronimo2001/ingsoft3/actions/runs/39347206657/job/118382949584)
ejecutó exitosamente los hooks y el smoke test. El estudiante confirmó en Render
que ambos servicios de QA están Live con el commit `b4441e2`. Esa comparación
completa la comprobación de versión que el smoke no hace.

Antes del merge del [PR #36](https://github.com/Geronimo2001/ingsoft3/pull/36),
verificamos la [corrida del PR](https://github.com/Geronimo2001/ingsoft3/actions/runs/39346817715):
`build-backend` y `build-frontend` terminaron con éxito y `deploy-qa` quedó
salteado, como corresponde a un Pull Request. GitHub informó el PR abierto y
sin conflictos (`mergeStateStatus: CLEAN`). El despliegue real debe comprobarse
en la corrida de `main` posterior al merge.

## Preparación del despliegue a producción

Agregamos `deploy-prod` en la rama `feature/deploy-prod`, creada desde `main`
actualizado. Depende de `deploy-qa`; si QA falla o se saltea, PROD no corre.
Declara el environment `production`, que debe tener un required reviewer antes
de integrar este cambio. La aprobación se configura en GitHub, no en el YAML.

Verificamos por API los nombres `RENDER_HOOK_API_PROD` y
`RENDER_HOOK_FRONT_PROD` dentro de los secretos de production. En esa consulta
las reglas de protección estaban vacías. El selector de la interfaz no le
mostraba al estudiante su usuario; resolvimos la configuración mediante la API
de GitHub. El 20/10/2026 la respuesta confirmó `required_reviewers` con
`Geronimo2001` y `prevent_self_review: false`: el estudiante puede aprobar sus
propias corridas. El estudiante informó posteriormente la pausa para revisión
y el rechazo registrado más abajo.

Los hooks reciben `&ref=$GITHUB_SHA` para desplegar el commit aprobado, aunque
main avance durante la espera. Usamos el mismo smoke test de QA con las URLs
de PROD, 30 intentos y tiempos máximos por consulta. Conserva la limitación de
no identificar la versión en ejecución. `concurrency` con el grupo `deploy-prod`
y `cancel-in-progress: false` evita ejecuciones simultáneas de este job; no
reemplaza revisar y rechazar aprobaciones viejas para evitar un retroceso.

Antes de aprobar habrá que revisar QA verde, cambios del PR, funcionamiento de
la interfaz, el commit Live en ambos servicios y que no se trate de una corrida
vieja. El rechazo fue confirmado por el estudiante y la corrida posterior
completó el despliegue a PROD, como se registra abajo.

## Rechazo de producción y siguiente cambio visible

El estudiante compartió la [corrida rechazada 39447789648](https://github.com/Geronimo2001/ingsoft3/actions/runs/39447789648)
como evidencia del rechazo manual hacia production. Se registra según su
confirmación, sin consultar la corrida ni sus logs por pedido expreso suyo.
No transcribimos un motivo porque no confirmó el comentario exacto que guardó.

Para la próxima corrida preparamos un cambio visible en `Layout.tsx`: el título
pasa de «Control de stock» a «Control de stock y proveedores». Esto permitirá
identificar el cambio primero en QA y después en PROD tras la aprobación.
El cambio está preparado en `feature/tp6-cambio-visible`, creada desde main
actualizado. El cambio se integró en `6ee64d3914f177ea2b58aac4e59787872022e02f`.
La [corrida 39449301367](https://github.com/Geronimo2001/ingsoft3/actions/runs/39449301367)
terminó con sus cuatro jobs exitosos, incluido [deploy-prod](https://github.com/Geronimo2001/ingsoft3/actions/runs/39449301367/job/118720165661).
El estudiante confirmó que ambos frontends mostraban el mismo commit en Render.

Al principio el navegador mostraba el encabezado anterior en QA y el nuevo en
PROD. Descargamos los HTML y sus bundles JavaScript: ambos entornos servían
`index-DOidaSg8.js` con contenido idéntico y el encabezado nuevo. El estudiante
confirmó que al abrir una sesión nueva se resolvió la diferencia. La página
abierta conservaba la versión anterior. El título de la pestaña sigue siendo
«Control de stock» porque no cambiamos `index.html`.

El flujo implementado es Continuous Delivery: QA se actualiza automáticamente
tras la verificación y PROD queda sujeto a aprobación. No implementamos
Continuous Deployment, que llevaría los cambios a PROD sin ese paso humano.
En esta app el gate permite revisar el cambio y su funcionamiento antes de
exponerlo en producción; el smoke actual no identifica la versión ni sustituye
esa revisión.

## Release y preparación de la prueba de rollback

El estudiante confirmó la creación del tag y la
[release v6.0.0](https://github.com/Geronimo2001/ingsoft3/releases/tag/v6.0.0)
sobre `6ee64d3914f177ea2b58aac4e59787872022e02f`, el commit desplegado
correctamente en PROD. Se registra según su confirmación.

Para practicar la recuperación preparamos un cambio posterior en
`feature/tp6-prueba-rollback`: el encabezado pasa de «Control de stock y
proveedores» a «Gestión de stock y proveedores». No cambia el esquema ni los
datos. La [corrida 39452161334](https://github.com/Geronimo2001/ingsoft3/actions/runs/39452161334)
del commit `1ebeb682633f02f0ec70d5ec522455fd4d0d3392` completó los cuatro jobs;
su deploy de PROD terminó el 20/10/2026 a las 12:53:38, hora de Córdoba.

El destino del rollback fue el commit de `v6.0.0`, con el encabezado
«Control de stock y proveedores». El estudiante confirmó en Render que tanto
frontend como backend de PROD volvieron a `6ee64d3` y reportó estas duraciones:

| Servicio de PROD | Duración reportada en Render |
| --- | --- |
| Frontend | 33,6 segundos |
| Backend | 34,3 segundos |

Son las duraciones por servicio confirmadas por el estudiante, no una medición
propia del asistente. La mayor fue 34,3 segundos; no sumamos ambas porque los
despliegues pueden solaparse. Tampoco afirmamos un tiempo global exacto desde
la primera llamada al hook hasta el último Live sin las marcas de inicio y fin.
La evidencia queda en Deploys de cada servicio de Render, en el despliegue del
commit `6ee64d3`. El smoke no se usa como señal del fin de la recuperación,
porque puede responder la versión anterior.

Revisamos el intento 2 de la [corrida de v6.0.0](https://github.com/Geronimo2001/ingsoft3/actions/runs/39449301367):
se repitieron todos los jobs, no solo PROD. QA solicitó el commit anterior a las
12:33:09; una corrida posterior volvió a desplegar la versión nueva a QA.
El job de rollback de PROD solicitó el commit `6ee64d3` a las 12:59:43 y terminó
a las 12:59:49 (hora de Córdoba). Esos seis segundos son la duración del job,
no el tiempo de recuperación de Render: el smoke terminó a las 12:59:47 y
puede haber respondido la versión anterior.

Después descargamos desde PROD el bundle `index-DOidaSg8.js`: contiene
«Control de stock y proveedores» y no «Gestión de stock y proveedores».
Esto confirma que el frontend público ya ofrece el texto de v6.0.0, aunque
el navegador del estudiante todavía mostraba «Gestión». Se indicó recargar o
abrir una ventana privada. El estudiante luego confirmó en Render la vuelta
al commit anterior en ambos servicios y las duraciones registradas arriba.
La comprobación del backend depende de esa confirmación, porque no expone
su commit en la respuesta HTTP. También confirmamos por la API
de GitHub que el tag v6.0.0 apunta a `6ee64d3914f177ea2b58aac4e59787872022e02f`.

Este rollback restaura el código de la aplicación; no revierte los datos de
Neon ni deshace migraciones. La prueba usa solo un cambio de texto para no
necesitar recuperación de datos. En un incidente con cambios de esquema o
datos haría falta un plan específico de migraciones compatibles y recuperación
desde backups o un punto en el tiempo, según lo que permita la infraestructura.

## Límites del alojamiento y presupuesto de uso

Render suspende los servicios Free tras 15 minutos sin tráfico; despertar puede
tardar alrededor de un minuto. Las 750 horas mensuales se comparten por workspace:
nuestros cuatro servicios consumen del mismo cupo mientras están activos.
Al agotarlo se suspenden hasta el mes siguiente. Sin medio de pago, agotar los
minutos de build impide nuevas construcciones, aunque siga disponible la versión
anterior. El disco local es efímero, por eso los datos están en Neon. Render
desaconseja Free para producción real; nuestro PROD es un entorno académico.
Fuente consultada el 20/10/2026: [Render Free](https://render.com/docs/free).

Como presupuesto propio, si los cuatro servicios permanecieran activos dos
horas diarias durante 30 días consumirían 240 horas; activos permanentemente
consumirían 2.880 horas. Evitaremos pings permanentes y merges de prueba
innecesarios. Una promoción construye cuatro servicios: estimando 2 a 5 minutos
por servicio, diez promociones consumirían 80 a 200 minutos de build, más los
despliegues iniciales y rollbacks. Es una estimación de planificación, no una
medición del consumo real.

La guía cita 500 minutos de build mensuales. No confirmamos ese cupo particular
en nuestra cuenta: hay que verificar el valor y el consumo restantes en
Workspace → Billing antes de la defensa. El pipeline no administra esa cuota;
usa reintentos acotados para demoras transitorias, pero no resuelve una suspensión
ni comprueba por sí solo que Render haya terminado la nueva construcción.

Neon Free también tiene límites compartidos por proyecto: la documentación
consultada indica 100 CU-horas mensuales, 1 GB de almacenamiento y 5 GB de
transferencia pública. El compute se suspende tras cinco minutos inactivo.
Las dos bases de nuestra misma branch comparten infraestructura y cuotas;
separar sus datos no duplica los recursos disponibles. Revisaremos Usage para
mantener el proyecto dentro del plan y las URLs accesibles hasta la defensa.
Fuente: [planes de Neon](https://neon.com/docs/introduction/plans), consultada
el 20/10/2026. No usamos el Postgres gratuito de Render por su vencimiento a
30 días, documentado en su página de Free.

## Estrategia elegida para una producción real

Para una app interna de inventario elegiría blue-green si el negocio necesita
continuidad durante las actualizaciones: mantener dos versiones del frontend
y backend, verificar la nueva y cambiar el tráfico hacia ella. Ante un error
se podría volver a dirigir el tráfico a la anterior sin esperar otra construcción.
Esto reduce el tiempo de recuperación, importante cuando registrar entradas y
salidas de stock forma parte de la operación diaria.

El costo es mantener dos conjuntos de servicios durante el despliegue y contar
con un mecanismo de enrutamiento. Es una propuesta para una infraestructura
real con presupuesto, no una capacidad implementada por nuestros cuatro
servicios actuales: QA y PROD no son los lados blue y green, porque tienen
datos y finalidades distintas.

La base de producción requeriría migraciones compatibles con ambas versiones:
por ejemplo, agregar campos antes de retirar los antiguos. Cambiar el tráfico
no deshace movimientos de stock ni una migración destructiva. Las operaciones
de escritura deben conservar las mismas reglas y no duplicarse durante el cambio.

Antes de usar esta estrategia faltan métricas de errores y latencia, alertas,
logs correlacionados, identificación del commit en ejecución y chequeos de
operaciones de inventario. También habría que ensayar el cambio de tráfico y
la recuperación de datos. Canary no sería mi primera elección aquí: tenemos
poco tráfico y no contamos con métricas suficientes para evaluar una muestra
pequeña de usuarios. Rolling requeriría varias instancias y compatibilidad
durante la convivencia de versiones. Un feature flag serviría para habilitar
una nueva pantalla de reposición después de desplegarla, pero no sustituye
la recuperación del servicio ni debe saltarse las validaciones de stock.

## Procedimiento de rollback que repetiríamos

1. Identificar el commit anterior conocido y comprobar su compatibilidad con
   el esquema actual. En esta prueba fue `6ee64d3`, tag `v6.0.0`.
2. Abrir su corrida en Actions y reejecutar únicamente `deploy-prod`, revisar
   y aprobar production. No repetir todos los jobs: en nuestra prueba ocurrió
   y también se solicitó un despliegue anterior de QA.
3. Si no se puede reejecutar la corrida, usar los dos hooks de PROD copiados
   privadamente desde Render, agregando `&ref=<SHA anterior>` a cada uno.
   Quien posee esos hooks puede desplegar directamente: este camino no pasa por
   la aprobación de GitHub y se reservaría para una recuperación controlada.
4. Registrar el inicio de cada deploy y esperar que ambos servicios estén Live
   con el SHA elegido. Comprobar API, consultas a base, frontend y proxy; recargar
   la interfaz para no confundir una pestaña vieja con el estado desplegado.
5. Registrar tiempos, resultado y datos afectados. Nuestra prueba reportó
   33,6 s para frontend y 34,3 s para backend; no asumir que una futura reversión
   siempre tardará lo mismo. Este ejercicio practica el tiempo de recuperación
   del servicio; fue un ensayo, no un incidente real con usuarios.

## Pendientes para cerrar la entrega

Estos puntos todavía no se implementaron ni se dan por verificados:

- Probar cada app completa desde el navegador, incluida la escritura de datos.
- Revisar el cupo y consumo reales de Render y Neon antes de la defensa.
- Comprobar que el rechazo tenga un comentario propio y específico: su enlace
  fue registrado sin inspeccionar el contenido, por pedido del estudiante.
- El estudiante agregará personalmente la declaración de uso de IA del TP6.
- Incorporar las notas finales al repositorio y completar los problemas encontrados
  y sus soluciones; el tag v6.0.0 queda como referencia fija de la versión desplegada.

# Decisiones — TP7 Contenedores, integración y e2e

## De promover código a promover imágenes

En TP6 Render reconstruía el mismo commit por separado en QA y PROD. Aunque el
código fuera el mismo, las construcciones podían resolver dependencias o imágenes
base distintas. Ahora cada entorno debe ejecutar la imagen publicada en GHCR:
build once, deploy many. Conservamos los pasos de publicación del TP6 y cambiamos
los dos despliegues para enviar `imgURL`, en lugar de `ref`, al hook de Render.
El frontend y el backend son imágenes distintas; para cada componente, QA y PROD
reciben la misma referencia `sha-<commit completo>` de la corrida.

Los logs muestran las referencias solicitadas sin mostrar los hooks privados.
`--get --data-urlencode` agrega correctamente `imgURL` al hook, que ya contiene
su clave como parámetro. PROD sigue dependiendo de QA y de la aprobación del
environment `production`. Las suites de integración y e2e se incorporarán después.

La etiqueta permite relacionar la imagen con su código, pero alguien con permisos
puede sobrescribirla. No publicamos `latest`, porque es un puntero que cambia y
no identifica la versión que queremos promover. El digest identifica el contenido
exacto. No reejecutaremos corridas antiguas para reconstruir una imagen que queremos
recuperar: el despliegue debe referirse a la imagen ya publicada.

## Verificación inicial y configuración de Render

La corrida `39455587456` publicó ambas imágenes del commit
`5233120fd1f938f890b8712275adef6c37dab39f`. El asistente comprobó los pasos exitosos
por la API de GitHub y que no había corridas esperando aprobación en esa consulta.
El 21/10/2026 descargó ambas con `docker pull --platform linux/amd64`, usando una
configuración temporal sin credenciales para GHCR, sin modificar la sesión habitual
de Docker del estudiante. Las dos descargas terminaron correctamente:

- Backend: `sha256:039721dd3132bf03f620a2afbeb56b092c7952b215515bc99116a43854a0210f`.
- Frontend: `sha256:dc5e6a53821cd958e25c35cb3dc94b823907008510dfea72cdbbefda2981574c`.

El estudiante confirmó el cambio de fuente del frontend de QA a Existing Image y,
después de recibir el comando de prueba por hook, informó que quedó Live y la app
cargó. Luego confirmó el cambio de fuente de los otros tres servicios. Se conserva
la configuración de los servicios existentes, en lugar de crear otros con nuevas
URLs. La confirmación de Render corresponde al estudiante; el asistente no accedió
a sus Events. La etiqueta inicial es el punto de partida de Settings: cada corrida
posterior debe indicar su propia etiqueta mediante `imgURL`.

Durante la prueba, el asistente recibió HTTP 200 para la página del frontend,
respuestas HTML de error 502 al consultar la API a través del frontend y timeouts
de 20 segundos contra el backend directo. Después el estudiante informó que cargó.
Es compatible con un arranque en frío, sin confirmar la causa mediante logs.

Cada backend conserva `ConnectionStrings__DefaultConnection` con su base de Neon.
La imagen del frontend contiene los archivos compilados y usa `/api`; al arrancar,
nginx toma `BACKEND_URL` y `DNS_RESOLVER` de su entorno. Esa configuración permite
usar la misma imagen en QA y PROD sin recompilarla.

## Cómo comprobaremos el despliegue

El smoke verifica disponibilidad de la página, consultas a la base y el proxy,
pero puede responder la versión anterior mientras Render despliega. No identifica
la imagen ejecutada. Para cerrar esta etapa hay que revisar los Events de los
cuatro servicios: origen Deploy Hook, etiqueta de la corrida y estado Live.
Todavía no se afirma que el cambio del pipeline se haya ejecutado en main.

## Uso de IA en esta etapa

El asistente ayudó a interpretar la guía, preparar el cambio de los hooks y registrar
las comprobaciones. La verificación incluye las descargas anónimas y la validación
del workflow; el estudiante realiza la configuración de Render y confirma el Live.
La declaración se ampliará con las suites y su verificación cuando se implementen.
