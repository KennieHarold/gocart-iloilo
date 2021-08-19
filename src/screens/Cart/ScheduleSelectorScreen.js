import React from 'react';
import {View} from 'react-native';
import {ScreenHeader} from '../../components/Headers';
import {Container, Content, Text} from 'native-base';
import {connect} from 'react-redux';
import {Colors, Fonts, Layout} from '../../styles';
import {CartAction} from '../../actions';
import moment from 'moment';
import {SecondaryBigButton} from '../../components/Buttons';
import styles from './styles';
import getButtonString from './utils/getButtonString';
import {RFValue} from 'react-native-responsive-fontsize';

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
          <View
            style={{
              width: '100%',
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor: Colors.lightError,
            }}>
            <Text style={{fontSize: Fonts.size.min, color: Colors.error}}>
              NOTICE: Certain products may be subject to quantity limits, in
              compliance with the Department of Trade and Industry Memorandum
              Circular on Anti-Hoarding and Anti-Panic Buying and ordinances
              imposed by the local government units.
            </Text>
          </View>
          <View style={{padding: Layout.defaultPaddingNum}}>
            <Text style={styles.deliveryScheduleInst}>
              Please select your preferred delivery schedule
            </Text>
            <View style={{marginTop: RFValue(25)}}>
              <View style={{marginBottom: RFValue(25)}}>
                <Text style={styles.deliveryScheduleTimeTitle}>
                  {moment().format('MMMM DD, YYYY - dddd')}
                </Text>
                <SecondaryBigButton
                  disabled
                  customContainerStyles={{
                    marginBottom: RFValue(15),
                    borderColor: 'gray',
                  }}
                  customTextStyles={{color: 'gray'}}
                  text={getButtonString('todayMorning')}
                />
                <SecondaryBigButton
                  disabled
                  customContainerStyles={{
                    borderColor: 'gray',
                  }}
                  customTextStyles={{color: 'gray'}}
                  text={getButtonString('todayAfternoon')}
                />
              </View>

              <View style={{marginBottom: RFValue(25)}}>
                <Text style={styles.deliveryScheduleTimeTitle}>
                  {moment().add(1, 'days').format('MMMM DD, YYYY - dddd')}
                </Text>
                <SecondaryBigButton
                  customContainerStyles={{marginBottom: RFValue(15)}}
                  text={getButtonString('nextDayMorning')}
                />
                <SecondaryBigButton
                  text={getButtonString('nextDayAfternoon')}
                />
              </View>
              <View style={{marginBottom: RFValue(25)}}>
                <Text style={styles.deliveryScheduleTimeTitle}>
                  {moment().add(2, 'days').format('MMMM DD, YYYY - dddd')}
                </Text>
                <SecondaryBigButton
                  customContainerStyles={{marginBottom: RFValue(15)}}
                  text={getButtonString('otherDayMorning')}
                />
                <SecondaryBigButton
                  text={getButtonString('otherDayAfternoon')}
                />
              </View>
            </View>
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
  ScheduleSelectorScreen,
);
