import React from 'react';
import {View, StatusBar, SafeAreaView, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Text} from 'native-base';
import {Colors, Fonts} from '../../styles';
import styles from './styles';
import {PrimaryBigButton, SocialButton} from '../../components/Buttons';
import {ArrowLeft} from '../../components/UIComponents';
import {InputEmail, InputPassword} from './components';
import {RFValue} from 'react-native-responsive-fontsize';
import {AuthAction} from '../../actions';

class LoginScreen extends React.Component {
  render() {
    const {
      navigation,
      email,
      password,
      signInWithFacebook,
      signInWithGoogle,
      signInWithEmailAndPassword,
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
                Log In
              </Text>
              <Text style={styles.subLabel}>
                Please login to continue using our app
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
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '100%', alignItems: 'center'}}>
              <Text style={[styles.subLabel, {marginBottom: RFValue(20)}]}>
                Or login with email
              </Text>
              <InputEmail customItemStyles={{marginBottom: RFValue(10)}} />
              <InputPassword customItemStyles={{marginBottom: RFValue(25)}} />
              <PrimaryBigButton
                disabled={isLoading}
                action={() => signInWithEmailAndPassword(email, password)}
                text="Log In"
                customContainerStyles={{
                  marginBottom: RFValue(20),
                }}
              />
              <TouchableOpacity activeOpacity={0.7}>
                <Text
                  style={{
                    color: Colors.secondary,
                    fontSize: Fonts.size.mini,
                  }}>
                  Forget Password?
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={styles.subLabel}>{"Don't have an account? "}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Signup')}
                activeOpacity={0.7}>
                <Text style={styles.link}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const {signInWithFacebook, signInWithGoogle, signInWithEmailAndPassword} =
  AuthAction;

const mapStateToProps = state => {
  const {isLoading} = state.modalAlert;
  const {email, password} = state.auth;

  return {email, password, isLoading};
};

export default connect(mapStateToProps, {
  signInWithFacebook,
  signInWithGoogle,
  signInWithEmailAndPassword,
})(LoginScreen);
