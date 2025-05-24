import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["fileInput", "imgBox", "imgPreview"]

  addItem() {
    document.querySelector(".modal-overlay").classList.remove("d-none")
  }

  triggerFile() {
    this.fileInputTarget.click();
  }

  previewImage(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imgPreviewTarget.src = e.target.result;
        this.imgPreviewTarget.classList.remove('d-none');
        this.imgBoxTarget.querySelector('.text').classList.add('d-none');
      };
      reader.readAsDataURL(file);
    }
  }

  connect() {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-overlay") && !document.querySelector(".modal-overlay").classList.contains("d-none")) {
        document.querySelector(".modal-overlay").classList.add("d-none")
      }
    })
  }
}
