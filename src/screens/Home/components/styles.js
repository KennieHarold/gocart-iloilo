import {StyleSheet, Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Layout, Colors, Fonts} from '../../../styles';

const styles = StyleSheet.create({
  homeHeaderLayout: {
    ...Layout.defaultPadding,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  homeHeaderLabel: {
    fontSize: Fonts.size.medium,
    fontWeight: '700',
    marginBottom: RFValue(5),
  },
  homeHeaderAddress: {
    color: Colors.readableText,
    fontSize: Fonts.size.mini,
  },
  homeHeaderCartButton: {
    height: RFValue(40),
    width: RFValue(45),
    borderRadius: RFValue(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  homeHeaderIcon: {
    fontSize: Fonts.size.veryBig,
    color: 'white',
  },
  storesList: {
    width: '100%',
    paddingVertical: RFValue(5),
    paddingHorizontal: Layout.defaultPaddingNum,
    marginBottom: RFValue(50),
  },
  storeItemContainer: {
    width: '47%',
    alignItems: 'center',
    marginBottom: Layout.defaultPaddingNum,
  },
  storeItemCard: {
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: RFValue(10),
    width: '100%',
    height: RFValue(100),
    marginBottom: RFValue(10),
  },
  storeItemCardImage: {
    width: '100%',
    height: '100%',
    borderRadius: RFValue(10),
    backgroundColor: Colors.lightBackground,
  },
  storeTitleLabel: {
    fontSize: Fonts.size.mini,
    fontWeight: '700',
    marginBottom: RFValue(5),
    textAlign: 'center',
  },
  storeDescLabel: {
    fontSize: Fonts.size.min,
    color: Colors.readableText,
    textAlign: 'center',
  },
  categoryItemContainer: {
    marginHorizontal: RFValue(10),
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: Dimensions.get('screen').width / 5,
  },
  categoryItemCircle: {
    backgroundColor: Colors.lightPrimary,
    height: RFValue(60),
    width: RFValue(60),
    borderRadius: RFValue(30),
    marginBottom: RFValue(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryItemLabel: {
    fontSize: Fonts.size.min,
    color: 'rgba(0, 0, 0, 0.7)',
    textAlign: 'center',
  },
  productsContentDiv: {
    ...Layout.sectionLightDiv,
  },
  productsSectionHeaderLayout: {
    marginHorizontal: Layout.defaultPaddingNum,
    marginBottom: Layout.defaultPaddingNum,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productsSectionTitle: {
    fontSize: Fonts.size.small,
    fontWeight: '700',
  },
  seeMore: {
    fontSize: Fonts.size.mini,
    color: Colors.readableText,
  },
});

export default styles;
