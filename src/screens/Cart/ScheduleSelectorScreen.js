import React from 'react';
import {ScreenHeader} from '../../components/Headers';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Text,
  Radio,
} from 'native-base';
import {connect} from 'react-redux';
import {Colors, Fonts} from '../../styles';
import {RFValue} from 'react-native-responsive-fontsize';
import {CartAction} from '../../actions';

class ScheduleSelectorScreen extends React.Component {
  handleChange = deliverySchedule => {
    const {changeCheckoutDetails} = this.props;
    changeCheckoutDetails({deliverySchedule});
  };

  render() {
    const {
      checkoutDetails: {deliverySchedule},
    } = this.props;

    return (
      <Container>
        <ScreenHeader title="Delivery Schedule" />
        <Content>
          <List>
            <ListItem noIndent onPress={() => this.handleChange('sameDay')}>
              <Left>
                <Radio
                  selected={deliverySchedule === 'sameDay'}
                  onPress={() => this.handleChange('sameDay')}
                  color={'rgb(0, 0, 0)'}
                  selectedColor={Colors.primary}
                  style={{marginRight: RFValue(15)}}
                />
                <Text style={{fontSize: Fonts.size.verySmall}}>
                  Same Day Delivery
                </Text>
              </Left>
            </ListItem>
            <ListItem noIndent onPress={() => this.handleChange('nextDay')}>
              <Left>
                <Radio
                  selected={deliverySchedule === 'nextDay'}
                  onPress={() => this.handleChange('nextDay')}
                  color={'rgb(0, 0, 0)'}
                  selectedColor={Colors.primary}
                  style={{marginRight: RFValue(15)}}
                />
                <Text style={{fontSize: Fonts.size.verySmall}}>
                  Next Day Delivery
                </Text>
              </Left>
            </ListItem>
          </List>
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
  ScheduleSelectorScreen,
);
