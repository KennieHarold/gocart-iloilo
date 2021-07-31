//  Categorized the products by its corresponding stores in the cart
const categorizedCartComputer = (cart, availableStores) => {
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

export default categorizedCartComputer;
