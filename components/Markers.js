import { Text, View } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import React from 'react';
import styles from './styles'

export default function Markers(props) {

  return (
    <>
      <Marker
        key={1}
        coordinate={props.coordinates} 
        title="You"
        description="Guess who are here :)"
      />  
      { 
        props.markers.map((marker, index) => (
          <Marker
            key={index+1}
            coordinate={marker.coordinate}
            image={require('../assets/map_marker.png')}
          >
            <Callout 
              onPress={() => {props.showMarkerInfo(marker)}}>
                <View>
                  <Text style={styles.markerText}>{marker.place}</Text>
                  <Text style={styles.markerText}>{marker.name}</Text>
                  <Text style={styles.markerSubText}>Tap here for a more information</Text>
                </View>
            </Callout>
          </Marker>
      ))}
    </>
  )
}
