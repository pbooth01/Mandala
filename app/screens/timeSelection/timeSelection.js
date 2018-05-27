import React from 'react';
import { Alert, Button, DatePickerIOS, SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
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

    let startDateTime = TimeUtils.getNearestFutureTimeForInterval(15, new Date());
    let initialStartTime = props.navigation.getParam('startTime', startDateTime);
    let initialEndTime = props.navigation.getParam('endTime', null);

    this.state = {
      hasEndDate: initialStartTime && initialEndTime,
      curFocusedTime: 'start',
      accessedTime: new Date(),
      startDateTime: TimeUtils.getDateCopy(initialStartTime),
      endDateTime: initialEndTime ? TimeUtils.getDateCopy(initialEndTime) : null,
      minuteInterval: 5 /*workaround for date picker simulator issue*/
    }

    this._selectTime = this._selectTime.bind(this);
    this._cancelTimeSelection = this._cancelTimeSelection.bind(this);
  }

  componentWillMount(){
    this.props.navigation.setParams({
      selectTime: this._selectTime,
      cancelTimeSelection:  this._cancelTimeSelection
    });
  }

  componentDidMount(){
    this.setState({minuteInterval: 5});
  }

  static navigationOptions = ({ navigation }) => {
    const params  = navigation.state.params || {};
    return {
      headerTitle: 'Select Time',
      headerLeft: (
        <Button onPress={() => params.cancelTimeSelection()} title="Cancel"/>
      ),
      headerRight: (
        <Button onPress={() => params.selectTime()} title="Ok"/>
      ),
    }
  };

  _selectTime(){
    const updateTimeFunction = this.props.navigation.getParam('updateTimeSelection', null);
    if(updateTimeFunction && typeof updateTimeFunction === 'function'){
      updateTimeFunction(this.state.startDateTime, this.state.endDateTime);
      this.props.navigation.goBack();
    }else{
      Alert.alert('Error', 'An error occured saving your time');
    }
  }

  _cancelTimeSelection(){
    this.props.navigation.goBack();
  }

  updateDate(newDate){
    if(this.state.hasEndDate){

      let startDateMoment = moment(this.state.startDateTime);
      let endDateMoment = moment(this.state.endDateTime);

      if(this.state.curFocusedTime === 'start'){
        startDateMoment.year(newDate.year);
        startDateMoment.month(newDate.month - 1);
        startDateMoment.date(newDate.day);

        if(!startDateMoment.isAfter(endDateMoment, 'day')){
          if(startDateMoment.isSame(endDateMoment, 'day')){
            startDateMoment.hour(endDateMoment.hour());
            startDateMoment.minute(endDateMoment.minute());
          }
          this.setState({
            startDateTime: startDateMoment.toDate()
          });
        }
      }else{
        endDateMoment.year(newDate.year);
        endDateMoment.month(newDate.month - 1);
        endDateMoment.date(newDate.day);

        if(!endDateMoment.isBefore(startDateMoment, 'day')){
          if(endDateMoment.isSame(startDateMoment, 'day')){
            endDateMoment.hour(startDateMoment.hour());
            endDateMoment.minute(startDateMoment.minute());
          }
          this.setState({
            endDateTime: endDateMoment.toDate()
          });
        }
      }
    }else{
      let curDateMoment = moment(this.state.startDateTime);
      curDateMoment.year(newDate.year);
      curDateMoment.month(newDate.month - 1);
      curDateMoment.date(newDate.day);
      this.setState({
        startDateTime: curDateMoment.toDate()
      });
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
