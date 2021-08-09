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

const {addressChange, addressResetState} = SharedAction;

const MapHeader = () => {
  const dispatch = useDispatch();

  const {container, textInputContainer, listView} = autoCompleteStyles;

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => {
          dispatch(addressResetState());
          RootNavigation.goBack();
        }}
        activeOpacity={0.6}
        style={{marginLeft: 10, zIndex: 99}}>
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
    margin: 10,
  },
  listView: {
    zIndex: 1,
    marginTop: 10,
    elevation: 3,
    backgroundColor: 'white',
  },
});

export default MapHeader;
