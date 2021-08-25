import React from 'react';
import {LogBox, Alert, Linking} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './src/reducers';
import Navigation from './src/navigation/Navigation';
import {
  LoadingModal,
  AlertModal,
  SimpleLoadingModal,
  AddToCartModal,
} from './src/components/Modals';

class App extends React.Component {
  componentDidMount() {
    this.checkUpdatedVersion();
  }

  checkUpdatedVersion = async () => {
    const response = await VersionCheck.needUpdate({country: 'us'});

    console.log('Update Needed? ', response);

    const title = 'Please Update';
    const message =
      'You will have to update your app to the latest version to continue using.';

    if (response && response.isNeeded) {
      Alert.alert(
        title,
        message,
        [
          {
            text: string.Update,
            onPress: () => {
              Linking.openURL(response.storeUrl).finally(() => {
                RNExitApp.exitApp();
              });
            },
          },
        ],
        {
          cancelable: false,
        },
      );
    }
  };

  render() {
    LogBox.ignoreLogs(['Warning: ...']);
    LogBox.ignoreAllLogs();

    const store = createStore(rootReducer, applyMiddleware(reduxThunk));

    return (
      <Provider store={store}>
        <Navigation />
        <LoadingModal />
        <AlertModal />
        <SimpleLoadingModal />
        <AddToCartModal />
      </Provider>
    );
  }
}

export default App;
