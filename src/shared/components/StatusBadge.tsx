import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {currentTheme} from '@theme';

const StatusBadge = ({status}: {status: string}) => {
  const badgeStyle =
    status === 'Alive'
      ? styles.badgeAlive
      : status === 'Dead'
      ? styles.badgeDead
      : styles.badgeUnknown;

  return (
    <View style={[styles.statusBadge, badgeStyle]}>
      <Text style={styles.badgeText}>{status.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statusBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    paddingHorizontal: currentTheme.spacing.sm,
    paddingVertical: currentTheme.spacing.xs,
    borderRadius: currentTheme.border.radius,
  },
  badgeAlive: {
    backgroundColor: currentTheme.colors.aliveBadge,
  },
  badgeDead: {
    backgroundColor: currentTheme.colors.deadBadge,
  },
  badgeUnknown: {
    backgroundColor: currentTheme.colors.unknownBadge,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: currentTheme.colors.textButton,
  },
});

export default StatusBadge;
