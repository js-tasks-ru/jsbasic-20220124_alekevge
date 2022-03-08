import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
    this.elem.style.position="fixed"
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    // ваш код ...
    let container = document.querySelectorAll(".container")[0]
    let rect = container.getBoundingClientRect()
    let document_rect = document.documentElement.getBoundingClientRect()
    if (window.document.documentElement.clientWidth>797) 
    {
      if ((rect.right+this.elem.offsetWidth+20) >=(document_rect.right-10) )
      {
        this.elem.style.left = document_rect.right - this.elem.offsetWidth - 10 + "px"
      }
      else
      {
        this.elem.style.left = Math.round(rect.right) + 20 + "px"
      }
    }
  }
}
