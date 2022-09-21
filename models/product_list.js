class DanhSachSanPham {
  DSSP = [];
  addProduct(product) {
    this.DSSP = [...product];
  }
  selectProduct = "all";
  filterProduct() {
    return this.DSSP.filter((ele) => {
      if (this.selectProduct === "all") return true;
      if (this.selectProduct === ele.type) return true;
      return false;
    });
  }
}
