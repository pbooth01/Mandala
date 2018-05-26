import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

class PostModalClose extends React.Component {

  render(){
    return (
      <TouchableOpacity style={styles.button_container}onPress={() => this.props.navigation.navigate('RootTabStackNavigator')}>
        <Ionicons name={'md-close-circle'} size={30} color={'#96F2A2'} />
      </TouchableOpacity>
    );
  }
}

export default withNavigation(PostModalClose);

const styles = StyleSheet.create({
  button_container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 35,
    backgroundColor: '#fff',
    borderRadius: 30
  }
});
