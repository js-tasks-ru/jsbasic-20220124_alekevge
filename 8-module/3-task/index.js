export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    // ваш код
    if (product) 
    {
      let product_added = this.cartItems.find(x=>x.product.id==product.id)

      if (product_added) product_added.count++
      else this.cartItems.push({product,count:1})
    }
    this.onProductUpdate(product)
  }

  updateProductCount(productId, amount) {
    // ваш код
    let product_added = this.cartItems.find(x => x.product.id == productId)
    if (product_added) product_added.count += amount
    this.onProductUpdate(product_added)
  }

  isEmpty() {
    // ваш код
    let count = 0
    for (const product of this.cartItems) {
      count+=product.count      
    }
    return !count
  }

  getTotalCount() {
    // ваш код
    let totalCount = 0
    for (const product of this.cartItems) {
      totalCount+=product.count       
    }
    return totalCount
  }

  getTotalPrice() {
    // ваш код
    let totalprice = 0
    for (const product of this.cartItems) {
      totalprice+=(product.product.price*product.count)       
    }
    return totalprice
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

