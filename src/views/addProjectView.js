import View from "./View";

class AddProjectView extends View {

  _parentElement = document.querySelector(".new__project--form")
  _newProjectBtn = document.querySelector(".new__project--button")
  _closeModalBtn = this._parentElement.querySelector(".close__modal")

  constructor() {
    super()
    this._addModalEvent(this._newProjectBtn, this._parentElement)
    this._addModalEvent(this._closeModalBtn, this._parentElement)
  }
  
  getValues(){

    const title = this._parentElement.querySelector("#project_title").value

    const description = this._parentElement.querySelector("#project_description").value

    return {
      title,
      description,
      tasks: []
    }

  }

  addProjectHandler(handler) {

    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault()
      handler(this._parentElement)
    })
  }
}

export default new AddProjectView()