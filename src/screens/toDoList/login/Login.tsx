import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {useLogin} from './useLogin';

export default function Login() {
  const {userName, password, checkIsValid} = useLogin();

  return (
    <View style={style.screenContainer}>
      <Text style={style.header}>Please enter user name and password</Text>
      <View style={style.container}>
        <TextInput
          style={style.inputContainer}
          onChangeText={text => (userName.current = text)}
        />
        <TextInput
          style={style.inputContainer}
          secureTextEntry={true}
          onChangeText={text => (password.current = text)}
        />
        <Pressable style={style.confirmButton} onPress={checkIsValid}>
          <Text style={style.confirmText}>Confirm</Text>
        </Pressable>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F3F3E0',
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
    backgroundColor: '#608BC1',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#133E87',
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: '#CBDCEB',
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
