// import 'react-native-url-polyfill/auto';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ApolloProvider} from '@apollo/client';
import {client} from './src/apollo/client';
import Navigation from './src/navigation/RootStackNavigator';

function App() {
  return (
    <GestureHandlerRootView>
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </ApolloProvider>
    </GestureHandlerRootView>
  );
}

export default App;
