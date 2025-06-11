import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {currentTheme} from '@theme';
import {Character} from '@features/characters/services/graphql/useCharacters';

const CharacterCard = ({
  character,
  onPress,
}: {
  character: Character;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    accessibilityRole="button"
    testID="touchable-button">
    <View style={styles.characterItem}>
      <Image source={{uri: character.image}} style={styles.image} />
      <View style={styles.characterInfo}>
        <Text style={styles.characterName}>{character.name}</Text>
        <Text style={styles.characterSpecies}>
          {character.species.toUpperCase()}
        </Text>
        <View style={styles.statusGenderRow}>
          <Text style={styles.characterStatus}>{character.status}</Text>
          <Text style={styles.characterGender}>{character.gender}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  characterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: currentTheme.spacing.lg,
    paddingVertical: currentTheme.spacing.md,
    backgroundColor: currentTheme.colors.background,
    borderBottomWidth: 0.5,
    borderBottomColor: currentTheme.colors.border,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: currentTheme.spacing.md,
    borderRadius: currentTheme.border.radius,
  },
  characterInfo: {
    flex: 1,
  },
  characterName: {
    fontWeight: 'bold',
    color: currentTheme.colors.textPrimary,
  },
  characterSpecies: {
    marginTop: 2,
    textTransform: 'uppercase',
    color: currentTheme.colors.textSecondary,
  },
  statusGenderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  characterStatus: {
    color: currentTheme.colors.textSecondary,
  },
  characterGender: {
    color: currentTheme.colors.textSecondary,
  },
});

export default CharacterCard;
