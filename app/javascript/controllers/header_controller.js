import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    category: String
  }

  connect() {
    if (this.categoryValue) {
      document.querySelector(`#${this.categoryValue}`).classList.add("active")
    } else if (event.params.controller === 'home') {
      document.querySelector(`#all`).classList.add("active")
    }
  }
}
