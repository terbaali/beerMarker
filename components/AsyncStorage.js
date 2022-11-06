import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@markers_Key';

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      return "Data saved successfully";
    } catch (error) {
      return "Error adding data: ", error.toString();
    };
  };
 
  const getData = async () => {
    try {
      return AsyncStorage.getItem(STORAGE_KEY)
      .then(response => JSON.parse(response))
      .then(data => {
        if (data === null) data = [];
        return data;
      }).catch (error => {
        return error.toString()
      });
    } catch (error) {
      return error.toString()
    };
  };

  export {
    getData,
    storeData
  }