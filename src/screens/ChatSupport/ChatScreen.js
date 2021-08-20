import React from 'react';
import {APP_MESSENGER_ID} from '@env';
import {Linking, SafeAreaView, View} from 'react-native';
import {PrimaryBigButton} from '../../components/Buttons';
import {Text, Accordion, Icon} from 'native-base';
import {Fonts} from '../../styles';

const dataArray = [
  {title: 'First Element', content: 'Lorem ipsum dolor sit amet'},
  {title: 'Second Element', content: 'Lorem ipsum dolor sit amet'},
  {title: 'Third Element', content: 'Lorem ipsum dolor sit amet'},
];

class ChatScreen extends React.Component {
  redirectMessenger = () => {
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
          //errorHandler(dispatch, 'gen/app-url-not-supported');
        } else {
          //errorHandler(dispatch, 'gen/default');
        }
      });
  };

  _renderHeader = (item, expanded) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 15,
          paddingHorizontal: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          borderBottomColor: 'lightgray',
          borderBottomWidth: 0.5,
        }}>
        <Text style={{fontWeight: '600'}}> {item.title}</Text>
        {expanded ? (
          <Icon
            style={{fontSize: Fonts.size.min}}
            type="AntDesign"
            name="down"
          />
        ) : (
          <Icon style={{fontSize: Fonts.size.min}} type="AntDesign" name="up" />
        )}
      </View>
    );
  };

  _renderContent = item => {
    return (
      <Text
        style={{
          backgroundColor: 'white',
          padding: 14,
          borderBottomColor: 'lightgray',
          borderBottomWidth: 0.5,
        }}>
        {item.content}
      </Text>
    );
  };

  render() {
    return (
      <SafeAreaView
        style={{
          backgroundColor: 'white',
          flex: 1,
        }}>
        <Accordion
          dataArray={dataArray}
          animation={true}
          expanded={[]}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
        />
        <PrimaryBigButton
          action={() => redirectMessenger()}
          text="Chat with us"
          customContainerStyles={{backgroundColor: '#0098F6'}}
        />
      </SafeAreaView>
    );
  }
}

export default ChatScreen;
