import moment from 'moment';
import * as React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '../components/Icon';
import YoutubePlayer from "react-native-youtube-iframe";

import ProfileHeader from '../components/ProfileHeader';
import { Text, View } from '../components/Themed';

export default function DetailScreen(params: { navigation: { navigate: Function }, route: { params: Video } }) {
    const formatNumber = (value: string) => Intl.NumberFormat('en', { notation: 'compact' }).format(Number(value));

    const [video, setVideoInfo] = React.useState(params.route.params);

    const handleThumbsClick = (status: string) => {
        if (video.status === status) {
            setVideoInfo({ ...video, status: '' });
        } else if (status === 'like') {
            setVideoInfo({ ...video, status: 'like' });
        } else if (status === 'dislike') {
            setVideoInfo({ ...video, status: 'dislike' });
        }
    };

    return (
        <View style={styles.container}>
            <ProfileHeader />
            <View style={styles.dashboard}>
                <View style={styles.playerContainer}>
                    <YoutubePlayer videoId={video.id.videoId} height={Dimensions.get('screen').width * 0.5625} play={true} />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.title} ellipsizeMode="tail" numberOfLines={2}>
                        {video.snippet.title}
                    </Text>
                    <Text style={styles.info}>
                        {video.snippet.channelTitle} · {formatNumber(video.statistics.viewCount)} views · {moment(video.snippet.publishedAt).fromNow()}
                    </Text>
                    <View style={styles.iconRow}>
                        <TouchableOpacity onPress={() => handleThumbsClick('like')}>
                            <View style={styles.iconColumn}>
                                <Icon name="thumbs-up" color={video.status === 'like' ? '#2F95DC' : '#616161'} size={25} />
                                <Text style={styles.info}>{formatNumber(video.statistics.likeCount)}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleThumbsClick('dislike')}>
                            <View style={styles.iconColumn}>
                                <Icon name="thumbs-down" color={video.status === 'dislike' ? '#2F95DC' : '#616161'} size={25} />
                                <Text style={styles.info}>{formatNumber(video.statistics.dislikeCount)}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.iconColumn}>
                            <Icon name="arrow-redo" color='#909090' size={25} />
                            <Text style={styles.info}>Share</Text>
                        </View>
                        <View style={styles.iconColumn}>
                            <Icon name="arrow-down-circle" color='#909090' size={25} />
                            <Text style={styles.info}>Download</Text>
                        </View>
                        <View style={styles.iconColumn}>
                            <Icon name="duplicate" color='#909090' size={25} />
                            <Text style={styles.info}>Save</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dashboard: {
        flex: 1
    },
    playerContainer: {
    },
    infoContainer: {
        borderColor: '#E1E1E1',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        padding: 15
    },
    title: {
        fontWeight: "600",
        fontSize: 14,
        paddingBottom: 5
    },
    info: {
        fontSize: 10,
        color: '#616161',
        flexGrow: 1
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        marginHorizontal: 20
    },
    iconColumn: {
        alignItems: 'center'
    }
});