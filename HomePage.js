import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { createRouter, NavigationProvider, StackNavigation } from '@exponent/ex-navigation';
import Button from 'react-native-button';
import Router from './Router';


export default class HomePage extends Component {

  static route = {
    title: 'home',
  }

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  _goToMap() {
  this.props.navigator.push(Router.getRoute('map'));
  // console.log(this.props);
  }

  render() {
    return (
      <View>
        <View style={styles.viewStyling}>
          <Image className="LandingImg"
            source={require('./hiker.jpg')}
            style={styles.landingImg}
          />
          <Text style= {styles.logoStyling}>roam</Text>
          <Text style= {styles.sloganStyling}>a church finding app</Text>
        </View>
        <View style={styles.searchCity}>
          <TextInput
            style={styles.textInput}
            placeholder='Enter City'
            onChangeText={(text) => this.setState({text})}
          />
        </View>
        <View style={styles.goButton}>
          <Button
            style={styles.buttonStyling}
            styleDisabled={{color: 'red'}}
            onPress={this._goToMap.bind(this)}>Go
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  viewStyling: {
    flexDirection:'column',
    alignItems:'center',
  },

  logoStyling: {
    backgroundColor:'transparent',
    marginTop:30,
    fontSize:32,
    color:'#E2E2E2',
    fontWeight: '300'
    // fontFamily:'Abel'
  },

  sloganStyling: {
    backgroundColor:'transparent',
    fontSize:18,
    marginTop:10,
    color: '#E2E2E2',
    fontWeight: '300'
  },

  landingImg: {
    position:'absolute',
    width:450
  },

  searchCity: {
    flexDirection:'row',
    marginTop: 30,
    justifyContent:'center',
    backgroundColor:'transparent'
  },

  textInput: {
    height:49,
    // borderWidth:1,
    // borderColor:'#CACBCC',
    borderRadius: 5,
    width:158,
    textAlign: 'center',
    // marginLeft: 110,
    backgroundColor:'#F0F0F0',
  },

  goButton: {
    flexDirection:'row',
    justifyContent:'center',
    marginTop:-49,
    marginLeft:210,
    backgroundColor:'transparent'

  },

  buttonStyling: {
    position:'relative',
    marginTop:3,
    height: 41,
    width: 49,
    textAlign:'center',
    fontSize:30,
    color:'#C7C9CB',
    borderRadius: 5,
    fontWeight: '200',
    marginLeft:5,
  }
});
