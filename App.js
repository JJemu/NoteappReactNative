import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Icon from 'react-native-vector-icons/Ionicons';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

import SignUpScreen from './components/SignUpScreen';
import SignInScreen from './components/SignInScreen';
import ShowNote from './components/ShowNote';
import AddNote from './components/AddNote';
import Modify from './components/Modify';
import ListNotes from './components/ListNotes';
import ShareNote from './components/ShareNote';

// Customized toasts
const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{elevation: 10, borderLeftColor: '#31E89F'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 14,
        fontFamily: 'RobotoCondensed-Bold',
      }}
      text2Style={{
        fontSize: 13,
        fontFamily: 'RobotoCondensed-Regular',
      }}
      renderTrailingIcon={() => (
        <Icon
          style={styles.toastIcon}
          name="close"
          onPress={() => props.hide()}
        />
      )}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      style={{elevation: 10, borderLeftColor: '#F8346C'}}
      text1Style={{
        fontSize: 14,
        fontFamily: 'RobotoCondensed-Bold',
      }}
      text2Style={{
        fontSize: 13,
        fontFamily: 'RobotoCondensed-Regular',
      }}
      renderTrailingIcon={() => (
        <Icon
          style={styles.toastIcon}
          name="close"
          onPress={() => props.hide()}
        />
      )}
    />
  ),
};

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <View style={styles.mainContainer}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignInScreen">
          <Stack.Screen
            name="SignInScreen"
            component={SignInScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddNote"
            component={AddNote}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ModifyNote"
            component={Modify}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ShowNote"
            component={ShowNote}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ListNotes"
            component={ListNotes}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ShareNote"
            component={ShareNote}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} position="bottom" bottomOffset={20} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  toastIcon: {
    fontSize: 24,
    alignSelf: 'center',
    marginRight: 10,
  },
});

export default App;
