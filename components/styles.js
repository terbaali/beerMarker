import { StyleSheet, Dimensions } from "react-native";
import Constants from 'expo-constants'

export default StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - Constants.statusBarHeight,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '2%',
    alignSelf: 'center'
  },
  modalContainer: {
    flex: 1,
    position: 'absolute',
    bottom: '5%',
    alignSelf: 'center'
  },
  modal: {
    width: Dimensions.get('window').width * 0.75,
    height: Dimensions.get('window').height * 0.32,
    alignSelf: 'center',
    marginTop: 100,
    padding: 20,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#333',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 4
  },
  backButton: {
    width: '115%',
    position: 'relative',
    bottom: 0,
  },
  deleteButton: {
    padding: 10,
  },
  positionMap: {
    width: Dimensions.get('window').width - 50,
    height: Dimensions.get('window').height * 0.4,
  },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    bottom:0,
    alignSelf: 'center',
  },
  inputContainer: {
    flex: 1,
    marginBottom: 50,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 5,
    color: '#2196F3',
    fontFamily: 'serif',
  },
  calloutContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  markerText: {
    fontWeight: 'bold'
  },
  markerSubText: {
    fontSize: 8
  },
  label: {
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightblue',
    borderRadius: 3,
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
});