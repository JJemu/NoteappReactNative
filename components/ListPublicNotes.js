import { response } from 'express';
import React, {useState, useEffect} from 'react';
import {AppRegistry, StyleSheet, ActivityIndicator, ListView, Text, View, FlatList,TextInput, Button, Alert, TouchableOpacity } from 'react-native';



const ListPublicNotes = () => {
const [list, addText]=useState();
const [userID, setUserID]=useState();
const [noteID, setNoteID]=useState();
const keyHandler=(item)=>{
  console.log(item.noteID+". "+item.content);
  return item.noteID.toString();
  }
  function setList(list) {
    addText(list);
  }
  const getItem = (noteID, userID) => {
    setUserID(userID);
    setNoteID(noteID);
    /* open note here ? */
    
  }
  const renderText=(item)=>{
    return <View style={styles.appButtonContainerMain}  onPress={()=> getItem(item.item.noteID,item.item.userID)} ><Text>{item.item.title}</Text></View>;
  }

  

  const getNotes = async () => {
    try {
      let response = await fetch(
        'http://10.0.2.2:8080/rest/noteappservice/getpublicnotes',
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
     getNotes();
  }, [])

  return (
    <View style={styles.mainContainer}>
      <View style={styles.center}>
      <Text style={styles.header}>Public notes</Text>
      </View>
      <View style={styles.contentContainer}>
      <FlatList style={styles.form}
          keyExtractor={keyHandler}
          data={list}
          renderItem={renderText}
        />
        
    </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  flatliststyle:{
    width:'80%',
    backgroundColor:'blue',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgba(248, 52, 108, 0.7)',
  },
  center: {
    alignItems: 'center',
    top: 45,
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
  listItemStyle:{
    borderWidth:1,
    borderColor:"blue",
    padding:5,
    backgroundColor:"#abc",
    width:"80%",
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
    fontSize: 40,
    color: '#262424',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  listStyle: {
    flex:8,
    alignItems:"center",
    borderColor:"green",
    borderWidth:2,
    width:"100%",
  },
  textinput: {
    backgroundColor: 'lightblue',
    width: '40%',
    borderColor: 'black',
    borderWidth: 2,
  },
  inputstyle: {
    marginTop:10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonstyle:{
    width:'30%',
  }
});

export default ListPublicNotes;