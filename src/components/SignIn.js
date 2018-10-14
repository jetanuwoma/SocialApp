import React, { Fragment } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  AsyncStorage,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { goHome } from '../navigation'
import { Navigation } from 'react-native-navigation';
import { loginUser, loginUserSuccessful, loginUserFailed } from '../actions/auth';

class SignIn extends React.Component {
  static get options() {
    return {
      topBar: {
        visible: false
      }
    };
  }
  constructor(props) {
    super(props);

    this.state = {
      username: '', password: '',
      borderColor: '#fff',
      borderColorPass: '#fff',
      requesting: false,
      errorMessage: '',
      hasError: false,
    }

    this.signInUser = this.signInUser.bind(this);
  }

  componentDidMount() {
    console.log(this.props, 'our props');
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps, 'I just recieved props');
  }

  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }

  
   signInUser() {
    const { username, password } = this.state;
    this.setState({ requesting: true, hasError: false })
    loginUser(username, password).then((data) => {
      this.setState({ requesting: false, hasError: false });
      this.props.dispatch(loginUserSuccessful(data.data));
      AsyncStorage.setItem('@USER:KEY', data.data.token).then(() => {
        goHome();
      });

    }).catch((error) => {
      console.log(error.response);
      this.setState({ requesting: false, hasError: true, errorMessage: error.response.data.message });
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContent}>
          <Image source={require('../assets/world.png')} resizeMode="contain" style={styles.worldLogo} />
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
            {this.state.hasError &&
              <Text style={{ marginTop: 10, color: '#FF0000' }}>{this.state.errorMessage}</Text>
            }
              <View style={styles.buttonLayout}>
                <LinearGradient colors={['#4957fd', '#4b59fd', '#757dff']} locations={[0,0.44,1]} style={styles.loginButton}>
                <TouchableOpacity style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
                 onPress={this.signInUser}
                >
                {!this.state.requesting &&
                  <Text style={{ color: '#fff' }}>Sign In</Text>
                }
                {this.state.requesting &&
                   <ActivityIndicator size="small" color="#fff" />
                }
                
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
});

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps)(SignIn);
