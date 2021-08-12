import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {GOOGLE_CLOUD_API_KEY} from '@env';
import {Icon} from 'native-base';
import {useDispatch} from 'react-redux';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {SharedAction} from '../../../actions';
import LocatorButton from './LocatorButton';
import {Colors} from '../../../styles';
import * as RootNavigation from '../../../navigation/RootNavigation';
import {RFValue} from 'react-native-responsive-fontsize';

const {addressChange} = SharedAction;

const MapHeader = ({cb}) => {
  const dispatch = useDispatch();

  const {container, textInputContainer, listView} = autoCompleteStyles;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: RFValue(10),
      }}>
      <TouchableOpacity
        onPress={() => {
          cb(false);
          RootNavigation.goBack();
        }}
        activeOpacity={0.6}
        style={{
          zIndex: 99,
          margin: 10,
        }}>
        <Icon
          type="AntDesign"
          name="arrowleft"
          style={{color: Colors.primary}}
        />
      </TouchableOpacity>
      <GooglePlacesAutocomplete
        styles={{
          textInputContainer,
          container,
          listView,
        }}
        fetchDetails
        enablePoweredByContainer={false}
        placeholder="Search Location"
        onPress={(data, details = null) => {
          const address = {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            formattedAddress: details.formatted_address,
          };
          dispatch(addressChange(address));
        }}
        query={{
          key: GOOGLE_CLOUD_API_KEY,
          language: 'en',
          components: 'country:ph',
        }}
      />
      <LocatorButton />
    </View>
  );
};

const autoCompleteStyles = StyleSheet.create({
  textInputContainer: {
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    height: 45,
  },
  container: {
    borderRadius: 10,
    zIndex: 99,
  },
  listView: {
    zIndex: 1,
    elevation: 3,
    backgroundColor: 'white',
    marginTop: 5,
  },
});

export default MapHeader;
