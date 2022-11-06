import { Text, View, Button, ScrollView, TextInput, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import React, { useState } from 'react';
import { storeData } from './AsyncStorage';
import moment from 'moment';
import styles from './styles'


export default function AddMarker(props) {

  const [coordinates, setCoordinates] = useState(props.coordinates)
  const [place, setPlace] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [alc, setAlc] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');

  const inputCheck = () => {
    const chekList = [];
    if (place === '') chekList.push("Place");
    if (name === '') chekList.push("Product name");
    if (type === '') chekList.push("Product type");
    if (alc === '' || alc < 0) chekList.push("Alc vol");
    if (price === '' || price < 0) chekList.push("Price");
    if (description === '') chekList.push("Description");
    if (rating === '' || rating > 5 || rating < 1) chekList.push("Rating");
    return chekList;
  }

  const onSaveHandler = () => {
    const inputErrorList = inputCheck();
    if (inputErrorList.length !== 0) {
      return Alert.alert(
        "An error occurred on save",
        "Please check inputflields: " + inputErrorList
      );
    };
    
    const newMarker = {
      id: props.markers.length === 0 ? 1 : props.markers[props.markers.length-1].id+1,
      coordinate: coordinates,
      place: place,
      name: name,
      type: type,
      alc: alc,
      price: price,
      description: description,
      rating: rating,
      date: moment().format('LL').toString()
    }
    const updateMarkers = [...props.markers,newMarker];
    
    props.updateMarkers(updateMarkers);
    storeData(updateMarkers).then(status => {
      Alert.alert(
        status.toString(),
        " ",
      [
        {
          text: "OK",
          onPress: () => {props.markerAddition(false)}
        }
      ]
      );
    })
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add a new memory of refreshing beverages</Text>
      <ScrollView>
        <View>
          <Text >Set location:</Text>
          <MapView 
            style={styles.positionMap}
            mapType='satellite'
            region={{
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              key={1}
              coordinate={coordinates} 
              title="New marker location"
              description="You can drag and adjust the location"
              draggable
              onDragEnd={(e) => setCoordinates({latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude})}
            />
          </MapView>
        </View >
        <View style={styles.inputContainer}> 
          <Text>Place:</Text>
          <TextInput 
            value={place} 
            style={styles.input} onChangeText={text => setPlace(text)} 
            placeholder='Enter place name' 
            keyboardType='default'
          />
          <Text>Product name:</Text>
          <TextInput 
            value={name} 
            style={styles.input} onChangeText={text => setName(text)} 
            placeholder='Enter products name' 
            keyboardType='default'
          />
          <Text>Product type:</Text>
          <TextInput 
            value={type} 
            style={styles.input} onChangeText={text => setType(text)} 
            placeholder='Enter products type' 
            keyboardType='default'
          />
          <Text>Alc vol:</Text>
          <TextInput 
            value={alc} 
            style={styles.input} onChangeText={text => setAlc(text)} 
            placeholder='Enter alcohol percentage' 
            keyboardType='decimal-pad'
          />
          <Text>Price:</Text>
          <TextInput 
            value={price} 
            style={styles.input} onChangeText={text => setPrice(text)} 
            placeholder='Enter price' 
            keyboardType='decimal-pad'
          />
           <Text>Description:</Text>
          <TextInput 
            value={description} 
            style={styles.input} onChangeText={text => setDescription(text)} 
            placeholder='What was the drink like?' 
            keyboardType='default'
          />
           <Text>Rating:</Text>
          <TextInput 
            value={rating} 
            style={styles.input} onChangeText={text => setRating(text)} 
            placeholder='Enter rating 1-5' 
            keyboardType='decimal-pad'
          />
          <Button 
            style={styles.saveButton}
            color="#1E6738"
            title="SAVE"
            onPress={() => onSaveHandler()}
          />
        </View> 
      </ScrollView>
      <View style={styles.buttonContainer}> 
        <Button 
          style={styles.backButton}
          title="return"
          onPress={() => props.markerAddition(false)}
        />
      </View>   
    </View>
  )
}
