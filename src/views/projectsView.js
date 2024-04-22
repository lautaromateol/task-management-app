import View from "./View";
import { projectSvg } from "../../snippets/projectIcon";

class ProjectsView extends View {

  _parentElement = document.querySelector(".projects")

  _generateMarkup() {
    return this._data.map((project) => {
      return (
        `
        <li class="project">
          <a href="#${project.title.toLowerCase().replace(/\s/g, "-")}">
          ${projectSvg}
          ${project.title}
          </a>
        </li>
      `
      )
    }).join("")
  }

  renderProjectsLength() {
    this._parentElement.closest(".projects__container").querySelector(".projects__quantity--text").textContent = `All projects (${this._data.length})`
  }
}

export default new ProjectsView()