import React from 'react';
import {View} from 'react-native';
import {FlatList} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {GhostProductCard, ProductCard} from '../../../components/UIComponents';
import {Layout} from '../../../styles';

class SearchList extends React.PureComponent {
  render() {
    const {products} = this.props;

    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        scrollEnabled
        data={products}
        keyExtractor={item => `search-result-product-${item.id}`}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-around',
        }}
        contentContainerStyle={{
          paddingHorizontal: Layout.defaultPaddingNum,
          paddingTop: Layout.defaultPaddingNum,
          paddingBottom: Layout.defaultPaddingNum * 2,
        }}
        renderItem={({item, index}) => {
          return (
            <>
              <View style={{marginBottom: RFValue(15)}}>
                <ProductCard product={item} />
              </View>
              <GhostProductCard products={products} index={index} />
            </>
          );
        }}
      />
    );
  }
}

export default SearchList;
