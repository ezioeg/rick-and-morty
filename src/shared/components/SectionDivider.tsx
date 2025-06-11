import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {currentTheme} from '@theme';

const SectionDivider = ({title}: {title: string}) => (
  <View style={styles.headerRow}>
    <View style={styles.line} />
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.line} />
  </View>
);

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: currentTheme.spacing.md,
  },
  line: {
    flex: 1,
    height: 1,
    marginHorizontal: currentTheme.spacing.sm,
    backgroundColor: currentTheme.colors.border,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: currentTheme.colors.textPrimary,
  },
});

export default SectionDivider;
