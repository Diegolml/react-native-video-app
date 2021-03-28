import moment from 'moment';
import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '../Icon';
import ProfilePicture from '../ProfilePicture';
import { Text, View } from '../Themed';

export default function VideoCard(props: { video: Video, handleVideoSelection: Function }) {
    const [video, setVideoInfo] = React.useState(props.video);

    const handleThumbsClick = (status: string) => {
        if (video.status === status) {
            setVideoInfo({ ...video, status: '' });
        } else if (status === 'like') {
            setVideoInfo({ ...video, status: 'like' });
        } else if (status === 'dislike') {
            setVideoInfo({ ...video, status: 'dislike' });
        }
    };

    const handleVideoPress = () => props.handleVideoSelection(video);

    return (
        <View>
            <TouchableOpacity onPress={handleVideoPress}>
                <Image source={{ uri: video.snippet.thumbnails.medium.url }} style={styles.image} />
            </TouchableOpacity>
            <View style={styles.summary}>
                <ProfilePicture />
                <View style={styles.titleInfo}>
                    <Text style={styles.title} ellipsizeMode="tail" numberOfLines={2} onPress={handleVideoPress}>
                        {video.snippet.title}
                    </Text>
                    <View style={styles.row}>
                        <Text style={styles.info}>
                            {video.snippet.channelTitle} · {Intl.NumberFormat('en', { notation: 'compact' }).format(Number(video.statistics.viewCount))} views · {moment(video.snippet.publishedAt).fromNow()}
                        </Text>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => handleThumbsClick('like')}>
                                <Icon name="thumbs-up" color={video.status === 'like' ? '#2F95DC' : '#616161'} size={15} iconStyle={{ marginRight: 5 }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleThumbsClick('dislike')}>
                                <Icon name="thumbs-down" color={video.status === 'dislike' ? '#2F95DC' : '#616161'} size={15} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '180px'
    },
    summary: {
        flexDirection: 'row',
        flexGrow: 1,
        marginTop: 5,
        marginBottom: 20,
        marginHorizontal: 10,
    },
    titleInfo: {
        width: 'calc(100% - 50px)',
        marginLeft: 10,
        flexDirection: 'column'
    },
    title: {
        fontWeight: "600",
        fontSize: 12,
    },
    info: {
        fontSize: 11,
        color: '#616161',
        flexGrow: 1
    },
    row: {
        flexDirection: 'row'
    }
});
