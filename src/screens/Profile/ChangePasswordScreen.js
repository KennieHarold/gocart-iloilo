import React from 'react';
import {connect} from 'react-redux';
import {TouchableOpacity, StatusBar, View} from 'react-native';
import {Container, Content, Text} from 'native-base';
import {ScreenHeader} from '../../components/Headers';
import styles from './styles';
import {Layout, Colors, Fonts} from '../../styles';
import PrimaryTextBox from '../../components/TextBoxes/PrimaryTextBox';
import {RFValue} from 'react-native-responsive-fontsize';
import {AuthAction} from '../../actions';

class ChangePasswordScreen extends React.Component {
  componentWillUnmount() {
    this.resetFields();
  }

  resetFields = () => {
    this.props.settingsPassChange('');
    this.props.settingsNewPassChange('');
    this.props.settingsConfirmPassChange('');
  };

  render() {
    const {
      provider,
      settingsPassChange,
      settingsNewPassChange,
      settingsConfirmPassChange,
      changePassword,
      settingsPass,
      settingsConfirmPass,
      settingsNewPass,
    } = this.props;

    return (
      <Container>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <ScreenHeader
          title="Change Password"
          rightKey={
            <TouchableOpacity
              onPress={() =>
                changePassword(
                  settingsPass,
                  settingsNewPass,
                  settingsConfirmPass,
                )
              }
              activeOpacity={0.6}>
              <Text style={styles.editMyProfileSave}>Save</Text>
            </TouchableOpacity>
          }
        />
        <Content>
          {provider === 'password' ? (
            <View style={{...Layout.defaultPadding}}>
              <PrimaryTextBox
                value={settingsPass}
                title="Your old password"
                placeholder="Your old password"
                isPassword={true}
                customItemStyles={{marginBottom: RFValue(10)}}
                onChangeText={text => settingsPassChange(text)}
              />
              <PrimaryTextBox
                value={settingsNewPass}
                title="New password"
                placeholder="New password"
                isPassword={true}
                customItemStyles={{marginBottom: RFValue(10)}}
                onChangeText={text => settingsNewPassChange(text)}
              />
              <PrimaryTextBox
                value={settingsConfirmPass}
                title="Confirm new password"
                placeholder="Confirm new password"
                isPassword={true}
                customItemStyles={{marginBottom: RFValue(10)}}
                onChangeText={text => settingsConfirmPassChange(text)}
              />
            </View>
          ) : (
            <View
              style={{
                width: '100%',
                paddingVertical: RFValue(10),
                paddingHorizontal: RFValue(20),
                backgroundColor: Colors.lightError,
              }}>
              <Text style={{fontSize: Fonts.size.min, color: Colors.error}}>
                You are using a third party login provider. This feature is only
                available who login using an email and password
              </Text>
            </View>
          )}
        </Content>
      </Container>
    );
  }
}

const {
  settingsPassChange,
  settingsNewPassChange,
  settingsConfirmPassChange,
  changePassword,
} = AuthAction;

const mapStateToProps = state => {
  const {provider, settingsPass, settingsConfirmPass, settingsNewPass} =
    state.auth;

  return {provider, settingsPass, settingsConfirmPass, settingsNewPass};
};

export default connect(mapStateToProps, {
  settingsPassChange,
  settingsNewPassChange,
  settingsConfirmPassChange,
  changePassword,
})(ChangePasswordScreen);
