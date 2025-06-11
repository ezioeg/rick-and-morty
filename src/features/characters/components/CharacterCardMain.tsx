import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {currentTheme} from '@theme';
import {Character} from '@features/characters/services/graphql/useCharacters';

const CharacterCardMain = ({
  character,
  onPress,
}: {
  character: Character;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.item}>
        <Image source={{uri: character.image}} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{character.name}</Text>
          <Text style={styles.species}>{character.species.toUpperCase()}</Text>
          <View style={styles.statusGenderRow}>
            <Text style={styles.status}>{character.status}</Text>
            <Text style={styles.gender}>{character.gender}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: currentTheme.colors.background,
    padding: currentTheme.spacing.md,
    marginBottom: currentTheme.spacing.lg,
    borderRadius: currentTheme.border.radius * 2,
    shadowColor: currentTheme.colors.shadowColor,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: currentTheme.border.radius,
    marginRight: currentTheme.spacing.md,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: currentTheme.typography.subtitle,
    fontWeight: 'bold',
    color: currentTheme.colors.textPrimary,
    marginBottom: 4,
  },
  species: {
    textTransform: 'uppercase',
    color: currentTheme.colors.textSecondary,
    marginBottom: 4,
  },
  statusGenderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {
    color: currentTheme.colors.textSecondary,
  },
  gender: {
    color: currentTheme.colors.textSecondary,
  },
});

export default CharacterCardMain;
