import {StyleSheet, Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Fonts, Layout} from '../../styles';

const styles = StyleSheet.create({
  container: {
    ...Layout.modalLayout,
    borderRadius: RFValue(10),
    width: '75%',
    minHeight: Dimensions.get('screen').height / 8,
  },
  bottomContainer: {
    ...Layout.modalLayout,
    borderTopStartRadius: RFValue(10),
    borderTopEndRadius: RFValue(10),
    width: '100%',
    minHeight: Dimensions.get('screen').height / 2,
  },
  text: {
    marginLeft: RFValue(20),
    fontSize: Fonts.size.small,
    color: 'gray',
  },
  statusIcon: {
    marginBottom: RFValue(15),
    fontSize: RFValue(50),
  },
  closeLayout: {
    position: 'absolute',
    right: RFValue(10),
    top: RFValue(10),
  },
  actionButtonLayout: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: RFValue(20),
  },
});

export default styles;
