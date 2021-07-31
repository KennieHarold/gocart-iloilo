const parseDeliverySchedule = deliverySchedule => {
  switch (deliverySchedule) {
    case 'sameDay':
      return 'Same Day Delivery';

    case 'nextDay':
      return 'Next Day Delivery';

    default:
      throw new error('Delivery schedule not recognized');
  }
};

export default parseDeliverySchedule;
