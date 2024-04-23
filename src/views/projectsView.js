import View from "./View";
import { projectSvg } from "../../snippets/projectIcon";

class ProjectsView extends View {

  _parentElement = document.querySelector(".projects")

  _generateMarkup() {
    return this._data.map((project) => {
      return (
        `
        <a class="project" href="#${project.id}">
          <li>
            ${projectSvg}
            ${project.title}
         </li>
        </a>
      `
      )
    }).join("")
  }

  renderProjectsLength() {
    this._parentElement.closest(".projects__container").querySelector(".projects__quantity--text").textContent = `All projects (${this._data.length})`
  }
}

export default new ProjectsView()