import moment from 'moment';

const d = new Date();

const morningHours = [d.setHours(9, 0), d.setHours(12, 0)];
const afternoonHours = [d.setHours(12, 0), d.setHours(15, 0)];

export const todayHourList = [
  new Date(moment(morningHours[0])),
  new Date(moment(morningHours[1])),
  new Date(moment(afternoonHours[0])),
  new Date(moment(afternoonHours[1])),
];

export const nextDayHourList = [
  new Date(moment(morningHours[0]).add(1, 'days')),
  new Date(moment(morningHours[1]).add(1, 'days')),
  new Date(moment(afternoonHours[0]).add(1, 'days')),
  new Date(moment(afternoonHours[1]).add(1, 'days')),
];

export const otherDayHourList = [
  new Date(moment(morningHours[0]).add(2, 'days')),
  new Date(moment(morningHours[1]).add(2, 'days')),
  new Date(moment(afternoonHours[0]).add(2, 'days')),
  new Date(moment(afternoonHours[1]).add(2, 'days')),
];
