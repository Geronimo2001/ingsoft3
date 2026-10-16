# Decisiones 

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

La suite actual tiene **14 métodos de backend y 22 casos ejecutados**, y **7 tests
escritos de frontend y 8 casos ejecutados**. Hay parametrización, errores, bordes y
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
cobertura; la demostración del PR rojo sigue pendiente. La regla nueva sin tests
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
de la tabla anterior. Éste es el estado preparado para abrir el primer PR rojo.

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
La decisión actual es no reponerla hasta que acordemos la siguiente ampliación.
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

Trabajamos en `feature/tp5-testing`. Los siguientes pasos esperan indicación del
estudiante: hacer
commit/push y abrir el primer PR. El primer PR incluirá esa preparación y el
código nuevo sin tests dentro del alcance
medido. Debe compilar, pasar los tests y fallar por cobertura. Guardaremos su
corrida roja y comprobaremos el bloqueo antes de agregar los tests que faltan en
ese mismo PR. Repondremos las pruebas retiradas que correspondan y cubriremos
los caminos del código nuevo después de guardar el rojo y antes del merge.
Después vendrán verde y merge autorizado. El segundo PR saldrá de
`main` actualizado y quedará abierto y rojo hasta la defensa. Ambos checks del
TP4 deben estar configurados como obligatorios; todavía falta comprobarlo.

Faltan estos cuatro enlaces reales, que agregaremos junto a sus explicaciones:

1. Corrida con resumen y reporte descargable: pendiente.
2. Corrida roja por el umbral, con porcentaje y mínimo en el log: pendiente.
3. Primer PR con la secuencia rojo → tests → verde → merge: pendiente.
4. Segundo PR abierto y rojo: pendiente.

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
