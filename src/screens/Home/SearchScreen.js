import React from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Input, Icon, Item} from 'native-base';
import {RFValue} from 'react-native-responsive-fontsize';
import {Layout, Fonts, Colors} from '../../styles';
import {SearchAction} from '../../actions';
import {ProductCard} from '../../components/UIComponents';
import styles from './styles';
import NoResults from '../Browse/components/NoResults';

class SearchScreen extends React.PureComponent {
  componentWillUnmount() {
    this.clearPreviousSearchResults();
  }

  clearPreviousSearchResults = () => {
    this.props.clearSearchResultStoreProducts();
    this.props.changeSearchStoreQuery('');
  };

  render() {
    const {
      navigation,
      searchStoreQuery,
      changeSearchStoreQuery,
      searchStoreProducts,
      searchResultStoreProducts,
      isSearchResultStoreProductsLoading,
      selectedStore,
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
                onSubmitEditing={() =>
                  searchStoreProducts(searchStoreQuery, selectedStore.id)
                }
              />
            </Item>
          </View>
          <Content>
            {isSearchResultStoreProductsLoading ? (
              <ActivityIndicator
                color={Colors.primary}
                size="large"
                style={{marginTop: Layout.defaultPaddingNum}}
              />
            ) : searchResultStoreProducts.length > 0 ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                scrollEnabled
                data={searchResultStoreProducts}
                keyExtractor={item => `search-result-store-product-${item.id}`}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                }}
                contentContainerStyle={{
                  paddingHorizontal: RFValue(Layout.defaultPaddingNum),
                  paddingTop: RFValue(15),
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
            ) : (
              <NoResults />
            )}
          </Content>
        </Container>
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