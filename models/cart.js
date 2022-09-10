class GioHang {
  DSGH = [];
  createItem(product) {
    const cartItem = { product: product, quantity: 1 };
    return cartItem;
  }
  addToCart(product) {
    const checkValidation = new Validation();
    const item = this.createItem(product);
    const check = checkValidation.KiemTraTonTai(item.product.id, this.DSGH);
    if (check) this.DSGH.push(item);
    // else console.log(item.quantity);
  }
}
