import {StyleSheet, Text, View} from 'react-native';

function CharacterDetailScreen() {
  return (
    <View style={styles.container}>
      <Text>CharacterDetailScreen</Text>
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

export default CharacterDetailScreen;
