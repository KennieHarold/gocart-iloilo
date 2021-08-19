import React from 'react';
import {TouchableOpacity, View, ScrollView, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {
  Container,
  Content,
  Text,
  Icon,
  List,
  ListItem,
  Body,
  Left,
  Right,
} from 'native-base';
import {ScreenHeader} from '../../components/Headers';
import {Layout, Colors, Fonts} from '../../styles';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import {RFValue} from 'react-native-responsive-fontsize';
import {PrimaryTextBox} from '../../components/TextBoxes';
import {ProfileAction, SharedAction} from '../../actions';

class EditProfileScreen extends React.Component {
  componentDidMount() {
    this.initializeUserValues();
  }

  componentWillUnmount() {
    this.props.profileResetState();
  }

  initializeUserValues = () => {
    const {
      currentUser,
      tempUsernameChange,
      tempFirstNameChange,
      tempLastNameChange,
    } = this.props;

    //  Profile
    tempUsernameChange(currentUser.username);
    tempFirstNameChange(currentUser.firstName);
    tempLastNameChange(currentUser.lastName);
  };

  render() {
    const {
      //  User
      currentUser,

      //  Profile
      tempUsername,
      tempFirstName,
      tempLastName,
      tempUsernameChange,
      tempFirstNameChange,
      tempLastNameChange,
      updateProfile,

      //  Shared
      changePhoneVerifyNextAction,
      updatePhone,

      //  Navigation
      navigation,
    } = this.props;

    const listItems = [
      {
        id: 'editMyProfileListItem-phoneNumber',
        left: 'Phone Number',
        body: currentUser.phone.code + currentUser.phone.number,
        action: () => {
          changePhoneVerifyNextAction(() => updatePhone());
          navigation.navigate('PhoneForm');
        },
      },
      {
        id: 'editMyProfileListItem-address',
        left: 'Address',
        body: currentUser.address[0].formattedAddress,
        action: () => {},
      },
    ];

    return (
      <Container>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <ScreenHeader
          title="Edit My Profile"
          rightKey={
            <TouchableOpacity
              onPress={() =>
                updateProfile({
                  username: tempUsername,
                  firstName: tempFirstName,
                  lastName: tempLastName,
                })
              }
              activeOpacity={0.6}>
              <Text style={styles.editMyProfileSave}>Save</Text>
            </TouchableOpacity>
          }
        />
        <Content>
          <ScrollView>
            <View
              style={{...Layout.flexCenterContainer, marginTop: RFValue(25)}}>
              <View style={{marginBottom: 10}}>
                <TouchableOpacity activeOpacity={0.8}>
                  <FastImage
                    source={{uri: currentUser.photoUrl}}
                    style={styles.myProfileDp}>
                    <View style={styles.myProfileDpOverlay}>
                      <Icon
                        type="AntDesign"
                        name="camerao"
                        style={{fontSize: Fonts.size.veryBig, color: 'white'}}
                      />
                    </View>
                  </FastImage>
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  color: Colors.readableText,
                  fontSize: Fonts.size.mini,
                }}>
                Change photo
              </Text>
            </View>
            <View style={{width: '100%', padding: Layout.defaultPaddingNum}}>
              <PrimaryTextBox
                value={tempUsername}
                title="Username"
                placeholder="Username"
                customItemStyles={{marginBottom: RFValue(15)}}
                onChangeText={e => tempUsernameChange(e)}
              />
              <PrimaryTextBox
                value={tempFirstName}
                title="First Name"
                placeholder="First Name"
                customItemStyles={{marginBottom: RFValue(15)}}
                onChangeText={e => tempFirstNameChange(e)}
              />
              <PrimaryTextBox
                value={tempLastName}
                title="Last Name"
                placeholder="Last Name"
                onChangeText={e => tempLastNameChange(e)}
              />
            </View>
            <List>
              {listItems.map(listItem => (
                <ListItem
                  key={listItem.id}
                  noIndent
                  style={styles.editMyProfileListItem}
                  onPress={listItem.action}>
                  <Left style={{flex: 3.5}}>
                    <Text style={styles.editMyProfileListItemLeft}>
                      {listItem.left}
                    </Text>
                  </Left>
                  <Body style={{flex: 5.5}}>
                    <Text
                      numberOfLines={1}
                      style={styles.editMyProfileListItemBody}>
                      {listItem.body}
                    </Text>
                  </Body>
                  <Right style={{flex: 1}}>
                    <Icon
                      type="AntDesign"
                      name="right"
                      style={{fontSize: Fonts.size.small}}
                    />
                  </Right>
                </ListItem>
              ))}
            </List>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const {
  tempUsernameChange,
  tempFirstNameChange,
  tempLastNameChange,
  updateProfile,
  profileResetState,
  updatePhone,
} = ProfileAction;

const {changePhoneVerifyNextAction} = SharedAction;

const mapStateToProps = state => {
  const {user: currentUser} = state.currentUser;
  const {tempUsername, tempFirstName, tempLastName} = state.profile;
  const {phone} = state.shared;

  return {
    //  Profile
    currentUser,
    tempUsername,
    tempFirstName,
    tempLastName,

    //  Shared
    phone,
  };
};

export default connect(mapStateToProps, {
  //  Profile
  tempUsernameChange,
  tempFirstNameChange,
  tempLastNameChange,
  updateProfile,
  profileResetState,
  updatePhone,

  //  Shared
  changePhoneVerifyNextAction,
})(EditProfileScreen);
