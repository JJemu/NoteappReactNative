import React, {useState, useEffect} from 'react';
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';
import {StyleSheet, Text, View} from 'react-native';
import CustomButton from './CustomButton';

const ShowNote = props => {
  const [oldnote, setOldNote] = useState({});
  const [isSelected, setToggleCheckBox] = useState(false);

  class note {
    constructor(title, content, date, notePublic, userID, noteID) {
      this.title = title;
      this.content = content;
      this.date = date;
      this.notePublic = notePublic;
      this.userID = userID;
      this.noteID = noteID;
    }
  }
  const newnote = new note('', '', '', '', '');

  const addFishToList = () => {
    newnote.title = "";
    newnote.content = "";
    newnote.notePublic = isSelected;
    newnote.date = moment().format('yyyy-MM-DD h:mm:ss');
    newnote.userID = props.route.params.userID;
    newnote.noteID = props.route.params.noteID;
  };

  /*   @POST
	@Path("/addnote")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public boolean addNote(Note n) {
		return Dao.addNewNote(n.getTitle(), n.getContent(), n.getDate(), n.isNotePublic(), n.getUserID());
	} */

  const getNote = async () => {
    try {
      addFishToList();
      let response = await fetch(
        'http://10.0.2.2:8080/rest/noteappservice/getnotedetails',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userID: newnote.userID,
            noteID: newnote.noteID,
          }),
        },
      );
      let json = await response.json();
      setOldNote(JSON.parse(JSON.stringify(json.note)));
      setToggleCheckBox(json.note.notePublic);
      //console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNote();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.form}>
          <View style={styles.formTitle}>
            <Text style={styles.header}>Show note</Text>
          </View>
          <Text style={styles.textInput}>{oldnote.title} </Text>
          <Text style={styles.textInputLong}> {oldnote.content} </Text>
          <View style={styles.checkboxContainer}>
            <Text style={styles.inputTitle}>
              Public?
              <CheckBox
                disabled={false}
                value={isSelected}
                onValueChange={newValue => setToggleCheckBox(newValue)}
              />
            </Text>
          </View>
          <View style={styles.formButtons}>
            <View style={styles.formButton}>
              <CustomButton
                title="Back to notes"
                type="main"
                onPress={() => props.navigation.navigate('ListNotes', {userID: props.route.params.currentUserID})}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  logo: {
    bottom: 66.5,
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
    fontSize: 30,
    color: '#000',
  },
  formInput: {
    marginBottom: 15,
  },
  inputTitle: {
    fontFamily: 'RobotoCondensed-Regular',
    color: '#000',
    marginLeft: 10,
    fontSize: 16,
  },
  textInput: {
    borderColor: 'rgba(49, 198, 232, 0.5)',
    borderWidth: 2,
    borderRadius: 15,
    paddingLeft: 10,
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 14,
    marginBottom: 15,
  },
  textInputLong: {
    borderColor: 'rgba(49, 198, 232, 0.5)',
    borderWidth: 2,
    borderRadius: 15,
    paddingLeft: 10,
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 14,
    height: 150,
    marginBottom: 15,
  },
  formButtons: {
    marginTop: 20,
  },
  formButton: {
    marginBottom: 15,
  },
  passwordInput: {
    position: 'relative',
  },
  icon: {
    fontSize: 18,
  },
  iconInInput: {
    position: 'absolute',
    top: 0,
    right: 8,
    bottom: 0,
    justifyContent: 'center',
  },
});

export default ShowNote;
