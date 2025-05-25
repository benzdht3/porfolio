// Import and register all your controllers from the importmap via controllers/**/*_controller
import { application } from "controllers/application"
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
import ItemsController from "./items_controller"
import HeaderController from "./header_controller"

application.register("items", ItemsController)
application.register("header", HeaderController)
eagerLoadControllersFrom("controllers", application)
