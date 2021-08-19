import React from 'react';
import {useDispatch} from 'react-redux';
import {APP_MESSENGER_ID} from '@env';
import {Linking, SafeAreaView, View} from 'react-native';
import {PrimaryBigButton} from '../../components/Buttons';
import {Text} from 'native-base';
import {errorHandler} from '../../helpers';
import banner from '../../assets/chat-banner.jpg';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors, Fonts} from '../../styles';

const RedirectChat = () => {
  const dispatch = useDispatch();

  const redirectMessenger = () => {
    Linking.canOpenURL('fb-messenger://')
      .then(supported => {
        if (!supported) {
          throw new Error('not-supported');
        } else {
          const url = APP_MESSENGER_ID;
          Linking.openURL('fb-messenger://user-thread/' + url);
        }
      })
      .catch(error => {
        console.log(error);
        if (error.message === 'not-supported') {
          errorHandler(dispatch, 'gen/app-url-not-supported');
        } else {
          errorHandler(dispatch, 'gen/default');
        }
      });
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}>
      <View style={{flex: 1}}>
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          source={banner}
          style={{width: '100%', height: '100%'}}
        />
      </View>
      <View
        style={{
          flex: 1,
          paddingBottom: RFValue(75),
          paddingHorizontal: RFValue(25),
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: Fonts.size.verySmall,
            color: Colors.readableText,
          }}>
          Hello! Welcome to GoCart Iloilo customer support. Send your questions
          and inquiries via FB messenger and we will be ready to assist you.
        </Text>
        <PrimaryBigButton
          action={() => redirectMessenger()}
          text="Chat with us"
          customContainerStyles={{backgroundColor: '#0098F6'}}
        />
      </View>
    </SafeAreaView>
  );
};

export default RedirectChat;
