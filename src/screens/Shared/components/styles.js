import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../../../styles';

const styles = StyleSheet.create({
  locatorContainer: {
    position: 'absolute',
    bottom: Dimensions.get('screen').height * 0.57,
    marginTop: 0,
    right: 10,
    zIndex: 9999,
    backgroundColor: 'white',
    borderRadius: 16,
    elevation: 10,
    padding: 5,
    height: 31,
    width: 31,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locatorIcon: {
    fontSize: 21,
    color: Colors.primary,
  },
});

export default styles;
