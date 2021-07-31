//  Computes the subtotal in the cart
export const subTotalComputer = (cart, selectedStoreId) => {
  return cart.reduce((acc, item) => {
    const getRound = Math.round(item.product.price * item.quantity * 100) / 100;

    return acc + (item.storeId === selectedStoreId ? getRound : 0);
  }, 0);
};

//  Categorized the products by its corresponding stores in the cart
export const categorizedCartComputer = (cart, availableStores) => {
  let categorizedCart = {};

  cart.forEach(product => {
    let index = availableStores.findIndex(
      store => store.id === product.storeId,
    );

    let storeName = availableStores[index].name;
    let storeId = availableStores[index].id;

    if (categorizedCart[storeId] !== undefined) {
      let oldProductsList = categorizedCart[storeId].products;
      categorizedCart[storeId].products = [...oldProductsList, product];
    } else {
      categorizedCart[storeId] = {
        storeId,
        storeName,
        products: [product],
      };
    }
  });
  return categorizedCart;
};
