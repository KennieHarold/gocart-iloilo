import React from 'react';
import {View} from 'react-native';
import {Container, Text, Tabs, Tab, TabHeading} from 'native-base';
import {TitleHeader} from '../../components/Headers';
import {ProcessingTab, CancelledTab, DeliveredTab} from './components';
import {Colors, Fonts} from '../../styles';

const orderItems = [
  {
    key: 'order-item-processing',
    title: 'Processing',
    component: <ProcessingTab />,
  },
  {
    key: 'order-item-delivered',
    title: 'Delivered',
    component: <DeliveredTab />,
  },
  {
    key: 'order-item-cancelled',
    title: 'Cancelled',
    component: <CancelledTab />,
  },
];

class OrdersScreen extends React.Component {
  render() {
    return (
      <Container>
        <TitleHeader title="My Orders" />
        <Tabs
          locked
          tabBarPosition="top"
          tabContainerStyle={{elevation: 0}}
          tabBarUnderlineStyle={{
            backgroundColor: Colors.primary,
          }}>
          {orderItems.map(orderItem => (
            <Tab
              heading={
                <TabHeading style={{backgroundColor: 'white'}}>
                  <Text
                    style={{color: Colors.primary, fontSize: Fonts.size.mini}}>
                    {orderItem.title}
                  </Text>
                </TabHeading>
              }>
              <View style={{paddingBottom: 50}}>{orderItem.component}</View>
            </Tab>
          ))}
        </Tabs>
      </Container>
    );
  }
}

export default OrdersScreen;
