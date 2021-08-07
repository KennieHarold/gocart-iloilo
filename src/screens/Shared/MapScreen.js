import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {GOOGLE_CLOUD_API_KEY} from '@env';
import {connect} from 'react-redux';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {View, TouchableOpacity, SafeAreaView, StyleSheet} from 'react-native';
import {Text, Card, CardItem, Body, Icon} from 'native-base';
import {PrimaryTextBox} from '../../components/TextBoxes';
import {PrimaryBigButton} from '../../components/Buttons';
import {BottomModalContainer} from '../../components/Modals';
import {Colors} from '../../styles';
import styles from './styles';
import {LocatorButton} from './components';
import {SharedAction} from '../../actions';

class MapScreen extends React.Component {
  state = {
    isVisible: false,
  };

  render() {
    const {
      navigation,
      address,
      mapNextAction,
      floorUnitRoomNumberChange,
      noteToRiderChange,
      addressChange,
      addressResetState,
    } = this.props;

    const {container, textInputContainer, listView} = autoCompleteStyles;

    return (
      <SafeAreaView style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => {
            addressResetState();
            navigation.goBack();
          }}
          activeOpacity={0.7}
          style={styles.closeIconContainer}>
          <Icon type="AntDesign" name="closecircle" style={styles.closeIcon} />
        </TouchableOpacity>

        <LocatorButton />

        <MapView
          region={{
            latitude: address.latitude,
            longitude: address.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          style={styles.mapView}>
          <Marker
            coordinate={{
              latitude: address.latitude,
              longitude: address.longitude,
            }}
          />
        </MapView>
        <View style={styles.mapFormContainer}>
          <Card style={{borderRadius: 10, marginBottom: 20}}>
            <CardItem style={{borderRadius: 10}}>
              <Body>
                <TouchableOpacity
                  onPress={() => this.setState({isVisible: true})}
                  activeOpacity={0.7}
                  style={styles.editIconContainer}>
                  <Icon type="AntDesign" name="edit" style={styles.editIcon} />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '85%',
                    minHeight: 50,
                  }}>
                  <View style={{flex: 1}}>
                    <Icon
                      type="Entypo"
                      name="location-pin"
                      style={[styles.locationIcon, {marginLeft: -5}]}
                    />
                  </View>
                  <View style={{flex: 6}}>
                    <Text style={styles.addressText} numberOfLines={2}>
                      {address.formattedAddress}
                    </Text>
                  </View>
                </View>
              </Body>
            </CardItem>
          </Card>
          <PrimaryTextBox
            value={address.floorUnitRoomNumber}
            title="Delivery Address"
            placeholder="Delivery Address"
            customItemStyles={{marginBottom: 10}}
            onChangeText={e => floorUnitRoomNumberChange(e)}
          />
          <PrimaryTextBox
            value={address.noteToRider}
            title="Landmarks"
            placeholder="Landmarks"
            onChangeText={e => noteToRiderChange(e)}
          />
        </View>
        <View style={styles.footer}>
          <PrimaryBigButton
            action={mapNextAction}
            text="Save Address"
            customContainerStyles={{
              backgroundColor: Colors.primary,
            }}
            customTextStyles={{color: 'white'}}
          />
        </View>
        <BottomModalContainer
          isVisible={this.state.isVisible}
          onClose={() =>
            this.setState(prevState => ({
              isVisible: !prevState.isVisible,
            }))
          }>
          <View style={{width: '100%'}}>
            <Text style={styles.subText}>Choose your location</Text>
          </View>
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

              addressChange(address);

              this.setState(prevState => ({
                isVisible: !prevState.isVisible,
              }));
            }}
            query={{
              key: GOOGLE_CLOUD_API_KEY,
              language: 'en',
              components: 'country:ph',
            }}
          />
        </BottomModalContainer>
      </SafeAreaView>
    );
  }
}

const autoCompleteStyles = StyleSheet.create({
  textInputContainer: {
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  container: {
    borderRadius: 10,
    width: '100%',
  },
  listView: {
    zIndex: 1,
    marginTop: 10,
    elevation: 3,
    backgroundColor: 'white',
  },
});

const {
  floorUnitRoomNumberChange,
  noteToRiderChange,
  addressChange,
  addressResetState,
} = SharedAction;

const mapStateToProps = state => {
  const {address, mapNextAction} = state.shared;
  const {isLoading} = state.modalAlert;

  return {address, isLoading, mapNextAction};
};

export default connect(mapStateToProps, {
  floorUnitRoomNumberChange,
  noteToRiderChange,
  addressChange,
  addressResetState,
})(MapScreen);
