import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
// import {useTheme} from '@shared/hooks/useTheme'; // Suponiendo que tienes esto
import {currentTheme} from '@theme';

function ConfigScreen() {
  const {t, i18n} = useTranslation();
  // const {isDark, toggleTheme} = useTheme(); // Define este hook o contexto

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
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

      {/* <TouchableOpacity style={styles.button} onPress={toggleTheme}>
        <Text style={styles.buttonText}>
          {isDark ? t('config.setLightTheme') : t('config.setDarkTheme')}
        </Text>
      </TouchableOpacity> */}
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
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ConfigScreen;
