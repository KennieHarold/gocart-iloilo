import React from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './src/reducers';
import Navigation from './src/navigation/Navigation';
import {
  LoadingModal,
  AlertModal,
  SimpleLoadingModal,
} from './src/components/Modals';

class App extends React.Component {
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
      </Provider>
    );
  }
}

export default App;
