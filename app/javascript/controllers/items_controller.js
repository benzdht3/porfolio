import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "fileInput",
    "imgBox",
    "imgPreview"
  ]

  quantityClick(event) {
    event.stopPropagation();
  }

  delete(event) {
    event.preventDefault();
    const id = event.target.dataset.id;
    fetch(`/items/destroy/${id}`, {
      method: 'DELETE',
      headers: { 'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content }
    }).then(res => {
      window.location.reload();
    });
  }

  addItem() {
    document.querySelector(".modal-overlay").classList.remove("d-none")
    fetch(`/items/ajax_open_add/${event.params.category}`)
      .then(response => response.text())
      .then(html => {
        document.querySelector(".modal-overlay").innerHTML = html
      })
  }

  openEditItem() {
    document.querySelector(".modal-overlay").classList.remove("d-none")
    fetch(`/items/ajax_open_edit/${event.params.id}`)
      .then(response => response.text())
      .then(html => {
        document.querySelector(".modal-overlay").innerHTML = html
      })
  }

  sellItem() {
    document.querySelector(".sell-list").classList.remove("d-none")
    document.querySelector(".sell-list").innerHTML += `
      <div class="sell-item" data-id="${event.params.id}">
        <div class="bi bi-x-circle-fill" data-action="click->items#removeSellItem"></div>
        <div class="sell-item-name">&nbsp;${event.params.name}</div>
        <select class="quantity-select">
          ${Array.from({ length: event.params.quantity }, (_, i) => i + 1).map(quantity => `<option value="${quantity}">${quantity}</option>`).join('')}
        </select>
      </div>
    `
  }

  removeSellItem() {
    const item = event.target.closest(".sell-item")
    item.remove()
    if (!document.querySelector(".sell-item")) {
      document.querySelector(".sell-list").classList.add("d-none")
    }
  }

  sellConfirm() {
    const items = document.querySelectorAll(".sell-item")
    const itemsArray = Array.from(items).map(item => ({
      id: item.dataset.id,
      quantity: item.querySelector(".quantity-select").value
    }))
    fetch(`/items/update_quantity`, {
      method: 'PATCH',
      headers: {
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ items: itemsArray })
    }).then(res => {
      window.location.reload();
    });
  }

  editItem() {
    document.querySelector(`#current-${event.params.input}-name`).classList.add("d-none")
    document.querySelector(`#current-${event.params.input}-icon`).classList.add("d-none")
    document.querySelector(`#current-${event.params.input}-icon-hidden`).classList.add("d-none")
    document.querySelector(`#current-${event.params.input}-input`).classList.remove("d-none")
  }

  triggerFile() {
    this.fileInputTarget.click();
  }

  previewImage(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (document.querySelector("#current-img-preview")) {
          document.querySelector("#current-img-preview").src = e.target.result;
        }
        else {
          this.imgPreviewTarget.src = e.target.result;
          this.imgPreviewTarget.classList.remove('d-none');
          this.imgBoxTarget.querySelector('.text').classList.add('d-none');
        }
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
