import React from 'react';
import {connect} from 'react-redux';
import {Container, Content, Textarea} from 'native-base';
import {View} from 'react-native';
import {ScreenHeader} from '../../components/Headers';
import {Layout} from '../../styles';
import {CartAction} from '../../actions';

class DeliveryInstScreen extends React.Component {
  render() {
    const {changeCheckoutDetails, checkoutDetails} = this.props;

    return (
      <Container>
        <ScreenHeader title="Delivery Instructions" />
        <Content>
          <View style={{padding: Layout.defaultPaddingNum}}>
            <Textarea
              value={checkoutDetails.notes}
              rowSpan={7}
              bordered
              placeholder="Type here some information or notes about your delivery..."
              onChangeText={text => changeCheckoutDetails({notes: text})}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

const {changeCheckoutDetails} = CartAction;

const mapStateToProps = state => {
  const {checkoutDetails} = state.cart;

  return {checkoutDetails};
};

export default connect(mapStateToProps, {changeCheckoutDetails})(
  DeliveryInstScreen,
);
