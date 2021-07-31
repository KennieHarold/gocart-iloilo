import React from 'react';
import {View, TouchableOpacity, StatusBar} from 'react-native';
import Modal from 'react-native-modal';
import {Icon} from 'native-base';
import {Colors, Fonts} from '../../styles';
import styles from './styles';

const BottomModalContainer = ({children, isVisible, onClose}) => {
  return (
    <Modal style={{margin: 0}} animationType="slide" visible={isVisible}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="rgba(0, 0, 0, 0.3)" /> */}
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          //backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }}>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onClose}
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
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default BottomModalContainer;
