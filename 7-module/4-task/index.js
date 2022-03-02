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

    this.thumb = this.elem.querySelector('.slider__thumb');
    this.progress = this.elem.querySelector('.slider__progress');
    this.slider_steps=this.elem.querySelector(".slider__steps")
    for (let i = 0; i < steps; i++) {
      const elem = document.createElement("span")
      if (value==i) elem.classList.add("slider__step-active")
      this.slider_steps.appendChild(elem)
    }
  
    this.addDragAndDrop()
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

setLabel(value)
{
  let slider_elems = this.slider_steps.querySelectorAll("span")

  for (let i = 0; i < this.steps; i++) {
    const el = slider_elems[i];
    if (i==value) el.classList.add("slider__step-active")
    else el.classList.remove("slider__step-active") 
  }
  this.value=value
}

setValue(value)
{
  this.setLabel(value)
  let leftPercents = Math.round(this.value/(this.steps-1) *100);

  this.thumb.style.left = `${leftPercents}%`;
  this.progress.style.width = `${leftPercents}%`;
  this.elem.querySelector(".slider__value").textContent = this.value

  let ev = new CustomEvent('slider-change', { 
                                              detail: this.value,
                                              bubbles: true // событие всплывает - это понадобится в дальнейшем
                                            })
  this.elem.dispatchEvent(ev)
}

addDragAndDrop()
{
  this.thumb.addEventListener("pointerdown",()=>{this.tooggleDragAndDrop(1)})
  document.addEventListener("pointerup",(ev)=>{this.slide(ev);this.tooggleDragAndDrop(0)})
}

tooggleDragAndDrop(key)
{
  this.thumb.ondragstart = () => false;

  if (key) 
  {
    this.elem.classList.add("slider_dragging")
    document.onpointermove=(ev)=> this.moving(ev)
    return 
  }
  
  document.onpointermove = null
  this.elem.classList.remove("slider_dragging")
}

moving(events)
{
  let elem_rect = this.elem.getBoundingClientRect()
  let offsetX = events.clientX-elem_rect.left
  let width = elem_rect.width
  let leftPercents = Math.round(offsetX / width *100)  
  let value =  Math.round(offsetX / (width/(this.steps-1)))
  
  this.thumb.style.left = `${leftPercents}%`;
  this.progress.style.width = `${leftPercents}%`;
  this.elem.querySelector(".slider__value").textContent = value
}

addDragAndDrop123()
{
  /* 
  1) Тест тут падает на строке     this.thumb.setPointerCapture(event.pointerId);
  Uncaught NotFoundError: Failed to execute 'setPointerCapture' on 'Element': No active pointer with the given id is found. thrown
  2) как тут работают тут события непонятно 
  по моей идее:  ползунок должен двигаться по нажатию на него и до тех пор пока не отпустим мышку поскольку привязались к событию к onpointerdown
  по факту: ползунок прилипает к указателю когда проводишь рядом не кликая 
  */
  this.thumb.ondragstart = () => false;
  
  this.thumb.onpointerdown = (event)=> {
    this.thumb.setPointerCapture(event.pointerId);
  };

  this.thumb.onpointerup = (event)=> {
    this.thumb.releasePointerCapture(event.pointerId);
  };

  this.thumb.onpointermove = (event) =>{
    this.moving(event)
  };
}
}
