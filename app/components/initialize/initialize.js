import React from 'react';
import { Text, View } from 'react-native';
import Spinner from 'react-native-spinkit';
import firebase from 'react-native-firebase';
import { Provider } from 'react-redux';
import UsersAPI from '../../api/firebase/users/usersAPI.js';

import StartupScreen from '../../screens/startup/startup.js';
import SignupScreen from '../../screens/signup/signup.js';
import HomeScreen from '../../screens/home/home.js';
import Home3Screen from '../../screens/home/home3.js';

/*Redux Code*/
import store from '../../redux/store/createStore.js';
import { loginUser , logoutUser } from '../../redux/actions/actionCreators.js';
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)
/*End of Redux Code*/


export default class Initialize extends React.Component {

  constructor(props) {
    super(props);

    this.usersAPI = UsersAPI.getSingleton();

    this.state = {
      loading: true,
      user: null
    };
  }

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.usersAPI.getAssociatedUserData(user.uid)
        .then(user => {
          this.setState({
            loading: false,
            user
          });
        })
        .catch(error => {
          this.setState({
            loading: false,
            user: null
          });
        })
      }else{
        this.setState({
          loading: false,
          user: null
        });
      }
    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  render() {

    let initialLoadScreen = <StartupScreen />;

    if(!this.state.loading){

      if(this.state.user){
        //store.firebase.logout();
        store.dispatch(loginUser(this.state.user));
        initialLoadScreen = (<Home3Screen />);
      }else{
        store.dispatch(logoutUser());
        initialLoadScreen = (<SignupScreen />);
      }
    }

    return (
      <Provider store={store}>
        {initialLoadScreen}
      </Provider>
    );
  }
}
