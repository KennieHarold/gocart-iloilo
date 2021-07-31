import React from 'react';
import {View, StatusBar, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {
  Text,
  Container,
  Content,
  Icon,
  List,
  ListItem,
  Left,
  Right,
} from 'native-base';
import {Fonts, Layout} from '../../styles';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import {AuthAction} from '../../actions';
import {RFValue} from 'react-native-responsive-fontsize';

class ProfileScreen extends React.Component {
  render() {
    const {
      user: {username, photoUrl, address},
      signOut,
      navigation,
    } = this.props;

    const profileItems = [
      {
        id: 'profile-edit-my-profile',
        title: 'Edit My Profile',
        action: () => navigation.navigate('EditProfile'),
        iconType: 'Ionicons',
        iconName: 'person-outline',
        isDivider: false,
      },
      {
        id: 'profile-my-cart',
        title: 'My Cart',
        action: () => navigation.navigate('Cart'),
        iconType: 'SimpleLineIcons',
        iconName: 'basket',
        isDivider: false,
      },
      {
        id: 'profile-address-book',
        title: 'Address Book',
        action: () => {},
        iconType: 'SimpleLineIcons',
        iconName: 'location-pin',
        isDivider: false,
      },
      {
        id: 'profile-divider-reference',
        title: 'Preferences',
        isDivider: true,
      },
      {
        id: 'profile-push-notif',
        title: 'Push Notifications',
        action: () => {},
        iconType: 'Ionicons',
        iconName: 'md-notifications-outline',
        isDivider: false,
      },
      {
        id: 'profile-change-password',
        title: 'Change Password',
        action: () => {},
        iconType: 'Ionicons',
        iconName: 'md-lock-closed-outline',
        isDivider: false,
      },
      {
        id: 'profile-divider-about-us',
        title: 'About Us',
        isDivider: true,
      },
      {
        id: 'profile-privacy-policy',
        title: 'Privacy Policy',
        action: () => {},
        iconType: 'Ionicons',
        iconName: 'shield-checkmark-outline',
        isDivider: false,
      },
      {
        id: 'profile-terms',
        title: 'Terms and Conditions',
        action: () => {},
        iconType: 'SimpleLineIcons',
        iconName: 'notebook',
        isDivider: false,
      },
      {
        id: 'profile-logout',
        title: 'Logout',
        action: () => signOut(),
        iconType: 'AntDesign',
        iconName: 'logout',
        isDivider: false,
      },
    ];

    return (
      <Container>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <Content>
          <View style={{...Layout.defaultPadding}}>
            <View style={{width: '100%', flexDirection: 'row'}}>
              <View style={{marginRight: RFValue(10)}}>
                <FastImage
                  source={{uri: photoUrl}}
                  style={styles.myProfileDp}
                />
              </View>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <View>
                  <Text numberOfLines={1} style={styles.myProfileUsername}>
                    {username}
                  </Text>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: RFValue(10),
                    }}>
                    <Icon
                      type="Entypo"
                      name="location-pin"
                      style={styles.myProfileLocationIcon}
                    />
                    <Text
                      numberOfLines={2}
                      style={styles.myProfileAddressLabel}>
                      {address[0].formattedAddress}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <List style={{marginBottom: RFValue(50)}}>
            {profileItems.map(profileItem =>
              profileItem.isDivider ? (
                <ListItem
                  key={profileItem.id}
                  itemDivider
                  noIndent
                  style={{
                    paddingLeft: RFValue(25),
                    paddingRight: RFValue(25),
                  }}>
                  <Left>
                    <Text style={styles.profileItemDivider}>
                      {profileItem.title}
                    </Text>
                  </Left>
                </ListItem>
              ) : (
                <ListItem
                  key={profileItem.id}
                  noIndent
                  style={{
                    paddingLeft: RFValue(25),
                    paddingRight: RFValue(25),
                  }}
                  onPress={profileItem.action}>
                  <Left style={{alignItems: 'center'}}>
                    <Icon
                      type={profileItem.iconType}
                      name={profileItem.iconName}
                      style={styles.profileItemIcon}
                    />
                    <Text style={styles.profileItemTitle}>
                      {profileItem.title}
                    </Text>
                  </Left>
                  <Right>
                    <Icon
                      type="AntDesign"
                      name="right"
                      style={{fontSize: Fonts.size.small}}
                    />
                  </Right>
                </ListItem>
              ),
            )}
          </List>
        </Content>
      </Container>
    );
  }
}

const {signOut} = AuthAction;

const mapStateToProps = state => {
  const {user} = state.currentUser;
  return {user};
};

export default connect(mapStateToProps, {signOut})(ProfileScreen);
