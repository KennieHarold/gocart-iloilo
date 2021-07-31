import React from 'react';
import {View} from 'react-native';
import {Text} from 'native-base';
import styles from './styles';

const TermsBox = () => {
  return (
    <View style={styles.termsBoxLayout}>
      <Text style={styles.termsBoxText}>
        By tapping checkout you agree to the Privacy Policy and Terms and
        Conditions of GoCart Iloilo
      </Text>
    </View>
  );
};

export default TermsBox;
