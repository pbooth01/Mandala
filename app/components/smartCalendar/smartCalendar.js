import React from 'react';
import { StyleSheet } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import moment from 'moment';

const controlSelectStyle = {
  customStyles: {
    container: {
      backgroundColor: '#96F2A2',
    },
    text: {
      color: '#ffffff',
      fontWeight: 'bold'
    }
  }
}

const nonControlSelectStyle = {
  customStyles: {
    container: {
      backgroundColor: '#d2f9d7',
    }
  },
}

export default class SmartCalendar extends React.Component {

  constructor(props){
    super(props);
  }

  datePressed(date){
    if(date){
      this.props.updateDate(date);
    }
  }

  getMinimumDate(){
    return new Date();
  }

  getMarkedDates(){
    let markedDays = {};
    const startStyle = this.props.curFocusedTime === 'start' ? controlSelectStyle : nonControlSelectStyle;
    const endStyle = this.props.curFocusedTime === 'end' ? controlSelectStyle : nonControlSelectStyle;
    const startMoment = moment(this.props.startDate);
    markedDays[startMoment.format('YYYY-MM-DD')] = Object.assign({}, startStyle);

    if(this.props.endDate){
      const endMoment = moment(this.props.endDate);
      const differenceDuration = moment.duration(endMoment.diff(startMoment));
      const lengthInDays = Math.floor(differenceDuration.asDays());

      for(let i = 0; i < lengthInDays; i++){
        let tempMoment = moment(this.props.startDate);
        tempMoment.add(i+1, 'days');
        markedDays[tempMoment.format('YYYY-MM-DD')] = Object.assign({}, nonControlSelectStyle);
      }

      if(startMoment.isSame(endMoment,'day')){
        markedDays[startMoment.format('YYYY-MM-DD')] = Object.assign({}, controlSelectStyle);
      }else{
        markedDays[endMoment.format('YYYY-MM-DD')] = Object.assign({}, endStyle);
      }
    }
    return markedDays;
  }

  render(){
    return (
      <CalendarList
        minDate={this.getMinimumDate()}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => { this.datePressed(day) }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => { this.datePressed(day) }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'MMM yyyy'}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {console.log('month changed', month)}}
        // Hide month navigation arrows. Default = false
        hideArrows={false}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={true}
        // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        disableMonthChange={true}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
        firstDay={1}
        // Hide day names. Default = false
        hideDayNames={false}
        // Show week numbers to the left. Default = false
        showWeekNumbers={true}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={substractMonth => substractMonth()}
        // Handler which gets executed when press arrow icon left. It receive a callback can go next month
        onPressArrowRight={addMonth => addMonth()}

        markedDates={this.getMarkedDates()}

        markingType={ 'custom' }
      />
    );
  }
}

const styles = StyleSheet.create({

});
