import React from 'react';
import {View, FlatList} from 'react-native';
//import {Text} from 'native-base';
import {Colors} from '../../../styles';
import CategoryItem from './CategoryItem';
import {RFValue} from 'react-native-responsive-fontsize';

const CategoriesSection = ({categories}) => {
  return (
    <View
      style={{
        paddingVertical: RFValue(15),
        backgroundColor: Colors.lightBackground,
      }}>
      {/* <View
        style={{
          marginHorizontal: Layout.defaultPaddingNum,
          marginBottom: Layout.defaultPaddingNum,
        }}>
        <Text style={{fontSize: Fonts.size.small, fontWeight: '700'}}>
          Categories
        </Text>
      </View> */}
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        scrollEnabled
        data={categories}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          paddingHorizontal: RFValue(20),
        }}
        initialNumToRender={5}
        renderItem={({item}) => <CategoryItem category={item} />}
      />
    </View>
  );
};

export default React.memo(CategoriesSection);
