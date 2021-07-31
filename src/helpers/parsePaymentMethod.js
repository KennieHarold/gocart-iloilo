const parsePaymentMethod = paymentMethod => {
  switch (paymentMethod) {
    case 'cashOnDelivery':
      return 'Cash On Delivery';

    default:
      throw new error('Payment method not recognized');
  }
};

export default parsePaymentMethod;
