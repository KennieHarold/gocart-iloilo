import React from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {Layout} from '../../styles';
import styles from './styles';
import {PrimaryBigButton, SocialButton} from '../../components/Buttons';
import FastImage from 'react-native-fast-image';
import logo from '../../assets/logo.png';
import {RFValue} from 'react-native-responsive-fontsize';
import {AuthAction} from '../../actions';

class OnboardingScreen extends React.Component {
  render() {
    const {navigation, signInWithFacebook, signInWithGoogle} = this.props;

    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />

        <View style={styles.onboardingContainer}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <FastImage
              source={logo}
              style={{
                height: RFValue(100),
                width: RFValue(100),
              }}
            />

            <View style={{alignItems: 'center', marginTop: RFValue(15)}}>
              <Text style={styles.welcomeLabel}>Welcome</Text>
              <Text style={styles.subLabel}>
                Please login or signup to continue using our app
              </Text>
            </View>

            <View style={{marginTop: RFValue(25)}}>
              <Text style={styles.brandLabel}>GoCart Iloilo</Text>
            </View>
          </View>
          <View style={Layout.flexCenterContainer}>
            <View
              style={{
                flex: 9,
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
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
              <View style={{width: '100%', alignItems: 'center'}}>
                <Text style={[styles.subLabel, {marginBottom: RFValue(20)}]}>
                  Or signup with email
                </Text>
                <PrimaryBigButton
                  action={() => navigation.navigate('Signup')}
                  text="Sign Up"
                  customContainerStyles={{
                    marginBottom: RFValue(20),
                  }}
                />
              </View>
            </View>
            <View style={{flex: 2, justifyContent: 'flex-end'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={styles.subLabel}>
                  {'Already have an account? '}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Login')}
                  activeOpacity={0.7}>
                  <Text style={styles.link}>Log In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const {signInWithFacebook, signInWithGoogle} = AuthAction;

export default connect(null, {
  signInWithFacebook,
  signInWithGoogle,
})(OnboardingScreen);
