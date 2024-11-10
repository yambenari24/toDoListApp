import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    position: 'absolute',
    backgroundColor: 'grey',
    width: '80%',
    height: '50%',
    borderRadius: 8,
  },
  inputContainer: {
    top: 16,
    bottom: 16,
    margin: 8,
    padding: 8,
    width: '100%',
  },
  xButton: {
    top: 20,
    left: 20,
    width: 24,
    height: 24,
  },
  buttonContainer: {
    marginTop: 'auto',
    marginBottom: 16,
  },
});
