import React from 'react';
import {View} from 'react-native';
import {FlatList} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {ProductCard} from '../../../components/UIComponents';
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
    );
  }
}

export default SearchList;
