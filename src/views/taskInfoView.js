import View from "./View";

class TaskInfoView extends View {

  _parentElement = document.querySelector(".task__description")
  _closeModalBtn

  constructor() {
    super()

    const config = { childList: true, subtree: true }

    const callback = (mutationsList, observer) => {
      mutationsList.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
          this._closeModalBtn = this._parentElement.querySelector(".close__modal")
          this._addModalEvent(this._closeModalBtn, this._parentElement)
        }
      })
    };

    const observer = new MutationObserver(callback)
    observer.observe(this._parentElement, config)
  }

  _generateMarkup() {
    return `
      <button class="close__modal">X</button>
      <p class="modal__title">
        ${this._data.title}
      </p>
      <p class="task__description--description">
        ${this._data.description}  
      </p>
      <div class="task__description--subtasks">
        <div></div>
        <div></div>
      </div>`
    //   <div class="modal__field">
    //     <label for="status" class="modal__field--title">Status</label>
    //     <select class="field__input" id="status">
    //      <option value="todo">Todo</option>
    //      <option value="doing">Doing</option>
    //      <option value="done">Done</option>
    //     </select>
    //  </div>
  }
}

export default new TaskInfoView()