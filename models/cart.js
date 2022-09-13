class GioHang {
  DSGH = [];

  createItem(product) {
    const cartItem = { product: product, quantity: 1 };
    return cartItem;
  }

  addToCart(product) {
    
    let item = this.createItem(product);
    console.log(product)
    const check = KiemTraTonTai(item.product.id, this.DSGH);

    console.log(check)
    if (check){
      this.DSGH.push(item)
    } else {
     this.DSGH = this.DSGH.map((item) =>{
      return item.product.id === product.id ? item = {product: item.product, quantity: item.quantity+1} : item
     })
    }
    
    // else console.log(item.quantity);
  }

  deleteCart(productId){
    this.DSGH = this.DSGH.filter((product) => product.id === productId )
  }
}
