import {StyleSheet} from 'react-native';
import {Layout, Colors, Fonts} from '../../styles';
import {RFValue} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  onboardingContainer: {
    backgroundColor: 'white',
    width: '100%',
    flex: 1,
  },
  logoOverLay: {
    width: RFValue(110),
    height: RFValue(110),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: RFValue(55),
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
  footer: {
    position: 'absolute',
    width: '100%',
    bottom: RFValue(25),
    alignItems: 'center',
  },
});

export default styles;
