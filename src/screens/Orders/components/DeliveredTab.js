import React from 'react';
import {connect} from 'react-redux';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {Text} from 'native-base';
import {RFValue} from 'react-native-responsive-fontsize';
import {OrderAction} from '../../../actions';
import OrderItem from './OrderItem';
import {Colors, Layout, Fonts} from '../../../styles';

const INITIAL_NUM_TO_RENDER = 8;

class ProcessingTab extends React.Component {
  componentDidMount() {
    this.getOrders();
  }

  getOrders = () => this.props.getDeliveredOrders();

  renderFooter = () => (
    <View
      style={{
        width: '100%',
        paddingBottom: RFValue(Layout.defaultPaddingNum),
      }}>
      <ActivityIndicator
        size="large"
        color={Colors.primary}
        style={{marginTop: RFValue(Layout.defaultPaddingNum)}}
      />
    </View>
  );

  render() {
    const {
      deliveredOrders,
      refreshDeliveredOrders,
      isDeliveredOrdersLoading,
      isMoreDeliveredOrdersLoading,
    } = this.props;

    return isDeliveredOrdersLoading ? (
      <ActivityIndicator
        size="large"
        color={Colors.primary}
        style={{marginTop: Layout.defaultPaddingNum}}
      />
    ) : deliveredOrders.length > 0 ? (
      <FlatList
        showsVerticalScrollIndicator={false}
        scrollEnabled
        data={deliveredOrders}
        keyExtractor={item => `delivered-order-${item.id}`}
        initialNumToRender={INITIAL_NUM_TO_RENDER}
        refreshing={isDeliveredOrdersLoading}
        onRefresh={() => refreshDeliveredOrders()}
        onEndReachedThreshold={0.5}
        onEndReached={
          deliveredOrders.length > INITIAL_NUM_TO_RENDER ? this.getOrders : null
        }
        ListFooterComponent={() =>
          isMoreDeliveredOrdersLoading &&
          deliveredOrders.length > INITIAL_NUM_TO_RENDER
            ? this.renderFooter()
            : null
        }
        renderItem={({item}) => <OrderItem order={item} />}
      />
    ) : (
      <View
        style={{...Layout.fullWidthCenterContainer, ...Layout.defaultPadding}}>
        <Text style={{color: Colors.readableText, fontSize: Fonts.size.mini}}>
          You have no delivered orders
        </Text>
      </View>
    );
  }
}

const {getDeliveredOrders, refreshDeliveredOrders} = OrderAction;

const mapStateToProps = state => {
  const {
    deliveredOrders,
    isDeliveredOrdersLoading,
    isMoreDeliveredOrdersLoading,
  } = state.order;

  const {availableStores} = state.store;

  return {
    deliveredOrders,
    isDeliveredOrdersLoading,
    isMoreDeliveredOrdersLoading,
    availableStores,
  };
};

export default connect(mapStateToProps, {
  getDeliveredOrders,
  refreshDeliveredOrders,
})(ProcessingTab);
