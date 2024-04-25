export const state = {
  projects: []
}

export const getProjects = () => {
  const projects = window.localStorage.getItem("projects")

  if(projects) state.projects = JSON.parse(projects)
}

export const getProject = (projectId) => {
  const project = state.projects.find((el) => el.id === projectId)

  return project
}

export const projectPersistance = () => {
  window.localStorage.setItem("projects", JSON.stringify(state.projects))
}

export const clear = () => {
  window.localStorage.clear()
}

export const createProject = ({ title, description, tasks }) => {

  const project = {
    id: String(Date.now()),
    title,
    description,
    tasks
  }

  state.projects.push(project)

  projectPersistance()
}

export const createTask = ({ parentId, title, description, subtasks, status }) => {

  const task = {
    id: String(Date.now()),
    title,
    description,
    subtasks,
    status
  }

  const projectIndex = state.projects.findIndex((el) => el.id === parentId)

  if (state.projects[projectIndex].tasks.find((el) => el.title === title)) return

  state.projects[projectIndex].tasks.push(task)

  projectPersistance()

  return state.projects[projectIndex].tasks

}

export const getTasks = (hash) => {

  const project = state.projects.find((el) => el.id === hash)

  return project?.tasks

}

export const getTask = (parentId, id) => {

  const project = state.projects.find((el) => el.id === parentId)

  const task = project.tasks.find((task) => task.id === id)

  return task
}

export const changeSubTaskStatus = (newTask, parentId) => {

  const project = state.projects.find((el) => el.id === parentId)

  if (!project) return

  if (newTask.subtasks.every((el) => el.status === "complete")) newTask.status = "done"
    
  else if (newTask.subtasks.some((el) => el.status === "complete")) newTask.status = "doing"
  
  else newTask.status = "todo"

  const newTasksArr = project.tasks.map((el) => el.id === newTask.id ? newTask : el)

  project.tasks = newTasksArr

  projectPersistance()
}

export const deleteTask = (parentId, taskId) => {

  const project = state.projects.find((el) => el.id === parentId)

  if (!project) return

  const newTasks = project.tasks.filter((task) => task.id !== taskId)

  project.tasks = newTasks

  projectPersistance()
}

export const changeTaskStatus = (parentId, taskId, newStatus) => {

  const project = state.projects.find((el) => el.id === parentId)

  if (!project) return

  const newTasksArr = project.tasks.map((task) => task.id === taskId ? { ...task, status: newStatus } : task)

  console.log(newStatus)

  project.tasks = newTasksArr

  projectPersistance()
}

export const deleteProject = (projectId) => {

  const newProjectsArr = state.projects.filter((project) => project.id !== projectId)

  state.projects = newProjectsArr

  projectPersistance()
}