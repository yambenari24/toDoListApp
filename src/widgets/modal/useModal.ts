import {useCallback, useState} from 'react';

export function useModal() {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = useCallback(function handleOpenModel() {
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(function handleCloseModal() {
    setModalVisible(false);
  }, []);

  return {modalVisible, openModal, closeModal};
}
