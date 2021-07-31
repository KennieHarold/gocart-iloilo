import {RFValue} from 'react-native-responsive-fontsize';
import {lightBackground} from './Colors';

export const defaultPaddingNum = RFValue(25);

export const defaultPadding = {
  padding: defaultPaddingNum,
};

export const fullWidthCenterContainer = {
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
};

export const flexCenterContainer = {
  ...fullWidthCenterContainer,
  flex: 1,
};

export const flexCenterContainerWithPadding = {
  ...flexCenterContainer,
  ...defaultPadding,
};

export const modalLayout = {
  backgroundColor: 'white',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
  justifyContent: 'center',
  alignItems: 'center',
  ...defaultPadding,
};

export const sectionLightDiv = {
  height: 5,
  width: '100%',
  backgroundColor: lightBackground,
};
