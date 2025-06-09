import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BackArrowIcon} from '../../shared/components/icons';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showRightIcon?: boolean;
  RightIconComponent?: React.ComponentType<{size: number; color: string}>;
}

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
          <BackArrowIcon size={24} color="black" />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}

      <Text style={styles.title}>{title}</Text>

      {showRightIcon && RightIconComponent ? (
        <TouchableOpacity onPress={() => {}}>
          <RightIconComponent size={24} color="black" />
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
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  button: {
    fontSize: 20,
  },
  placeholder: {
    width: 32, // Ancho para alinear con el botón
  },
});

export default Header;
