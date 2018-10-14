import React, { Fragment } from 'react'
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage
} from 'react-native'
import { connect } from 'react-redux';
import { goHome } from '../navigation'
import LinearGradient from 'react-native-linear-gradient';
import RadioGroup from 'react-native-radio-buttons-group';
import { signUpUser, loginUserSuccessful  } from '../actions/auth';


class SignUp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '', password: '', email: '', contact_number: '',
      fullName: '',
      password2: '',
      gender: 'Male',
      termsAgreed: false,
      borderColor: '#a0a0a0',
      borderColorPass: '#a0a0a0',
      borderColorName: '#a0a0a0',
      borderColorPass2: '#a0a0a0',
      borderColorMobile: '#a0a0a0',
      borderColorDob: '#a0a0a0',
      borderColorUsername: '#a0a0a0',
      isRequesting: false,
      genderData: [
        {
          label: 'Male'
        },
        {
          label: 'Female'
        },
      ],
      hasError: false,
      errorMessage: ''
    }

    this.onGenderChanged = this.onGenderChanged.bind(this);
    this.signUp = this.signUp.bind(this);
  }


  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  signUp() {
    this.setState({ hasError: false, errorMessage: '', isRequesting: true })
    const { username, password, password2, email, contact_number, gender, fullName } = this.state
    const data = {
      username, password, email,
      contact_number, gender, fullName,
      dob: '02/02/1992'
    }

    if (password === password2) {
      signUpUser(data).then((data) => {
        this.props.dispatch(loginUserSuccessful(data.data));
        this.setState({ isRequesting: false, hasError: false, errorMessage: '' });
        AsyncStorage.setItem('@USER:KEY', data.data.token).then(() => {
          goHome();
        });
      }).catch((error) => {
        console.log(error.response.data.errors)
        this.setState({ isRequesting: false, hasError: true, errorMessage: error.response.data.errors[0].message })
      });
    } else {
      this.setState({ errorMessage: 'Password do not match', hasError: true, isRequesting: false });
    }

  }

  onGenderChanged(data) {
    if (data[0].selected === true) {
      this.setState({ gender: 'Male' });
    } else {
      this.setState({ gender: 'Female' });
    }
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
            <Text style={{ fontFamily: 'Aileron-SemiBold', fontSize: 17 }}>SIGN UP</Text>
            <View style={{ marginTop: 0 }}>
            <TextInput
              style={{
                width: '100%',
                padding: 5,
                fontSize: 15,
                borderBottomWidth: 1,
                borderBottomColor: this.state.borderColorName,
                fontFamily: 'Aileron-Regular'
              }}
              placeholder="Name"
              onChangeText={(fullName) => this.setState({fullName})}
              onFocus={() => this.setState({ borderColorName: 'blue' })}
              onBlur={() => this.setState({ borderColorName: '#a0a0a0' })}
            />
             <TextInput
              style={{
                width: '100%',
                padding: 5,
                fontSize: 15,
                borderBottomWidth: 1,
                borderBottomColor: this.state.borderColorUsername,
                fontFamily: 'Aileron-Regular',
                marginTop: 15
              }}
              placeholder="Username"
              onChangeText={(username) => this.setState({username})}
              onFocus={() => this.setState({ borderColorUsername: 'blue' })}
              onBlur={() => this.setState({ borderColorUsername: '#a0a0a0' })}
            />
            <TextInput
              style={{
                width: '100%',
                padding: 5,
                fontSize: 15,
                borderBottomWidth: 1,
                borderBottomColor: this.state.borderColor,
                fontFamily: 'Aileron-Regular',
                marginTop: 15
              }}
              placeholder="Email"
              onChangeText={(email) => this.setState({email})}
              onFocus={() => this.setState({ borderColor: 'blue' })}
              onBlur={() => this.setState({ borderColor: '#a0a0a0' })}
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
              onBlur={() => this.setState({ borderColorPass: '#a0a0a0' })}
              secureTextEntry={true}
            />
            <TextInput
              style={{
                width: '100%',
                padding: 5,
                fontSize: 15,
                borderBottomWidth: 1,
                borderBottomColor: this.state.borderColorPass2,
                fontFamily: 'Aileron-Regular',
                marginTop: 15
              }}
              placeholder="Retype Password"
              onChangeText={(password2) => this.setState({password2})}
              onFocus={() => this.setState({ borderColorPass2: 'blue' })}
              onBlur={() => this.setState({ borderColorPass2: '#a0a0a0' })}
              secureTextEntry={true}
            />
            
            <TextInput
              style={{
                width: '100%',
                padding: 5,
                fontSize: 15,
                borderBottomWidth: 1,
                borderBottomColor: this.state.borderColorMobile,
                fontFamily: 'Aileron-Regular',
                marginTop: 15
              }}
              placeholder="Mobile"
              onChangeText={(contact_number) => this.setState({contact_number})}
              onFocus={() => this.setState({ borderColorMobile: 'blue' })}
              onBlur={() => this.setState({ borderColorMobile: '#a0a0a0' })}
            />
           
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <RadioGroup flexDirection="row" radioButtons={this.state.genderData} onPress={this.onGenderChanged} />
            </View>
              {this.state.hasError &&
                <Text style={{ marginTop: 10, color: '#FF0000' }}>{this.state.errorMessage}</Text>
              }
              <View style={styles.buttonLayout}>
                <LinearGradient colors={['#4957fd', '#4b59fd', '#757dff']} locations={[0,0.44,1]} style={styles.loginButton}>
                <TouchableOpacity style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }} 
                  onPress={this.signUp}>
                  {!this.state.isRequesting &&
                    <Text style={{ color: '#fff' }}>Sign Up</Text>
                  }
                  {this.state.isRequesting &&
                    <ActivityIndicator size="small" color="#fff" />
                  }
                </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </View>
        </View>
        

        <LinearGradient style={styles.roundTwo} colors={['#1db5fb', '#21aff7', '#2b8ad7']} />
        <LinearGradient style={styles.roundOne} colors={['#a57fe9', '#5967fb', '#5565fb']} locations={[0,0.51,1]} />
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
    width: 100,
    height: 100
  },
  loginForm: {
    flex: 3,
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
    bottom: 40,
    right: 30
  },
  roundTwo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    position: 'absolute',
    bottom: -50,
    right: -20
  }
});

const mapStateToProps = auth => ({
  user: auth.user
})

export default connect(mapStateToProps)(SignUp);