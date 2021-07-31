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

  getOrders = () => this.props.getProcessingOrders();

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
      processingOrders,
      isProcessingOrdersLoading,
      isMoreProcessingOrdersLoading,
    } = this.props;

    return isProcessingOrdersLoading ? (
      <ActivityIndicator
        size="large"
        color={Colors.primary}
        style={{marginTop: Layout.defaultPaddingNum}}
      />
    ) : processingOrders.length > 0 ? (
      <FlatList
        showsVerticalScrollIndicator={false}
        scrollEnabled
        data={processingOrders}
        keyExtractor={item => `processing-order-${item.id}`}
        initialNumToRender={INITIAL_NUM_TO_RENDER}
        onEndReachedThreshold={0.5}
        onEndReached={
          processingOrders.length > INITIAL_NUM_TO_RENDER
            ? this.getOrders
            : null
        }
        ListFooterComponent={() =>
          isMoreProcessingOrdersLoading &&
          processingOrders.length > INITIAL_NUM_TO_RENDER
            ? this.renderFooter()
            : null
        }
        renderItem={({item}) => <OrderItem order={item} />}
      />
    ) : (
      <View
        style={{...Layout.fullWidthCenterContainer, ...Layout.defaultPadding}}>
        <Text style={{color: Colors.readableText, fontSize: Fonts.size.mini}}>
          You have no processing orders
        </Text>
      </View>
    );
  }
}

const {getProcessingOrders} = OrderAction;

const mapStateToProps = state => {
  const {
    processingOrders,
    isProcessingOrdersLoading,
    isMoreProcessingOrdersLoading,
  } = state.order;

  const {availableStores} = state.store;

  return {
    processingOrders,
    isProcessingOrdersLoading,
    isMoreProcessingOrdersLoading,
    availableStores,
  };
};

export default connect(mapStateToProps, {getProcessingOrders})(ProcessingTab);
