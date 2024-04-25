import * as model from "./model.js"
import addProjectView from "./views/addProjectView.js"
import projectsView from "./views/projectsView.js"
import addTaskView from "./views/addTaskView.js"
import tasksView from "./views/tasksView.js"
import taskInfoView from "./views/taskInfoView.js"
import dashboardView from "./views/dashboardView.js"

// btnAddTask.addEventListener("click", () => {
//   toggleModal(".new__task--form")
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
  if(model.state.projects.some((el) => el.title === values.title)) {
    addProjectView.renderError("project", "title", "This project name is already used")
  } 

  if(!values.title) {
    addProjectView.renderError("project", "title")
    return
  } 

  if(!values.description) {
    addProjectView.renderError("project", "description")
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

  // 7. Update projects length at dashboard
  projectsView.renderProjectsLength()
}

const controlAddTask = (modal) => {
  
   // 1. Get project title, description, status and tasks from form inputs
   const {parentId, title, description, status, subtasks} = addTaskView.getValues()

   //2. Validate inputs 
   if(!title) {
     addTaskView.renderError("task", "title")
     return
   } 

   if (model.state.projects[model.state.projects.findIndex((el) => el.id === parentId)].tasks.find((el) => el.title === title)) {
    addTaskView.renderError("task", "title", "This task name is already used")
    return
   }
 
   if(!description) {
     addTaskView.renderError("task", "description")
     return 
   } 

   if(!status) {
    addTaskView.renderError("task", "status")
    return 
  } 
 
   // 3. Clear inputs
   addTaskView.clearInputs()
 
   // 4. Create task and added it to it corresponding project
   const newTasks = model.createTask({
    parentId: model.state.projects.find((el) => el.id === parentId).id,
    title,
    description,
    subtasks,
    status
   })
 
   // 5. Close modal
   addTaskView.closeModal(modal)
 
   // 6. Update tasks 
   tasksView.render(newTasks)

   return true
  }

const controlRenderTasks = (hash) => {

  // 1. Get tasks using hash
  const tasks = model.getTasks(hash)

  // 2. Render tasks on layout
  tasksView.render(tasks)

  // 3. Get projects
  const project = model.getProject(hash)

  return project.title
}

const controlOpenTaskDescription = (parentId, id) => {

  // 1. Get task by parentId and name
  const task = model.getTask(parentId, id)
  
  // 2. Render task description
  taskInfoView.render(task)
}

const controlChangeSubTaskStatus = (newTask, parentId, id) => {

  model.changeSubTaskStatus(newTask, parentId)

  const tasks = model.getTasks(parentId)

  const task = model.getTask(parentId, id)

  tasksView.render(tasks)

  taskInfoView.render(task)
}

const controlDeleteTask = (parentId, taskId, modal) => {
  
  model.deleteTask(parentId, taskId)

  taskInfoView.closeModal(modal)

  const tasks = model.getTasks(parentId)

  tasksView.render(tasks)
}

const controlChangeTaskStatus = (parentId, taskId, newStatus) => {

  model.changeTaskStatus(parentId, taskId, newStatus)

  const tasks = model.getTasks(parentId)

  tasksView.render(tasks)
}

const controlDeleteProject = (projectId) => {

  model.deleteProject(projectId)

  projectsView.render(model.state.projects)

  projectsView.renderProjectsLength()
}

const init = () => {
  // model.clear()
  controlRenderProjects()
  dashboardView.addHideDashboardHandler()
  dashboardView.addShowDashboardHandler()
  addProjectView.addProjectHandler(controlAddProject)
  addTaskView.addTaskHandler(controlAddTask)
  tasksView.addRenderTasksHandler(controlRenderTasks)
  tasksView.addRenderTaskInfoHandler(controlOpenTaskDescription)
  tasksView.addModalIntersectionObserver(controlChangeTaskStatus, controlDeleteProject)
  taskInfoView.addModalIntersectionObserver(controlChangeSubTaskStatus, controlDeleteTask)
}

init()