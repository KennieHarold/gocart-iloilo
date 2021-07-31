const groupProductsByStoreComputer = products => {
  let groupedProducts = {};

  products.forEach(product => {
    const storeId = product.storeId;

    if (groupedProducts[storeId] !== undefined) {
      groupedProducts[storeId].products = [
        ...groupedProducts[storeId].products,
        product,
      ];
    } else {
      groupedProducts[storeId] = {
        products: [product],
      };
    }
  });

  return groupedProducts;
};

export default groupProductsByStoreComputer;
