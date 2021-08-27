const validateProduct = item => {
  if (isNaN(item.price)) {
    return false;
  }

  const urlRe = /(http|https):\/\/[\S]*\.(png|jpg|jpeg)/;
  if (!urlRe.test(item.photoUri)) {
    return false;
  }

  return true;
};

export default validateProduct;
