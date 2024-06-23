import marked from "marked"

let data = ""
let overlayDisplay = true
let inputDisplay = false

function main () {
  const input = document.body.querySelector(".input")
  input.addEventListener("input", onInput)
  const overlayToggle = document.body.querySelector(".overlay-toggle")
  overlayToggle.addEventListener("click", toggleOverlay)
  const inputToggle = document.body.querySelector(".input-toggle")
  inputToggle.addEventListener("click", toggleInput)
  const output = document.body.querySelector(".output")
  output.addEventListener("mouseenter", onMouseEnterOutput, true)
  output.addEventListener("mouseleave", onMouseLeaveOutput, true)
  data = window.localStorage.getItem("data") ?? ""
  input.value = data
  update()
}

function onInput (event) {
  data = event.target.value
  window.localStorage.setItem("data", data)
  update()
}

function toggleOverlay () {
  overlayDisplay = !overlayDisplay
  document.body.setAttribute("data-overlay-display", overlayDisplay)
}

function toggleInput () {
  inputDisplay = !inputDisplay
  document.body.setAttribute("data-input-display", inputDisplay)
}

function onMouseEnterOutput (event) {
  if (event.target.tagName === "EM") {
    event.target.style.color = "rgb(255, 128, 128)"
  }
}

function onMouseLeaveOutput (event) {
  if (event.target.tagName === "EM") {
    event.target.style.color = null
  }
}

function update () {
  const output = document.body.querySelector(".output")
  output.innerHTML = marked.parse(data)
}

main()
