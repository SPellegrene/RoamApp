import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Hyperlink from 'react-native-hyperlink';
import Autolink from 'react-native-autolink';
import Communications from 'react-native-communications';
import Button from 'react-native-button';


export default class ChurchDetail extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      description:null
    }
  }

componentDidMount(){
  this.getData()
}

  getData(){
  axios.get("https://maps.googleapis.com/maps/api/place/details/json?placeid=" + this.props.church.place_id +"&key=AIzaSyC58lupmo-uAjtVGJG_aBA3MM5HavebiR0")
  .then((response)=> {
    // console.log(response.data);
    let newDesc = response.data.result;
    console.log(newDesc);
    this.setState({
      description: newDesc
    })
  })
}


  render() {


    return(
      <View style={styles.churchDetail} >

        <Text style={styles.nameDetail} >
          {this.state.description !== null ? this.state.description.name : this.props.church.name }
        </Text>
        <Text style={styles.addressDetail} >
          {this.state.description !== null ? this.state.description.formatted_address : this.props.church.name }
        </Text>
        <View style= {{alignItems:'center'}}>
        <Autolink
        style={styles.phoneDetail}
        linkStyle={styles.phoneDetail}
        text={this.state.description !== null ? this.state.description.formatted_phone_number : this.props.church.name }
          />
          <Autolink
            style={styles.webDetail}
            linkStyle={styles.webDetail}
            text={this.state.description !== null ? this.state.description.website : this.props.church.name}
          />
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({


  churchDetail: {
    color: 'white',
    width: 250,
    height:180,
    backgroundColor: '#005371',
    borderRadius: 10,
    flexDirection: 'column',
    flexGrow:1,
  },

  nameDetail: {
    color: 'white',
    marginBottom: 10,
    flexDirection: 'column',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 18,
    marginTop: 5,
    textAlign: 'center',
    padding:5
  },

  addressDetail: {
    color: 'white',
    alignSelf: 'center',
    marginBottom: 10,
    fontSize: 14,
    textAlign: 'center',
    marginLeft: 5,
    marginRight: 5
  },

  phoneDetail: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop:15,
  },

  webDetail: {
    color: 'orange',
    alignSelf: 'center',
    fontSize: 16,
    marginTop:15,
    marginBottom: 10,
    textAlign: 'center'

  },
})
