import { Text, Modal, View, Alert, Button } from 'react-native';
import React from 'react';
import styles from './styles'

export default function ShowMarkerInfo(props) {
  
  const onDeleteClick = () => {
    Alert.alert(
      "Delete marker",
      "Do you really want to delete this marker and saved data?",
    [
      {
        text: "NO"
      },
      {
        text: "YES",
        onPress: () => {[props.delete(props.data.id), props.setModalVisible(false)]}
      }
    ]
    );
  }

  return (
    <View  style={styles.modalContainer}> 
      <Modal
        visible={props.visible} 
        onRequestClose={() => props.setModalVisible(false)}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.modal}>
          <Text>Name: {props.data.name}</Text>
          <Text>Type: {props.data.type}</Text>
          <Text>Alcohol vol.: {props.data.alc}%</Text>
          <Text>Description: {props.data.description}</Text>
          <Text>Place: {props.data.place}</Text>
          <Text>Price: {props.data.price}€</Text>
          <Text>Date added: {props.data.date}</Text>
          <View style={styles.deleteButton}>
            <Button 
              style={styles.backButton}
              color="red"
              title="Delete"
              onPress={() => onDeleteClick()}
            />
          </View>
          <View style={styles.backButton}>
            <Button
              title="return"
              onPress={() => {props.setModalVisible(false)}}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
