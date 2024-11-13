import {StyleSheet} from 'react-native';
import {SCREEN_WIDTH} from './constant';

export const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    margin: 8,
  },
  row: {
    width: '100%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
  },
  deleteBackground: {
    position: 'absolute',
    height: '100%',
    right: 0,
    top: 0,
    bottom: 0,
    width: SCREEN_WIDTH * 0.2,
    backgroundColor: '#FA5F55',
    borderRadius: 5,
    justifyContent: 'center',
  },
  imageBin: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  edit: {
    width: 20,
    height: 20,
  },
});
