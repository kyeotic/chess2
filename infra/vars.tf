#-------------------------------------------
# Required variables (do not add defaults here!)
#-------------------------------------------

#-------------------------------------------
# Configurable variables
#-------------------------------------------
variable "region" {
  default = "us-west-2"
}

variable "domain_name" {
  default = "chess2.kye.dev"
}

variable "zone_name" {
  default = "kye.dev"
}

variable "deno_deploy_acme" {
  default = "936576ffa2d4bca9fd836fd7._acme.deno.dev."
}
