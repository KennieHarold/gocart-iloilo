import React from 'react';
import {FlatList, ActivityIndicator} from 'react-native';
import {Container, View} from 'native-base';
import {connect} from 'react-redux';
import {ScreenHeader} from '../../components/Headers';
import {CartButton} from '../../components/Buttons';
import {ProductCard} from '../../components/UIComponents';
import {StoreAction} from '../../actions';
import {Colors, Layout} from '../../styles';
import {RFValue} from 'react-native-responsive-fontsize';

const INITIAL_NUM_TO_RENDER = 6;

class SingleCategoryProductsScreen extends React.PureComponent {
  componentDidMount() {
    this.getProducts();
  }

  componentWillUnmount() {
    this.clearProducts();
  }

  clearProducts = () => {
    const {clearSingleCategoryProducts} = this.props;
    clearSingleCategoryProducts();
  };

  getProducts = () => {
    const {selectedCategory, getSingleCategoryProducts} = this.props;
    getSingleCategoryProducts(selectedCategory);
  };

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
      selectedCategory,
      singleCategoryProducts,
      isSingleCategoryProductsLoading,
      isMoreProductsLoading,
    } = this.props;

    return (
      <Container>
        <ScreenHeader title={selectedCategory.name} rightKey={<CartButton />} />
        {isSingleCategoryProductsLoading ? (
          <ActivityIndicator
            size="large"
            color={Colors.primary}
            style={{marginTop: RFValue(Layout.defaultPaddingNum)}}
          />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            scrollEnabled
            data={singleCategoryProducts}
            keyExtractor={item => `single-category-product-${item.id}`}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            contentContainerStyle={{
              paddingHorizontal: RFValue(Layout.defaultPaddingNum),
              paddingBottom: RFValue(Layout.defaultPaddingNum * 2),
            }}
            initialNumToRender={INITIAL_NUM_TO_RENDER}
            onEndReachedThreshold={0.5}
            onEndReached={
              singleCategoryProducts.length > INITIAL_NUM_TO_RENDER
                ? this.getProducts
                : null
            }
            ListFooterComponent={() =>
              isMoreProductsLoading &&
              singleCategoryProducts.length > INITIAL_NUM_TO_RENDER
                ? this.renderFooter()
                : null
            }
            renderItem={({item}) => (
              <View style={{marginBottom: RFValue(10)}}>
                <ProductCard product={item} />
              </View>
            )}
          />
        )}
      </Container>
    );
  }
}

const {getSingleCategoryProducts, clearSingleCategoryProducts} = StoreAction;

const mapStateToProps = state => {
  const {
    selectedCategory,
    singleCategoryProducts,
    isSingleCategoryProductsLoading,
    isMoreProductsLoading,
  } = state.store;

  return {
    selectedCategory,
    singleCategoryProducts,
    isSingleCategoryProductsLoading,
    isMoreProductsLoading,
  };
};

export default connect(mapStateToProps, {
  getSingleCategoryProducts,
  clearSingleCategoryProducts,
})(SingleCategoryProductsScreen);
