import React from 'react';
import { Image, StyleSheet } from 'react-native';

import { View } from './Themed';
import Icon from './Icon';
import ProfilePicture from './ProfilePicture';

export default function ProfileHeader() {
  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={{ flexGrow: 1, flexDirection: 'row', marginTop: 5 }}>
          <Icon name="logo-youtube" color="red" size={32} />
          <View>
            <Image source={require('../assets/images/youtube-logo.png')} style={styles.youtubeText} />
          </View>
        </View>
        <View style={styles.actionButtons}>
          <Icon name="notifications" color="#8E8E8F" iconStyle={{ width: '40px' }} size={30} />
          <Icon name="search" color="#8E8E8F" iconStyle={{ width: '40px' }} size={30} />
          <ProfilePicture />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: '50px',
    flexDirection: 'row',
    paddingHorizontal: '10px',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E4',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 5
  },
  youtubeText: {
    height: '15px',
    width: '60px',
    marginTop: 10,
    marginLeft: 3
  }
});
