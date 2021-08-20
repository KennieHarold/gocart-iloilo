import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors, Fonts} from '../../styles';

const styles = StyleSheet.create({
  supportHeaderContainer: {
    flexDirection: 'row',
    padding: RFValue(15),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 0.5,
  },
  supportHeaderTitle: {
    fontSize: Fonts.size.mini,
    textTransform: 'uppercase',
    color: Colors.readableText,
  },
  supportContentContainer: {
    backgroundColor: 'white',
    padding: RFValue(15),
    borderBottomColor: 'lightgray',
    borderBottomWidth: 0.5,
  },
  supportGrayDivider: {
    height: RFValue(50),
    justifyContent: 'center',
    backgroundColor: Colors.lightBackground,
    paddingLeft: RFValue(15),
  },
  supportGrayDividerText: {
    fontSize: Fonts.size.mini,
    color: Colors.secondPrimary,
    fontWeight: '700',
  },
  supportSubsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: RFValue(15),
  },
  supportIcon: {
    height: RFValue(50),
    width: RFValue(50),
    marginRight: RFValue(15),
  },
});

export default styles;
