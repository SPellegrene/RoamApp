import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Button from 'react-native-button';
import MapView from 'react-native-maps';
import MapWrapper from './MapWrapper';

let id=0;

class MapPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [],
      data: this.props.data,
      center:[0,0]
    };

    this.onMapPress = this.onMapPress.bind(this);
  }

  componentDidMount() {
    this.getData()
    this.getCenter()
  }

  getData() {
    axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/minneapolis.json?access_token=sk.eyJ1Ijoic3BlbGxlZ3JlbmUiLCJhIjoiY2l4Z2prNjdvMDAxcDJ0dzNzYTZ5d284biJ9.ipSnbxgYgLiMmbSUNUJVcQ")
    .then((response)=> {
      let newData = response.data.features[0];
      this.setState({
        data: newData
      })
      console.log(newData);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  getCenter() {
    axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/minneapolis.json?access_token=sk.eyJ1Ijoic3BlbGxlZ3JlbmUiLCJhIjoiY2l4Z2prNjdvMDAxcDJ0dzNzYTZ5d284biJ9.ipSnbxgYgLiMmbSUNUJVcQ")
    .then((response)=> {
      let newCenter = response.data.features[0].center.slice(0);
      this.setState({
        center: newCenter
      })
      console.log(newCenter);
    })
  }

  //back button functionality
  _goBackHome() {
    this.props.navigator.pop();
  }

  //place marker functionality
  onMapPress(e) {
    this.setState({
      markers: [
        this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: `foo${id++ }`,
        },
      ],
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapWrapper markers={this.state.markers} center={this.state.center}/>
            {/* Renders Map */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            // onPress={() => this.setState({ markers: [] })}
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

module.exports = MapPage;
