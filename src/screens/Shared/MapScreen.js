import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {connect} from 'react-redux';
import {View, TouchableOpacity, SafeAreaView, Image} from 'react-native';
import {Text, Card, CardItem, Body, Icon} from 'native-base';
import {PrimaryTextBox} from '../../components/TextBoxes';
import {PrimaryBigButton} from '../../components/Buttons';
import {BottomModalContainer} from '../../components/Modals';
import {Colors} from '../../styles';
import styles from './styles';
import {SharedAction} from '../../actions';
import marker from '../../assets/marker.png';
import {MapHeader} from './components';

class MapScreen extends React.Component {
  state = {
    isVisible: false,
    isMapDragEnabled: true,
  };

  onRegionChange = region => {
    if (this.state.isMapDragEnabled) {
      const {geocode} = this.props;
      geocode(region.latitude, region.longitude);
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
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          style={styles.mapView}
        />
        <View style={styles.markerView}>
          <Image source={marker} style={{height: 45, width: 45}} />
        </View>
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
            value={address.detailedAddress}
            title="Detailed Address"
            placeholder="Enter detailed address"
            customItemStyles={{marginBottom: 10}}
            onChangeText={e => detailedAddressChange(e)}
          />
          <PrimaryTextBox
            value={address.noteToRider}
            title="Landmarks"
            placeholder="Enter landmarks"
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
          <View style={{width: '100%', position: 'absolute', top: 25}}>
            <Text style={styles.subText}>Edit Address</Text>
          </View>
        </BottomModalContainer>
      </SafeAreaView>
    );
  }
}

const {
  detailedAddressChange,
  noteToRiderChange,
  addressChange,
  addressResetState,
  geocode,
} = SharedAction;

const mapStateToProps = state => {
  const {address, mapNextAction} = state.shared;
  const {isLoading} = state.modalAlert;

  return {address, isLoading, mapNextAction};
};

export default connect(mapStateToProps, {
  detailedAddressChange,
  noteToRiderChange,
  addressChange,
  addressResetState,
  geocode,
})(MapScreen);
