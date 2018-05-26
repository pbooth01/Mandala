import React from 'react';
import { Button, DatePickerIOS, SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';
import moment from 'moment';
import SmartCalendar from '../../components/smartCalendar/smartCalendar.js';
import TimeUtils from '../../api/timeUtils/timeUtils.js';

const AddEndTime = (props) => {
  return(
    <View>
      <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={ props.addEndDateTime }>
        <Icon name={'ios-add'} size={20} />
        <Text style={{fontSize: 14}}>End Time</Text>
      </TouchableOpacity>
    </View>
  )
}

const RemoveEndTime = (props) => {
  return(
    <View>
      <TouchableOpacity onPress={ props.removeEndDateTime }>
        <Icon name={'md-close'} size={25} color={'#96F2A2'}/>
      </TouchableOpacity>
    </View>
  )
}

export default class TimeSelection extends React.Component {

  constructor(props){
    super(props);

    const startDateTime = TimeUtils.getNearestFutureTimeForInterval(15, new Date());

    this.state = {
      hasEndDate: false,
      curFocusedTime: 'start',
      accessedTime: new Date(),
      startDateTime: startDateTime,
      endDateTime: null,
      minuteInterval: 5 /*workaround for date picker simulator issue*/
    }
  }

  componentDidMount(){
    this.setState({minuteInterval: 5});
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      headerTitle: 'Select Time'
    }
  };

  updateDate(newDate){
    if(this.state.curFocusedTime === 'start'){
      let curDateMoment = moment(this.state.startDateTime);
      curDateMoment.year(newDate.year);
      curDateMoment.month(newDate.month - 1);
      curDateMoment.date(newDate.day);
      if(this.state.hasEndDate){
        if(!curDateMoment.isAfter(this.state.endDateTime) && !curDateMoment.isSame(this.state.endDateTime)){
          this.setState({
            startDateTime: curDateMoment.toDate()
          });
        }
      }else{
        this.setState({
          startDateTime: curDateMoment.toDate()
        });
      }
    }else{
      let curDateMoment = moment(this.state.endDateTime);
      curDateMoment.year(newDate.year);
      curDateMoment.month(newDate.month - 1);
      curDateMoment.date(newDate.day);
      if(!curDateMoment.isBefore(this.state.startDateTime) && !curDateMoment.isSame(this.state.startDateTime)){
        this.setState({
          endDateTime: curDateMoment.toDate()
        });
      }
    }
  }

  updateTime(newTime){
    if(this.state.curFocusedTime === 'start'){
      this.setState({
        startDateTime: newTime
      });
    }else{
      this.setState({
        endDateTime: newTime
      });
    }
  }

  removeEndDateTime(){

    this.setState({
        curFocusedTime: 'start'
    }, () => {
      this.setState({
        hasEndDate: false,
        endDateTime: null
      });
    });
  }

  addEndDateTime(){

    const endDateTime = TimeUtils.getDateCopy(this.state.startDateTime);
    const endDateTimeMoment = moment(endDateTime).add(1, 'day').startOf('day');

    this.setState({
      hasEndDate: true,
      endDateTime: endDateTimeMoment.toDate(),
      curFocusedTime: 'end'
    });
  }

  getCurrentFocusedTime(){
    return this.state.curFocusedTime === 'start' ? this.state.startDateTime : this.state.endDateTime;
  }

  getMinimumDate(){
    return this.state.curFocusedTime === 'start' ? this.state.accessedTime : this.state.startDateTime;
  }

  updateAccessedTime(){
    this.setState({
      accessedTime: new Date()
    })
  }

  setfocusState(newFocusState){
    this.setState({
      curFocusedTime: newFocusState
    });
  }

  renderStartTimeSection(time){

    const endObj = (<AddEndTime addEndDateTime={() => this.addEndDateTime()}/>);
    const style = this.state.curFocusedTime === 'start' ? styles.time_text_section_text_active : styles.time_text_section_text_inactive;

    if(time){
      return (
        <TouchableOpacity onPress={() => this.setfocusState('start')} style={styles.time_text_section}>
          <Text style={style}>{ TimeUtils.prettyPrintMonthDayTime(time) }</Text>
          {!this.state.hasEndDate ? endObj : null}
        </TouchableOpacity>
      )
    }
    return null
  }

  renderEndTimeSection(time){

    const endObj = (<RemoveEndTime removeEndDateTime={() => this.removeEndDateTime()}/>);
    const style = this.state.curFocusedTime !== 'start' ? styles.time_text_section_text_active : styles.time_text_section_text_inactive;

    if(time){
      return (
        <TouchableOpacity onPress={() => this.setfocusState('end')} style={styles.time_text_section}>
          <Text style={style}>{ TimeUtils.prettyPrintMonthDayTime(time) }</Text>
          {endObj}
        </TouchableOpacity>
      )
    }
    return null
  }

  render(){
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <View style={styles.screen_wrapper}>

          <View style={styles.time_text_section_wrapper}>
            {this.renderStartTimeSection(this.state.startDateTime)}
            {this.renderEndTimeSection(this.state.endDateTime)}
          </View>

          <View style={styles.calendar_section_wrapper}>
            <SmartCalendar
              hasEndDate = {this.state.hasEndDate}
              curFocusedTime = {this.state.curFocusedTime}
              startDate={this.state.startDateTime}
              endDate={this.state.endDateTime}
              updateDate={(newDate) => this.updateDate(newDate)}
            />
          </View>

          <View style={styles.time_section_wrapper}>
            <DatePickerIOS
              date={this.getCurrentFocusedTime()}
              mode={'time'}
              minimumDate={this.getMinimumDate()}
              minuteInterval={this.state.minuteInterval}
              onDateChange={(newDate) => this.updateTime(newDate)}
            />
          </View>

        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen_wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  time_text_section_wrapper: {
    flex: .80,
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  time_text_section: {
    padding: 10,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: .5,
    backgroundColor: '#ffffff'
  },
  time_text_section_text_inactive: {
    fontSize: 18,
    color: '#C7C7CD'
  },
  time_text_section_text_active: {
    fontSize: 18,
    color: '#96F2A2',
    fontWeight: 'bold'
  },
  calendar_section_wrapper: {
    flex: 3,
  },
  time_section_wrapper: {
    flex: 2,
    paddingBottom: 2
  }
});
