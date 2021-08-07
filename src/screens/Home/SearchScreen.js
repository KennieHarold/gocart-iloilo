import React from 'react';
import {View, StatusBar, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Container, Input, Icon, Item} from 'native-base';
import {RFValue} from 'react-native-responsive-fontsize';
import {Layout, Fonts} from '../../styles';
import {SearchAction} from '../../actions';
import {AddProductModal} from '../../components/Modals';
import {ProductCard} from '../../components/UIComponents';

class SearchScreen extends React.PureComponent {
  componentDidMount() {
    this.clearPreviousSearchResults();
  }

  clearPreviousSearchResults = () => {
    this.props.clearSearchResultStoreProducts();
  };

  render() {
    const {
      navigation,
      searchStoreQuery,
      changeSearchStoreQuery,
      searchStoreProducts,
    } = this.props;
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <Container>
          <View style={styles.searchHeader}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
              style={{marginRight: 10}}>
              <Icon
                type="AntDesign"
                name="arrowleft"
                style={{fontSize: RFValue(24)}}
              />
            </TouchableOpacity>
            <Item style={styles.searchItem}>
              <Input
                value={searchStoreQuery}
                placeholder="Search"
                placeholderTextColor="gray"
                style={{fontSize: Fonts.size.mini, color: 'gray'}}
                returnKeyType="search"
                onChangeText={e => changeSearchStoreQuery(e)}
                onSubmitEditing={() => searchStoreProducts(searchStoreQuery)}
              />
            </Item>
          </View>
          <Content>
            <FlatList
              showsVerticalScrollIndicator={false}
              scrollEnabled
              data={products}
              keyExtractor={item => `search-result-store-product-${item.id}`}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: 'space-between',
              }}
              contentContainerStyle={{
                paddingHorizontal: RFValue(Layout.defaultPaddingNum),
                paddingTop: Layout.defaultPaddingNum,
                paddingBottom: RFValue(Layout.defaultPaddingNum * 2),
              }}
              renderItem={({item}) => {
                return (
                  <View style={{marginBottom: RFValue(15)}}>
                    <ProductCard product={item} />
                  </View>
                );
              }}
            />
          </Content>
        </Container>
        <AddProductModal />
      </>
    );
  }
}

const {
  searchStoreProducts,
  clearSearchResultStoreProducts,
  changeSearchStoreQuery,
} = SearchAction;

const mapStateToProps = state => {
  const {selectedStore} = state.store;
  const {
    searchResultStoreProducts,
    searchStoreQuery,
    isSearchResultStoreProductsLoading,
  } = state.search;

  return {
    selectedStore,
    searchResultStoreProducts,
    searchStoreQuery,
    isSearchResultStoreProductsLoading,
  };
};

export default connect(mapStateToProps, {
  searchStoreProducts,
  clearSearchResultStoreProducts,
  changeSearchStoreQuery,
})(SearchScreen);
