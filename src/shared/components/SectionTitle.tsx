import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {currentTheme} from '@theme';

const SectionTitle = ({text}: {text: string}) => (
  <View style={styles.propertyRow}>
    <Text style={styles.propertyLabel}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  propertyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: currentTheme.spacing.sm,
    backgroundColor: currentTheme.colors.background,
    borderRadius: currentTheme.border.radius,
  },
  propertyLabel: {
    fontWeight: 'bold',
    color: currentTheme.colors.textSecondary,
  },
  propertyValue: {
    fontWeight: '500',
    color: currentTheme.colors.textPrimary,
  },
});

export default SectionTitle;
