class View {

  _overlay = document.querySelector(".overlay")

  render(data) {
    this._data = data
    this._clear()
    const markup = this._generateMarkup()
    this._parentElement.insertAdjacentHTML("beforeend", markup)
  }

  update(data) {
    if(!data) return this.renderError()

    this._data = data
    const newMarkup = this._generateMarkup()
    const newDOM = document.createRange().createContextualFragment(newMarkup)
    const newElements = Array.from(newDOM.querySelectorAll("*"))
    const currentElements = Array.from(this._parentElement.querySelectorAll("*"))

    newElements.forEach((newEl, i) => {
      const currentElement = currentElements[i]
      
      if(!newEl.isEqualNode(currentElement) && newEl.firstChild?.nodeValue.trim() !== "") {
        currentElement.textContent = newEl.textContent
      }

      if (!newEl.isEqualNode(currentElement)){
        Array.from(newEl.attributes).forEach(attr =>
          currentElement.setAttribute(attr.name, attr.value)
        );
      }
    })
  }


  _clear() {
    this._parentElement.innerHTML = ""
  }

  addModalEvent(btn, modal) {

    btn.addEventListener("click", (e) => {
      modal.classList.toggle("hidden")
      this._overlay.classList.toggle("hidden")
    })
  }

  closeModal (modal) {
    modal.classList.toggle("hidden")
    this._overlay.classList.toggle("hidden")
  }

}

export default View;