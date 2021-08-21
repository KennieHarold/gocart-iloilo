import React from 'react';
import MapView from 'react-native-maps';
import {connect} from 'react-redux';
import {View, TouchableOpacity, SafeAreaView, Image} from 'react-native';
import {Text, Card, CardItem, Body, Icon} from 'native-base';
import {PrimaryTextBox} from '../../components/TextBoxes';
import {PrimaryBigButton} from '../../components/Buttons';
import {Colors} from '../../styles';
import styles from './styles';
import {SharedAction} from '../../actions';
import marker from '../../assets/marker.png';
import {MapHeader, EditAddressModal} from './components';
import {RFValue} from 'react-native-responsive-fontsize';

class MapScreen extends React.PureComponent {
  state = {
    isVisible: false,
    isMapDragEnabled: true,
  };

  onRegionChange = region => {
    if (this.state.isMapDragEnabled) {
      const {geocode} = this.props;
      geocode(
        region.latitude,
        region.longitude,
        region.latitudeDelta,
        region.longitudeDelta,
      );
    }
  };

  render() {
    const {address, mapNextAction, detailedAddressChange, noteToRiderChange} =
      this.props;

    return (
      <SafeAreaView style={{flex: 1}}>
        <MapHeader cb={status => this.setState({isMapDragEnabled: status})} />
        <MapView
          onRegionChangeComplete={this.onRegionChange}
          region={{
            latitude: address.latitude,
            longitude: address.longitude,
            latitudeDelta: address.latitudeDelta,
            longitudeDelta: address.longitudeDelta,
          }}
          rotateEnabled={false}
          pitchEnabled={false}
          minZoomLevel={2}
          maxZoomLevel={20}
          showsCompass={false}
          style={styles.mapView}
        />
        <View style={styles.markerView}>
          <Image
            source={marker}
            style={{height: RFValue(45), width: RFValue(45)}}
          />
        </View>
        <View style={styles.mapFormContainer}>
          <Card style={{borderRadius: RFValue(10), marginBottom: RFValue(20)}}>
            <CardItem style={{borderRadius: RFValue(10)}}>
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
                    minHeight: RFValue(60),
                  }}>
                  <View style={{flex: 1}}>
                    <Icon
                      type="Entypo"
                      name="location-pin"
                      style={[styles.locationIcon, {marginLeft: RFValue(-5)}]}
                    />
                  </View>
                  <View style={{flex: 6}}>
                    <Text style={styles.addressText} numberOfLines={3}>
                      {address.formattedAddress !== ''
                        ? address.formattedAddress
                        : 'Address not set'}
                    </Text>
                  </View>
                </View>
              </Body>
            </CardItem>
          </Card>
          <PrimaryTextBox
            value={address.detailedAddress}
            title="Detailed Address"
            placeholder="House Number, Subdv, Barangay"
            customItemStyles={{marginBottom: 10}}
            onChangeText={e => detailedAddressChange(e)}
          />
          <PrimaryTextBox
            value={address.noteToRider}
            title="Landmarks"
            placeholder="e.g. corner lot, red gate, in front of gas station"
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
        <EditAddressModal
          isVisible={this.state.isVisible}
          onClose={() =>
            this.setState(prevState => ({
              isVisible: !prevState.isVisible,
            }))
          }
        />
      </SafeAreaView>
    );
  }
}

const {detailedAddressChange, noteToRiderChange, geocode} = SharedAction;

const mapStateToProps = state => {
  const {address, mapNextAction} = state.shared;
  const {isLoading} = state.modalAlert;

  return {address, isLoading, mapNextAction};
};

export default connect(mapStateToProps, {
  detailedAddressChange,
  noteToRiderChange,
  geocode,
})(MapScreen);
