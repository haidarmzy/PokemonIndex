/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import Navigation from './src/pages/navigation/Navigation'
import SplashScreen from 'react-native-splash-screen'

class App extends Component{
  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
  }, 1000);
  }
  
  render(){
    return (
      <Navigation/>
    );
  }
};

export default App;
