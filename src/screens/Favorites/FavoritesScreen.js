import React from 'react';
import {SafeAreaView, FlatList, View} from 'react-native';
import {Text} from 'native-base';
import {connect} from 'react-redux';
import {ScreenHeader, TitleHeader} from '../../components/Headers';
import {CartButton} from '../../components/Buttons';
import {FavoriteItem} from './components';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors, Fonts, Layout} from '../../styles';

const INITIAL_NUM_TO_RENDER = 8;
class FavoritesScreen extends React.PureComponent {
  render() {
    const {favorites} = this.props;

    return (
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <ScreenHeader title="Favorites" rightKey={<CartButton />} />
        {favorites.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            scrollEnabled
            data={favorites}
            contentContainerStyle={{
              paddingBottom: RFValue(200),
            }}
            keyExtractor={item => `favorite-${item.id}`}
            initialNumToRender={INITIAL_NUM_TO_RENDER}
            //onEndReachedThreshold={0.5}
            renderItem={({item}) => <FavoriteItem product={item} />}
          />
        ) : (
          <View
            style={{
              ...Layout.fullWidthCenterContainer,
              marginTop: RFValue(25),
            }}>
            <Text
              style={{color: Colors.readableText, fontSize: Fonts.size.mini}}>
              You have no favorites
            </Text>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  const {favorites} = state.favorites;

  return {favorites};
};

export default connect(mapStateToProps, null)(FavoritesScreen);
