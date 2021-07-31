import React from 'react';
import {Item, Input} from 'native-base';
import styles from './styles';
import {Colors, Fonts} from '../../../styles';
import {useSelector, useDispatch} from 'react-redux';
import {AuthAction} from '../../../actions';

const {emailChange} = AuthAction;

const InputEmail = ({customItemStyles}) => {
  const dispatch = useDispatch();
  const emailValue = useSelector(state => state.auth.email);

  return (
    <Item regular style={[styles.item, {...customItemStyles}]}>
      <Input
        value={emailValue}
        placeholderTextColor={Colors.readableText}
        placeholder="Email"
        style={{color: Colors.readableText, fontSize: Fonts.size.mini}}
        keyboardType="email-address"
        onChangeText={e => dispatch(emailChange(e))}
      />
    </Item>
  );
};

export default InputEmail;
