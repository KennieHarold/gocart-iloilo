import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Layout, Colors, Fonts} from '../../../styles';

const styles = StyleSheet.create({
  segmentButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    height: RFValue(30),
    paddingHorizontal: RFValue(10),
    borderRadius: RFValue(5),
    marginHorizontal: RFValue(5),
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  segmentView: {
    paddingHorizontal: RFValue(20),
    marginVertical: RFValue(15),
    backgroundColor: 'white',
  },
});

export default styles;
