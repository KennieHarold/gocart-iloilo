import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {ListItem, Left, Body, Right, Text, Badge, Icon} from 'native-base';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {RFValue} from 'react-native-responsive-fontsize';
import styles from './styles';
import {OrderAction} from '../../../actions';
import {Colors} from '../../../styles';

const {navigateOrderDetails} = OrderAction;

const OrderItem = ({order}) => {
  const dispatch = useDispatch();

  const availableStores = useSelector(state => state.store.availableStores);

  const getStoreImage = id => {
    let index = availableStores.findIndex(store => store.id === id);

    if (index !== -1) {
      return availableStores[index].photoUri;
    }
    return null;
  };

  const getStoreName = id => {
    let index = availableStores.findIndex(store => store.id === id);

    if (index !== -1) {
      return availableStores[index].name;
    }
    return 'Error Loading Store';
  };

  return (
    <ListItem
      onPress={() => dispatch(navigateOrderDetails(order))}
      noIndent
      style={styles.orderItemLayout}>
      <Left style={{flex: 1.5}}>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          source={{uri: getStoreImage(order.storeId)}}
          style={styles.orderItemStoreImg}
        />
      </Left>
      <Body style={{flex: 5}}>
        <Text style={styles.orderItemStoreNameLabel}>
          {getStoreName(order.storeId)}
        </Text>
        <Text style={styles.orderItemDateLabel}>
          {moment(order.dateCreated._seconds * 1000).fromNow()}
        </Text>
        <Text style={styles.orderItemLengthLabel}>
          {order.items.length} Item(s)
        </Text>
      </Body>
      <Right style={[{flex: 2.75}, styles.orderItemRight]}>
        <Badge
          style={{
            minWidth: RFValue(75),
            backgroundColor:
              order.status === 'processing' ? 'orange' : Colors.error,
          }}>
          <Text style={styles.orderItemStatusLabel}>{order.status}</Text>
        </Badge>
        <Icon
          type="AntDesign"
          name="right"
          style={styles.orderItemRightArrow}
        />
      </Right>
    </ListItem>
  );
};

export default React.memo(OrderItem);
