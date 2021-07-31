import React from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Container, Icon, Card, CardItem, Body, Content} from 'native-base';
import {connect} from 'react-redux';
import * as RootNavigation from '../../navigation/RootNavigation';
import {Layout} from '../../styles';
import {PrimaryBigButton} from '../../components/Buttons';
import {PrimaryTextBox} from '../../components/TextBoxes';
import styles from './styles';
import {ProfileAction, SharedAction, AuthAction} from '../../actions';
import {RFValue} from 'react-native-responsive-fontsize';

class CreateProfileScreen extends React.Component {
  handleNavigateMap = () => {
    const {navigation, changeMapNextAction} = this.props;

    changeMapNextAction(() => {
      RootNavigation.navigate('CreateProfile');
    });
    navigation.navigate('NoDoc__Map');
  };

  renderAddressContent = () => {
    const {address, isAddressSet} = this.props;

    return isAddressSet ? (
      <>
        <Text numberOfLines={2} style={[styles.addressText, {marginBottom: 5}]}>
          {`${
            address.floorUnitRoomNumber !== ''
              ? address.floorUnitRoomNumber + ', '
              : ''
          }${address.formattedAddress}`}
        </Text>
        {address.noteToRider !== '' ? (
          <Text numberOfLines={1} style={styles.addressSubLabel}>
            {address.noteToRider}
          </Text>
        ) : null}
      </>
    ) : (
      <>
        <Text style={[styles.addressText, {marginBottom: 15}]}>Not Set</Text>
        <TouchableOpacity onPress={this.handleNavigateMap} activeOpacity={0.7}>
          <Text style={styles.addressPlaceHolder}>Set your address here</Text>
        </TouchableOpacity>
      </>
    );
  };

  render() {
    const {
      //  Profile States
      tempUsername,
      tempFirstName,
      tempLastName,

      //  Profile Actions
      tempUsernameChange,
      tempFirstNameChange,
      tempLastNameChange,
      createUserProfile,

      //  Shared
      isAddressSet,
      address,
      phone,

      //  Auth
      signOut,
      provider,
      providerEmail,
      providerUID,
      providerPhotoURL,
      isEmailVerified,
    } = this.props;

    const createProfileParams = {
      username: tempUsername,
      firstName: tempFirstName,
      lastName: tempLastName,
      phone,
      address,
      isAddressSet,
      provider,
      providerEmail,
      providerUID,
      providerPhotoURL,
      isEmailVerified,
    };

    return (
      <Container>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <View style={styles.header}>
          <Text style={styles.headerText}>Create Profile</Text>
          <TouchableOpacity onPress={() => signOut()} activeOpacity={0.7}>
            <Icon type="AntDesign" name="close" />
          </TouchableOpacity>
        </View>
        <Content>
          <ScrollView>
            <View style={styles.contentContainer}>
              <View>
                <Text style={styles.subText}>Edit your profile name</Text>
                <PrimaryTextBox
                  value={tempUsername}
                  placeholder="Username"
                  title="Username"
                  customItemStyles={{marginBottom: RFValue(15)}}
                  onChangeText={e => tempUsernameChange(e)}
                />
                <PrimaryTextBox
                  value={tempFirstName}
                  placeholder="First Name"
                  title="First Name"
                  customItemStyles={{marginBottom: RFValue(15)}}
                  onChangeText={e => tempFirstNameChange(e)}
                />
                <PrimaryTextBox
                  value={tempLastName}
                  placeholder="Last Name"
                  title="Last Name"
                  customItemStyles={{marginBottom: RFValue(15)}}
                  onChangeText={e => tempLastNameChange(e)}
                />
              </View>
              <View style={{marginTop: Layout.defaultPaddingNum}}>
                <Text style={styles.subText}>Edit your delivery address</Text>
                <Card style={{borderRadius: RFValue(10)}}>
                  <CardItem style={{borderRadius: RFValue(10)}}>
                    <Body>
                      <TouchableOpacity
                        onPress={this.handleNavigateMap}
                        activeOpacity={0.7}
                        style={styles.editIconContainer}>
                        <Icon
                          type="AntDesign"
                          name="edit"
                          style={styles.editIcon}
                        />
                      </TouchableOpacity>
                      <View
                        style={{
                          minHeight: RFValue(50),
                          justifyContent: 'center',
                          width: '85%',
                        }}>
                        {this.renderAddressContent()}
                      </View>
                    </Body>
                  </CardItem>
                </Card>
              </View>
            </View>
          </ScrollView>
        </Content>
        <View style={styles.footer}>
          <PrimaryBigButton
            action={() => createUserProfile(createProfileParams)}
            text="Save and Continue"
          />
        </View>
      </Container>
    );
  }
}

const {
  createUserProfile,
  tempUsernameChange,
  tempFirstNameChange,
  tempLastNameChange,
} = ProfileAction;

const {changeMapNextAction} = SharedAction;

const {signOut} = AuthAction;

const mapStateToProps = state => {
  const {tempUsername, tempFirstName, tempLastName} = state.profile;

  const {
    provider,
    providerEmail,
    providerUID,
    providerPhotoURL,
    isEmailVerified,
  } = state.auth;

  const {address, isAddressSet, phone} = state.shared;

  const {isLoading} = state.modalAlert;

  return {
    //  Profile
    tempUsername,
    tempFirstName,
    tempLastName,

    //  Shared
    address,
    isAddressSet,
    phone,

    //  Auth
    provider,
    providerEmail,
    providerUID,
    providerPhotoURL,
    isEmailVerified,

    //  Modal ALert
    isLoading,
  };
};

export default connect(mapStateToProps, {
  //  Profile
  createUserProfile,
  tempUsernameChange,
  tempFirstNameChange,
  tempLastNameChange,

  //  Shared
  changeMapNextAction,

  //  Auth
  signOut,
})(CreateProfileScreen);
