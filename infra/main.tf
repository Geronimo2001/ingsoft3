terraform {
  required_version = ">= 1.5, < 2.0"

  required_providers {
    neon = {
      source  = "kislerdm/neon"
      version = "0.18.0"
    }
    render = {
      source  = "render-oss/render"
      version = "1.9.1"
    }
  }
}

# Las claves se leen del entorno: nunca se escriben en este archivo.
provider "neon" {}
provider "render" {}

# Proyecto independiente. QA y PROD no pertenecen a este estado.
resource "neon_project" "preprod" {
  name                      = "ingsoft3-preprod"
  history_retention_seconds = 21600
}

resource "neon_role" "preprod" {
  project_id = neon_project.preprod.id
  branch_id  = neon_project.preprod.default_branch_id
  name       = "stock_preprod_owner"
}

resource "neon_database" "preprod" {
  project_id = neon_project.preprod.id
  branch_id  = neon_project.preprod.default_branch_id
  name       = "stock_preprod"
  owner_name = neon_role.preprod.name
}

locals {
  # Neon genera la clave. La conexion depende de los recursos de ESTE entorno.
  connection_string = format(
    "Host=%s;Database=%s;Username=%s;Password=\"%s\";SSL Mode=Require",
    neon_project.preprod.database_host,
    neon_database.preprod.name,
    neon_role.preprod.name,
    replace(neon_role.preprod.password, "\"", "\"\"")
  )
}

resource "render_web_service" "api" {
  name              = "ingsoft3-api-preprod"
  plan              = "free"
  region            = var.region
  health_check_path = "/api/products"

  runtime_source = {
    image = {
      image_url = var.image_repo_api
      tag       = var.image_tag
    }
  }

  env_vars = {
    # Nombre real que lee nuestra app .NET, distinto al ejemplo de la guia.
    ConnectionStrings__DefaultConnection = { value = local.connection_string }
  }
}

resource "render_web_service" "front" {
  name              = "ingsoft3-front-preprod"
  plan              = "free"
  region            = var.region
  health_check_path = "/"

  runtime_source = {
    image = {
      image_url = var.image_repo_front
      tag       = var.image_tag
    }
  }

  env_vars = {
    # Nginx conserva /api/...; una barra final en BACKEND_URL cambia la ruta.
    BACKEND_URL  = { value = trimsuffix(render_web_service.api.url, "/") }
    DNS_RESOLVER = { value = "8.8.8.8" }
  }
}
