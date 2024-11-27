import {RouteProp} from '@react-navigation/native';
import {NavigationParam} from '../../navigation';

export type EditModalProps = {
  onPress: (text: string) => void;
  closeModal: () => void;
  currentText: string;
};

export type EditModalRouteProp = RouteProp<NavigationParam, 'EditModal'>;
