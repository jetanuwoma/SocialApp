import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  AsyncStorage
} from 'react-native'
import { goToLogin } from '../navigation'
import {Navigation} from 'react-native-navigation';
import { connect } from 'react-redux';

import { USER_KEY } from '../config'

 class Home extends React.Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Home'
        },
      }
    };
  }
  logout = async () => {
    try {
      await AsyncStorage.removeItem(USER_KEY)
      goToLogin()
    } catch (err) {
      console.log('error signing out...: ', err)
    }
  }
  render() {
    console.log('props; ', this.props)
    return (
      <View style={styles.container}>
        <Text>Hello from Home screen.</Text>
        <Button
          onPress={this.logout}
          title="Sign Out"
        />
        <Button
          onPress={() => {
            Navigation.push(this.props.componentId, {
              component: {
                name: 'Screen2',
              }
            });
          }}
          title="View next screen"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = auth => ({
  user: auth.user
})

export default connect(mapStateToProps)(Home);
