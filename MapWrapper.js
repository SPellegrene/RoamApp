import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import MarkerImg from './markerlg.png';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


export default class MapWrapper extends React.Component {

  constructor(props){
    super(props);
    this.state= {
      latitude: 0,
      longitude: 1,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }
  }

  componentWillReceiveProps(newProps){
    console.log(newProps);
    this.setState({
      latitude:newProps.center[0],
      longitude:newProps.center[1],
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    })

  }

  // setRegion(lat, long){
  //   console.log(this.props.center)
  // }



  render(){
    return(

      <MapView
        provider={this.props.provider}
        style={styles.map}
        initialRegion={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: this.state.latitudeDelta,
          longitudeDelta: this.state.longitudeDelta
        }}
        onPress={this.onMapPress}
      >

          {/* Renders Marker */}
      {this.props.markers.map(marker => (
        <MapView.Marker
          title={marker.key}
          image={MarkerImg}
          key={marker.id}
          coordinate={marker.coordinate}
        />
        ))}
      </MapView>

    )
  }
}
const styles = StyleSheet.create({

  map: {
    ...StyleSheet.absoluteFillObject
  }
})
