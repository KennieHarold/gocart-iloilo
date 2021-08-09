import React from 'react';
import {View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Textarea, Text} from 'native-base';
import {Fonts, Layout} from '../../../styles';
import {BottomModalContainer} from '../../../components/Modals';
import {SharedAction} from '../../../actions';

const {changeFormattedAddress} = SharedAction;

const EditAddressModal = ({isVisible, onClose}) => {
  const dispatch = useDispatch();

  const address = useSelector(state => state.shared.address);

  return (
    <BottomModalContainer height={300} isVisible={isVisible} onClose={onClose}>
      <View style={{flex: 1, width: '100%'}}>
        <Text
          style={{
            fontWeight: '700',
            fontSize: Fonts.size.small,
            marginBottom: Layout.defaultPaddingNum,
          }}>
          Edit Address
        </Text>
        <Textarea
          rowSpan={5}
          bordered
          placeholder="Address"
          value={address.formattedAddress}
          onChangeText={text => dispatch(changeFormattedAddress(text))}
          returnKeyType="done"
          onSubmitEditing={onClose}
        />
      </View>
    </BottomModalContainer>
  );
};

export default React.memo(EditAddressModal);
