import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Item, Input, Icon} from 'native-base';
import styles from './styles';
import {AuthAction} from '../../../actions';
import {Colors, Fonts} from '../../../styles';

const {confirmPasswordChange} = AuthAction;

const InputConfirmPassword = ({customItemStyles}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const dispatch = useDispatch();
  const passwordValue = useSelector(state => state.auth.confirmPassword);

  return (
    <Item regular style={[styles.item, {...customItemStyles}]}>
      <Input
        value={passwordValue}
        placeholderTextColor={Colors.readableText}
        placeholder="Confirm Password"
        style={{color: Colors.readableText, fontSize: Fonts.size.mini}}
        secureTextEntry={!isShowPassword}
        onChangeText={e => dispatch(confirmPasswordChange(e))}
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

export default InputConfirmPassword;
