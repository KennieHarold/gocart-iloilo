import React from 'react';
import {View, StatusBar, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import {Text} from 'native-base';
import {ArrowLeft} from '../../components/UIComponents';
import {PrimaryTextBox} from '../../components/TextBoxes';
import {Fonts} from '../../styles';
import {RFValue} from 'react-native-responsive-fontsize';
import {PrimaryBigButton} from '../../components/Buttons';
import {AuthAction} from '../../actions';

class ForgetPasswordScreen extends React.Component {
  render() {
    const {resetEmailChange, resetEmail, resetPassword} = this.props;

    return (
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <ArrowLeft />
        <View
          style={{
            padding: RFValue(25),
            marginTop: RFValue(50),
          }}>
          <Text style={{fontSize: Fonts.size.big, fontWeight: '700'}}>
            Reset Password
          </Text>
          <Text
            note
            style={{marginTop: RFValue(15), marginBottom: RFValue(25)}}>
            Enter the email associated with your account and we'll send an email
            to reset your password
          </Text>
          <PrimaryTextBox
            value={resetEmail}
            title="Email address"
            placeholder="Enter your email address"
            onChangeText={text => resetEmailChange(text)}
          />
          <PrimaryBigButton
            action={() => resetPassword(resetEmail)}
            text="Send Recovery Email"
            customContainerStyles={{marginTop: RFValue(25)}}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const {resetEmailChange, resetPassword} = AuthAction;

const mapStateToProps = state => {
  const {resetEmail} = state.auth;

  return {resetEmail};
};

export default connect(mapStateToProps, {resetEmailChange, resetPassword})(
  ForgetPasswordScreen,
);
