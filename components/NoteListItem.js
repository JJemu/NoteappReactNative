import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Collapsible from 'react-native-collapsible';
import moment from 'moment';

const NoteListItem = ({children, item, navigation, noteID, userID, currentUserID}) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <View>
      <TouchableOpacity onPress={() => setCollapsed(!collapsed)} onLongPress={() => navigation.navigate("ShowNote", {noteID: noteID, userID: userID, currentUserID: currentUserID})}>
      <View style={styles.noteListItemInfo}>
          <Text style={styles.noteListTitle}>{item.item.title}</Text>
          <Text style={styles.noteListDate}>
            {moment(item.item.date).format('DD.MM.YYYY')}
          </Text>
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed}>{children}</Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  noteListItemInfo: {
    flex: 1,
    flexDirection: 'row',
  },
  noteListTitle: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'RobotoCondensed-Regular',
  },
  noteListDate: {
    marginLeft: 'auto',
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 14,
    color: '#595959'
  },
});

export default NoteListItem;
