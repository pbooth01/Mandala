import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';

export class SaeUsernameInput extends React.Component {

  render(){

    const { meta: { touched, error, warning }, input: { onChange, ...restInput }} = this.props;

    return (
      <View style={styles.login_item_container}>
        <Sae
          label={'Username'}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'white'}
          // TextInput props
          onChangeText={onChange}
          {...restInput}
          autoCapitalize={'none'}
          autoCorrect={false}
          labelStyle={{color: '#ffffff'}}
          borderRadius={10}
        />
        {touched && ((error && <Text style={styles.login_item_error} >*{error}</Text>))}
      </View>
    );
  }
}

export class SaeEmailInput extends React.Component {

  render(){

    const { meta: { touched, error, warning }, input: { onChange, ...restInput }} = this.props;

    return (
      <View style={styles.login_item_container}>
        <Sae
          label={'Email Address'}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'white'}
          // TextInput props
          onChangeText={onChange}
          {...restInput}
          autoCapitalize={'none'}
          autoCorrect={false}
          labelStyle={{color: '#ffffff'}}
          borderRadius={10}
        />
        {touched && ((error && <Text style={styles.login_item_error} >*{error}</Text>))}
      </View>
    );
  }
}

export class SaePasswordInput extends React.Component {

  render(){

    const { meta: { touched, error, warning }, input: { onChange, ...restInput }} = this.props;

    return (
      <View style={styles.login_item_container}>
        <Sae
          label={'Password'}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'white'}
          // TextInput props
          onChangeText={onChange}
          {...restInput}
          autoCapitalize={'none'}
          autoCorrect={false}
          secureTextEntry={true}
          labelStyle={{color: '#ffffff'}}
          borderRadius={10}
        />
        {touched && ((error && <Text style={styles.login_item_error} >*{error}</Text>))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  login_item_container: {
    alignItems: 'stretch',
    marginBottom: 10
  },
  login_item_error: {
    color: '#ff0000',
    fontSize: 15
  }
});
