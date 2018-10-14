import {Navigation} from 'react-native-navigation';
import { Provider } from 'react-redux';
import configureStore from './store';

const store = configureStore();

export function registerScreens() {
  Navigation.registerComponentWithRedux('Home', () => require('./components/Home').default, Provider, store);
  Navigation.registerComponentWithRedux('Initializing', () => require('./components/Initializing').default, Provider, store);
  Navigation.registerComponentWithRedux('Login', () => require('./components/SignIn').default, Provider, store);
  Navigation.registerComponentWithRedux('SignUp', () => require('./components/SignUp').default, Provider, store);
  Navigation.registerComponentWithRedux('Screen2', () => require('./components/Screen2').default, Provider, store);
}