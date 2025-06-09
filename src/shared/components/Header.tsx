import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BackArrowIcon} from '../../shared/components/icons';
import {HeaderProps} from '../../shared/types/HeaderTypes';
import {currentTheme} from '../../theme';

const Header = ({
  title,
  showBackButton = false,
  showRightIcon = false,
  RightIconComponent,
}: HeaderProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {showBackButton ? (
        <TouchableOpacity onPress={navigation.goBack}>
          <BackArrowIcon size={24} color={currentTheme.colors.textPrimary} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}

      <Text style={styles.title}>{title}</Text>

      {showRightIcon && RightIconComponent ? (
        <TouchableOpacity onPress={() => {}}>
          <RightIconComponent
            size={24}
            color={currentTheme.colors.textPrimary}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: currentTheme.spacing.lg,
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    fontSize: currentTheme.typography.title,
    color: currentTheme.colors.textPrimary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    fontSize: currentTheme.typography.title,
  },
  placeholder: {
    width: 32, // Ancho para alinear con el botón
  },
});

export default Header;
