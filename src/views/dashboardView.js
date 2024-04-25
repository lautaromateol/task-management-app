import View from "./View";

class DashBoardView extends View {

  _parentElement = document.querySelector(".admin__dashboard--panel")
  _hideDashboardBtn = this._parentElement.querySelector(".hide__nav--button")
  _showDashboardBtn = document.querySelector(".show__nav--button")
  _projectViewContainer = document.querySelector(".project__view")

  addHideDashboardHandler() {
    this._hideDashboardBtn.addEventListener("click", () => {
      this._parentElement.style.display = "none"
      this._showDashboardBtn.classList.remove("hidden")
    })
  }

  addShowDashboardHandler() {
    this._showDashboardBtn.addEventListener("click", () => {
      this._parentElement.style.display = "block"
      this._showDashboardBtn.classList.add("hidden")
    })
  }
}

export default new DashBoardView()