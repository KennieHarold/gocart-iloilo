import React from 'react';
import {useDispatch} from 'react-redux';
import {FlatList} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {ProductCard} from '../../../components/UIComponents';
import {CartAction} from '../../../actions';
import {Layout} from '../../../styles';

const {selectPressedProduct} = CartAction;

const SearchList = ({products}) => {
  console.log('Search List Rendered');
  const dispatch = useDispatch();

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
        paddingBottom: RFValue(Layout.defaultPaddingNum * 2),
      }}
      renderItem={({item}) => {
        return (
          <ProductCard
            product={item}
            selectPressedProduct={() => dispatch(selectPressedProduct(item))}
          />
        );
      }}
    />
  );
};

export default React.memo(SearchList);
