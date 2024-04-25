import View from "./View";

class AddTaskView extends View {

  _parentElement = document.querySelector(".new__task--form")
  _newTaskBtn = document.querySelector(".new__task--button")
  _closeModalBtn = this._parentElement.querySelector(".close__modal")
  _inputs

  constructor() {
    super()
    this._addModalEvent(this._newTaskBtn, this._parentElement)
    this._addModalEvent(this._closeModalBtn, this._parentElement)

    this._addSubtaskInput()

    this._parentElement.addEventListener("input", (event) => {
      this._inputs = this._parentElement.querySelectorAll(".subtask__input")
      this._parentElement.querySelectorAll(".error__message").forEach((el) => el.remove())
      const lastInput = this._inputs[this._inputs.length - 1];
      if (event.target === lastInput && lastInput.value.trim() !== "") {
        this._addSubtaskInput();
      }
    });
  }

  getValues() {

    const parentId = window.location.hash.slice(1);
    const title = this._parentElement.querySelector("#task_title").value;
    const description = this._parentElement.querySelector("#task_description").value;
    const status = this._parentElement.querySelector("#task_status").value;
    const subtasksArr = Array.from(this._inputs).filter(input => input.value.trim());
    const subtasks = subtasksArr.map((input) => {
      return { title: input.value, status: "incomplete" }
    })

    return {
      parentId,
      title,
      description,
      subtasks: subtasks.length ? subtasks : [],
      status,
    };

  }

  _addSubtaskInput() {
    const container = this._parentElement.querySelector("#subtasks_container");
    const inputButtonContainer = document.createElement("div")
    const input = document.createElement("input");
    const deleteBtn = document.createElement("button");

    inputButtonContainer.classList.add("input--button")
    input.classList.add("field__input", "mb-xs", "subtask__input");
    input.type = "text";
    input.placeholder = "Enter subtask";
    inputButtonContainer.appendChild(input);

    deleteBtn.classList.add("delete__button")
    deleteBtn.innerHTML = "X";
    deleteBtn.addEventListener("click", () => {
      inputButtonContainer.remove()
    })
    if (this._inputs?.length !== 0) inputButtonContainer.appendChild(deleteBtn);

    container.appendChild(inputButtonContainer);
  }

  addTaskHandler(handler) {
    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault()
      const deleteInputs = handler(this._parentElement);

      if(!deleteInputs) return 
      
      const inputButtonContainers = this._parentElement.querySelectorAll(".input--button")
      inputButtonContainers.forEach((container, i) => i !== 0 && container.remove())
    })
  }
}

export default new AddTaskView()
