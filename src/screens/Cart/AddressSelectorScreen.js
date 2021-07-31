import React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {Container, Content} from 'native-base';
import {ScreenHeader} from '../../components/Headers';
import {PrimaryBigButton} from '../../components/Buttons';
import {AddressSelectorItem} from './components';
import {Layout} from '../../styles';
import {SharedAction, CartAction} from '../../actions';

class AddressSelectorScreen extends React.Component {
  handleNavigateMap = () => {
    const {navigation, changeMapNextAction, changeDeliveryAddressFromShared} =
      this.props;

    changeMapNextAction(() => {
      changeDeliveryAddressFromShared();
    });

    navigation.navigate('Map');
  };

  render() {
    const {user} = this.props;

    return (
      <Container>
        <ScreenHeader title="Choose Delivery Address" />
        <Content>
          <View style={{...Layout.defaultPadding}}>
            {user.address.map(address => (
              <AddressSelectorItem address={address} />
            ))}
          </View>
        </Content>
        <View
          style={{
            ...Layout.flexCenterContainerWithPadding,
            position: 'absolute',
            bottom: 0,
          }}>
          <PrimaryBigButton
            action={this.handleNavigateMap}
            text="Choose another address"
          />
        </View>
      </Container>
    );
  }
}

const {changeMapNextAction} = SharedAction;
const {changeDeliveryAddressFromShared} = CartAction;

const mapStateToProps = state => {
  const {user} = state.currentUser;
  const {checkoutDetails} = state.cart;

  return {user, checkoutDetails};
};

export default connect(mapStateToProps, {
  changeMapNextAction,
  changeDeliveryAddressFromShared,
})(AddressSelectorScreen);
