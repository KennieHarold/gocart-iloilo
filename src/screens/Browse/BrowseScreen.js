import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {TitleHeader} from '../../components/Headers';
import {CartButton} from '../../components/Buttons';
import {Container, Item, Input, Icon} from 'native-base';
import styles from './styles';
import {Colors, Layout} from '../../styles';
import {SearchAction} from '../../actions';
import {groupProductsByStoreComputer} from '../../computers';
import {SearchList, NoResults, SearchSegment} from './components';

class BrowseScreen extends React.PureComponent {
  state = {
    selectedStoreIndex: 0,
  };

  renderData = () => {
    const {groupedProducts} = this.props;

    if (Object.keys(groupedProducts).length > 0) {
      const index = Object.keys(groupedProducts)[this.state.selectedStoreIndex];
      return groupedProducts[index].products;
    }
    return [];
  };

  render() {
    const {
      searchProducts,
      changeSearchQuery,
      searchQuery,
      groupedProducts,
      isSearchResultProductsLoading,
    } = this.props;

    const {selectedStoreIndex} = this.state;

    return (
      <Container>
        <TitleHeader title="Browse" rightKey={<CartButton />} />
        <View style={{paddingHorizontal: Layout.defaultPaddingNum}}>
          <Item style={styles.searchItem}>
            <Icon name="ios-search" style={styles.searchIcon} />
            <Input
              value={searchQuery}
              placeholder="Search"
              style={styles.searchInput}
              placeholderTextColor="gray"
              returnKeyType="search"
              onChangeText={e => changearchQuery(e)}
              onSubmitEditing={() => {
                this.setState({selectedStoreIndex: 0});
                searchProducts(searchQuery);
              }}
            />
          </Item>
        </View>
        {isSearchResultProductsLoading ? (
          <ActivityIndicator
            color={Colors.primary}
            size="large"
            style={{marginTop: Layout.defaultPaddingNum}}
          />
        ) : (
          <>
            <SearchSegment
              action={index => {
                console.log('Index: ', index);
                this.setState({selectedStoreIndex: index});
              }}
              index={selectedStoreIndex}
              products={groupedProducts}
            />
            {Object.keys(groupedProducts).length > 0 ? (
              <SearchList products={this.renderData()} />
            ) : (
              <NoResults />
            )}
          </>
        )}
      </Container>
    );
  }
}

const {searchProducts, changeSearchQuery} = SearchAction;

const mapStateToProps = state => {
  const {searchQuery, searchResultProducts, isSearchResultProductsLoading} =
    state.search;

  const groupedProducts = groupProductsByStoreComputer(searchResultProducts);

  return {
    searchQuery,
    groupedProducts,
    isSearchResultProductsLoading,
  };
};

export default connect(mapStateToProps, {
  searchProducts,
  changeSearchQuery,
})(BrowseScreen);
