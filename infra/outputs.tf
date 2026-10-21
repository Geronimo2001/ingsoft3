output "db_host" {
  description = "Host de la base de preprod, asignado por Neon."
  value       = neon_project.preprod.database_host
}

output "database" {
  description = "Nombre de la base exclusiva de preprod."
  value       = neon_database.preprod.name
}

output "api_url" {
  description = "URL publica de la API de preprod."
  value       = trimsuffix(render_web_service.api.url, "/")
}

output "front_url" {
  description = "URL publica del frontend de preprod."
  value       = trimsuffix(render_web_service.front.url, "/")
}
