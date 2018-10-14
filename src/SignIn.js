import React, { Fragment } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  AsyncStorage,
  TextInput,
  TouchableOpacity
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

import { goHome, gotoSignUp } from './navigation'
import { USER_KEY } from './config'
import { Navigation } from 'react-native-navigation';

export default class SignIn extends React.Component {
  static get options() {
    return {
      topBar: {
        visible: false
      }
    };
  }
  state = {
    username: '', password: '',
    borderColor: '#fff',
    borderColorPass: '#fff'
  }
  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }
  signIn = async () => {
    const { username, password } = this.state
    try {
       // login with provider
       const user = await AsyncStorage.setItem(USER_KEY, username)
       console.log('user successfully signed in!', user)
       goHome()
    } catch (err) {
      console.log('error:', err)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContent}>
          <Image source={require('./assets/world.png')} resizeMode="contain" style={styles.worldLogo} />
          <Text style={styles.appName}>AUGTA</Text>
        </View>
        <View style={styles.loginForm}>
          <View style={styles.formContainer}>
            <Text style={{ fontFamily: 'Aileron-SemiBold', fontSize: 17 }}>LOGIN</Text>
            <Text style={{ fontFamily: 'Aileron-Regular', fontSize: 15 }}>WORLD OF SOCIAL BALLING</Text>
            <View style={{ marginTop: 30 }}>
            <TextInput
              style={{
                width: '100%',
                padding: 5,
                fontSize: 15,
                borderBottomWidth: 1,
                borderBottomColor: this.state.borderColor,
                fontFamily: 'Aileron-Regular'
              }}
              placeholder="Email"
              onChangeText={(username) => this.setState({username})}
              onFocus={() => this.setState({ borderColor: 'blue' })}
              onBlur={() => this.setState({ borderColor: '#fff' })}
            />
             <TextInput
              style={{
                width: '100%',
                padding: 5,
                fontSize: 15,
                borderBottomWidth: 1,
                borderBottomColor: this.state.borderColorPass,
                fontFamily: 'Aileron-Regular',
                marginTop: 15
              }}
              placeholder="Password"
              onChangeText={(password) => this.setState({password})}
              onFocus={() => this.setState({ borderColorPass: 'blue' })}
              onBlur={() => this.setState({ borderColorPass: '#fff' })}
              secureTextEntry={true}
            />
              <View style={styles.buttonLayout}>
                <LinearGradient colors={['#4957fd', '#4b59fd', '#757dff']} locations={[0,0.44,1]} style={styles.loginButton}>
                <TouchableOpacity style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: '#fff' }}>Login</Text>
                </TouchableOpacity>
                </LinearGradient>
                <Text style={{ fontFamily: 'Aileron-Regular', color: 'rgba(73, 88, 253, 255)' }}>Forget Password?</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <Text style={{ color: '#a0a0a0' }}>Don't have an account </Text>
                <TouchableOpacity onPress={() => Navigation.push(this.props.componentId, {
                  component: {
                    name: 'SignUp',
                  }
                })}>
                <Text style={{ color: 'rgba(73, 88, 253, 255)' }}>Register</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View>
          <LinearGradient style={styles.roundOne} colors={['#5565fb', '#5967fb', '#a57fe9']} locations={[0,0.51,1]} />
          <LinearGradient style={styles.roundTwo} colors={['#1db5fb', '#21aff7', '#2b8ad7']} />

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#ffffff'
  },
  topContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  appName: {
    fontSize: 30,
    fontWeight: "700",
    fontFamily: 'Aileron-Bold'
  },
  worldLogo: {
    width: 120,
    height: 150
  },
  loginForm: {
    flex: 2,
    alignItems: 'center'
  },
  formContainer: {
    width: '80%',
    marginTop: 30
  },
  buttonLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  loginButton: {
    width: 100,
    height: 40,
    backgroundColor: '#4957fd',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20
  },
  roundOne: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
    bottom: -3,
    left: -3
  },
  roundTwo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    position: 'absolute',
    bottom: -50,
    left: 70
  }
})