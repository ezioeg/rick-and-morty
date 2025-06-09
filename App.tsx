// import 'react-native-url-polyfill/auto';
import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {ApolloProvider} from '@apollo/client';
import {client} from '@services/apollo/client';
import Navigation from '@navigation/RootStackNavigator';
import {currentTheme} from '@theme';

function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <SafeAreaView style={styles.safeArea} edges={['top']}>
            <StatusBar
              barStyle={currentTheme.statusBarStyle}
              backgroundColor={currentTheme.colors.background}
            />
            <Navigation />
          </SafeAreaView>
        </SafeAreaProvider>
      </ApolloProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: currentTheme.colors.background,
  },
});

export default App;
