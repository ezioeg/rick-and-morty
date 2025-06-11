import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {currentTheme} from '@theme';
import StatusBadge from './StatusBadge';

const CharacterImage = ({
  imageUri,
  status,
}: {
  imageUri: string;
  status: string;
}) => (
  <View style={styles.imageContainer}>
    <Image source={{uri: imageUri}} style={styles.image} />
    {status ? <StatusBadge status={status} /> : null}
  </View>
);

const styles = StyleSheet.create({
  imageContainer: {
    alignSelf: 'center',
    position: 'relative',
    marginBottom: currentTheme.spacing.lg,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});

export default CharacterImage;
