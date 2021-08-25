import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {TitleHeader} from '../../components/Headers';
import {CartButton} from '../../components/Buttons';
import {Container, Item, Input, Icon, Text} from 'native-base';
import styles from './styles';
import {Colors, Fonts, Layout} from '../../styles';
import {SearchAction} from '../../actions';
import {groupProductsByStoreComputer} from '../../computers';
import {SearchList, NoResults, SearchSegment} from './components';
import FastImage from 'react-native-fast-image';
import searchPlaceHolder from '../../assets/search-placeholder.png';
import {RFValue} from 'react-native-responsive-fontsize';

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
      isSearchTriggered,
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
            <SearchSegment
              action={index => {
                this.setState({selectedStoreIndex: index});
              }}
              index={selectedStoreIndex}
              products={groupedProducts}
            />
            {isSearchTriggered ? (
              Object.keys(groupedProducts).length > 0 ? (
                <SearchList products={this.renderData()} />
              ) : (
                <NoResults />
              )
            ) : (
              <View
                style={{
                  ...Layout.fullWidthCenterContainer,
                  marginTop: RFValue(50),
                }}>
                <FastImage
                  source={searchPlaceHolder}
                  style={{height: RFValue(150), width: RFValue(150)}}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <Text
                  style={{
                    fontSize: Fonts.size.mini,
                    marginTop: 5,
                    color: Colors.readableText,
                  }}>
                  Search everything here!
                </Text>
              </View>
            )}
          </>
        )}
      </Container>
    );
  }
}

const {searchProducts, changeSearchQuery} = SearchAction;

const mapStateToProps = state => {
  const {
    searchQuery,
    searchResultProducts,
    isSearchResultProductsLoading,
    isSearchTriggered,
  } = state.search;

  const {availableStores} = state.store;

  const groupedProducts = groupProductsByStoreComputer(
    searchResultProducts,
    availableStores,
  );

  return {
    searchQuery,
    groupedProducts,
    isSearchResultProductsLoading,
    isSearchTriggered,
  };
};

export default connect(mapStateToProps, {
  searchProducts,
  changeSearchQuery,
})(BrowseScreen);
