import { Text, View, Button, Alert } from 'react-native';
import MapView from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import Markers from './components/Markers';
import AddMarker from './components/AddMarker';
import ShowMarkerInfo from './components/ShowMarkerInfo';
import { getData, storeData } from './components/AsyncStorage';
import styles from './components/styles'

export default function App() {

  const [coordinates, setCoordinates] = useState({latitude: 0, longitude: 0})
  const [isLoading, setIsLoading] = useState(true)
  const [markerAddition, setMarkerAddition] = useState(false)
  const [markers, setMarkers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false)
  const [markerData, setMarkerData] = useState({})
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          "Location is not allowed",
          "Please allow the app laocation to make the app work better",
        );
        setCoordinates({latitude: 65.0136, longitude: 25.4646})
      }
      else {
        let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High })
        setCoordinates({latitude: location.coords.latitude, longitude: location.coords.longitude}); 
      }
      setIsLoading(false);
      
      getData().then(data => {
        if (typeof data === 'string') {
          return Alert.alert(
            "An error occurred on getting markkers data",
            data
          );
        }
        setMarkers(data.length === 0 ? [] : data)
      });
    })();
  }, []);
  
  const showMarkersInfo = (data) => {
    setMarkerData(data);
    setModalVisible(true);
  }

  const deleteMarker = (id) => {
    let newMarkers = [...markers]
    const markerIndex = newMarkers.findIndex(i => i.id === id);
    newMarkers.splice(markerIndex, 1);
    try {
      storeData(newMarkers)
      setMarkers(newMarkers);
      Alert.alert(
        "Data deteted successfully",
      );
    } catch (error) {
      return Alert.alert(
        "An error occurred on data delete",
        error.toString()
      );
    };
  }
 
  return (
    <View style={styles.container}>
      { 
        markerAddition ?
        <AddMarker 
          markerAddition={setMarkerAddition} 
          coordinates={coordinates} 
          markers={markers}
          updateMarkers={setMarkers}
        />
        :
        isLoading ? 
        <Text>Finding location...</Text> 
        : 
        <>
          <ShowMarkerInfo 
            visible={modalVisible} 
            setModalVisible={setModalVisible}
            data={markerData}
            delete={deleteMarker}
          />
          <MapView style={styles.map}
            mapType='satellite'
            initialRegion={{
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.01,
            }}
          >
            <Markers 
              coordinates={coordinates} 
              markers={markers}
              showMarkerInfo={showMarkersInfo}
            />
          </MapView>
          <View style={styles.buttonContainer}> 
            <Button 
              style={styles.buttonContainer}
              title="Add new marker"
              onPress={() => setMarkerAddition(true)} 
            />
          </View>
        </>
      }
    </View>
  );
}


