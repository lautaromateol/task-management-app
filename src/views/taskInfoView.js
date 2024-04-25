import View from "./View";
import { deleteIcon } from "../../snippets/deleteIcon"
import { cloneDeep } from "lodash";

class TaskInfoView extends View {

  _parentElement = document.querySelector(".task__description")
  _closeModalBtn

  addModalIntersectionObserver(handler1, handler2) {
    const callback = (mutationsList) => {
      mutationsList.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
          this._closeModalBtn = this._parentElement.querySelector(".close__modal")
          this._deleteTaskBtn = this._parentElement.querySelector(".delete__task")
          this._deleteTaskBtn.addEventListener("click", () => {
            handler2(window.location.hash.slice(1), this._data.id, this._parentElement)
          })
          this._addModalEvent(this._closeModalBtn, this._parentElement)
          this._checkCheckboxes()
          const checkboxes = this._parentElement.querySelectorAll(".subtask__checkbox")
          const spans = this._parentElement.querySelectorAll(".subtask__span")
          checkboxes.forEach((checkbox, i) => checkbox.addEventListener("change", () => {
            spans[i].classList.toggle("subtask__span--done")
            const newTask = cloneDeep(this._data)
            newTask.subtasks[i].status = newTask.subtasks[i].status === "complete" ? "incomplete" : "complete"
            handler1(newTask, window.location.hash.slice(1), newTask.id)
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
      <div>
      <button class="delete__task">${deleteIcon}</button>
      <button class="close__modal">X</button>
      </div>
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