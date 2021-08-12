import React from 'react';
import {connect} from 'react-redux';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import {Container, Content, Text, Icon, Badge} from 'native-base';
import {ScreenHeader} from '../../components/Headers';
import {OrderAction} from '../../actions';
import {Colors, Fonts, Layout} from '../../styles';
import FastImage from 'react-native-fast-image';
import {toDecimal} from '../../helpers';
import {RFValue} from 'react-native-responsive-fontsize';
import styles from './styles';
import {
  productCollection,
  transactionCollection,
} from '../../firebase/collections';
import {OptionsModal} from './components';

class OrderDetailsScreen extends React.Component {
  state = {
    isLoading: false,
    items: [],
    transaction: undefined,
    isOpen: false,
  };

  componentDidMount() {
    this.getRequiredData();
  }

  // componentWillUnmount() {
  //   const {clearOrder} = this.props;
  //   clearOrder();
  // }

  getTransaction = async () => {
    const {selectedOrder} = this.props;

    const transaction = await transactionCollection
      .doc(selectedOrder.transactionId)
      .get();

    this.setState({transaction: transaction.data()});
  };

  getProduct = async () => {
    const {selectedOrder} = this.props;

    let items = [];
    for (const itemId of selectedOrder.items) {
      const product = await productCollection.doc(itemId).get();
      items.push(product.data());
    }

    this.setState({items});
  };

  getRequiredData = async () => {
    this.setState({isLoading: true});

    await this.getTransaction();
    await this.getProduct();

    this.setState({isLoading: false});
  };

  getStoreName = id => {
    let index = this.props.availableStores.findIndex(store => store.id === id);

    if (index !== -1) {
      return this.props.availableStores[index].name;
    }
    return 'Error Loading Store';
  };

  renderDeliveryTime = () => {
    const {selectedOrder} = this.props;

    return (
      <View style={styles.orderDetailsSection}>
        <Icon
          type="SimpleLineIcons"
          name="clock"
          style={styles.orderDetailsIcon}
        />
        {selectedOrder.status === 'cancelled' ? (
          <Badge style={{backgroundColor: Colors.error}}>
            <Text style={{fontSize: Fonts.size.min}}>Cancelled</Text>
          </Badge>
        ) : (
          <Text style={styles.orderDetailsLabel}>Today</Text>
        )}
      </View>
    );
  };

  render() {
    const {selectedOrder, cancelOrder} = this.props;

    return (
      <>
        <Container>
          <ScreenHeader title="Order Details" />
          <Content>
            {this.state.isLoading ? (
              <ActivityIndicator
                color={Colors.primary}
                size="large"
                style={{marginTop: Layout.defaultPaddingNum}}
              />
            ) : (
              <>
                <View style={styles.orderDetailsSection}>
                  <Icon
                    type="AntDesign"
                    name="isv"
                    style={styles.orderDetailsIcon}
                  />
                  <View>
                    <Text
                      style={[
                        styles.orderDetailsLabel,
                        {fontWeight: '700', marginBottom: 3},
                      ]}>
                      {this.getStoreName(selectedOrder.storeId)}
                    </Text>
                    <Text note style={{fontSize: Fonts.size.min}}>
                      Order no:{' '}
                      {selectedOrder.reference
                        ? selectedOrder.reference
                        : 'Error loading order no'}
                    </Text>
                  </View>
                </View>

                {this.renderDeliveryTime()}

                <View style={[styles.orderDetailsSection, {flex: 1}]}>
                  <Icon
                    type="SimpleLineIcons"
                    name="home"
                    style={styles.orderDetailsIcon}
                  />
                  <View style={{flex: 1}}>
                    <Text numberOfLines={2} style={styles.orderDetailsLabel}>
                      {selectedOrder.deliveryAddress.formattedAddress}
                    </Text>
                  </View>
                </View>
                <View
                  style={{...styles.orderDetailsSection, borderBottomWidth: 0}}>
                  <Icon
                    type="SimpleLineIcons"
                    name="handbag"
                    style={styles.orderDetailsIcon}
                  />
                  <Text style={styles.orderDetailsLabel}>Items</Text>
                </View>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingHorizontal: 15,
                    marginBottom: Layout.defaultPaddingNum,
                  }}
                  scrollEnabled
                  data={this.state.items}
                  keyExtractor={item => `order-item-${item.id}`}
                  renderItem={({item}) => (
                    <FastImage
                      resizeMode={FastImage.resizeMode.contain}
                      source={{uri: item.photoUri}}
                      style={styles.orderDetailsProductImg}
                    />
                  )}
                />
                <View style={styles.orderDetailsDivider} />
                <View style={{padding: RFValue(20)}}>
                  <View
                    style={[
                      styles.transactionRowLayout,
                      {marginBottom: RFValue(10)},
                    ]}>
                    <Text style={styles.transactionSubLabel}>Subtotal</Text>
                    <Text style={styles.transactionSubLabel}>
                      &#8369;{' '}
                      {this.state.transaction
                        ? toDecimal(
                            this.state.transaction.paymentDetails.subTotal,
                          )
                        : 'Error loading subtotal'}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.transactionRowLayout,
                      {marginBottom: RFValue(10)},
                    ]}>
                    <Text style={styles.transactionSubLabel}>Shopping Fee</Text>
                    <Text style={styles.transactionSubLabel}>
                      &#8369;{' '}
                      {this.state.transaction
                        ? toDecimal(
                            this.state.transaction.paymentDetails.shoppingFee,
                          )
                        : 'Error loading shopping fee'}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.transactionRowLayout,
                      {marginBottom: Layout.defaultPaddingNum},
                    ]}>
                    <Text style={styles.transactionSubLabel}>Delivery Fee</Text>
                    <Text style={styles.transactionSubLabel}>
                      &#8369;{' '}
                      {this.state.transaction
                        ? toDecimal(
                            this.state.transaction.paymentDetails.deliveryFee,
                          )
                        : 'Error loading delivery fee'}
                    </Text>
                  </View>
                  <View style={styles.transactionRowLayout}>
                    <Text style={styles.transactionTotalLabel}>Total</Text>
                    <Text style={styles.transactionTotalLabel}>
                      &#8369;{' '}
                      {this.state.transaction
                        ? toDecimal(
                            this.state.transaction.paymentDetails.totalPayment,
                          )
                        : 'Error loading total payment'}
                    </Text>
                  </View>
                </View>
              </>
            )}
          </Content>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              position: 'absolute',
              bottom: 75,
            }}>
            <TouchableOpacity
              onPress={() => this.setState({isOpen: true})}
              disabled={this.state.isLoading}
              activeOpacity={0.6}>
              <Text
                style={{color: Colors.secondary, fontSize: Fonts.size.mini}}>
                Need help?
              </Text>
            </TouchableOpacity>
          </View>
        </Container>
        <OptionsModal
          isVisible={this.state.isOpen}
          onClose={() => this.setState({isOpen: false})}
          cancelOrder={() => cancelOrder(selectedOrder)}
          order={selectedOrder}
        />
      </>
    );
  }
}

const {clearOrder, cancelOrder} = OrderAction;

const mapStateToProps = state => {
  const {selectedOrder} = state.order;
  const {availableStores} = state.store;

  return {selectedOrder, availableStores};
};

export default connect(mapStateToProps, {clearOrder, cancelOrder})(
  OrderDetailsScreen,
);
