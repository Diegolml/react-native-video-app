import * as React from 'react';
import { StyleSheet } from 'react-native';

import ProfileHeader from '../components/ProfileHeader';
import { View } from '../components/Themed';
import VideosList from '../components/home/VideosList';
import VideosSuggestions from '../components/home/VideosSuggestions';

export default function HomeScreen(params: { navigation: { navigate: Function } }) {
  const [topic, setSuggestion] = React.useState('Videogames');

  const handleVideoSelection = (video: Video) => {
    params.navigation.navigate('DetailScreen', video);
  };

  return (
    <View style={styles.container}>
      <ProfileHeader />
      <VideosSuggestions selected={topic} setSuggestion={setSuggestion} />
      <View style={styles.dashboard}>
        <VideosList topic={topic} handleVideoSelection={handleVideoSelection} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  dashboard: {
    height: 'calc(100% - 85px)'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
