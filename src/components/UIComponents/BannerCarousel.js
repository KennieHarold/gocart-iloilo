import React from 'react';
import {View, Dimensions} from 'react-native';
import {Text} from 'native-base';
import {Colors, Fonts} from '../../styles';
import FastImage from 'react-native-fast-image';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {RFValue} from 'react-native-responsive-fontsize';
import {connect} from 'react-redux';

class BannerCarousel extends React.Component {
  state = {
    activeBanner: 0,
  };

  _renderItem = ({item}) => {
    return (
      <FastImage
        source={{
          uri: item.imageUri,
        }}
        style={{
          backgroundColor: Colors.lightBackground,
          width: '100%',
          height: RFValue(200),
        }}
        resizeMode={FastImage.resizeMode.stretch}
      />
    );
  };

  get pagination() {
    return (
      <Pagination
        dotsLength={this.props.banners.length}
        activeDotIndex={this.state.activeBanner}
        containerStyle={{
          backgroundColor: 'transparent',
          paddingTop: RFValue(15),
          paddingBottom: 0,
          marginTop: RFValue(-35),
        }}
        dotStyle={{
          width: 7,
          height: 7,
          borderRadius: 5,
          backgroundColor: 'white',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={1}
      />
    );
  }

  render() {
    const {banners} = this.props;

    return (
      <View
        style={{
          marginBottom: RFValue(35),
        }}>
        <Carousel
          ref={c => (this._carousel = c)}
          data={banners}
          enableSnap
          renderItem={this._renderItem}
          sliderWidth={Dimensions.get('screen').width}
          itemWidth={Dimensions.get('screen').width}
          onSnapToItem={index => {
            this.setState({activeBanner: index});
          }}
          containerCustomStyle={{
            backgroundColor: Colors.lightBackground,
            height: RFValue(200),
          }}
        />
        {this.pagination}
        <View
          style={{
            width: '100%',
            backgroundColor: Colors.lightBackground,
            justifyContent: 'center',
            alignItems: 'center',
            padding: RFValue(5),
            marginTop: RFValue(13),
          }}>
          <Text
            style={{
              fontSize: Fonts.size.min,
              textTransform: 'uppercase',
              fontWeight: '700',
              color: Colors.readableText,
            }}>
            Same day or next day delivery
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {banners} = state.app;

  return {banners};
};

export default connect(mapStateToProps, null)(BannerCarousel);
