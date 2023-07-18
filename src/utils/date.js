import moment from 'moment-timezone';

export function getDate(d) {
  const dateOrder = moment.utc(d).tz('Asia/Krasnoyarsk').format('DD.MM.YYYY_HH:mm');
  const date = dateOrder.split('_')[0];
  const time = dateOrder.split('_')[1];

  return { time, date };
}
