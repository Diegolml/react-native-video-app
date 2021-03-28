import * as React from 'react';
import { Image } from 'react-native';
import { View } from './Themed';
import { StyleSheet } from 'react-native';

export default function ProfilePicture() {
    return (
        <View>
            <Image source={require('../assets/images/diego-profile-picture.jpg')} style={styles.image} />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '30px',
        height: '30px',
        borderRadius: 25,
        marginTop: 2
    }
});
