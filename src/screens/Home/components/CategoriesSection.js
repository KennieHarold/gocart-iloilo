import React from 'react';
import {View, FlatList} from 'react-native';
import {Text} from 'native-base';
import {Layout, Fonts} from '../../../styles';
import CategoryItem from './CategoryItem';

const CategoriesSection = ({categories}) => {
  return (
    <View style={{paddingBottom: Layout.defaultPaddingNum}}>
      <View
        style={{
          marginHorizontal: Layout.defaultPaddingNum,
          marginBottom: Layout.defaultPaddingNum,
        }}>
        <Text style={{fontSize: Fonts.size.small, fontWeight: '700'}}>
          Categories
        </Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        scrollEnabled
        data={categories}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        initialNumToRender={5}
        renderItem={({item}) => <CategoryItem category={item} />}
      />
    </View>
  );
};

export default React.memo(CategoriesSection);
