import React from 'react';
import {SafeAreaView, View, StatusBar, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Text} from 'native-base';
import CodeInput from 'react-native-confirmation-code-input';
import {Colors, Fonts, Layout} from '../../styles';
import {RFValue} from 'react-native-responsive-fontsize';
import {ArrowLeft} from '../../components/UIComponents';
import {SharedAction} from '../../actions';
import Snackbar from 'react-native-snackbar';

class PhoneVerifyScreen extends React.Component {
  handleResendVerification = () => {
    const {
      startPhoneVerification,
      resendVerificationTimer,
      allowResend,
      phone,
    } = this.props;

    if (allowResend) {
      startPhoneVerification(phone);
      resendVerificationTimer(60);
      Snackbar.show({
        text: 'Verification code sucessfully sent!',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: Colors.success,
      });
    }
  };

  render() {
    const {
      phone,
      phoneVerifyNextAction,
      checkPhoneVerification,
      allowResend,
      resendSeconds,
    } = this.props;

    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <ArrowLeft />
        <View style={{...Layout.flexCenterContainerWithPadding}}>
          <Text
            style={{
              fontSize: Fonts.size.verySmall,
              fontWeight: '700',
              textAlign: 'center',
            }}>
            We send OTP code to verify your phone number
          </Text>
          <View style={{height: RFValue(100)}}>
            <CodeInput
              ref="codeInputRef"
              keyboardType="phone-pad"
              codeLength={6}
              className={'border-b'}
              activeColor={Colors.readableText}
              inactiveColor={Colors.readableText}
              autoFocus={false}
              ignoreCase={true}
              inputPosition="center"
              onFulfill={code =>
                checkPhoneVerification(phone, code, phoneVerifyNextAction)
              }
              containerStyle={{
                flex: 1,
              }}
              codeInputStyle={{fontSize: Fonts.size.small, fontWeight: '700'}}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: Fonts.size.min,
                color: Colors.readableText,
              }}>
              {"Didn't receive a code? "}
            </Text>
            <TouchableOpacity
              disabled={!allowResend}
              activeOpacity={0.4}
              onPress={this.handleResendVerification}>
              {allowResend ? (
                <Text
                  style={{
                    fontSize: Fonts.size.min,
                    color: Colors.secondary,
                  }}>
                  Resend Here
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: Fonts.size.min,
                    color: Colors.readableText,
                  }}>
                  {`Resend after ${resendSeconds} seconds`}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const {
  startPhoneVerification,
  checkPhoneVerification,
  resendVerificationTimer,
} = SharedAction;

const mapStateToProps = state => {
  const {phone, phoneVerifyNextAction, allowResend, resendSeconds} =
    state.shared;

  return {phone, phoneVerifyNextAction, allowResend, resendSeconds};
};

export default connect(mapStateToProps, {
  startPhoneVerification,
  checkPhoneVerification,
  resendVerificationTimer,
})(PhoneVerifyScreen);
