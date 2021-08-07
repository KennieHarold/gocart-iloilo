import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {Text, Container, Content, Icon} from 'native-base';
import {connect} from 'react-redux';
import {Layout, Colors} from '../../styles';
import FastImage from 'react-native-fast-image';
import {ScreenHeader} from '../../components/Headers';
import {CartButton, SearchWideButton} from '../../components/Buttons';
import {CategoriesSection, ProductsContent} from './components';
import {StoreAction} from '../../actions';
import styles from './styles';

class StoreScreen extends React.Component {
  componentDidMount() {
    const {selectedStore, getStoreCategories} = this.props;
    getStoreCategories(selectedStore);
  }

  componentWillUnmount() {
    const {
      clearSelectedStoreCategories,
      clearSelectedStoreCategorizedProducts,
    } = this.props;

    clearSelectedStoreCategories();
    clearSelectedStoreCategorizedProducts();
  }

  render() {
    const {
      selectedStore: {name, photoUri},
      selectedStoreCategories,
      isSelectedStoreCategoriesLoading,
      navigation,
    } = this.props;

    return (
      <Container>
        <ScreenHeader title={name} rightKey={<CartButton />} />
        <Content>
          <View style={{width: '100%'}}>
            <FastImage
              source={{uri: photoUri}}
              style={styles.storeScreenCover}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <View style={{...Layout.defaultPadding}}>
            <SearchWideButton action={() => navigation.navigate('Search')} />
          </View>
          {isSelectedStoreCategoriesLoading ? (
            <ActivityIndicator
              size="large"
              color={Colors.primary}
              style={{marginTop: Layout.defaultPaddingNum}}
            />
          ) : selectedStoreCategories.length > 0 ? (
            <>
              <CategoriesSection categories={selectedStoreCategories} />
              <ProductsContent categories={selectedStoreCategories} />
            </>
          ) : (
            <View style={{...Layout.flexCenterContainerWithPadding}}>
              <Icon
                type="Ionicons"
                name="cart-outline"
                style={styles.noProductIcon}
              />
              <Text style={styles.noProductText}>
                There is no available categories in this store
              </Text>
            </View>
          )}
        </Content>
      </Container>
    );
  }
}

const {
  getStoreCategories,
  getProductsByCategoryList,
  clearSelectedStoreCategories,
  clearSelectedStoreCategorizedProducts,
} = StoreAction;

const mapStateToProps = state => {
  const {
    selectedStore,
    selectedStoreCategories,
    isSelectedStoreCategoriesLoading,
  } = state.store;

  return {
    selectedStore,
    selectedStoreCategories,
    isSelectedStoreCategoriesLoading,
  };
};

export default connect(mapStateToProps, {
  getStoreCategories,
  getProductsByCategoryList,
  clearSelectedStoreCategories,
  clearSelectedStoreCategorizedProducts,
})(StoreScreen);
