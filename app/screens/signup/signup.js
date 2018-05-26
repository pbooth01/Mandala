import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import SignupForm from '../../components/signup/signupForm.js';
import FBLoginButton from '../../components/signup/fbLoginButton.js';
import { withFirebase } from 'react-redux-firebase';
import { connect } from 'react-redux';
import AuthAPI from '../../api/firebase/authentication/authAPI.js';

class SignupScreen extends React.Component {

  constructor(props) {
    super(props);

    this.AuthAPI = AuthAPI.getSingleton();

    this.createUserWithFacebook = this.createUserWithFacebook.bind(this);
    this.createUserWithEmail = this.createUserWithEmail.bind(this);
  }

  async createNewUser(provider, userObj){
    try{
      const user = await this.AuthAPI.createUser(provider, userObj);
      console.log(user);
    }catch(error){
      debugger;
      console.log(error);
    }
  }

  createUserWithEmail(userObj){
    this.createNewUser('EMAIL', userObj);
  }

  createUserWithFacebook(){
    this.createNewUser('FACEBOOK', {});
  }

  render() {
    return (
      <View style={styles.login_container}>
        <Text style={styles.login_style_text}>Join Mandala!</Text>
        <SignupForm createNewUser={ this.createUserWithEmail } />
        <FBLoginButton login={ this.createUserWithFacebook }/>
      </View>
    );
  }
}

export default withFirebase(SignupScreen);

const styles =  StyleSheet.create({
  login_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 10,
    backgroundColor: '#F6FFF7'
  },
  login_style_text:{
    fontSize: 25,
    alignSelf: 'center',
    marginBottom: 25,
    color: '#4AD35B'
  }
})
