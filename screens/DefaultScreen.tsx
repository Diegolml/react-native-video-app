import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import ProfileHeader from '../components/ProfileHeader';
import { Text, View } from '../components/Themed';

export default function DefaultScreen() {
  return (
    <View style={styles.container}>
      <ProfileHeader />
      <View style={styles.dashboard}>
        <Text style={styles.title}>Default title</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <EditScreenInfo path="/screens/DefaultTab.tsx" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dashboard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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