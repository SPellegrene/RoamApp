import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Button from 'react-native-button';
import MapView from 'react-native-maps';
import MapWrapper from './MapWrapper';
import HomePage from './HomePage';
let id=0;

export default class MapPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      church: this.props.church,
      center:[0,1],
      markers:[]
    };
  }

  componentDidMount() {
    this.getCenter()
    this.getChurch()
  }

  //request to get the two center coordinates from api
  getCenter() {
    console.log(this.props.route.params.city);
    axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/" + this.props.route.params.city + ".json?access_token=sk.eyJ1Ijoic3BlbGxlZ3JlbmUiLCJhIjoiY2l4Z2prNjdvMDAxcDJ0dzNzYTZ5d284biJ9.ipSnbxgYgLiMmbSUNUJVcQ")
    .then((response)=> {
      let newCenter = response.data.features[0].center.slice(0);
      this.setState({
        center: newCenter,
        newItemValue: ''
      })
      console.log(newCenter);
    })
  }

  //get religious and other category from object
  getChurch() {
    axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/"+ this.props.route.params.city + ".json?access_token=sk.eyJ1Ijoic3BlbGxlZ3JlbmUiLCJhIjoiY2l4Z2prNjdvMDAxcDJ0dzNzYTZ5d284biJ9.ipSnbxgYgLiMmbSUNUJVcQ")
    .then((response)=> {
      let newChurch = response.data.features[0].properties.category;

      //recognize when something searched is a place of worship
      if (newChurch === 'religious' || newChurch=== 'other'){
        alert('you got a church!')
      }

      this.setState({
        church: newChurch
      })
      console.log(newChurch);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  //back button functionality
  _goBackHome() {
    this.props.navigator.pop();
  }


  render() {
    return (
      <View style={styles.container}>
        <MapWrapper center={this.state.center}/>
        {/* <Markers markers={this.state.markers} /> */}
            {/* Renders Map */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.bubble}
          >
        <Button
          style={styles.button}
          styleDisabled={{color: 'red'}}
          onPress={() => this._goBackHome()}>Back
        </Button>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

MapPage.propTypes = {
  provider: MapView.ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
    fontSize:22,
    color:'#005371',
    fontWeight: '200',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});
