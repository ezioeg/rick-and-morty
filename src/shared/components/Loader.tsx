import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {currentTheme} from '@theme';

const Loader = ({message = 'Loading...'}) => (
  <View style={styles.center}>
    <ActivityIndicator size="large" />
    <Text style={styles.text}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: currentTheme.colors.background,
  },
  text: {
    color: currentTheme.colors.textPrimary,
    fontSize: currentTheme.typography.subtitle,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Loader;
