
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { FirebaseAuthenticationError }  from '../error/authenticationError.js';
import firebase from 'react-native-firebase';
import { COLLECTION_PATHS } from '../firebaseConstants.js';

export default (() => {

  class UsersAPI {
    // Private constructor
    constructor(firebaseInstance){
      this.FB = firebaseInstance;
    }

    async createAssociatedUserData (profileObj) {
        try{
          const fireStore = this.FB.firestore();
          const usersRef = await fireStore.collection(COLLECTION_PATHS.USERS);
          const creationDate = new Date();

          profileObj.creationDate = creationDate;

          return await usersRef.add(profileObj)
        }catch(error){
          throw error;
        }
    }

    async getAssociatedUserData (authId) {
        try{
          const fireStore = this.FB.firestore();
          const usersRef = await fireStore.collection(COLLECTION_PATHS.USERS);
          const query = await usersRef.where('authId', '==', authId).limit(1);
          const snapshot = await query.get();
          const profileInfo = snapshot.docs[0].data();

          return profileInfo;
        }catch(error){
          throw error;
        }
    }
  }

  return {
    // Public static factory method
    getSingleton(){
      if(!UsersAPI.instance){
        UsersAPI.instance = new UsersAPI(firebase);
      }
      return UsersAPI.instance;
    }
  }
})();
