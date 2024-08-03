import moment from 'moment';

export const getDataStringFromTimestamp = (timestamp: number) => {
  return moment(timestamp).format('DD.MM.YYYY');
};
