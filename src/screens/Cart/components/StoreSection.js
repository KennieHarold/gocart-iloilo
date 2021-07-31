import React from 'react';
import {View, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {Text, Icon, Radio} from 'native-base';
import {Colors, Layout} from '../../../styles';
import CartProductItem from './CartProductItem';
import styles from './styles';
import {CartAction} from '../../../actions';
import {RFValue} from 'react-native-responsive-fontsize';

const {selectStoreIdInCart} = CartAction;

class StoreSection extends React.PureComponent {
  render() {
    const {
      //  Oject containing store id, store name, and its products
      categorizedCart,

      // From redux
      selectStoreIdInCart,
      selectedStoreId,
    } = this.props;

    return (
      <View style={styles.storeSectionLayout}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Radio
            selected={selectedStoreId === categorizedCart.storeId}
            onPress={() => selectStoreIdInCart(categorizedCart.storeId)}
            color={'rgb(0, 0, 0)'}
            selectedColor={Colors.primary}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: RFValue(10),
            }}>
            <Icon type="MaterialIcons" name="store" style={styles.storeIcon} />
            <Text style={styles.storeNameLabel}>
              {categorizedCart.storeName}
            </Text>
          </View>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{marginTop: Layout.defaultPaddingNum}}
          scrollEnabled
          data={categorizedCart.products}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return <CartProductItem item={item} />;
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {selectedStoreId} = state.cart;

  return {selectedStoreId};
};

export default connect(mapStateToProps, {selectStoreIdInCart})(StoreSection);
