import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import MarkerImg from './markerlg.png';

// import Markers from './Markers';

const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const LATITUDE_DELTA= 0.0922;
const ASPECT_RATIO = width / height;
const { width, height } = Dimensions.get('window');
let id =0;

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

export default class MapWrapper extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      region:{
        latitude:this.props.center[1],
        longitude:this.props.center[0],
    },
      markers: []
    }
  }

  componentDidMount(){
    this.setState({
      latitudeDelta: .0922,
      longitudeDelta: .0922
      // latitude:this.props.center[1],
      // longitude:this.props.center[0],
    })
    console.log(this.props.center)
  }

  // componentWillReceiveProps(newProps){
  //   this.setState({
  //     latitude:newProps.center[1],
  //     longitude:newProps.center[0],
  //     latitudeDelta: .092,
  //     longitudeDelta: .092
  //   })
  //   console.log(this.props.center)
  // }

//   onRegionChange(region) {
//   this.setState({ this.state.region })
// }

onMapChange(e) {
  console.log('Pressed!')
    // this.setState({
    //   markers: [
    //     ...this.state.markers,
    //     {
    //       coordinate: e.nativeEvent.coordinate,
    //       key: `foo$1 {id++}`,
    //       color: randomColor(),
    //     },
    //   ],
    // });
  }


  render(){
    return(
      <MapView
          provider={this.props.provider}
          style={styles.map}
          region={{
            latitude: this.props.center[1],
            longitude: this.props.center[0],
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta
          }}
        >

        <MapView
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        >
          {this.state.markers.map(marker => (
            <MapView.Marker
              coordinate={marker.latlng}
              image={MarkerImg}
              pinColor={marker.color}
            />
          ))}
        </MapView>

      </MapView>
    )
  }
}

MapWrapper.propTypes = {
  provider: MapView.ProviderPropType,
};

  const styles = StyleSheet.create({

    map: {
      ...StyleSheet.absoluteFillObject
    }
  })
