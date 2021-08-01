import React from 'react';
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {TitleHeader} from '../../components/Headers';
import {CartButton} from '../../components/Buttons';
import {Container, Item, Input, Icon, Text} from 'native-base';
import styles from './styles';
import {Colors, Fonts, Layout} from '../../styles';
import {SearchAction} from '../../actions';
import {groupProductsByStoreComputer} from '../../computers';
import {SearchList, NoResults} from './components';

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

  getStoreName = id => {
    let index = this.props.availableStores.findIndex(store => store.id === id);

    if (index !== -1) {
      return this.props.availableStores[index].name;
    }
    return 'Error Loading Store';
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
              onChangeText={e => changeSearchQuery(e)}
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
            <View>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal
                contentContainerStyle={styles.segmentView}>
                {Object.keys(groupedProducts).map((key, index) => (
                  <TouchableOpacity
                    key={`segment-buttons-${key}`}
                    activeOpacity={0.9}
                    onPress={() => this.setState({selectedStoreIndex: index})}
                    style={{
                      ...styles.segmentButtons,
                      backgroundColor:
                        selectedStoreIndex === index ? Colors.primary : 'white',
                    }}>
                    <Text
                      style={{
                        color:
                          selectedStoreIndex === index
                            ? 'white'
                            : Colors.primary,
                        fontSize: Fonts.size.min,
                      }}>
                      {this.getStoreName(key)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
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

  const {availableStores} = state.store;

  const groupedProducts = groupProductsByStoreComputer(searchResultProducts);

  return {
    searchQuery,
    groupedProducts,
    isSearchResultProductsLoading,
    availableStores,
  };
};

export default connect(mapStateToProps, {
  searchProducts,
  changeSearchQuery,
})(BrowseScreen);
