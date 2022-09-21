class GioHang {
  constructor(){
    this.DSGH = []
  }

  createItem(product) {
    const cartItem = {
      product: product,
      quantity: 1
    };
    return cartItem;
  }

  getCart(){
    return this.DSGH;
  }

  addToCart(product) {

    let item = this.createItem(product);
    console.log(product)
    const check = KiemTraTonTai(item.product.id, this.DSGH);

    if (check) {
      this.DSGH.push(item)
    } else {
      this.DSGH = this.DSGH.map((item) => {
        return item.product.id === product.id ? item = {
          product: item.product,
          quantity: item.quantity + 1
        } : item
      })
    }
  }

  minusItem(product) {
    // let item = this.createItem(product);
    this.DSGH = this.DSGH.map((item) => {
      return item.product.id === product.id && item.quantity !== 0 ? item = {
        product: item.product,
        quantity: item.quantity - 1
      } 
      :
      item;
      ;
      
    })
  }

  deleteItemCart(productId) {
    this.DSGH = this.DSGH.filter((item) => {
      return item.product.id !== productId;
    })
  }

  calcTotalItem(){
    return this.GioHang.reduce((result, item)=>{
      return result + item.quantity;
    }, 0);
  }

  calcTotalPrice(){
    return this.GioHang.reduce((result, item)=>{
      return result + item.calcPrice();
    },0);
  }


  calcPrice(){
    return + this.product.price * this.quantity;
  }

  clearCart(){
    this.GioHang = [];
  }

}

