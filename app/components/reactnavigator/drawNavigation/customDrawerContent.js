import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

class CustomDrawerContent extends React.PureComponent {
  render(){
    const { props } = this;
    return (
      <ScrollView style={styles.scroll_view_wrapper}>
        <SafeAreaView style={styles.safe_area_container} forceInset={{ top: 'always', horizontal: 'never' }}>
          <View style={{flex: 1}}>
            <View style={styles.drawer_header}>
              <Avatar
                width={100}
                height={100}
                rounded
                source={{uri: props.user.photoURL}}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
                avatarStyle={{borderColor: '#ffffff',borderWidth: 2}}
              />
              <Text style={styles.drawer_header_text}>{props.user.displayName}</Text>
            </View>
            <View style={styles.drawer_content_wrapper}>
              <TouchableOpacity style={styles.drawer_content_item_wrapper}>
                <View style={styles.drawer_content_icon_wrapper}>
                    <Ionicons name={'ios-person-outline'} size={35} color={'#686868'} />;
                </View>
                <Text style={styles.drawer_content_text}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.drawer_content_item_wrapper}>
                <View style={styles.drawer_content_icon_wrapper}>
                    <Ionicons name={'ios-moon-outline'} size={35} color={'#686868'} />;
                </View>
                <Text style={styles.drawer_content_text}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scroll_view_wrapper:{
    backgroundColor: '#F6FFF7'
  },
  safe_area_container: {
    flex: 1
  },
  drawer_header: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#96F2A2',
    paddingTop: 8,
    paddingBottom: 5,
    borderColor: '#B8B8B8',
    borderWidth: 1
  },
  drawer_header_image: {
    width: 80,
    height: 80,
    borderColor: '#ffffff',
    borderRadius: 40,
    borderWidth: 2
  },
  drawer_header_text: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
    marginTop: 8
  },
  drawer_content_wrapper: {
    flex: 1,
    flexDirection: 'column'
  },
  drawer_content_item_wrapper: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawer_content_icon_wrapper: {
    marginRight: 15,
  },
  drawer_content_text:{
    fontSize: 15,
    fontWeight: 'bold',
    color: '#686868'
  },
  drawer_content_logout_wrapper: {
    alignSelf: 'flex-end'
  }
});

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(CustomDrawerContent);
