import React from 'react';
import {View, StatusBar, SafeAreaView, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Text} from 'native-base';
import styles from './styles';
import {PrimaryBigButton, SocialButton} from '../../components/Buttons';
import {RFValue} from 'react-native-responsive-fontsize';
import {InputEmail, InputPassword, InputConfirmPassword} from './components';
import {ArrowLeft} from '../../components/UIComponents';
import {AuthAction} from '../../actions';

class SignUpScreen extends React.Component {
  render() {
    const {
      navigation,
      signInWithFacebook,
      signInWithGoogle,
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
          <ArrowLeft />
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-evenly',
            }}>
            <View style={{width: '100%', alignItems: 'center'}}>
              <Text style={[styles.welcomeLabel, {marginBottom: RFValue(5)}]}>
                Sign Up
              </Text>
              <Text style={styles.subLabel}>
                Please sign up to continue using our app
              </Text>
            </View>
            <View style={{width: '100%', alignItems: 'center'}}>
              <Text style={[styles.subLabel, {marginBottom: RFValue(20)}]}>
                Continue via social links
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <SocialButton
                  action={() => signInWithFacebook()}
                  social="facebook"
                  customButtonStyles={{width: '48%'}}
                />
                <SocialButton
                  action={() => signInWithGoogle()}
                  social="google"
                  customButtonStyles={{width: '48%'}}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
              }}>
              <Text style={[styles.subLabel, {marginBottom: RFValue(20)}]}>
                Or sign up with email
              </Text>
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
                customContainerStyles={{
                  marginBottom: RFValue(15),
                }}
              />
            </View>
            <View
              style={{
                justifyContent: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={styles.subLabel}>{`Already have an account? `}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
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
