class View {

  _overlay = document.querySelector(".overlay")
  _errorMessage = "This field cannot be empty"

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

  clearInputs() {
    this._parentElement.querySelectorAll(".field__input").forEach((input) => {
      input.value = ""
    })

   this._parentElement.querySelectorAll(".error__message").forEach((el) => el.remove())
  }

  _addModalEvent(btn, modal) {
    btn.addEventListener("click", (e) => {
      modal.classList.toggle("hidden")
      this._overlay.classList.toggle("hidden")
    })
  }

  closeModal (modal) {
    modal.classList.toggle("hidden")
    this._overlay.classList.toggle("hidden")
  }

  renderError(selectorName ,input, errorMsg = this._errorMessage) {

    const errorMsgEl = this._parentElement.querySelector(`#${selectorName}_${input}`).nextElementSibling

    if (errorMsgEl?.textContent === errorMsg) {
      return
    }

    const errorMarkup = `<p class="error__message">${errorMsg}</p>`
    this._parentElement.querySelector(`#${selectorName}_${input}`).insertAdjacentHTML("afterend", errorMarkup)
  }

}

export default View;