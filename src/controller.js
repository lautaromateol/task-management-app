const btnAddTask = document.querySelector(".add__task--button")
const newTaskForm = document.querySelector(".new__task--form")
const taskCard = document.querySelectorAll(".task__card")
const closeModal = document.querySelector(".close__modal")

const toggleModal = (modal) => {
  document.querySelector(".overlay").classList.toggle("hidden")
  document.querySelector(modal).classList.toggle("hidden")
}

taskCard.forEach((el) => {
  el.addEventListener("click", () => {
    toggleModal(".task__description")
  })
})

closeModal.addEventListener("click", () => {
  toggleModal(".task__description")
})

btnAddTask.addEventListener("click", () => {
  toggleModal(".new__task--form")
})

newTaskForm.addEventListener("submit", (e) => {
  e.preventDefault()
  toggleModal(".new__task--form")
})