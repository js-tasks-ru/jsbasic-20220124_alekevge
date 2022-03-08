import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
  
    this.elem=document.createElement("div")
    this.elem.classList.add("products-grid")
    this.elem.innerHTML=`<div class="products-grid__inner"></div>`
    this.inner= this.elem.querySelector(".products-grid__inner")

    for (const product of products) {
      const card = new ProductCard(product)
      this.inner.appendChild(card.elem)
    }
  }

  updateFilter(filters)
  {
    for (const key in filters) {
      this.filters[key]=filters[key]
    }

    let filter={}

    let list = this.products
    for (const filt in this.filters) {
      const value = this.filters[filt]
      switch (filt) {
        case "noNuts":
          if (value) list=list.filter(x=>x.nuts==false||x.nuts===undefined)      
          break;
        case "vegeterianOnly":
          if (value) list=list.filter(x=>x.vegeterian==true)     
          break
        case"maxSpiciness": list=list.filter(x=>x.spiciness<=value)
          break
        case"category": if (value) list=list.filter(x=>x.category==value)
          break 
        default:
          break;
      }
    }

    this.inner.innerHTML=""

    for (const product of list) {
      const card = new ProductCard(product)
      this.inner.appendChild(card.elem)
    } 
  }
}
