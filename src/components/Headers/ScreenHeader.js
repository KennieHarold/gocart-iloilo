import React from 'react';
import {TouchableOpacity, StatusBar, View, Platform} from 'react-native';
import {Header, Text, Icon} from 'native-base';
import * as RootNavigation from '../../navigation/RootNavigation';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors, Fonts} from '../../styles';

const ScreenHeader = ({title, rightKey}) => {
  return (
    <Header
      style={{
        backgroundColor: 'white',
        alignItems: 'center',
        elevation: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgray',
      }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={{flex: 2}}>
        {Platform.OS === 'ios' ? (
          <TouchableOpacity
            onPress={() => RootNavigation.goBack()}
            activeOpacity={0.7}>
            <Icon
              type="AntDesign"
              name="left"
              style={{fontSize: RFValue(25), color: Colors.primary}}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => RootNavigation.goBack()}
            activeOpacity={0.7}>
            <Icon
              type="AntDesign"
              name="arrowleft"
              style={{fontSize: RFValue(25)}}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={{flex: 7}}>
        <Text
          numberOfLines={1}
          style={{fontWeight: '700', fontSize: Fonts.size.verySmall}}>
          {title}
        </Text>
      </View>
      <View
        style={{
          flex: 4,
          alignItems: 'flex-end',
        }}>
        {rightKey ? rightKey : null}
      </View>
    </Header>
  );
};

export default ScreenHeader;
