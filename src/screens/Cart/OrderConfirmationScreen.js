import React from 'react';
import {Text} from 'native-base';
import {SafeAreaView, View} from 'react-native';
import orderCheck from '../../assets/order-check.png';
import {Layout} from '../../styles';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import {PrimaryBigButton, SecondaryBigButton} from '../../components/Buttons';
import styles from './styles';
import {OrderAction} from '../../actions';
import {connect} from 'react-redux';

class OrderConfirmationScreen extends React.Component {
  render() {
    const {navigation, refreshProcessingOrders} = this.props;

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <FastImage
            source={orderCheck}
            style={{
              width: RFValue(100),
              height: RFValue(100),
              marginBottom: RFValue(10),
            }}
          />
          <Text style={styles.orderConfirmationTitle}>
            Thank you for your purchase!
          </Text>
        </View>
        <View
          style={{
            ...Layout.flexCenterContainerWithPadding,
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <SecondaryBigButton
            action={() => {
              refreshProcessingOrders();
              navigation.navigate('Home');
            }}
            text="Back to Store"
          />
          <PrimaryBigButton
            action={() => {
              refreshProcessingOrders();
              navigation.navigate('Orders');
            }}
            text="View Orders"
            customContainerStyles={{marginTop: RFValue(15)}}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const {refreshProcessingOrders} = OrderAction;

export default connect(null, {refreshProcessingOrders})(
  OrderConfirmationScreen,
);
