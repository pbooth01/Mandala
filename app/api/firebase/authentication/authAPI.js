
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { FirebaseAuthenticationError }  from '../error/authenticationError.js';
import firebase from 'react-native-firebase';
import UsersAPI from '../users/usersAPI.js';

export default (() => {

  class AuthAPI {
    // Private constructor
    constructor(firebaseInstance){
      this.FB = firebaseInstance;
      this.UsersAPI = UsersAPI.getSingleton();
    }

    async createUser(provider, userObj){
      try{
        switch (provider) {
          case 'EMAIL':
            console.log('Logging in with Email');
            if(userObj){
              let user = await this.registerUserWithEmail(userObj);
              return user;
            }else{
              throw new Error("User Object Is Null");
            }
            break;
          case 'FACEBOOK':
            console.log('Logging in with Facebook');
            let user = await this.registerUserWithFacebook();
            return user;
            break;
          default:
            throw new Error("Trying to Authenticate with an unsupported provider");
        }
      }catch(error){
        throw error;
      }
    }

    async registerUserWithFacebook(){
      try{
        const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
        if (result.isCancelled) {
          throw new Error('User cancelled Facebook Login request'); // Handle this however fits the flow of your app
        }
        console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
        const data = await AccessToken.getCurrentAccessToken();
        if (!data) {
          throw new Error('Something went wrong obtaining the users access token'); // Handle this however fits the flow of your app
        }
        // create a new firebase credential with the token
        const credential = this.FB.auth.FacebookAuthProvider.credential(data.accessToken);
        // login with credential
        const currentUserCredential = await this.FB.auth().signInAndRetrieveDataWithCredential(credential);
        // creating associated user profile doc in users collection
        await this.UsersAPI.createAssociatedUserData({
          authId: currentUserCredential.user.uid,
          displayName: currentUserCredential.user.displayName,
          photoURL: currentUserCredential.user.photoURL,
          contact:{
            email: currentUserCredential.user.email
          }
        });

        return currentUserCredential.user.toJSON();

      }catch(error){
        throw error;
      }
    }

    async registerUserWithEmail(userObj){

      const {username, email, password} = userObj;

      try{
        const userCredential = await this.FB.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password);
        // creating associated user profile doc in users collection
        await this.UsersAPI.createAssociatedUserData({
          authId: userCredential.user.uid,
          displayName: username,
          contact:{
            email
          }
        });

        return userCredential.user;

      }catch(error){
        throw error
      }
    }

    logoutUser(){
      this.FB.logout();
    }
}

  return {
    // Public static factory method
    getSingleton(){
      if(!AuthAPI.instance){
        AuthAPI.instance = new AuthAPI(firebase);
      }
      return AuthAPI.instance;
    }
  }
})();
