# Control de productos, stock y proveedores

MVP con React + TypeScript + Vite, ASP.NET Core Web API .NET 8, PostgreSQL y Entity Framework Core.

## Requisitos

- Node.js 20 o superior.
- .NET SDK 8.
- PostgreSQL en ejecucion.
- Docker, si se ejecuta con Docker Compose.

## Ejecutar en una maquina limpia con Docker

Desde la raiz del proyecto:

```bash
cp .env.example .env
```

Revisar que `.env` tenga los valores para PostgreSQL:

```env
POSTGRES_DB=stock_control
POSTGRES_USER=stock_user
POSTGRES_PASSWORD=stock_password_change_me
```

### Opcion 1: construir las imagenes desde el codigo

Esta opcion usa `docker-compose.yml`. Docker construye las imagenes locales de frontend y backend, y descarga la imagen de PostgreSQL si no existe.

```bash
docker compose up --build
```

### Opcion 2: usar las imagenes publicadas en el registry

Esta opcion usa `docker-compose.registry.yml`. Docker descarga las imagenes publicadas de frontend y backend desde GitHub Container Registry.

```bash
docker compose -f docker-compose.registry.yml pull
docker compose -f docker-compose.registry.yml up
```

El `pull` es opcional porque `docker compose up` tambien descarga las imagenes si no estan en la maquina. Se deja separado para mostrar explicitamente que se estan bajando desde el registry.

Abrir la aplicacion en el navegador:

```text
http://localhost:3000
```

Para cortar la ejecucion, presionar `Ctrl+C`.

Para bajar los contenedores:

```bash
docker compose down
```

Para bajar los contenedores y borrar tambien los datos de la base:

```bash
docker compose down -v
```

Con este modo solo hace falta tener Docker instalado. No es necesario instalar Node.js, .NET SDK ni PostgreSQL manualmente.

## Base de datos

Crear una base local:

```bash
createdb stock_control
```

La cadena de conexion se lee desde `backend/.env`:

```env
ConnectionStrings__DefaultConnection=Host=localhost;Port=5432;Database=stock_control;Username=gero
```

`backend/.env` es local y no se sube a git. Usar `backend/.env.example` como referencia y ajustar usuario y clave si tu PostgreSQL usa otros valores. Al iniciar la API se crean las tablas si no existen y se cargan datos de ejemplo si la base esta vacia.

Tambien se puede ejecutar solo la creacion de tablas y seed:

```bash
cd backend
dotnet run -- --seed-only
```

## Ejecutar backend

Forma simple desde la raiz del proyecto:

```bash
./run-backend.sh
```

La API queda en `http://localhost:5055`.

Forma manual:

```bash
cd backend
dotnet restore
dotnet run
```

## Ejecutar frontend

```bash
cd frontend
npm install
npm run dev
```

La aplicacion queda en `http://localhost:5173`.

## Ejecutar app completa

Desde la raiz del proyecto:

```bash
./run-app.sh
```

Ese comando levanta backend y frontend. Para cortar todo, presionar `Ctrl+C`.

Si la API corre en otra URL, crear `frontend/.env` usando `frontend/.env.example` como referencia:

```bash
VITE_API_URL=http://localhost:5055/api
```

## Builds

```bash
cd backend
dotnet build

cd ../frontend
npm run build
```

## Funcionalidad incluida

- Inicio con totales, stock bajo, valor aproximado y productos para reposicion.
- CRUD de productos con busqueda por nombre o SKU y filtro de stock bajo.
- Registro de entradas y salidas de stock desde un modal.
- Validacion para impedir salidas mayores al stock disponible.
- CRUD de proveedores y vista de productos asociados.
- Mensajes claros de exito y error en la interfaz.
