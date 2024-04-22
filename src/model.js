export const state = {
  projects: []
}

export const getProjects = () => {
 const projects = window.localStorage.getItem("projects")

 if(projects) state.projects = JSON.parse(projects)
}

export const projectPersistance = () => {
  window.localStorage.setItem("projects", JSON.stringify(state.projects))
}

export const clear = () => {
  window.localStorage.clear()
}

export const createProject = ({title, description, tasks}) => {

  const project = {
    title,
    description,
    tasks
  }

  state.projects.push(project)

  projectPersistance()
}