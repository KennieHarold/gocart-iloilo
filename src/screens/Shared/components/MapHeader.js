import React from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {GOOGLE_CLOUD_API_KEY} from '@env';
import {Col, Icon} from 'native-base';
import {useDispatch} from 'react-redux';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {SharedAction} from '../../../actions';
import LocatorButton from './LocatorButton';
import {Colors} from '../../../styles';
import * as RootNavigation from '../../../navigation/RootNavigation';
import {RFValue} from 'react-native-responsive-fontsize';
import {checkCoverageArea} from '../../../actions/SharedAction';
import {errorHandler} from '../../../helpers';

const {addressChange} = SharedAction;

const MapHeader = ({cb}) => {
  const dispatch = useDispatch();

  const {container, textInputContainer, textInput, listView} =
    autoCompleteStyles;

  const handlePress = details => {
    const latitude = details.geometry.location.lat;
    const longitude = details.geometry.location.lng;
    const formattedAddress = details.formatted_address;

    if (checkCoverageArea(latitude, longitude)) {
      const address = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        formattedAddress,
      };
      dispatch(addressChange(address));
    } else {
      errorHandler(dispatch, 'shared/location-out-coverage');
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: RFValue(10),
        zIndex: 99,
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
        {Platform.OS === 'ios' ? (
          <Icon type="AntDesign" name="left" style={{color: Colors.primary}} />
        ) : (
          <Icon type="AntDesign" name="arrowleft" />
        )}
      </TouchableOpacity>
      <GooglePlacesAutocomplete
        styles={{
          textInputContainer,
          container,
          listView,
          textInput,
        }}
        textInputProps={{
          placeholderTextColor: Colors.readableText,
        }}
        fetchDetails
        enablePoweredByContainer={false}
        placeholder="Find Location"
        onPress={(data, details = null) => {
          handlePress(details);
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
  textInput: {
    color: Colors.readableText,
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
  placeholder: {
    color: 'black',
  },
});

export default MapHeader;
