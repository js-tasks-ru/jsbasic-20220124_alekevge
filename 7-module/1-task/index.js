import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this.elem=document.createElement("div")
    this.elem.classList.add("ribbon")

    this.addButton("ribbon__arrow_left")

    this.nav = document.createElement("nav")
    this.nav.classList.add("ribbon__inner")
    
    for (let i = 0; i < categories.length; i++) {
      let  el = this.createMenuElem(categories[i])

      if (i==0) el.classList.add("ribbon__item_active")
      this.nav.appendChild(el)
    }

    this.elem.appendChild(this.nav)
    this.addButton("ribbon__arrow_right").classList.add("ribbon__arrow_visible")
    this.addScroll()
  }

  createMenuElem(el)
  {
    let menu_el
    menu_el=document.createElement("a")
    menu_el.classList.add("ribbon__item")

    let select_event = new CustomEvent('ribbon-select', { // имя события должно быть именно 'ribbon-select'
                                                          detail: el.id, // уникальный идентификатора категории из её объекта
                                                          bubbles: true // это событие всплывает - это понадобится в дальнейшем
                                                        })
    menu_el.addEventListener("click",(ev)=>{ev.target.closest('a').dispatchEvent(select_event)})
    menu_el.dataset['id']=el['id']
    menu_el.textContent=el.name
    menu_el.href="#"
    return menu_el
  }

  addButton(className)
  {
    let btn = document.createElement("button")
    btn.innerHTML = '<img src="/assets/images/icons/angle-icon.svg" alt="icon"></img>'
    btn.classList.add("ribbon__arrow",className)

    this.elem.appendChild(btn)
    return btn
  }

  addScroll()
  {
    let btns=this.elem.getElementsByTagName("button")

    for (const btn of btns) {
      let dx
      dx = (btn.classList.contains("ribbon__arrow_right") ? 350 : -350)

      btn.addEventListener("click",(ev)=>{this.nav.scrollBy(dx,0)})
    }

    this.nav.addEventListener("scroll",this.tooggle.bind(this));
  }

  tooggle()
  {
    
    let left_btn=this.elem.querySelector(".ribbon__arrow_left")
    let right_btn=this.elem.querySelector(".ribbon__arrow_right")
    this.changeVisibility(this.nav.scrollLeft,left_btn)

    let scrollWidth = this.nav.scrollWidth;
    let scrollLeft = this.nav.scrollLeft;
    let clientWidth = this.nav.clientWidth;
    
    let scrollRight = scrollWidth - scrollLeft - clientWidth; 
    this.changeVisibility(scrollRight,right_btn)

  }

  changeVisibility(scroll_dx,btn)
  {
    if (scroll_dx<1)
    btn.classList.remove("ribbon__arrow_visible")
    else btn.classList.add("ribbon__arrow_visible")
  }
}
