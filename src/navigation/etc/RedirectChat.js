import React from 'react';
import {useDispatch} from 'react-redux';
import {APP_MESSENGER_ID} from '@env';
import {Linking, SafeAreaView} from 'react-native';
import {PrimaryBigButton} from '../../components/Buttons';
import {Layout} from '../../styles';
import {errorHandler} from '../../helpers';

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
        ...Layout.flexCenterContainerWithPadding,
      }}>
      <PrimaryBigButton
        action={() => redirectMessenger()}
        text="Chat us on messenger"
        customContainerStyles={{backgroundColor: '#0098F6'}}
      />
    </SafeAreaView>
  );
};

export default RedirectChat;
