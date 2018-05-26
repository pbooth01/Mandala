import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SaeUsernameInput, SaeEmailInput, SaePasswordInput } from './signupInputs.js';
import { Field, reduxForm } from 'redux-form';
import { email, maxLength, minLength, required } from './fieldLevelValidation.js';

class SignupForm extends React.Component {

  constructor(props) {
    super(props);
  }

  submit = (values) => {
    debugger;
    const userObject = {
      username: values.username,
      email: values.email,
      password: values.password,
    }
    this.props.createNewUser(userObject);
  }

  render() {

    const { handleSubmit } = this.props;

    return (
      <View style={styles.login_form_container}>
        <Field
          name='username'
          validate={[required, maxLength(15), minLength(3)]}
          component={ SaeUsernameInput }>
        </Field>
        <Field
          name='email'
          validate={[required, email]}
          component={ SaeEmailInput }>
        </Field>
        <Field
          name='password'
          validate={[required, maxLength(15), minLength(6)]}
          component={ SaePasswordInput }>
        </Field>
        <TouchableOpacity
          onPress={handleSubmit(this.submit)}
          style={styles.login_submit_button}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default reduxForm({
  form: 'signup'
})(SignupForm)

const styles = StyleSheet.create({
  login_form_container: {
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#96F2A2',
    padding: 10,
    borderRadius: 10
  },
  login_item_container: {
    alignItems: 'stretch',
    borderBottomColor: '#ffffff',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    marginBottom: 10
  },
  login_submit_button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C5FBCB',
    borderRadius: 10,
    height: 40
  }
})
