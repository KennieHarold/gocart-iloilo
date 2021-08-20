import React from 'react';
import {APP_MESSENGER_ID} from '@env';
import {Linking, View} from 'react-native';
import {PrimaryBigButton} from '../../components/Buttons';
import {Text, Accordion, Icon, Container, Content} from 'native-base';
import {Colors, Fonts} from '../../styles';
import supportDataArray from './utils/supportDataArray';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import {RFValue} from 'react-native-responsive-fontsize';
import agent from '../../assets/support-agent.jpg';

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
      <View style={styles.supportHeaderContainer}>
        <Text style={styles.supportHeaderTitle}>{item.title}</Text>
        {expanded ? (
          <Icon
            style={{fontSize: Fonts.size.mini}}
            type="AntDesign"
            name="down"
          />
        ) : (
          <Icon
            style={{fontSize: Fonts.size.mini}}
            type="AntDesign"
            name="up"
          />
        )}
      </View>
    );
  };

  _renderContent = item => {
    return (
      <View style={styles.supportContentContainer}>
        <Text
          style={{
            fontSize: Fonts.size.mini,
            color: Colors.readableText,
          }}>
          {item.content}
        </Text>
      </View>
    );
  };

  render() {
    return (
      <Container>
        <Content>
          <View>
            <View style={styles.supportGrayDivider}>
              <Text style={styles.supportGrayDividerText}>How it works?</Text>
            </View>
          </View>
          <Accordion
            dataArray={supportDataArray}
            animation={true}
            expanded={[]}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            style={{backgroundColor: 'white'}}
          />
          <View style={{marginTop: RFValue(60), marginBottom: RFValue(75)}}>
            <View style={styles.supportGrayDivider}>
              <Text style={styles.supportGrayDividerText}>
                Need further assistance?
              </Text>
            </View>
            <View style={styles.supportSubsContainer}>
              <FastImage source={agent} style={styles.supportIcon} />
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontSize: Fonts.size.mini,
                    color: Colors.readableText,
                  }}>
                  Hello! welcome to GoCart Iloilo customer support. Send your
                  questions and inquiries via Facevook messenger and we will be
                  ready to assist you
                </Text>
              </View>
            </View>
            <View
              style={{paddingHorizontal: RFValue(15), paddingTop: RFValue(10)}}>
              <PrimaryBigButton
                action={this.redirectMessenger}
                text="Chat with us"
              />
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

export default ChatScreen;
