import React, {useState, forwardRef, useEffect} from 'react';
import {TextInput, StyleSheet, View, Text} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

// Reference forwading for automatic focus of next input onSubmitEditing
// The reference has to be forwarded, because custom components don't or can't use refs on default
const CustomTextInput = forwardRef((props, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [icon, setIcon] = useState('');
  const [isPassword, setIsPassword] = useState(false);
  const [passHidden, setPassHidden] = useState(true);

  useEffect(() => {
    if (props?.renderIcon) {
      setIcon(props.renderIcon);
    }
  }, [props?.renderIcon]);

  useEffect(() => {
    if (props?.isPassword) {
      setIsPassword(props.isPassword);
    }
  }, [props?.isPassword]);

  return (
    <View style={icon && styles.inputWithIcon}>
      {icon && (
        <View style={[styles.iconInInput, styles.iconLeft]}>
          <Icon name={icon} style={styles.iconInput} />
        </View>
      )}
      <TextInput
        {...props}
        style={[
          styles.textInput,
          props.style,
          isFocused && {borderColor: 'rgba(49, 198, 232, 1)', borderRadius: 5},
          props.error && {borderColor: '#F8346C'},
        ]}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        ref={ref}
        secureTextEntry={isPassword ? passHidden : false}
      />
      {isPassword && (
        <View style={[styles.iconInInput, styles.iconRight]}>
          <Icon
            onPress={() => setPassHidden(!passHidden)}
            name={passHidden ? 'eye' : 'eye-slash'}
            style={styles.iconInputTogglePass}
          />
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  textInput: {
    borderColor: 'rgba(49, 198, 232, 0.5)',
    borderWidth: 2,
    borderRadius: 15,
    paddingLeft: 10,
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 14,
  },
  inputWithIcon: {
    position: 'relative',
  },
  iconInInput: {
    position: 'absolute',
    justifyContent: 'center',
  },
  iconLeft: {
    top: 0,
    left: 8,
    bottom: 0,
  },
  iconRight: {
    top: 0,
    right: 8,
    bottom: 0,
  },
  iconInput: {
    fontSize: 22,
    color: 'rgba(49, 198, 232, 0.8)',
  },
  iconInputTogglePass: {
    fontSize: 18,
    color: 'rgba(0, 0, 0, 0.3)',
  },
});

export default CustomTextInput;
