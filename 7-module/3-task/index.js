export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps=steps
    this.value=value
    this.elem=document.createElement("div")
    this.elem.classList.add("slider")
    this.elem.innerHTML=`
               
                        <div class="slider__thumb" style="left: 50%;">
                          <span class="slider__value">2</span>
                        </div>

                        <div class="slider__progress" style="width: 50%;"></div>

                        <div class="slider__steps">
                        </div>
                   `
    this.slider_steps=this.elem.querySelector(".slider__steps")
    for (let i = 0; i < steps; i++) {
      const elem = document.createElement("span")
      if (value==i) elem.classList.add("slider__step-active")
      this.slider_steps.appendChild(elem)
     
    }
    
    this.elem.addEventListener("click",(ev)=>this.slide(ev) )
}


slide(ev)
{
  let elem_rect = this.elem.getBoundingClientRect()
  let offsetX = ev.pageX-elem_rect.left
  let width = elem_rect.width
  let value =  Math.round(offsetX / (width/(this.steps-1)))

  if (value!=this.value) this.setValue(value)
}

setValue(value)
{
  let slider_elems = this.slider_steps.querySelectorAll("span")

  for (let i = 0; i < this.steps; i++) {
    const el = slider_elems[i];
    if (i==value) el.classList.add("slider__step-active")
    else el.classList.remove("slider__step-active") 
  }
  this.value=value


  let thumb = this.elem.querySelector('.slider__thumb');
  let progress = this.elem.querySelector('.slider__progress');


  let leftPercents = Math.round(this.value/(this.steps-1) *100) ; // Значение в процентах от 0 до 100

  thumb.style.left = `${leftPercents}%`;
  progress.style.width = `${leftPercents}%`;
  this.elem.querySelector(".slider__value").textContent = this.value


  let ev = new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
  detail: this.value, // значение 0, 1, 2, 3, 4
  bubbles: true // событие всплывает - это понадобится в дальнейшем
  })
  this.elem.dispatchEvent(ev)

}
}
