import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image } from 'react-native';
import Button from 'react-native-button';

export default class RoamApp extends Component {
  // _handlePress() {
  //   console.log('Pressed!');
  // }

  render() {
    return (
      <View>
        <Image className="LandingImg"
          source={require('./hiker2.jpg')}
          style={styles.landingImg}
        />
        <Button
          style={{fontSize: 20, color: 'green'}}
          styleDisabled={{color: 'red'}}
          // onPress={() => this._handlePress()}>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  landingImg: {
    position:'relative'
  }
});

AppRegistry.registerComponent('RoamApp', () => RoamApp);
