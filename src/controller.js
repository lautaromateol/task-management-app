import * as model from "./model.js"
import addProjectView from "./views/addProjectView.js"
import projectsView from "./views/projectsView.js"

// const taskCard = document.querySelectorAll(".task__card")

// btnAddTask.addEventListener("click", () => {
//   toggleModal(".new__task--form")
// })

// newTaskForm.addEventListener("submit", (e) => {
//   e.preventDefault()
//   toggleModal(".new__task--form")
// })

// taskCard.forEach((el) => {
//   el.addEventListener("click", () => {
//     toggleModal(".task__description")
//   })
// })

const controlRenderProjects = () => {
  
  // 1. Get projects from localStorage 
  model.getProjects()

  if(!model.state.projects.length) return

  // 2. Render projects in dashboard
  projectsView.render(model.state.projects)

  // 3. Render projects quantity 
  projectsView.renderProjectsLength()
}

const controlAddProject = (modal) => {
  
  // 1. Get project title and description from form inputs
  const values = addProjectView.getValues()

  //2. Validate inputs
  if(model.state.projects.some((project) => project.title === values.title)) {
    addProjectView.renderError("title", "This project name is already used")
  } 

  if(!values.title) {
    addProjectView.renderError("title")
    return
  } 

  if(!values.description) {
    addProjectView.renderError("description")
    return 
  } 

  // 3. Clear inputs
  addProjectView.clearInputs()

  // 4. Create project and added it to the state of the application
  model.createProject(values)

  // 5. Close modal
  addProjectView.closeModal(modal)

  // 6. Update projects 
  projectsView.render(model.state.projects)
}

const init = () => {
  // model.clear()
  controlRenderProjects()
  addProjectView.addProjectHandler(controlAddProject)
}

init()