import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

class PostModalOpen extends React.Component {

  render(){
    return (
      <TouchableOpacity style={styles.button_container}onPress={() => this.props.navigation.navigate('PostEventModal')}>
        <View>
          <Ionicons name={'ios-brush'} size={35} color={'#fff'} />
        </View>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(PostModalOpen);

const styles = StyleSheet.create({
  button_container: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
    backgroundColor: '#96F2A2',
    borderRadius: 30
  }
});
