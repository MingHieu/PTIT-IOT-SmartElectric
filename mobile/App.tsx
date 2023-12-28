import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppRouter from './src/routes';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AppRouter />
    </GestureHandlerRootView>
  );
};

export default App;
