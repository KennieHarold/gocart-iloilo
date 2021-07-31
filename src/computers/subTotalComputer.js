//  Computes the subtotal in the cart
const subTotalComputer = (cart, selectedStoreId) => {
  return cart.reduce((acc, item) => {
    const getRound = Math.round(item.product.price * item.quantity * 100) / 100;

    return acc + (item.storeId === selectedStoreId ? getRound : 0);
  }, 0);
};

export default subTotalComputer;
