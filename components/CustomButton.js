import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const CustomButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={
        props.type == 'main'
          ? styles.appButtonContainerMain
          : styles.appButtonContainerSecondary
      }>
      <Text
        style={
          props.type == 'main'
            ? styles.appButtonTextMain
            : styles.appButtonTextSecondary
        }>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  appButtonContainerMain: {
    elevation: 6,
    backgroundColor: '#31E89F',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  appButtonTextMain: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'RobotoCondensed-Bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  appButtonContainerSecondary: {
    elevation: 6,
    backgroundColor: '#fff',
    borderColor: '#31E89F',
    borderWidth: 2,
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  appButtonTextSecondary: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'RobotoCondensed-Bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});

export default CustomButton;
