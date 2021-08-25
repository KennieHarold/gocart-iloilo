const groupProductsByStoreComputer = (products, availableStores) => {
  let groupedProducts = {};

  products.forEach(product => {
    const storeId = product.storeId;
    const storeIndex = availableStores.findIndex(store => store.id === storeId);

    if (groupedProducts[storeId] !== undefined) {
      if (storeIndex !== -1) {
        groupedProducts[storeId].products = [
          ...groupedProducts[storeId].products,
          product,
        ];
      }
    } else {
      if (storeIndex !== -1) {
        groupedProducts[storeId] = {
          products: [product],
        };
      }
    }
  });

  return groupedProducts;
};

export default groupProductsByStoreComputer;
