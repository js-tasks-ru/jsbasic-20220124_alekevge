import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    // ... ваш код
    let response = await fetch("products.json")
    if (response.ok)  this.products = await response.json()
    else return

    this.renderElem("[data-carousel-holder]",Carousel,slides)
    this.ribbonMenu = this.renderElem("[data-ribbon-holder]",RibbonMenu,categories)
    this.stepSlider = this.renderElem("[data-slider-holder]",StepSlider,{steps:5, value :3})

    let cartIcon = this.renderElem("[data-cart-icon-holder]",CartIcon)
    this.cart = new Cart(cartIcon)
    
    let grid= document.querySelector('[data-products-grid-holder]')
    grid.innerHTML=""

    this.productsGrid= this.renderElem("[data-products-grid-holder]",ProductsGrid,this.products)

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    this.addEventListeners()
  }

  renderElem(selector,className,data)
  {
    let holder = document.querySelector(selector)
    let elem = new className(data)
    holder.appendChild(elem.elem)
    return elem
  }

  addEventListeners()
  {
    document.body.addEventListener("product-add", (event)=> {
      let product = this.products.find(x=>event.detail==x.id)
      if (product) this.cart.addProduct(product)
    });

    document.body.addEventListener('ribbon-select',(ev)=>{
      this.productsGrid.updateFilter({
        category: ev.detail 
      });
    })

    document.body.addEventListener('slider-change',(ev)=>{
      this.productsGrid.updateFilter({
        maxSpiciness: ev.detail 
      });
    })

    let nutsCheckbox = document.querySelector("#nuts-checkbox")
    nutsCheckbox.onchange = (ev) => { 
      this.productsGrid.updateFilter({
        noNuts: ev.target.checked 
      });
    }

    let vegeterianCheckbox = document.querySelector("#vegeterian-checkbox")
    vegeterianCheckbox.onchange = (ev) => { 
      this.productsGrid.updateFilter({
        vegeterianOnly: ev.target.checked 
      });
    }
  }
}
