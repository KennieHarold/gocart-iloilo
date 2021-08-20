import React from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {Colors, Fonts, Layout} from '../../styles';
import styles from './styles';
import {PrimaryBigButton, SocialButton} from '../../components/Buttons';
import FastImage from 'react-native-fast-image';
import logo from '../../assets/logo.png';
import {RFValue} from 'react-native-responsive-fontsize';
import {AuthAction} from '../../actions';
import banner from '../../assets/banner.jpg';
import {InputEmail, InputPassword} from './components';

class OnboardingScreen extends React.Component {
  render() {
    const {
      navigation,
      signInWithFacebook,
      signInWithGoogle,
      email,
      password,
      signInWithEmailAndPassword,
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
          <View style={{width: '100%', alignItems: 'center', marginTop: -50}}>
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
            <InputPassword customItemStyles={{marginBottom: RFValue(25)}} />
            <PrimaryBigButton
              disabled={isLoading}
              action={() => signInWithEmailAndPassword(email, password)}
              text="Log In"
            />
          </View>
          <View
            style={{
              paddingHorizontal: Layout.defaultPaddingNum,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: Fonts.size.verySmall,
                color: Colors.readableText,
                fontWeight: '700',
              }}>
              OR
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: 25,
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
          <View style={styles.footer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <Text style={styles.subLabel}>{"Don't have an account? "}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Signup')}
                activeOpacity={0.7}>
                <Text style={styles.link}>Sign Up</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.link}>Forget Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const {signInWithFacebook, signInWithGoogle} = AuthAction;

const mapStateToProps = state => {
  const {isLoading} = state.modalAlert;
  const {email, password} = state.auth;

  return {email, password, isLoading};
};

export default connect(mapStateToProps, {
  signInWithFacebook,
  signInWithGoogle,
})(OnboardingScreen);
