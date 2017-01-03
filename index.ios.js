import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';
import { createRouter, NavigationProvider, StackNavigation } from '@exponent/ex-navigation';
import  Router from './Router';

export default class RoamApp extends Component {
  render(){
    return(
      <NavigationProvider router={Router}>
        <StackNavigation initialRoute={Router.getRoute('home')} />
      </NavigationProvider>
    )
  }
}


AppRegistry.registerComponent('RoamApp', () => RoamApp);

//use EX navigation for routing
