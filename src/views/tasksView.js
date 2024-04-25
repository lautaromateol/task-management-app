import View from "./View";

class TasksView extends View {

  _parentElement = document.querySelector(".status__container")
  _modalElement = document.querySelector(".task__description")
  _projectTitle = document.querySelector(".project__nav--text")
  _buttonsContainer

  addModalIntersectionObserver(handler1, handler2) {

    const config = { childList: true, subtree: true }

    const callback = (mutationsList, observer) => {
      mutationsList.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
          const taskCards = this._parentElement.querySelectorAll('.task__card')
          this._buttonsContainer = document.querySelector(".buttons__container")
          if (taskCards) {
            taskCards.forEach((card) => {
              this._addModalEvent(card, this._modalElement)
              this._addDragEvent(card)
            })
          }
        }
      })
      this._addDropEvent(handler1)
      this._addDeleteBtnEvent(handler2)
    };

    const observer = new MutationObserver(callback)
    observer.observe(this._parentElement, config)
  }

  _addModalEvent(card, modal) {
    card.addEventListener("click", () => {
      modal.classList.remove("hidden")
      this._overlay.classList.remove("hidden")
    })
  }

  _addDragEvent(card) {
    card.setAttribute("draggable", "true")
    card.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData('text/plain', e.target.dataset.id)
    })
  }

  _addDropEvent(handler) {

    const containers = this._parentElement.querySelectorAll(".status")

    containers.forEach((container) => {
      container.addEventListener("dragover", (e) => {
        e.preventDefault()
      })

      container.addEventListener("drop", (e) => {
        const taskId = e.dataTransfer.getData("text/plain")

        const status = container.dataset.status

        const card = this._parentElement.querySelector(`.task__card[data-id="${taskId}"]`)

        container.querySelector(".task__card--container").appendChild(card)

        handler(window.location.hash.slice(1), taskId, status)
      })
    })
  }

  _generateMarkup() {

    const cardsMarkups = {}

    cardsMarkups.todo = this._data.map((task) => {
      return task.status === "todo" ?
        `<div data-id="${task.id}" class="task__card">
          <p>${task.title}</p>
          <span> ${task.subtasks.map(subtask => subtask.status === "complete" ? 1 : 0).reduce((a, b) => a + b, 0)} of ${task.subtasks.length} subtasks</span>
        </div>` : ""
    })

    cardsMarkups.doing = this._data.map((task) => {
      return task.status === "doing" ?
        `<div data-id="${task.id}" class="task__card">
          <p>${task.title}</p>
          <span> ${task.subtasks.map(subtask => subtask.status === "complete" ? 1 : 0).reduce((a, b) => a + b, 0)} of ${task.subtasks.length} subtasks</span>
        </div>` : ""
    })

    cardsMarkups.done = this._data.map((task) => {
      return task.status === "done" ?
        `<div data-id="${task.id}" class="task__card">
          <p>${task.title}</p>
          <span> ${task.subtasks.map(subtask => subtask.status === "complete" ? 1 : 0).reduce((a, b) => a + b, 0)} of ${task.subtasks.length} subtasks</span>
        </div>` : ""
    })

    const statusContainers = ["todo", "doing", "done"].map((status) => {
      return (
        `<div data-status="${status}" class="status">
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
      document.querySelector(".buttons__container").classList.remove("hidden")
      const title = handler(window.location.hash.slice(1))
      this._projectTitle.innerHTML = title
    }))
  }

  addRenderTaskInfoHandler(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const task__card = e.target.closest(".task__card")
      if (!task__card) return
      const id = task__card.dataset.id
      const parentId = window.location.hash.slice(1)
      handler(parentId, id)
    })
  }

  _addDeleteBtnEvent(handler2) {
    this._buttonsContainer.querySelector(".delete__project--button").addEventListener("click", () => {
      handler2(window.location.hash.slice(1))
      const cleanURL = window.location.protocol + "//" + window.location.host + window.location.pathname;
      window.history.replaceState({}, document.title, cleanURL);
      this._projectTitle.innerHTML = "Create a new project or select one to start working"
      this._buttonsContainer.classList.add("hidden")
      this._parentElement.classList.add("hidden")
    })
  }
}

export default new TasksView()