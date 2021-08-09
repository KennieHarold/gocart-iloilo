import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../../../styles';

const styles = StyleSheet.create({
  locatorContainer: {
    zIndex: 99,
    backgroundColor: 'white',
    borderRadius: 16,
    elevation: 10,
    padding: 5,
    height: 31,
    width: 31,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locatorIcon: {
    fontSize: 21,
    color: Colors.primary,
  },
});

export default styles;
