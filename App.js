import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import ScanScreen from './screens/ScanScreen';

export default class App extends React.Component {
  render(){
    return (
      <AppContainer />
    );
  }
}
var AppNavigator = createSwitchNavigator({
  ScanScreen: ScanScreen
});

const AppContainer = createAppContainer(AppNavigator);