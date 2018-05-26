import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';

export default class FBLoginButton extends React.Component{
  render(){
    return (
      <TouchableOpacity style={ styles.button_container }>
        <Button
          onPress={ this.props.login }
          icon={{name: 'facebook-square', type: 'font-awesome'}}
          title='Login With Facebook'
          buttonStyle={{
            backgroundColor: "#3B5998",
            borderRadius: 5
          }}/>
      </TouchableOpacity>
    );
  }
}

const styles =  StyleSheet.create({
  button_container: {
    marginTop: 8
  }
})
