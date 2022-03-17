export default function promiseClick(button) {
  // ваш код...
  let promise = new Promise(resolve=>{ button.onclick = (ev) => resolve(ev)})
  return promise
}
