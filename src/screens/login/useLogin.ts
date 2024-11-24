import '@react-native-firebase/app';
import {LoginScreenNavigationProp} from '../../navigation';
import {userStore} from '../../store/userStore';

export function useLogin({
  navigation,
}: {
  navigation: LoginScreenNavigationProp;
}) {
  const handlePressConfirm = () => {
    userStore.login(() => {
      navigation.navigate('FlatListToDoList');
    });
  };

  const handleUsernameChange = (username: string) => {
    userStore.setUserName(username);
  };

  const handlePasswordChange = (password: string) => {
    userStore.setPassword(password);
  };
  return {
    handlePressConfirm,
    handleUsernameChange,
    handlePasswordChange,
  };
}
