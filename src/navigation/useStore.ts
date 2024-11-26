import {useState, useEffect} from 'react';
import {reaction} from 'mobx';
import {userStore} from '../store/userStore';

const useStore = () => {
  const [initScreen, setInitScreen] = useState(userStore.userToken);

  useEffect(() => {
    const dispose = reaction(
      () => userStore.userToken,
      newToken => setInitScreen(newToken),
    );

    return () => dispose();
  }, []);

  return {initScreen};
};
export default useStore;
