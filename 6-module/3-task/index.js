import createElement from '../../assets/lib/create-element.js';
import ProductCard  from '../2-task/index.js'

export class Slide
{
   constructor(slide)
   {
    this.slide = document.createElement("div")
    this.slide.classList.add("carousel__slide")
    this.slide.dataset['id'] = "penang-shrimp"

    this.slide.innerHTML = `
      <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${slide.price}"</span>
        <div class="carousel__title">${slide.name}"</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>`

      let btn = this.slide.getElementsByTagName("button")[0]
      let add_product = new CustomEvent("product-add", { // имя события должно быть именно "product-add"
                                                         detail: slide.id, // Уникальный идентификатора товара из объекта слайда
                                                         bubbles: true // это событие всплывает - это понадобится в дальнейшем
                                                        })

      btn.addEventListener("click",(ev)=>ev.target.closest('button').dispatchEvent(add_product))

      return this.slide
   }
}

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = document.createElement("div")

    this.elem.innerHTML=
    `<div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
     </div>
     <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
     </div>`

    this.elem.classList.add("carousel")
    this.carousel= document.createElement("div")
    this.carousel.classList.add("carousel__inner")


    this.slide_elems = []

    slides.forEach(el => {
      let slide = new Slide(el)
      this.carousel.appendChild(slide)
      this.slide_elems.push(slide)
    });

    this.elem.appendChild(this.carousel)
    this.btn_right = this.elem.querySelector('.carousel__arrow.carousel__arrow_right')
    this.btn_left = this.elem.querySelector('.carousel__arrow.carousel__arrow_left')




/// дальше взято из  задания 5-3 
    window.var=0;
 

    if (this.btn_right)
      this.btn_right.addEventListener("click",() => this.onclick(1))

    if (this.btn_left)
      this.btn_left.addEventListener("click",() => this.onclick(-1))

    this.tooggle_btns()
  }


  onclick(i)
  {
    window.var+=i
    if (window.var==this.slide_elems.length) window.var = 0
    if (window.var<0) window.var = this.slide_elems.length-1
     
    this.tooggle_btns()
    this.carousel.style.transform="translateX(-"+this.get_offset(window.var)+"px)";
  }

  isHide(el)
  {
    //нужно ли скрыть кнопку ?
    return (el===this.btn_right && window.var==this.slide_elems.length-1) ||
           (el===this.btn_left && window.var==0)
  }

  tooggle_btns()
  {
    //переключим все кнопки в нужное состояние показать/скрыть
    let btns=[this.btn_right,this.btn_left]
    btns.forEach((el)=>{if (this.isHide(el)) el.style.display = "none"
                        else el.style.display = ""
                      })
  }

  get_offset(slider)
  {
    //из всех слайдов берёт все что до текущего включительно
    //считает общее смещение если вдруг слайды разные по размерам (просто более общий вариант)
    let arr = [...this.slide_elems].slice(0,slider)
    return  arr.reduce((sum,el)=>{return sum = sum+el.offsetWidth},0)
  }
}
