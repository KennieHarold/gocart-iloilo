import {StyleSheet} from 'react-native';
import {Layout, Colors, Fonts} from '../../styles';
import {RFValue} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  onboardingContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    ...Layout.defaultPadding,
  },
  welcomeLabel: {
    fontSize: Fonts.size.veryBig,
    fontWeight: '700',
    marginBottom: 5,
  },
  subLabel: {
    fontSize: Fonts.size.mini,
    textAlign: 'center',
    color: Colors.readableText,
    textAlign: 'center',
  },
  brandLabel: {
    fontSize: RFValue(45),
    fontWeight: '700',
    color: Colors.primary,
  },
  link: {
    fontSize: Fonts.size.mini,
    color: Colors.secondary,
  },
});

export default styles;
