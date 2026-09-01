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
