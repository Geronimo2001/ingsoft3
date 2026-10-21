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

## TP9: comprobacion de disponibilidad

La API expone `/health` con GET y HEAD. GET devuelve HTTP 200 y
`{"status":"ok"}`; HEAD devuelve el mismo estado sin cuerpo, para monitores
que usan ese metodo. Esta ruta comprueba que la API responde; no consulta la
base de datos ni verifica todas las funciones de la aplicacion.

Despues del despliegue se puede comprobar con:

```bash
curl -i https://ingsoft3-api-prod-3hji.onrender.com/health
curl -I https://ingsoft3-api-prod-3hji.onrender.com/health
```

El monitor externo del ejercicio debe pausarse al terminar la prueba de caida
y recuperacion, para no mantener los servicios gratuitos despiertos todo el mes.

### Sentry: errores, demoras y uso

El backend usa `Sentry.AspNetCore` y lee `SENTRY_DSN` del entorno. En Render,
agregar esa variable en el servicio de la API PROD con el DSN de su proyecto
de ASP.NET Core. Sin valor queda desactivado, por ejemplo en QA y en local.
El frontend usa `@sentry/react`, inicializado antes de renderizar React 19.
Su DSN publico esta en `frontend/src/instrument.ts`; se activa solo en
`ingsoft3-front-prod-553q.onrender.com`. Esa direccion permite enviar eventos,
no leer ni administrar el proyecto de Sentry. La misma imagen sigue sirviendo
para QA y PROD.

Ambos SDK miden el 100 % de las solicitudes del ejercicio (`TracesSampleRate`
y `tracesSampleRate` en 1.0). Frontend etiqueta el entorno con su hostname;
backend usa el entorno de ASP.NET Core, o `SENTRY_ENVIRONMENT` si se define.
No habilitamos Session Replay ni logs de Sentry. Desactivamos la captura
automatica de datos de usuario y, en frontend, cookies, headers, cuerpos HTTP
y parametros de consulta.

Para verificar despues del PR, pipeline y despliegue a PROD:

1. Usar el frontend de produccion: Inicio, Productos y stock, Proveedores y
   algunas operaciones normales. Esto genera mediciones reales.
2. Abrir una vez `https://ingsoft3-api-prod-3hji.onrender.com/api/falla`.
   Devuelve HTTP 500 intencionalmente para generar el error de prueba del TP9.
3. En el proyecto backend de Sentry, comprobar el error en Issues y las
   operaciones en Traces o en la tabla de transacciones del dashboard.
   En frontend, filtrar por el hostname de PROD para ver las mediciones.
4. Comparar cantidad de solicitudes y P95 de las operaciones normales: registrar
   la mas usada y la mas lenta, el periodo observado y sus valores, y crear una
   tarjeta en el tablero a partir de ese dato. El endpoint de prueba no es una
   operacion normal de inventario.
5. Retirar `/api/falla` del codigo mediante otro PR despues de verificar el
   error. La ruta es temporal y no forma parte de las funcionalidades de la app.

Las comprobaciones locales con un receptor simulado verifican la generacion de
eventos y trazas; la recepcion en los proyectos reales se verifica despues del
despliegue. No se requiere un token de administracion de Sentry para esta etapa.

## TP8: preprod con infraestructura como codigo

La carpeta [`infra/`](infra/README.md) declara un entorno nuevo con Terraform:
base propia en Neon y backend/frontend en Render usando las imagenes del TP7.
Incluye los pasos de creacion, comprobacion, drift y destruccion. QA y produccion
conservan su infraestructura y su pipeline del TP7.

[![CI](https://github.com/Geronimo2001/ingsoft3/actions/workflows/ci.yml/badge.svg)](https://github.com/Geronimo2001/ingsoft3/actions/workflows/ci.yml)

