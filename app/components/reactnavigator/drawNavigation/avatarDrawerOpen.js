import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Avatar, Button } from 'react-native-elements';
import { connect } from 'react-redux';

class AvatarDrawerOpen extends React.PureComponent {

  render(){
    return (
      <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
        <Avatar
          width={32}
          height={32}
          rounded
          source={{uri: this.props.user.photoURL}}
          activeOpacity={0.7}
        />
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default withNavigation(connect(mapStateToProps)(AvatarDrawerOpen));
