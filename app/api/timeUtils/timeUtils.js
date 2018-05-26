import moment from 'moment';

export default {
  getNearestFutureTimeForInterval(interval, timeToModify){
    const oldTimeMoment = moment(timeToModify);
    const remainder = interval - (oldTimeMoment.minute() % interval);
    const updatedTime = moment(oldTimeMoment).add(remainder, "minutes");

    return updatedTime.toDate();
  },
  /*Returns a copied date with a new reference*/
  getDateCopy(date){
    const dateMoment = moment(date);
    return dateMoment.toDate();
  },
  prettyPrintMonthDayTime(date){
    const dateMoment = moment(date);
    return dateMoment.format("MMMM Do YYYY, h:mm a");
  }
}
