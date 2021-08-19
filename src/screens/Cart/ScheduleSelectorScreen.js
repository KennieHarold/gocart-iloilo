import React from 'react';
import {View} from 'react-native';
import {ScreenHeader} from '../../components/Headers';
import {Container, Content, Text} from 'native-base';
import {connect} from 'react-redux';
import {Colors, Layout} from '../../styles';
import {CartAction} from '../../actions';
import moment from 'moment';
import {SecondaryBigButton} from '../../components/Buttons';
import styles from './styles';
import getButtonString from './utils/getButtonString';
import {RFValue} from 'react-native-responsive-fontsize';
import {nextDayHourList, otherDayHourList} from './utils/rawHourList';
import {HoardNoticeBanner} from './components';

class ScheduleSelectorScreen extends React.PureComponent {
  handlePress = deliverySchedule => {
    const {changeCheckoutDetails} = this.props;
    changeCheckoutDetails({deliverySchedule});
  };

  checkIfHourPassWorkingHours = () => {
    const currentHour = new Date();

    const d = new Date();
    const threshold = d.setHours(18, 0);

    if (currentHour > threshold) {
      return true;
    }

    return false;
  };

  checkSelected = hourList => {
    const {
      checkoutDetails: {deliverySchedule},
    } = this.props;

    //  If one of them is undefined return false
    if (
      deliverySchedule[0] === undefined &&
      deliverySchedule[1] === undefined
    ) {
      return false;
    }

    return (
      hourList[0] === deliverySchedule[0] && hourList[1] === deliverySchedule[1]
    );
  };

  render() {
    console.log('render');
    return (
      <Container>
        <ScreenHeader title="Delivery Schedule" />
        <Content>
          <HoardNoticeBanner />
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
                {this.checkIfHourPassWorkingHours() ? (
                  <SecondaryBigButton
                    disabled
                    customTextStyles={{color: 'gray'}}
                    customContainerStyles={{
                      marginBottom: RFValue(15),
                      borderColor: 'gray',
                    }}
                    text={getButtonString('nextDayMorning')}
                  />
                ) : (
                  <SecondaryBigButton
                    action={() => {
                      const hourList = [nextDayHourList[0], nextDayHourList[1]];
                      this.handlePress(hourList);
                    }}
                    customContainerStyles={{
                      marginBottom: RFValue(15),
                      backgroundColor: this.checkSelected([
                        nextDayHourList[0],
                        nextDayHourList[1],
                      ])
                        ? Colors.primary
                        : 'white',
                    }}
                    customTextStyles={{
                      color: this.checkSelected([
                        nextDayHourList[0],
                        nextDayHourList[1],
                      ])
                        ? 'white'
                        : Colors.primary,
                    }}
                    text={getButtonString('nextDayMorning')}
                  />
                )}
                <SecondaryBigButton
                  action={() => {
                    const hourList = [nextDayHourList[2], nextDayHourList[3]];
                    this.handlePress(hourList);
                  }}
                  customContainerStyles={{
                    backgroundColor: this.checkSelected([
                      nextDayHourList[2],
                      nextDayHourList[3],
                    ])
                      ? Colors.primary
                      : 'white',
                  }}
                  customTextStyles={{
                    color: this.checkSelected([
                      nextDayHourList[2],
                      nextDayHourList[3],
                    ])
                      ? 'white'
                      : Colors.primary,
                  }}
                  text={getButtonString('nextDayAfternoon')}
                />
              </View>
              <View style={{marginBottom: RFValue(25)}}>
                <Text style={styles.deliveryScheduleTimeTitle}>
                  {moment().add(2, 'days').format('MMMM DD, YYYY - dddd')}
                </Text>
                <SecondaryBigButton
                  action={() => {
                    const hourList = [otherDayHourList[0], otherDayHourList[1]];
                    this.handlePress(hourList);
                  }}
                  customContainerStyles={{
                    marginBottom: RFValue(15),
                    backgroundColor: this.checkSelected([
                      otherDayHourList[0],
                      otherDayHourList[1],
                    ])
                      ? Colors.primary
                      : 'white',
                  }}
                  customTextStyles={{
                    color: this.checkSelected([
                      otherDayHourList[0],
                      otherDayHourList[1],
                    ])
                      ? 'white'
                      : Colors.primary,
                  }}
                  text={getButtonString('otherDayMorning')}
                />
                <SecondaryBigButton
                  action={() => {
                    const hourList = [otherDayHourList[2], otherDayHourList[3]];
                    this.handlePress(hourList);
                  }}
                  customContainerStyles={{
                    backgroundColor: this.checkSelected([
                      otherDayHourList[2],
                      otherDayHourList[3],
                    ])
                      ? Colors.primary
                      : 'white',
                  }}
                  customTextStyles={{
                    color: this.checkSelected([
                      otherDayHourList[2],
                      otherDayHourList[3],
                    ])
                      ? 'white'
                      : Colors.primary,
                  }}
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
