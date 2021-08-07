import React from 'react';
import {connect} from 'react-redux';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {Container, Content, Text, Icon} from 'native-base';
import {ScreenHeader} from '../../components/Headers';
import {OrderAction} from '../../actions';
import {Colors, Layout} from '../../styles';
import FastImage from 'react-native-fast-image';
import {toDecimal} from '../../helpers';
import {RFValue} from 'react-native-responsive-fontsize';
import styles from './styles';
import {
  productCollection,
  transactionCollection,
} from '../../firebase/collections';

class OrderDetailsScreen extends React.Component {
  state = {
    isLoading: false,
    items: [],
    transaction: undefined,
  };

  componentDidMount() {
    this.getRequiredData();
  }

  componentWillUnmount() {
    const {clearOrder} = this.props;
    clearOrder();
  }

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

  render() {
    const {selectedOrder} = this.props;

    return (
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
                <Text style={[styles.orderDetailsLabel, {fontWeight: '700'}]}>
                  {this.getStoreName(selectedOrder.storeId)}
                </Text>
              </View>
              <View style={styles.orderDetailsSection}>
                <Icon
                  type="SimpleLineIcons"
                  name="clock"
                  style={styles.orderDetailsIcon}
                />
                <Text style={styles.orderDetailsLabel}>Tomorrow</Text>
              </View>
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
                    {marginBottom: Layout.defaultPaddingNum},
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
      </Container>
    );
  }
}

const {clearOrder} = OrderAction;

const mapStateToProps = state => {
  const {selectedOrder} = state.order;
  const {availableStores} = state.store;

  return {selectedOrder, availableStores};
};

export default connect(mapStateToProps, {clearOrder})(OrderDetailsScreen);
