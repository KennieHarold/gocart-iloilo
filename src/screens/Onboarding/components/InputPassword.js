import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Item, Input, Icon} from 'native-base';
import {Colors, Fonts} from '../../../styles';
import styles from './styles';
import {AuthAction} from '../../../actions';

const {passwordChange} = AuthAction;

const InputPassword = ({customItemStyles}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const dispatch = useDispatch();
  const passwordValue = useSelector(state => state.auth.password);

  return (
    <Item regular style={[styles.item, {...customItemStyles}]}>
      <Input
        value={passwordValue}
        placeholderTextColor={Colors.readableText}
        placeholder="Password"
        style={{color: Colors.readableText, fontSize: Fonts.size.mini}}
        secureTextEntry={!isShowPassword}
        onChangeText={e => dispatch(passwordChange(e))}
      />
      <TouchableOpacity
        onPress={() => setIsShowPassword(!isShowPassword)}
        activeOpacity={0.7}>
        {isShowPassword ? (
          <Icon
            type="Entypo"
            name="eye"
            style={{
              color: Colors.readableText,
              fontSize: Fonts.size.lightMedium,
            }}
          />
        ) : (
          <Icon
            type="Entypo"
            name="eye-with-line"
            style={{
              color: Colors.readableText,
              fontSize: Fonts.size.lightMedium,
            }}
          />
        )}
      </TouchableOpacity>
    </Item>
  );
};

export default InputPassword;
