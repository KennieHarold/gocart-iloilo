import React from 'react';
import {BottomModalContainer} from '../../../components/Modals';
import {
  PrimaryBigButton,
  SecondaryBigButton,
} from '../../../components/Buttons';
import {RFValue} from 'react-native-responsive-fontsize';

const OptionsModal = ({isVisible, onClose, cancelOrder, order}) => {
  return (
    <BottomModalContainer isVisible={isVisible} onClose={onClose} height={200}>
      <SecondaryBigButton
        text="FAQ"
        customContainerStyles={{marginBottom: RFValue(15)}}
      />
      <PrimaryBigButton
        disabled={order.status === 'cancelled' || order.status === 'delivered'}
        action={cancelOrder ? cancelOrder : () => {}}
        text="Cancel Order"
        customContainerStyles={
          order.status === 'cancelled' || order.status === 'delivered'
            ? {backgroundColor: 'lightgray'}
            : null
        }
      />
    </BottomModalContainer>
  );
};

export default OptionsModal;
