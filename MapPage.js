import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Button from 'react-native-button';
import MapView from 'react-native-maps';
import MapWrapper from './MapWrapper';
import HomePage from './HomePage';

export default class MapPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      churches: [],
      center:[0,1],
      markers:[],
      coordinates:[0,1],
      description: [],
      id:''
    };
  }

  componentDidMount() {
    this.getCenter()
    // this.getChurches()
  }

  //request to get the two center coordinates from api
  getCenter() {
    console.log(this.props.route.params.city);
    axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/" + this.props.route.params.city + ".json?access_token=sk.eyJ1Ijoic3BlbGxlZ3JlbmUiLCJhIjoiY2l4Z2prNjdvMDAxcDJ0dzNzYTZ5d284biJ9.ipSnbxgYgLiMmbSUNUJVcQ")
    .then((response)=> {

      let newCenter = response.data.features[0].center.slice(0);
      let longLatCoordinates = newCenter;
      let latLongCoordinates = [longLatCoordinates[1], longLatCoordinates[0]];
      this.setState({
        center: newCenter,
        newItemValue: '',
        coordinates:latLongCoordinates
      })
      // console.log(latLongCoordinates);

      axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=8000&location=" + this.state.coordinates + "&type=church&key=AIzaSyC58lupmo-uAjtVGJG_aBA3MM5HavebiR0")
      .then((response)=> {
        console.log(response.data);
        let newChurches = response.data.results;
        console.log(newChurches);
        this.setState({
          churches: newChurches
        })
      })

      axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=8000&location=" + this.state.coordinates + "&type=church&key=AIzaSyC58lupmo-uAjtVGJG_aBA3MM5HavebiR0")
      .then((response)=> {
        console.log(response.data);
        let newID = response.data.results[0].place_id;
        console.log(newID);
        this.setState({
          id: newID
        })
      })
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
    return(
      <View style={styles.container}>
        <MapWrapper center={this.state.center} churches={this.state.churches} description={this.state.description}/>
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
