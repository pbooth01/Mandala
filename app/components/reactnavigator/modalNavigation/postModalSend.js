import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

class PostModalSend extends React.Component {

  render(){
    return (
        <Button
          rounded={true}
          buttonStyle={styles.button_style}
          textStyle={styles.button_text_style}
          title={"Post"}
        />
    );
  }
}

export default withNavigation(PostModalSend);

const styles = StyleSheet.create({
  button_style: {
    backgroundColor: '#96F2A2',
    marginLeft: -15,
    marginRight: -10,
    width: 75,
    height: 40
  },
  button_text_style: {
    color: '#FFFFFF'
  }
});
