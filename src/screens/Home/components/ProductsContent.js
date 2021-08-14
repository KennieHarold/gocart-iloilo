import React from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Icon, Text} from 'native-base';
import {ProductCard} from '../../../components/UIComponents';
import {Colors, Fonts, Layout} from '../../../styles';
import {StoreAction} from '../../../actions';
import styles from './styles';

const {getProductsByCategoryList, navigateSingleCategoryProductsScreen} =
  StoreAction;

const MemoizedSection = React.memo(({categorizedProduct}) => {
  const dispatch = useDispatch();

  return (
    <View
      key={categorizedProduct.id}
      style={{marginBottom: Layout.defaultPaddingNum}}>
      <View style={styles.productsSectionHeaderLayout}>
        <View style={{flex: 7}}>
          <Text numberOfLines={1} style={styles.productsSectionTitle}>
            {categorizedProduct.category.name}
          </Text>
        </View>
        <View style={{flex: 2, alignItems: 'flex-end'}}>
          <TouchableOpacity
            onPress={() =>
              dispatch(
                navigateSingleCategoryProductsScreen(
                  categorizedProduct.category,
                ),
              )
            }
            activeOpacity={0.6}>
            {/* <Text style={styles.seeMore}>See more</Text> */}
            <Icon
              type="AntDesign"
              name="right"
              style={{fontSize: Fonts.size.verySmall}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        scrollEnabled
        data={categorizedProduct.products}
        keyExtractor={item => `store-product-${item.id}`}
        contentContainerStyle={{
          paddingHorizontal: 15,
          backgroundColor: Colors.lightBackground,
        }}
        initialNumToRender={3}
        renderItem={({item}) => (
          <View style={{marginHorizontal: 5, paddingVertical: 15}}>
            <ProductCard product={item} />
          </View>
        )}
      />
    </View>
  );
});

const ProductsContent = ({categories}) => {
  const dispatch = useDispatch();

  const [categorizedProducts, isLoading, selectedStore] = useSelector(state => {
    const {
      store: {
        selectedStoreCategorizedProducts,
        isCategorizedProductsLoading,
        selectedStore,
      },
    } = state;

    return [
      selectedStoreCategorizedProducts,
      isCategorizedProductsLoading,
      selectedStore,
    ];
  });

  React.useEffect(() => {
    dispatch(getProductsByCategoryList(categories, selectedStore));
    return () => {};
  }, []);

  return (
    <View style={{width: '100%', marginBottom: Layout.defaultPaddingNum * 2}}>
      <View style={styles.productsContentDiv} />
      <View style={{marginTop: Layout.defaultPaddingNum}}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={Colors.primary}
            style={{marginTop: Layout.defaultPaddingNum}}
          />
        ) : (
          categorizedProducts.map(categorizedProduct => (
            <MemoizedSection
              key={categorizedProduct.id}
              categorizedProduct={categorizedProduct}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default React.memo(ProductsContent);
