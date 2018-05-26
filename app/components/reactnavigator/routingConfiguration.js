import React from 'react';
import { Button, StyleSheet, ScrollView, View, Text } from 'react-native';
import { createStackNavigator, createDrawerNavigator, createBottomTabNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';


import CustomDrawerContent from '../../components/reactnavigator/drawNavigation/customDrawerContent.js';
import AvatarDrawerOpen from '../../components/reactnavigator/drawNavigation/avatarDrawerOpen.js';
import PostModalOpen from '../../components/reactnavigator/modalNavigation/postModalOpen.js';


class CalendarScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: 'Calendar'
    }
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>Calendar</Text>
        <Button
          onPress={() => {
            this.props.navigation.navigate('EventPostModal')}
          }
          title="Open Modal"
        />
        <PostModalOpen />
      </View>
    );
  }
}

class SearchScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: 'Search',
    }
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>Search</Text>
      </View>
    );
  }
}

class DiscoverScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: 'Discover',
    }
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>Discover</Text>
      </View>
    );
  }
}

class PostEventModalScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: 'Modal',
    }
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>Modal</Text>
      </View>
    );
  }
}

const CalendarStackNavigator = createStackNavigator(
  {
    CalendarScreen: CalendarScreen,
  },{
    headerMode: 'float',
    initialRouteName: 'CalendarScreen',
    navigationOptions: ({ navigation }) => ({
      headerLeft: (<AvatarDrawerOpen />),
      headerStyle: {
        paddingLeft: 10,
        paddingRight: 10
      }
    })
  }
);

const SearchStackNavigator = createStackNavigator(
  {
    SearchScreen: SearchScreen,
  },{
    headerMode: 'float',
    initialRouteName: 'SearchScreen',
    navigationOptions: ({ navigation }) => ({
      headerLeft: (<AvatarDrawerOpen />),
      headerStyle: {
        paddingLeft: 10,
        paddingRight: 10
      }
    })
  }
);

const DiscoverStackNavigator = createStackNavigator(
  {
    DiscoverScreen: DiscoverScreen,
  },{
    headerMode: 'float',
    initialRouteName: 'DiscoverScreen',
    navigationOptions: ({ navigation }) => ({
      headerLeft: (<AvatarDrawerOpen />),
      headerStyle: {
        paddingLeft: 10,
        paddingRight: 10
      }
    })
  }
);

const RootTabNavigator = createBottomTabNavigator(
  {
    Calendar: CalendarStackNavigator,
    Search: SearchStackNavigator,
    Discover: DiscoverStackNavigator
  },
  {
    initialRouteName: 'Calendar',
    tabBarOptions: {
      activeTintColor: '#96F2A2',
      activeBackgroundColor: '#ffffff',
      inactiveTintColor: '#DDF2DF',
      inactiveBackgroundColor: '#fff',
      showLabel: false,
      style: {
        backgroundColor: '#fff',
      }
    },
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;

        switch (routeName) {
          case 'Calendar':
            iconName = 'md-calendar';
            break;
          case 'Search':
            iconName = 'md-search';
            break;
          case 'Discover':
            iconName = 'md-compass';
            break;
          default:
            iconName = 'md-calendar';
        }

        return <Ionicons name={iconName} size={40} color={tintColor} />;
      },
    })
  }
);


const ModalStackNavigator = createStackNavigator(
  {
    RootTabStackNavigator: { screen: RootTabNavigator },
    PostEventModal: { screen: PostEventModalScreen }
  },
  {
    mode: 'modal',
    headerMode: 'None',
    initialRouteName: 'RootTabStackNavigator'
  }
)


/*DrawerStack represents the home section of the application*/
const DrawerStack = createDrawerNavigator(
  {
    /*RootTabStackNavigator: { screen: RootTabNavigator }*/
    ModalStackNavigator: ModalStackNavigator
  },{
    contentComponent: CustomDrawerContent
  }
);


export default RootStackNavigator = createStackNavigator(
  {
    DrawerStack: { screen: DrawerStack },
  },{
    headerMode: 'None'
  }
);
