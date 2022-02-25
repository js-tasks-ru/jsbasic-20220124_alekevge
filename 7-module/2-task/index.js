import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem=document.createElement("div")
    this.elem.classList.add("modal")
    this.render()
 

    this.title = this.elem.querySelector(".modal__title")
    this.body = this.elem.querySelector(".modal__body")
    this.addEvents()
  }

  render()
  {
    this.elem.innerHTML =`  <div class="modal__overlay"></div>
                            <div class="modal__inner">
                              
                              <div class="modal__header">
                                <!--Кнопка закрытия модального окна-->
                                <button type="button" class="modal__close">
                                  <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
                                </button>
                                <h3 class="modal__title">
                                </h3>
                              </div>

                              <div class="modal__body">
     
                              </div> 
                            </div>`
  }
  setTitle(title)
  {
    this.title.textContent = title
  }

  setBody(body)
  {
    this.body.innerHTML=""
    this.body.appendChild(body)
  }

  open()
  {
    document.body.classList.add("is-modal-open")
    document.body.appendChild(this.elem)
  }

  close()
  {
    this.elem.remove()
    document.body.classList.remove("is-modal-open")
  }

  addEvents()
  {
    document.addEventListener("keydown",(ev)=>{if (ev.code=="Escape")this.close()})
    let btn = this.elem.querySelector(".modal__close")
    btn.addEventListener("click",()=>this.close())
  }
}
