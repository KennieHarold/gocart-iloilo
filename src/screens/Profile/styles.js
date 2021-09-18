import {StyleSheet, Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors, Layout, Fonts} from '../../styles';

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Layout.defaultPaddingNum,
    paddingTop: Layout.defaultPaddingNum,
    paddingTop: RFValue(20),
    paddingBottom: RFValue(20),
    backgroundColor: 'white',
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: Fonts.size.big,
    fontWeight: '700',
  },
  contentContainer: {
    padding: Layout.defaultPaddingNum,
  },
  subText: {
    fontWeight: '700',
    fontSize: Fonts.size.small,
    marginBottom: Layout.defaultPaddingNum,
  },
  editIconContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  editIcon: {
    color: Colors.primary,
    fontSize: Fonts.size.big,
  },
  addressText: {
    fontSize: Fonts.size.mini,
    fontWeight: '700',
    color: Colors.readableText,
  },
  addressPlaceHolder: {
    fontSize: Fonts.size.mini,
    color: Colors.secondary,
    fontWeight: '700',
  },
  footer: {
    ...Layout.defaultPadding,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  addressSubLabel: {
    color: 'gray',
    fontSize: Fonts.size.mini,
  },
  myProfileCart: {
    position: 'absolute',
    top: 10,
    right: 25,
  },
  myProfileDp: {
    backgroundColor: Colors.lightBackground,
    width: RFValue(80),
    height: RFValue(80),
    borderRadius: RFValue(40),
  },
  myProfileDpOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    height: RFValue(80),
    width: RFValue(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
  myProfileUsername: {
    fontSize: Fonts.size.medium,
    fontWeight: '700',
    width: '100%',
  },
  myProfileLocationIcon: {
    fontSize: Fonts.size.big,
    marginRight: 3,
    marginLeft: -3,
    color: Colors.primary,
  },
  myProfileAddressLabel: {
    fontSize: Fonts.size.mini,
    color: Colors.readableText,
    width: '90%',
  },
  editProfileButton: {
    ...Layout.flexCenterContainer,
    height: RFValue(40),
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: RFValue(10),
  },
  editProfileButtonText: {
    color: Colors.readableText,
    fontWeight: '700',
    fontSize: Fonts.size.verySmall,
  },
  profileItemIcon: {
    marginRight: RFValue(15),
    fontSize: Fonts.size.small,
    color: Colors.readableText,
    width: RFValue(22),
  },
  profileItemTitle: {
    fontSize: Fonts.size.mini,
    color: Colors.readableText,
  },
  profileItemDivider: {
    fontSize: Fonts.size.mini,
    color: Colors.readableText,
    fontWeight: '700',
  },
  editMyProfileListItem: {
    paddingLeft: RFValue(25),
    paddingRight: RFValue(25),
    borderBottomWidth: 0,
  },
  editMyProfileListItemLeft: {
    fontSize: Fonts.size.mini,
    fontWeight: '700',
    color: Colors.readableText,
  },
  editMyProfileListItemBody: {
    fontSize: Fonts.size.mini,
    color: Colors.readableText,
  },
  editMyProfileSave: {
    color: Colors.primary,
    fontWeight: '700',
    fontSize: Fonts.size.verySmall,
  },
  versionFooter: {
    textAlign: 'center',
    marginTop: RFValue(50),
    marginBottom: RFValue(10),
    fontSize: Fonts.size.min,
    color: 'gray',
  },
});

export default styles;
