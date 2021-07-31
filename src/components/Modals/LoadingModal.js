import React from 'react';
import {View, Modal, ActivityIndicator, StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import {Text} from 'native-base';
import {Layout, Colors} from '../../styles';
import styles from './styles';

const LoadingModal = () => {
  const isVisible = useSelector(
    state => state.modalAlert.showLoadingProps.isLoading,
  );

  const text = useSelector(state => state.modalAlert.showLoadingProps.text);

  return (
    <Modal transparent visible={isVisible}>
      <StatusBar barStyle="dark-content" backgroundColor="rgba(0, 0, 0, 0.3)" />
      <View
        style={{
          ...Layout.flexCenterContainer,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }}>
        <View style={styles.container}>
          <View
            style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
            <ActivityIndicator color={Colors.primary} size="large" />
            <Text style={styles.text}>{text}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;
