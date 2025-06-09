import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

const Loader = ({message = 'Loading...'}) => (
  <View style={styles.center}>
    <ActivityIndicator size="large" />
    <Text>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
