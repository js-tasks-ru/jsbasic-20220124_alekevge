import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    if (product) 
    {
      let product_added = this.cartItems.find(x=>x.product.id==product.id)

      if (product_added) this.onProductUpdate({product,count:product_added.count++})
      else 
      {
        this.cartItems.push({product,count:1})
        this.onProductUpdate({product,count:1})
      }
    }
  }

  updateProductCount(productId, amount) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let product_added = this.cartItems.find(x => x.product.id == productId)
    if (product_added) product_added.count += amount
    this.onProductUpdate(product_added)
  }

  isEmpty() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let count = 0
    for (const product of this.cartItems) {
      count+=product.count      
    }
    return !count
  }

  getTotalCount() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let totalCount = 0
    for (const product of this.cartItems) {
      totalCount+=product.count       
    }
    return totalCount
  }

  getTotalPrice() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let totalprice = 0
    for (const product of this.cartItems) {
      totalprice+=(product.product.price*product.count)       
    }
    return totalprice
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderList()
  {
    let list = document.createElement("div")
    for (const el of this.cartItems)
    {
      if (el.count==0) continue
      let card = this.renderProduct(el.product, el.count)
      let minusBtn = card.querySelector(".cart-counter__button_minus")
      let plusBtn = card.querySelector(".cart-counter__button_plus")

      if (minusBtn) minusBtn.onclick =()=> this.updateProductCount(card.dataset['productId'],-1)
      if (plusBtn) plusBtn.onclick=()=> this.updateProductCount(card.dataset['productId'],1)
      list.appendChild(card)
    }
    this.form = this.renderOrderForm()
    list.appendChild(this.form)
    
    this.form.addEventListener("submit",this.onSubmit.bind(this))
    return list
  }

  renderModal() {
    // ...ваш код
    this.modal = new Modal()
    this.modal.setTitle("Your order")
    this.modal.setBody(this.renderList())
    this.modal.open()
  }

  onProductUpdate(cartItem) {
    // ...ваш код
   if (this.modal) 
   {
     if (this.isEmpty()) this.modal.close()
     
     let card = this.modal.elem.querySelector(`[data-product-id=${cartItem.product.id}]`)
     if (card)
     {
        if (cartItem.count==0) card.remove()
        let count = card.querySelector(".cart-counter__count")
        count.textContent=cartItem.count
        let price = card.querySelector(".cart-product__price")
        price.textContent ="€"+(cartItem.product.price*cartItem.count).toFixed(2)
      }
    }
    
    if (this.form)
    {
      let total = this.form.querySelector(".cart-buttons__info-price")
      if (total) total.textContent="€"+this.getTotalPrice().toFixed(2)
    }   
  
   this.cartIcon.update(this);
  }

  onSubmit(event) {
    // ...ваш код
    let data = new FormData(this.form)
    let options = {method: "POST",
                     body: data}

    fetch('https://httpbin.org/post',options).then(this.responseHandler.bind(this))
    event.preventDefault()
  };

   responseHandler(response)
   {
    if (response.ok)
    {
      this.modal.setTitle("Success!")
      let msg = document.createElement("div")
      msg.classList.add("modal__body-inner")
      msg.innerHTML=`
    
      <p>
        Order successful! Your order is being cooked :) <br>
        We’ll notify you about delivery time shortly.<br>
        <img src="/assets/images/delivery.gif">
      </p>

   `
   this.modal.setBody(msg)
      this.cartItems = []
    }
   }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

