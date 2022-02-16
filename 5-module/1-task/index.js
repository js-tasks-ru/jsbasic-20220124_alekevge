function hideSelf() {
  // ваш код...
  let btn = document.querySelector(".hide-self-button")
  if (btn)
    btn.addEventListener("click",(ev) => ev.currentTarget.hidden = true)
}
