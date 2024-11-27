import {useState, useEffect} from 'react';
import {reaction} from 'mobx';
import {userStore} from '../store/userStore';

const useStore = () => {
  const [initScreen, setInitScreen] = useState(userStore.token);

  useEffect(() => {
    const dispose = reaction(
      () => userStore.token,
      newToken => setInitScreen(newToken),
    );

    return () => dispose();
  }, []);

  return {initScreen};
};
export default useStore;
