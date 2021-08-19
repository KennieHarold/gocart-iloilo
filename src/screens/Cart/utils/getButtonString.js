import {
  todayHourList,
  nextDayHourList,
  otherDayHourList,
} from './utils/rawHourList';

const getButtonString = type => {
  switch (type) {
    case 'todayMorning':
      const startHour = moment(todayHourList[0]).format('LT');
      const endHour = moment(todayHourList[1]).format('LT');

      return `${startHour} - ${endHour}`;

    case 'todayAfternoon':
      const startHour = moment(todayHourList[2]).format('LT');
      const endHour = moment(todayHourList[3]).format('LT');

      return `${startHour} - ${endHour}`;

    case 'nextDayMorning':
      const startHour = moment(nextDayHourList[0]).format('LT');
      const endHour = moment(nextDayHourList[2]).format('LT');

      return `${startHour} - ${endHour}`;

    case 'nextDayAfternoon':
      const startHour = moment(nextDayHourList[2]).format('LT');
      const endHour = moment(nextDayHourList[3]).format('LT');

      return `${startHour} - ${endHour}`;

    case 'otherDayMorning':
      const startHour = moment(otherDayHourList[0]).format('LT');
      const endHour = moment(otherDayHourList[1]).format('LT');

      return `${startHour} - ${endHour}`;

    case 'otherDayAfternoon':
      const startHour = moment(otherDayHourList[2]).format('LT');
      const endHour = moment(otherDayHourList[3]).format('LT');

      return `${startHour} - ${endHour}`;

    default:
      throw new Error('Type not recognized');
  }
};

export default getButtonString;
