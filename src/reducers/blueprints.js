export const USER = {
  id: '',
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  address: [],
  dateCreated: new Date(),
  dateUpdated: new Date(),
  provider: '',
  isEmailVerified: '',
  photoUrl: '',
  phone: {
    isVerified: false,
    code: '',
    number: '',
  },
};

export const ADDRESS = {
  latitude: 0,
  longitude: 0,
  formattedAddress: '',
  detailedAddress: '',
  noteToRider: '',
};

export const DELIVERY_SCHEDULES = ['sameDay', 'nextDay'];

export const PAYMENT_METHOD = ['cashOnDelivery'];

export const ORDER_STATUS = ['processing', 'fetched', 'delivered', 'cancelled'];

export const TRANSACTION_STATUS = ['pending', 'cancelled', 'paid'];

export const CART = {
  id: '',
  storeId: '',
  productId: '',
  quantity: 1,
  dateCreated: new Date(),
  dateUpdated: new Date(),
  userId: '',
  isRemoved: false,
};

export const ORDER = {
  id: '',
  reference: '',
  transactionId: '',
  userId: '',
  storeId: '',
  items: [],
  dateCreated: new Date(),
  status: 'processing',
  deliverySchedule: '',
  expectedDeliveryTime: null,
  deliveredAt: null,
  cancelledAt: null,
  riderAlias: '',
  contact: {
    code: '+63',
    number: '',
  },
  deliveryAddress: {
    ...ADDRESS,
  },
};

export const TRANSACTION = {
  id: '',
  paymentDetails: {
    method: '',
    cardDetails: null,
    shoppingFee: 0,
    deliveryFee: 0,
    subTotal: 0,
    totalPayment: 0,
    discount: 0,
    additionalFee: 0,
  },
  transactionDate: new Date(),
  datePaid: null,
  status: 'pending',
};
