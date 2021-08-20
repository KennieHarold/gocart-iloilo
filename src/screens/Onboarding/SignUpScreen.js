import React from 'react';
import {View, StatusBar, SafeAreaView, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Text} from 'native-base';
import styles from './styles';
import {PrimaryBigButton} from '../../components/Buttons';
import {RFValue} from 'react-native-responsive-fontsize';
import {InputEmail, InputPassword, InputConfirmPassword} from './components';
import {AuthAction} from '../../actions';
import FastImage from 'react-native-fast-image';
import banner from '../../assets/banner.jpg';
import logo from '../../assets/logo.png';
import {Layout} from '../../styles';

class SignUpScreen extends React.Component {
  render() {
    const {
      navigation,
      signUpWithEmailAndPassword,
      email,
      password,
      confirmPassword,
      isLoading,
    } = this.props;

    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <View style={styles.onboardingContainer}>
          <FastImage
            source={banner}
            resizeMode={FastImage.resizeMode.stretch}
            style={{
              height: RFValue(200),
            }}
          />
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              marginTop: RFValue(-50),
            }}>
            <View style={styles.logoOverLay}>
              <FastImage
                source={logo}
                style={{
                  height: RFValue(100),
                  width: RFValue(100),
                }}
              />
            </View>
          </View>
          <View style={{...Layout.defaultPadding}}>
            <InputEmail customItemStyles={{marginBottom: RFValue(10)}} />
            <InputPassword customItemStyles={{marginBottom: RFValue(10)}} />
            <InputConfirmPassword
              customItemStyles={{marginBottom: RFValue(25)}}
            />
            <PrimaryBigButton
              disabled={isLoading}
              action={() =>
                signUpWithEmailAndPassword(email, password, confirmPassword)
              }
              text="Sign Up"
            />
          </View>
          <View style={styles.footer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={styles.subLabel}>{'Already have an account? '}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Onboarding')}
                activeOpacity={0.7}>
                <Text style={styles.link}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const {signUpWithEmailAndPassword, signInWithFacebook, signInWithGoogle} =
  AuthAction;

const mapStateToProps = state => {
  const {isLoading} = state.modalAlert;
  const {email, password, confirmPassword} = state.auth;
  return {
    isLoading,
    email,
    password,
    confirmPassword,
  };
};

export default connect(mapStateToProps, {
  signInWithFacebook,
  signInWithGoogle,
  signUpWithEmailAndPassword,
})(SignUpScreen);
