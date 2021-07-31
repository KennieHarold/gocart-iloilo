import React from 'react';
import {View, Modal, ActivityIndicator, StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import {Layout, Colors} from '../../styles';
import styles from './styles';

const LoadingModal = () => {
  const isVisible = useSelector(
    state => state.modalAlert.showSimpleLoadingModal,
  );

  return (
    <Modal transparent visible={isVisible}>
      <StatusBar barStyle="dark-content" backgroundColor="rgba(0, 0, 0, 0.3)" />
      <View
        style={{
          ...Layout.flexCenterContainer,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }}>
        <View style={{...styles.container, width: '30%'}}>
          <View style={{width: '100%', alignItems: 'center'}}>
            <ActivityIndicator color={Colors.primary} size="large" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;
