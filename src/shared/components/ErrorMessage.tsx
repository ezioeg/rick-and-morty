import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {currentTheme} from '@theme';

const ErrorMessage = ({message}: {message: string}) => (
  <View style={styles.center}>
    <Text style={styles.text}>Error: {message}</Text>
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

export default ErrorMessage;
