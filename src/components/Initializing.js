import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native'
import { connect } from 'react-redux';

import { goToLogin, goHome } from '../navigation'

import { USER_KEY } from '../config'

class Initialising extends React.Component {

  constructor(props) {
    super(props);

  }
  componentWillReceiveProps(nexProps) {
    console.log(nexProps);
  }
  async componentDidMount() {
    try {
      const user = await AsyncStorage.getItem(USER_KEY)
      console.log('user: ', user)
      if (user) {
        goHome()
      } else {
        goToLogin()
      }
    } catch (err) {
      console.log('error: ', err)
      goToLogin()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Loading</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 28
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})


const mapStateToProps = auth => ({
  user: auth.user
})

export default connect(mapStateToProps)(Initialising);
