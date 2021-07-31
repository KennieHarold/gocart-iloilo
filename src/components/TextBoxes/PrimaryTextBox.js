import React from 'react';
import {Item, Input, Text} from 'native-base';
import styles from './styles';

const PrimaryTextBox = ({
  title,
  placeholder,
  customItemStyles,
  value,
  onChangeText,
}) => {
  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <Item regular style={[styles.item, {...customItemStyles}]}>
        <Input
          value={value}
          placeholder={placeholder}
          style={styles.input}
          onChangeText={onChangeText}
        />
      </Item>
    </>
  );
};

export default PrimaryTextBox;
