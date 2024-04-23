import View from "./View";

class TasksView extends View {

  _parentElement = document.querySelector(".tasks__container")
  _modalElement = document.querySelector(".task__description")

  constructor() {
    super()

    const config = { childList: true, subtree: true }

    const callback = (mutationsList, observer) => {
      mutationsList.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
          const taskCards = this._parentElement.querySelectorAll('.task__card')
          if (taskCards) {
            taskCards.forEach((card) => {
              this._addModalEvent(card, this._modalElement)
            })
          }
        }
      })
    };

    const observer = new MutationObserver(callback)
    observer.observe(this._parentElement, config)
  }

  _generateMarkup() {

    const cardsMarkups = {}

    cardsMarkups.todo = this._data.map((task) => {
      return task.status === "todo" ?
        `<div data-id="${task.id}" class="task__card">
          <p>${task.title}</p>
          <span>${task.subtasks.length} subtasks</span>
        </div>` : ""
    })

    cardsMarkups.doing = this._data.map((task) => {
      return task.status === "doing" ?
        `<div data-id="${task.id}" class="task__card">
          <p>${task.title}</p>
          <span>${task.subtasks.length} subtasks</span>
        </div>` : ""
    })

    cardsMarkups.done = this._data.map((task) => {
      return task.status === "done" ?
        `<div data-id="${task.id}" class="task__card">
          <p>${task.title}</p>
          <span>${task.subtasks.length} subtasks</span>
        </div>` : ""
    })

    const statusContainers = ["todo", "doing", "done"].map((status) => {
      return (
        `<div data-status="todo" class="status">
          <p class="status__title">${status.toUpperCase()} (${this._data.filter((task) => task.status === status).length})</p>
          <div class="task__card--container">
            ${cardsMarkups[status].join("")}
          </div>
        </div>`
      )
    })

    return statusContainers.join("")
  }

  addRenderTasksHandler(handler) {
    ["hashchange", "load"].forEach((ev) => window.addEventListener(ev, (e) => {
      if (!window.location.hash) return

      this._parentElement.classList.remove("hidden")
      handler(window.location.hash.slice(1))
    }))
  }

  addRenderTaskInfoHandler(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const task__card = e.target.closest(".task__card")
      if(!task__card) return
      const id = task__card.dataset.id
      const parentId = window.location.hash.slice(1)
      handler(parentId, id)
    })
  }
}

export default new TasksView()