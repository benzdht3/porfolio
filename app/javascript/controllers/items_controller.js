import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  addItem() {
    document.querySelector(".modal-overlay").classList.remove("d-none")
  }

  connect() {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-overlay") && !document.querySelector(".modal-overlay").classList.contains("d-none")) {
        document.querySelector(".modal-overlay").classList.add("d-none")
      }
    })
  }
}
