import marked from "marked"

let data = ""
let checkWords = []
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
  document.body.addEventListener("keyup", onKeyUpOutput, true)
  data = window.localStorage.getItem("data") ?? ""
  checkWords.splice(0, checkWords.length, ...JSON.parse(window.localStorage.getItem("checkWords") ?? "[]"))
  input.value = data
  update()
  updateCheckWords()
}

function onInput (event) {
  data = event.target.value
  window.localStorage.setItem("data", data)
  update()
  updateCheckWords()
}

function toggleOverlay () {
  overlayDisplay = !overlayDisplay
  document.body.setAttribute("data-overlay-display", overlayDisplay)
}

function toggleInput () {
  inputDisplay = !inputDisplay
  document.body.setAttribute("data-input-display", inputDisplay)
}

let currentEm = undefined

function onMouseEnterOutput (event) {
  if (event.target.tagName === "EM") {
    currentEm = event.target
    event.target.style.color = "rgb(255, 128, 128)"
  }
}

function onMouseLeaveOutput (event) {
  if (event.target.tagName === "EM") {
    currentEm = undefined
    event.target.style.color = null
  }
}

function onKeyUpOutput (event) {
  if (currentEm == null) {
    return
  }
  if (event.key !== "Shift") {
    return
  }
  const index = checkWords.indexOf(currentEm.innerText)
  if (index === - 1) {
    checkWords.push(currentEm.innerText)
  } else {
    checkWords.splice(index, 1)
  }
  window.localStorage.setItem("checkWords", JSON.stringify(checkWords))
  updateCheckWords()
}

function update () {
  const output = document.body.querySelector(".output")
  output.innerHTML = marked.parse(data)
}

function updateCheckWords () {
  const ems = document.querySelectorAll(".output em")
  Array.from(ems).forEach((em) => {
    const checked = checkWords.includes(em.innerText)
    em.setAttribute("data-checked", checked)
  })
}

main()
