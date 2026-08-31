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
