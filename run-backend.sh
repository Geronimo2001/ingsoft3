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

exec "$DOTNET_BIN" run --project "$ROOT_DIR/backend/StockControl.Api.csproj" "$@"
