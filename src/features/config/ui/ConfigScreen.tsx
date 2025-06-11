import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {currentTheme} from '@theme';
import {useLanguageStore} from '@stores/useLanguageStore';

function ConfigScreen() {
  const {t} = useTranslation();
  const {language, setLanguage} = useLanguageStore();

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'es' : 'en';
    setLanguage(newLang);
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: currentTheme.colors.background},
      ]}>
      <Text style={[styles.title, {color: currentTheme.colors.textPrimary}]}>
        {t('config.title')}
      </Text>

      <TouchableOpacity style={styles.button} onPress={toggleLanguage}>
        <Text style={styles.buttonText}>{t('config.changeLanguage')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: currentTheme.spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: currentTheme.typography.title,
    fontWeight: 'bold',
    marginBottom: currentTheme.spacing.lg,
  },
  button: {
    backgroundColor: currentTheme.colors.accent,
    padding: currentTheme.spacing.md,
    borderRadius: currentTheme.border.radius,
    marginVertical: currentTheme.spacing.sm,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: currentTheme.colors.textButton,
    fontWeight: 'bold',
  },
});

export default ConfigScreen;
