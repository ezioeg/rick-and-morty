import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {currentTheme} from '@theme';
import {FilterModalProps} from '@features/characters/types/FilterModalTypes';

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  title,
  onClose,
  onReset,
  onApply,
  sections,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>

            <ScrollView
              contentContainerStyle={{paddingBottom: currentTheme.spacing.lg}}
              showsVerticalScrollIndicator={false}>
              {sections.map((section, index) => (
                <View key={index} style={styles.section}>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  {section.content}
                </View>
              ))}
            </ScrollView>

            <View style={styles.buttonsContainer}>
              <Button
                title="Reset"
                onPress={onReset}
                color={currentTheme.colors.backgroundButton}
              />
              <Button
                title="Apply"
                onPress={onApply}
                color={currentTheme.colors.backgroundButton}
              />
              <Button
                title="Close"
                onPress={onClose}
                color={currentTheme.colors.backgroundButton}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: currentTheme.spacing.lg,
  },
  container: {
    backgroundColor: currentTheme.colors.background,
    borderRadius: 12,
    padding: currentTheme.spacing.lg,
    maxHeight: '90%',
  },
  title: {
    fontSize: currentTheme.typography.title,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: currentTheme.spacing.md,
    color: currentTheme.colors.textPrimary,
  },
  section: {
    marginBottom: currentTheme.spacing.md,
  },
  sectionTitle: {
    fontSize: currentTheme.typography.subtitle,
    marginBottom: currentTheme.spacing.sm,
    color: currentTheme.colors.textPrimary,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: currentTheme.spacing.md,
  },
});

export default FilterModal;
