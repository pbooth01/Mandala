import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Spinner from 'react-native-spinkit';
import { Provider } from 'react-redux';
import store from '../../redux/store/createStore.js';

export default class Startup extends React.Component {
  render(){
    return(
      <View style={styles.loading_container}>
        <Spinner isVisible={true} size={130} type={'Bounce'} color={'#ffffff'}/>
        <Text style={styles.loading_text}>Mandala</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#96F2A2',
  },
  loading_text: {
    fontSize: 50,
    color: '#ffffff'
  }
});
