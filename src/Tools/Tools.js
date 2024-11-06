import moment from "moment";
import 'moment/locale/fr';

export const formatDate = (date) => {
  return moment(date).local('fr').format('DD MMMM YYYY')
}
export const formatTime = (date) => {
  return moment(date).format('HH:mm');
}
export const formatDateAndTime = (date) => {
  return moment(date).local('fr').format('DD MMMM YYYY HH:mm')
}