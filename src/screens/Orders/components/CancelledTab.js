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

  getOrders = () => this.props.getCancelledOrders();

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
      cancelledOrders,
      isCancelledOrdersLoading,
      isMoreCancelledOrdersLoading,
    } = this.props;

    return isCancelledOrdersLoading ? (
      <ActivityIndicator
        size="large"
        color={Colors.primary}
        style={{marginTop: Layout.defaultPaddingNum}}
      />
    ) : cancelledOrders.length > 0 ? (
      <FlatList
        showsVerticalScrollIndicator={false}
        scrollEnabled
        data={cancelledOrders}
        keyExtractor={item => `cancelled-order-${item.id}`}
        initialNumToRender={INITIAL_NUM_TO_RENDER}
        onEndReachedThreshold={0.5}
        onEndReached={
          cancelledOrders.length > INITIAL_NUM_TO_RENDER ? this.getOrders : null
        }
        ListFooterComponent={() =>
          isMoreCancelledOrdersLoading &&
          cancelledOrders.length > INITIAL_NUM_TO_RENDER
            ? this.renderFooter()
            : null
        }
        renderItem={({item}) => <OrderItem order={item} />}
      />
    ) : (
      <View
        style={{...Layout.fullWidthCenterContainer, ...Layout.defaultPadding}}>
        <Text style={{color: Colors.readableText, fontSize: Fonts.size.mini}}>
          You have no cancelled orders
        </Text>
      </View>
    );
  }
}

const {getCancelledOrders} = OrderAction;

const mapStateToProps = state => {
  const {
    cancelledOrders,
    isCancelledOrdersLoading,
    isMoreCancelledOrdersLoading,
  } = state.order;

  const {availableStores} = state.store;

  return {
    cancelledOrders,
    isCancelledOrdersLoading,
    isMoreCancelledOrdersLoading,
    availableStores,
  };
};

export default connect(mapStateToProps, {getCancelledOrders})(ProcessingTab);
