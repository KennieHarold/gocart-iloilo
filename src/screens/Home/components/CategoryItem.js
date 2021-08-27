import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {Text} from 'native-base';
import styles from './styles';
//import FastImage from 'react-native-fast-image';
import {StoreAction} from '../../../actions';

const {navigateSingleCategoryProductsScreen} = StoreAction;

const CategoryItem = ({category}) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.categoryItemContainer}>
      <TouchableOpacity
        onPress={() => dispatch(navigateSingleCategoryProductsScreen(category))}
        activeOpacity={0.8}
        style={styles.categoryItemCircle}>
        <Text style={styles.categoryItemLabel}>{category.name}</Text>
        {/* <FastImage
          source={{uri: category.iconUri}}
          style={{height: 35, width: 35}}
        /> */}
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(CategoryItem);
