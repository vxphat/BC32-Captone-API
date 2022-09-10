class Validation {
  KiemTraTonTai = (valueID, data) => {
    let isStatus = true;
    data.forEach((total, item) => {
      if (total.product.id === valueID) isStatus = false;
    });
    return isStatus;
  };
}
