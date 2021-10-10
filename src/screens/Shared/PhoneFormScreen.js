import React from 'react';
import {Text, Icon, Item, Input} from 'native-base';
import {connect} from 'react-redux';
import {
  StatusBar,
  SafeAreaView,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Layout, Fonts} from '../../styles';
import {SharedAction, AuthAction} from '../../actions';
import {RFValue} from 'react-native-responsive-fontsize';
import {PrimaryBigButton} from '../../components/Buttons';
import {ArrowLeft, StatusBarPlaceHolder} from '../../components/UIComponents';
import styles from './styles';

class PhoneFormScreen extends React.Component {
  render() {
    const {
      signOut,
      startPhoneVerification,
      phone,
      changePhoneNumber,
      hasUserDocument,
    } = this.props;

    const enterPhoneLabel = hasUserDocument
      ? 'Enter your new phone number'
      : 'Enter your phone number';

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBarPlaceHolder />
        {hasUserDocument ? (
          <ArrowLeft />
        ) : (
          <TouchableOpacity
            onPress={() => signOut()}
            activeOpacity={0.7}
            style={{
              position: 'absolute',
              top: Platform.OS === 'ios' ? 50 : 15,
              right: 15,
            }}>
            <Icon type="AntDesign" name="close" />
          </TouchableOpacity>
        )}
        <View style={{...Layout.flexCenterContainerWithPadding}}>
          <Text style={styles.phoneFormTitle}>{enterPhoneLabel}</Text>
          <Text style={styles.phoneFormSubtitle}>
            Verification code will be sent on this number
          </Text>
          <Item style={styles.phoneFormTextItem}>
            <View
              style={{
                paddingHorizontal: RFValue(5),
                marginTop: Platform.OS === 'ios' ? RFValue(2) : RFValue(-2),
              }}>
              <Text style={{fontSize: Fonts.size.mini, fontWeight: '700'}}>
                +63
              </Text>
            </View>
            <Input
              value={phone.number}
              placeholder={enterPhoneLabel}
              placeholderTextColor="gray"
              style={{fontSize: Fonts.size.mini}}
              onChangeText={e => changePhoneNumber(e)}
              keyboardType="phone-pad"
            />
          </Item>
          <Text style={styles.phoneFormNote}>
            When you tap next you will receive a verification code and
            notifications to your phone number by SMS. Message and data rates
            may apply.
          </Text>
          <PrimaryBigButton
            action={() => startPhoneVerification(phone)}
            text="Next"
          />
        </View>
      </SafeAreaView>
    );
  }
}

const {changePhoneNumber, startPhoneVerification} = SharedAction;
const {signOut} = AuthAction;

const mapStateToProps = state => {
  const {phone} = state.shared;
  const {hasUserDocument} = state.auth;

  return {phone, hasUserDocument};
};

export default connect(mapStateToProps, {
  changePhoneNumber,
  startPhoneVerification,
  signOut,
})(PhoneFormScreen);
