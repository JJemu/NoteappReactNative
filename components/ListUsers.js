import { response } from 'express';
import React, {useState, useEffect} from 'react';
import {AppRegistry, StyleSheet, ActivityIndicator, ListView, Text, View, FlatList,TextInput, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';

const App = () => {
const [newText, setText]=useState();
const [list, addText]=useState();
const addTextToList=()=>{
  addText(list=>[...list, {"userID":"1", "username":"test", "Password":"test"}]);
}
const inputHandler=(enteredText)=>{
  setText(enteredText)
}
const keyHandler=(item)=>{
  console.log(item.userID+". "+item.username);
  return item.userID.toString();
}

  function setList(list) {
    addText(list);
  }

  const renderText=(item)=>{
    console.log("list: "+item.item.id);
    return <View style={styles.appButtonContainerMain}><Text>{item.item.username}</Text></View>;
  }

  
  const getUsers = async () => {
    try {
      let response = await fetch(
        'http://10.0.2.2:8080/rest/noteappservice/getusers',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({userID: '-1'}),
        },
      );

      let json = await response.json();
      console.log(json);
      setList(json);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() =>
  {
     getUsers();
  }, [])

  return (
    <View style={styles.mainContainer}>

    <Text style={styles.header}>Users</Text>

      
      <View style={styles.contentContainer}>
      <FlatList style={styles.form}
          keyExtractor={keyHandler}
          data={list}
          renderItem={renderText}
        />
        
    </View>
    </View>
    
  );



}

const styles = StyleSheet.create({
  flatliststyle:{
    width:'80%',
    backgroundColor:'blue',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgba(248, 52, 108, 0.7)',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    top: 110,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
  },
  appButtonContainerMain: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    backgroundColor: '#31E89F',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginTop: 4,
  },
  form: {
    flex: 1,
    width: 220,
  },
  formTitle: {
    alignItems: 'center',
    bottom: 30,
  },
  header: {
    fontFamily: 'RobotoCondensed-Bold',
    fontSize: 45,
    color: '#000',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default App;