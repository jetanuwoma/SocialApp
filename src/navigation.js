import { Navigation } from 'react-native-navigation'

export const goToLogin = () => Navigation.setRoot({
  root: {
    stack: {
      id: 'Login',
      children: [
        {
          component: {
            name: 'Login',
          }
        }
    ],
    }
  }
});

export const gotoSignUp = () => Navigation.setRoot({
  root: {
    stack: {
      id: 'SignUp',
      children: [
        {
          component: {
            name: 'SignUp',
          }
        }
    ],
    }
  }
});


export const goHome = () => Navigation.setRoot({
  root: {
    stack: {
      id: 'App',
      children: [
        {
          component: {
            name: 'Home',
          }
        }
    ],
    }
  }
})