import View from "./View";

class TaskInfoView extends View {

  _parentElement = document.querySelector(".task__description")
  _closeModalBtn

  addModalIntersectionObserver(handler) {
    const callback = (mutationsList) => {
      mutationsList.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
          this._closeModalBtn = this._parentElement.querySelector(".close__modal")
          this._addModalEvent(this._closeModalBtn, this._parentElement)
          this._checkCheckboxes()
          const checkboxes = this._parentElement.querySelectorAll(".subtask__checkbox")
          const spans = this._parentElement.querySelectorAll(".subtask__span")
          checkboxes.forEach((checkbox, i) => checkbox.addEventListener("change", () => {
            spans[i].classList.toggle("subtask__span--done")
            const newTask = this._data
            newTask.subtasks[i].status = newTask.subtasks[i].status === "complete" ? "incomplete" : "complete"
            handler(newTask, window.location.hash.slice(1))
          }))
        }
      });
    };

    const observer = new MutationObserver(callback);
    observer.observe(this._parentElement, { childList: true, subtree: true });

  }

  _generateMarkup() {

    const subtasksMarkup = this._data.subtasks.map((subtask) => {
      return `
        <div class="subtask--checkbox">
          <input class="subtask__checkbox" type="checkbox">
          <span class="subtask__span ${subtask.status === "complete" && "subtask__span--done"}">${subtask.title}</span>
        </div>
      `
    })

    return `
      <button class="close__modal">X</button>
      <p class="modal__title">
        ${this._data.title}
      </p>
      <p class="task__description--description">
        ${this._data.description}  
      </p>
      <div class="task__description--subtasks">
        ${subtasksMarkup.join("")}
      </div>`
  }

  _checkCheckboxes() {
    const checkboxes = this._parentElement.querySelectorAll(".subtask__checkbox")
    const subtasks = this._data.subtasks

    checkboxes.forEach((checkbox, i) => {
      if (subtasks[i].status === "complete") {
        checkbox.checked = true
      }
    })
  }

}

export default new TaskInfoView()