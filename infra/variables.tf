variable "image_repo_api" {
  description = "Imagen publica del backend del TP7, sin etiqueta."
  type        = string
  default     = "ghcr.io/geronimo2001/ingsoft3-tp01-backend"
}

variable "image_repo_front" {
  description = "Imagen publica del frontend del TP7, sin etiqueta."
  type        = string
  default     = "ghcr.io/geronimo2001/ingsoft3-tp01-frontend"
}

variable "image_tag" {
  description = "Imagenes ya publicadas para el commit de cierre de v7.0.0."
  type        = string
  default     = "sha-77f8897ce0ab1542c8f8e8a9d56933a9218c8cbb"
}

variable "region" {
  description = "Region de los servicios gratuitos de Render."
  type        = string
  default     = "oregon"
}
