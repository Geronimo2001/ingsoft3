#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOCAL_DOTNET="$ROOT_DIR/.dotnet/dotnet"

if [ -x "$LOCAL_DOTNET" ]; then
  export DOTNET_ROOT="$ROOT_DIR/.dotnet"
  export DOTNET_CLI_HOME="$ROOT_DIR/.dotnet-home"
  DOTNET_BIN="$LOCAL_DOTNET"
else
  DOTNET_BIN="dotnet"
fi

cleanup() {
  if [ -n "${BACKEND_PID:-}" ]; then
    kill "$BACKEND_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT INT TERM

echo "Iniciando backend en http://localhost:5055"
"$DOTNET_BIN" run --project "$ROOT_DIR/backend/StockControl.Api.csproj" &
BACKEND_PID=$!

echo "Iniciando frontend en http://localhost:5173"
cd "$ROOT_DIR/frontend"
if [ ! -d node_modules ]; then
  npm install
fi
npm run dev
