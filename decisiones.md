# Decisiones 

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
