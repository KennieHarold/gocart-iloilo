import React from 'react';
import {ScrollView, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {Container} from 'native-base';
import {HomeHeader, StoreSection} from './components';
import {StoreAction} from '../../actions';
import {BannerCarousel} from '../../components/UIComponents';

class HomeScreen extends React.Component {
  render() {
    const {
      user: {username, address},
      availableStores,
      navigateStore,
      isAvailableStoresLoading,
    } = this.props;

    return (
      <Container>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <HomeHeader username={username} address={address[0].formattedAddress} />
        <ScrollView>
          <BannerCarousel />
          <StoreSection
            stores={availableStores}
            navigateStore={store => navigateStore(store)}
            isLoading={isAvailableStoresLoading}
          />
        </ScrollView>
      </Container>
    );
  }
}

const {navigateStore} = StoreAction;

const mapStateToProps = state => {
  const {user} = state.currentUser;
  const {availableStores, isAvailableStoresLoading} = state.store;

  return {user, availableStores, isAvailableStoresLoading};
};

export default connect(mapStateToProps, {navigateStore})(HomeScreen);
