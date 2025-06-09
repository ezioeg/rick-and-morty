import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useEpisodes} from '@features/episodes/services/graphql';
import {SearchEpisodeIcon} from '@shared/components/icons';
import {Header, Loader, ErrorMessage} from '@shared/components';
import {RootStackParamList} from '@shared/types/RootStackParamListTypes';
import {currentTheme} from '@theme';

function EpisodeListScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {data, loading, error} = useEpisodes(1);

  if (loading) {
    return <Loader message="Loading episodes..." />;
  }

  if (error) {
    return <ErrorMessage message="Error loading episodes" />;
  }

  const episodes = data?.episodes?.results ?? [];
  return (
    <View style={styles.container}>
      <Header
        title="Episodes"
        showBackButton={false}
        showRightIcon={true}
        RightIconComponent={SearchEpisodeIcon}
      />
      <FlatList
        data={episodes}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('EpisodeDetail', {id: item.id})}>
            <View style={styles.item}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.airDate}>{item.air_date}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: currentTheme.spacing.lg,
    backgroundColor: currentTheme.colors.background,
  },
  item: {
    marginBottom: currentTheme.spacing.lg,
    borderRadius: currentTheme.border.radius,
    backgroundColor: currentTheme.colors.background,
  },
  title: {
    fontWeight: 'bold',
    fontSize: currentTheme.typography.subtitle,
    color: currentTheme.colors.textPrimary,
  },
  airDate: {
    color: currentTheme.colors.textSecondary,
  },
});

export default EpisodeListScreen;
