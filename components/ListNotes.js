import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import NoteListItem from './NoteListItem';

const ListNotes = props => {
  const [newText, setText] = useState();
  const [list, addText] = useState();

  const [publicList, addPublicText] = useState();

  function setList(list) {
    addText(list);
  }

  function setPublicList(list) {
    addPublicText(list);
  }

  const keyHandler = item => {
    return item.noteID.toString();
  };

  const renderText = item => {
    return (
      <View style={styles.noteListItem}>
        <NoteListItem item={item} navigation={props.navigation} noteID={item.item.noteID} userID={item.item.userID} currentUserID={props.route.params.userID}>
          <View style={styles.noteListOpened}>
            <Text style={styles.noteListContent}>{item.item.content}</Text>
            <View style={styles.noteListIcons}>
              {item.item.userID == props.route.params.userID && (
                <Icon
                  style={styles.noteListIcon}
                  name="edit"
                  onPress={() =>
                    props.navigation.navigate('ModifyNote', {
                      userID: props.route.params.userID,
                      noteID: item.item.noteID,
                      title: item.item.title,
                      content: item.item.content,
                      notePublic: item.item.notePublic
                    })
                  }
                />
              )}
              {!item.item.notePublic &&
                item.item.userID == props.route.params.userID && (
                  <Icon
                    style={styles.noteListIcon}
                    name="share"
                    onPress={() =>
                      props.navigation.navigate('ShareNote', {
                        userID: props.route.params.userID,
                        noteID: item.item.noteID,
                      })
                    }
                  />
                )}
            </View>
          </View>
        </NoteListItem>
      </View>
    );
  };

  const getNotes = async () => {
    try {
      let response = await fetch(
        'http://10.0.2.2:8080/rest/noteappservice/getusernotes',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({userID: props.route.params.userID}), // VAIHDA NUMERO OIKEAAN USERID
        },
      );

      let json = await response.json();
      setList(json);
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  const getPublicNotes = async () => {
    try {
      let response = await fetch(
        'http://10.0.2.2:8080/rest/noteappservice/getpublicnotes',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({userID: props.route.params.userID}),
        },
      );

      let json = await response.json();
      console.log(json);
      setPublicList(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotes();
    getPublicNotes();
    if(props.route.params?.modified) {
      props.route.params.modified = false;
    }
  }, [props.route.params?.modified]);

  return (
    <View style={styles.componentContainer}>
      <View style={styles.center}>
        <Text style={styles.header}>Notes</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.list}>
          <View style={styles.listHeaderWithIcon}>
            <Text style={styles.listHeader}>Own notes</Text>
            <Icon style={styles.listHeaderIcon} name="plus" onPress={() => props.navigation.navigate("AddNote", {userID: props.route.params.userID})}/>
          </View>
          <FlatList
            keyExtractor={keyHandler}
            data={list}
            renderItem={renderText}
          />
        </View>
        <View style={styles.list}>
          <View>
            <Text style={styles.listHeader}>Public notes</Text>
          </View>
          <FlatList
            keyExtractor={keyHandler}
            data={publicList}
            renderItem={renderText}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  componentContainer: {
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
  header: {
    fontFamily: 'RobotoCondensed-Bold',
    fontSize: 40,
    color: '#000',
  },
  list: {
    alignSelf: 'stretch',
    marginBottom: 20,
    paddingHorizontal: 40,
    marginTop: 10,
  },
  listHeaderWithIcon: {
    flexDirection: 'row',
  },
  listHeader: {
    fontSize: 20,
    color: '#000',
  },
  listHeaderIcon: {
    marginLeft: 'auto',
    fontSize: 18,
    alignSelf: 'center',
    color: '#31E89F'
  },
  noteListItem: {
    paddingTop: 5,
  },
  noteListOpened: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  noteListContent: {
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 15,
    color: '#3d3d3d',
  },
  noteListIcons: {
    marginLeft: 'auto',
    flexDirection: 'row',
    gap: 20,
  },
  noteListIcon: {
    fontSize: 20,
    color: 'rgba(49, 198, 232, 1)',
  },
});

export default ListNotes;
