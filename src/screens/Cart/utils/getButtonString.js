import {todayHourList, nextDayHourList, otherDayHourList} from './rawHourList';
import moment from 'moment';

const getButtonString = type => {
  let startHour = undefined;
  let endHour = undefined;

  switch (type) {
    case 'todayMorning':
      startHour = moment(todayHourList[0]).format('LT');
      endHour = moment(todayHourList[1]).format('LT');

      return `${startHour} - ${endHour}`;

    case 'todayAfternoon':
      startHour = moment(todayHourList[2]).format('LT');
      endHour = moment(todayHourList[3]).format('LT');

      return `${startHour} - ${endHour}`;

    case 'nextDayMorning':
      startHour = moment(nextDayHourList[0]).format('LT');
      endHour = moment(nextDayHourList[2]).format('LT');

      return `${startHour} - ${endHour}`;

    case 'nextDayAfternoon':
      startHour = moment(nextDayHourList[2]).format('LT');
      endHour = moment(nextDayHourList[3]).format('LT');

      return `${startHour} - ${endHour}`;

    case 'otherDayMorning':
      startHour = moment(otherDayHourList[0]).format('LT');
      endHour = moment(otherDayHourList[1]).format('LT');

      return `${startHour} - ${endHour}`;

    case 'otherDayAfternoon':
      startHour = moment(otherDayHourList[2]).format('LT');
      endHour = moment(otherDayHourList[3]).format('LT');

      return `${startHour} - ${endHour}`;

    default:
      throw new Error('Type not recognized');
  }
};

export default getButtonString;
