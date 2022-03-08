import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import {Provider as ReduxProvider} from 'react-redux';
import {makeStore} from './store';

const store = makeStore();
const App = () => {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </ReduxProvider>
  );
};

export default App;
