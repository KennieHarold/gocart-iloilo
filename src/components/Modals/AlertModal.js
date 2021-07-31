import React from 'react';
import {View, Modal, TouchableOpacity, StatusBar} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Text, Icon} from 'native-base';
import {Layout, Colors, Fonts} from '../../styles';
import styles from './styles';
import {ModalAlertAction} from '../../actions';

const {showAlert} = ModalAlertAction;

const AlertModal = () => {
  const props = useSelector(state => state.modalAlert.showAlertProps);
  const {isDisplayed, text, actionText, status, allowClose, action} = props;
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(
      showAlert({
        isDisplayed: false,
        text: '',
        actionText: '',
        action: () => {},
        status: 'info',
      }),
    );
  };

  return (
    <Modal transparent visible={isDisplayed}>
      <StatusBar barStyle="dark-content" backgroundColor="rgba(0, 0, 0, 0.3)" />
      <View
        style={[
          Layout.flexCenterContainer,
          {backgroundColor: 'rgba(0, 0, 0, 0.3)'},
        ]}>
        <View style={styles.container}>
          {status === 'info' ? (
            <Icon
              type="AntDesign"
              name="infocirlceo"
              style={[styles.statusIcon, {color: Colors.secondary}]}
            />
          ) : status === 'error' ? (
            <Icon
              type="MaterialIcons"
              name="error-outline"
              style={[styles.statusIcon, {color: Colors.error}]}
            />
          ) : status === 'success' ? (
            <Icon
              type="Feather"
              name="check-circle"
              style={[styles.statusIcon, {color: Colors.success}]}
            />
          ) : (
            <Icon
              type="AntDesign"
              name="infocirlceo"
              style={styles.statusIcon}
            />
          )}
          {allowClose ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={closeModal}
              style={styles.closeLayout}>
              <Icon
                type="AntDesign"
                name="close"
                style={{
                  color: Colors.readableText,
                  fontSize: Fonts.size.medium,
                }}
              />
            </TouchableOpacity>
          ) : null}
          <View style={{width: '100%'}}>
            <Text
              style={{
                color: Colors.readableText,
                fontSize: Fonts.size.verySmall,
              }}>
              {text && text != '' ? text : 'Happy Shopping'}
            </Text>
          </View>
          {actionText && actionText !== undefined && actionText !== '' ? (
            <View style={styles.actionButtonLayout}>
              <TouchableOpacity
                onPress={() => {
                  action();
                  closeModal();
                }}
                activeOpacity={0.6}>
                <Text
                  style={{
                    color: Colors.secondary,
                    fontWeight: '700',
                    fontSize: Fonts.size.verySmall,
                    textTransform: 'uppercase',
                  }}>
                  {actionText}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

export default AlertModal;
