import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

interface Props {
  item: {
    id: string;
    name: string;
    image: string;
    species: string;
  };
  onPress: () => void;
}

const CharacterListItem = ({item, onPress}: Props) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.item}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.species}>{item.species}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  species: {
    color: '#555',
  },
});

export default CharacterListItem;
