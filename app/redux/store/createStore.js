import { compose, createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import RNFirebase from 'react-native-firebase';
import { firebaseReducer, getFirebase, reactReduxFirebase,  } from 'react-redux-firebase';

/*Redux Reducers*/
import userReducer from '../reducers/userReducer.js';
import loggedInReducer from '../reducers/loggedInReducer.js';

const reactNativeFirebaseConfig = {
 debug: true
};

const reduxFirebaseConfig = {
 userProfile: 'users', // save users profiles to 'users' collection
 enableLogging: true,
 updateProfileOnLogin: true,
 enableRedirectHandling: false
};

// Initialize firebase instance
const firebase = RNFirebase.initializeApp(reactNativeFirebaseConfig);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, reduxFirebaseConfig), // firebase instance as first argument
  // reduxFirestore(firebase) // <- needed if using firestore
)(createStore)

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  form: formReducer,
  loggedIn: loggedInReducer,
  user: userReducer
  // firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state
const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState)

export default store;
