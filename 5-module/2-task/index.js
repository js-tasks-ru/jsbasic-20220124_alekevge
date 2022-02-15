function toggleText() {
  // ваш код...
  let btn = document.querySelector(".toggle-text-button")
  let text = document.querySelector("#text")
  if (btn && text)
    btn.addEventListener("click",() => text.hidden = !text.hidden)
}
