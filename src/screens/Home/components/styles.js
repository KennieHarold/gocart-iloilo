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
    marginHorizontal: RFValue(5),
    justifyContent: 'flex-start',
    alignItems: 'center',
    //width: Dimensions.get('screen').width / 5,
  },
  categoryItemCircle: {
    backgroundColor: Colors.primary,
    height: RFValue(33),
    paddingHorizontal: 10,
    minWidth: RFValue(100),
    borderRadius: RFValue(5),
    //marginBottom: RFValue(10),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  categoryItemLabel: {
    fontSize: Fonts.size.min,
    color: 'white',
    //textAlign: 'center',
  },
  productsContentDiv: {
    ...Layout.sectionLightDiv,
  },
  productsSectionHeaderLayout: {
    marginHorizontal: Layout.defaultPaddingNum,
    marginBottom: 15,
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
