import {StyleSheet, Text, View} from 'react-native';

function EpisodeListScreen() {
  return (
    <View style={styles.container}>
      <Text>EpisodeListScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EpisodeListScreen;
