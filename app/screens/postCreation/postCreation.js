import React from 'react';
import { Button, SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import RNGooglePlaces from 'react-native-google-places';

import PostModalClose from '../../components/reactnavigator/modalNavigation/postModalClose.js';
import PostModalSend from '../../components/reactnavigator/modalNavigation/postModalSend.js';
import TimeUtils from '../../api/timeUtils/timeUtils.js';

const RemoveLocation = (props) => {
  return(
    <View>
      <TouchableOpacity onPress={ props.removeLocation }>
        <IconIonicons name={'md-close'} size={25} color={'#96F2A2'}/>
      </TouchableOpacity>
    </View>
  )
}

class PostCreation extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      title: null,
      startTime: TimeUtils.getNearestFutureTimeForInterval(15, new Date()),
      endTime: null,
      location: {},
      details: null
    }

    this.navigateToTimeSelection = this.navigateToTimeSelection.bind(this);
    this.updateTimeState = this.updateTimeState.bind(this);
    this.removeLocation = this.removeLocation.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      header: null
    }
  };

  canSendEvent(){
    return (
      this.state.details !== null &&
      this.state.details.length >= 1 &&
      this.state.startTime !== null
    );
  }

  navigateToTimeSelection(){
    this.props.navigation.navigate('TimeSelectionScreen', {
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      updateTimeSelection: this.updateTimeState
    });
  }

  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
    .then((place) => {
		  console.log(place);
		  this.setState({
        location: {
          address: place.address,
          name: place.name,
          phoneNumber: place.phoneNumber,
          website: place.website,
          placeID: place.placeID,
          coordinates: {
            latitude: place.latitude,
            longtitude: place.longtitude
          }
        }
      })
    })
    .catch(error => console.log(error.message));  // error is a Javascript Error object
  }

  updateTimeState(startTime, endTime){
    this.setState({
      startTime,
      endTime
    });
  }

  removeLocation(){
    this.setState({
      location: null
    })
  }

  renderTimeSelection(){
    let startTimeString = TimeUtils.prettyPrintMonthDayTime(this.state.startTime);
    const startDisplay = (<Text style={styles.post_creation_time_input}>Starts: {startTimeString}</Text>);
    let endDisplay = null;

    if(this.state.endTime !== null){
        let endTimeString = TimeUtils.prettyPrintMonthDayTime(this.state.endTime);
        endDisplay = (<Text style={styles.post_creation_time_input}>Ends: {endTimeString}</Text>);
    }

    return (
      <View style={{flex: 4, flexDirection: 'column', alignItems: 'stretch'}}>
        {startDisplay}
        {endDisplay}
      </View>
    );
  }

  renderLocationSelection(){
    const hasLocation = (this.state.location && this.state.location.address);

    let locationString = 'Location';
    let style = styles.post_creation_location_input_empty_text;

    if(hasLocation){
      locationString = this.state.location.address;
      style = styles.post_creation_location_input_filled_text;
    }

    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={style}>{locationString}</Text>
        {hasLocation ? <RemoveLocation removeLocation={this.removeLocation}/> : null}
      </View>
    );
  }

  render(){
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <View style={styles.post_creation_view_wrapper}>
          <View style={styles.post_creation_header}>
            <PostModalClose />
            <PostModalSend canSend={this.canSendEvent()}/>
          </View>
          <View style={styles.post_creation_input_wrapper}>
            <View style={styles.post_creation_title_wrapper}>
              <TextInput
                autoFocus={true}
                value={this.state.title}
                onChangeText={(title) => this.setState({title})}
                style={styles.post_creation_title_input}
                placeholder={'Name of Your Event'}
              />
            </View>
            <View>
              <TouchableOpacity style={styles.post_creation_time_wrapper} onPress={ this.navigateToTimeSelection }>
                <View style={styles.post_creation_time_label}>
                  <IconIonicons name={'md-time'} size={30} color={'#96F2A2'} />
                </View>
                {this.renderTimeSelection()}
              </TouchableOpacity>
            </View>
            <View style={styles.post_creation_location_wrapper}>
              <View style={styles.post_creation_location_label}>
                <IconEntypo name={'location-pin'} size={30} color={'#96F2A2'} />
              </View>
              <TouchableOpacity
                style={styles.post_creation_location_input}
                onPress={() => this.openSearchModal()}
              >
                {this.renderLocationSelection()}
              </TouchableOpacity>
            </View>
            <View style={styles.post_creation_comment_wrapper}>
              <View style={styles.post_creation_comment_label}>
                <Avatar
                  width={32}
                  height={32}
                  rounded
                  source={{uri: this.props.user.photoURL}}
                  activeOpacity={0.7}
                />
              </View>
              <View style={{flex: 4}}>
                <TextInput
                  value = { this.state.details }
                  onChangeText={(details) => this.setState({details})}
                  style={styles.post_creation_comment_input}
                  placeholder={"What's Happening?"}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default withNavigation(connect(mapStateToProps)(PostCreation));


const styles = StyleSheet.create({
  post_creation_view_wrapper:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  post_creation_input_wrapper: {
    padding: 10
  },
  post_creation_header:{
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: '#FFFFFF'
  },

  post_creation_title_wrapper:{
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#96F2A2',
    borderWidth: 2,
    borderRadius: 10,
  },
  post_creation_title_input:{
    flex: 4,
    paddingLeft: 10,
    fontSize: 22
  },
  post_creation_time_wrapper:{
    height: 50,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  post_creation_time_label:{
    width: 50
  },
  post_creation_time_input:{
    fontSize: 18,
    paddingTop: 1
  },
  post_creation_location_wrapper:{
    height: 50,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  post_creation_location_label:{
    width: 50
  },
  post_creation_location_input:{
    flex: 4
  },
  post_creation_location_input_filled_text:{
    fontSize: 16
  },
  post_creation_location_input_empty_text:{
    fontSize: 18,
    color: '#C7C7CD'
  },
  post_creation_comment_wrapper:{
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  post_creation_comment_label:{
    width: 50
  },
  post_creation_comment_input:{
    flex: 1,
    fontSize: 18
  }
});
