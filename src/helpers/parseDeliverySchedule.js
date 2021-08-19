import moment from 'moment';

const checkDateObject = date => {
  if (date._seconds) {
    return date._seconds * 1000;
  }

  return date;
};

const parseDeliverySchedule = deliverySchedule => {
  if (deliverySchedule[0] === undefined && deliverySchedule[1] === undefined) {
    return 'Click here to set delivery schedule';
  }

  const date = moment(checkDateObject(deliverySchedule[0])).format('dddd');
  const startHour = moment(checkDateObject(deliverySchedule[0])).format('LT');
  const endHour = moment(checkDateObject(deliverySchedule[1])).format('LT');

  return `${date}, ${startHour} - ${endHour}`;
};

export default parseDeliverySchedule;
