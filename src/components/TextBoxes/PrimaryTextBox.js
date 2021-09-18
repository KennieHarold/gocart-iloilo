import React, {useState} from 'react';
import {Item, Input, Text} from 'native-base';
import {Colors, Fonts} from '../../styles';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import styles from './styles';

const PrimaryTextBox = ({
  title,
  placeholder,
  customItemStyles,
  value,
  onChangeText,
  isPassword,
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <Item regular style={[styles.item, {...customItemStyles}]}>
        <Input
          value={value}
          placeholder={placeholder}
          style={styles.input}
          onChangeText={onChangeText}
          secureTextEntry={isPassword && !isShowPassword}
        />
        {isPassword ? (
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
        ) : null}
      </Item>
    </>
  );
};

export default PrimaryTextBox;
