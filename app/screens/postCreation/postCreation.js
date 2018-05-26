import React from 'react';
import { Button, SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import PostModalClose from '../../components/reactnavigator/modalNavigation/postModalClose.js';
import PostModalSend from '../../components/reactnavigator/modalNavigation/postModalSend.js';


class PostCreation extends React.Component {

  constructor(props){
    super(props);

    this.navigateToTimeSelection = this.navigateToTimeSelection.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      header: null
    }
  };

  navigateToTimeSelection(){
    console.log('Test');
    this.props.navigation.navigate('TimeSelectionScreen');
  }

  render(){
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <View style={styles.post_creation_view_wrapper}>

          <View style={styles.post_creation_header}>
            <PostModalClose />
            <PostModalSend />
          </View>

          <View style={styles.post_creation_input_wrapper}>

            <View style={styles.post_creation_title_wrapper}>
              <TextInput
                autoFocus={true}
                style={styles.post_creation_title_input}
                placeholder={'Name of Your Event'}
              />
            </View>

            <View>
              <TouchableOpacity style={styles.post_creation_time_wrapper} onPress={ this.navigateToTimeSelection }>
                <View style={styles.post_creation_time_label}>
                  <Ionicons name={'md-time'} size={30} color={'#96F2A2'} />
                </View>
                <Text style={styles.post_creation_time_input}>Time</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.post_creation_location_wrapper}>
              <View style={styles.post_creation_location_label}>
                <Icon name={'location-pin'} size={30} color={'#96F2A2'} />
              </View>
              <TextInput
                style={styles.post_creation_location_input}
                placeholder={'Place'}
              />
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
  post_creation_title_label:{
    width: 50,
    fontSize: 18
  },
  post_creation_title_input:{
    flex: 4,
    paddingLeft: 10,
    fontSize: 20
  },
  post_creation_time_wrapper:{
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  post_creation_time_label:{
    width: 50
  },
  post_creation_time_input:{
    flex: 4,
    fontSize: 18,
    color: '#C7C7CD'
  },
  post_creation_location_wrapper:{
    height: 50,
    flexDirection: 'row',
    alignItems: 'center'
  },
  post_creation_location_label:{
    width: 50
  },
  post_creation_location_input:{
    flex: 4,
    fontSize: 18
  },
  post_creation_comment_wrapper:{
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
