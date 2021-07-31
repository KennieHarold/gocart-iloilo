import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors, Fonts} from '../../styles';

const styles = StyleSheet.create({
  item: {
    borderColor: 'transparent',
    backgroundColor: Colors.lightBackground,
    borderRadius: RFValue(5),
    paddingHorizontal: RFValue(10),
    marginLeft: 0,
    height: RFValue(47),
  },
  input: {
    fontSize: Fonts.size.mini,
  },
  title: {
    marginBottom: RFValue(5),
    fontSize: Fonts.size.mini,
    fontWeight: '700',
    color: Colors.readableText,
  },
});

export default styles;
