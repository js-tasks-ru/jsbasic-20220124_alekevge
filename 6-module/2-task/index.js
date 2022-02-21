export default class ProductCard {
  constructor(product) {
  this.elem=document.createElement("div")
  this.elem.classList.add("card")
  product.price=product.price.toFixed(2)
  this.elem.innerHTML=`
  <div class="card__top">
      <img src="/assets/images/products/${product.image}" class="card__image" alt="product">
      <span class="card__price">€${product.price}</span>
  </div>
  <div class="card__body">
      <div class="card__title">${product.name}</div>
      <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
  </div> `

   let btn=this.elem.getElementsByTagName("button")[0]
    btn.onclick=()=>{
        const readEvent = new CustomEvent('product-add', {
            detail: product.id, 
            bubbles: true 
        });

       this.elem.dispatchEvent(readEvent); 
    }
  }
}