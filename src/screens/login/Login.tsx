import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {useLogin} from './useLogin';
import {CONFIRM_TITLE, LOGIN_TITLE} from './constants';
import {LoginScreenNavigationProp} from '../../navigation';
import {colors} from '../../theme/colors';

export default function Login({
  navigation,
}: {
  navigation: LoginScreenNavigationProp;
}) {
  const {isValidUser, handleUsernameChange, handlePasswordChange} = useLogin({
    navigation,
  });

  return (
    <View style={style.screenContainer}>
      <Text style={style.header}>{LOGIN_TITLE}</Text>
      <View style={style.container}>
        <TextInput
          style={style.inputContainer}
          onChangeText={handleUsernameChange}
        />
        <TextInput
          style={style.inputContainer}
          secureTextEntry={true}
          onChangeText={handlePasswordChange}
        />
        <Pressable style={style.confirmButton} onPress={isValidUser}>
          <Text style={style.confirmText}>{CONFIRM_TITLE}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginTop: 40,
    marginBottom: 40,
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
  },
  inputContainer: {
    margin: 8,
    width: '60%',
    height: 50,
    backgroundColor: colors.inputBg,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: colors.button,
    width: '30%',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
  },
  confirmText: {
    fontWeight: '600',
  },
});
