import React from 'react';
import {connect} from 'react-redux';
import {View, FlatList} from 'react-native';
import {
  Container,
  Content,
  Text,
  ListItem,
  Left,
  Body,
  Right,
} from 'native-base';
import {ScreenHeader} from '../../components/Headers';
import FastImage from 'react-native-fast-image';
import {toDecimal} from '../../helpers';
import {Colors, Fonts} from '../../styles';
import {RFValue} from 'react-native-responsive-fontsize';

class OrderItemsScreen extends React.PureComponent {
  render() {
    const {selectedOrder, selectedOrderItems} = this.props;

    return (
      <Container>
        <ScreenHeader title="Order Items" />
        <Content>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{marginBottom: RFValue(75)}}
            scrollEnabled
            data={selectedOrderItems}
            keyExtractor={item => `order-item${item.product.id}`}
            renderItem={({item}) => {
              return (
                <ListItem noIndent>
                  <Left style={{flex: 1.5}}>
                    <FastImage
                      resizeMode={FastImage.resizeMode.contain}
                      source={{uri: item.product.photoUri}}
                      style={{height: RFValue(50), width: RFValue(50)}}
                    />
                  </Left>
                  <Body style={{flex: 5}}>
                    <Text
                      style={{
                        fontSize: Fonts.size.mini,
                        fontWeight: '700',
                        marginBottom: 5,
                      }}>
                      {item.product.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: Fonts.size.min,
                        color: Colors.readableText,
                      }}>
                      {`Quantity: ${item.quantity}`}
                    </Text>
                  </Body>
                  <Right style={{flex: 2.75}}>
                    <Text style={{fontSize: Fonts.size.mini}}>
                      &#8369; {toDecimal(item.product.price * item.quantity)}
                    </Text>
                  </Right>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const {selectedOrder, selectedOrderItems} = state.order;

  return {
    selectedOrder,
    selectedOrderItems,
  };
};

export default connect(mapStateToProps, null)(OrderItemsScreen);
