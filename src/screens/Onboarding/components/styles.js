import {StyleSheet} from 'react-native';
import {Colors} from '../../../styles';
import {RFValue} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  item: {
    borderColor: 'transparent',
    backgroundColor: Colors.lightBackground,
    height: RFValue(47),
    borderRadius: RFValue(10),
    paddingHorizontal: RFValue(10),
    marginLeft: 0,
  },
});

export default styles;
