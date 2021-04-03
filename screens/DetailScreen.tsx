import moment from 'moment';
import * as React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '../components/Icon';
import YoutubePlayer from "react-native-youtube-iframe";
import { Text, View } from '../components/Themed';

export default function DetailScreen(props: { video: Video, handleVideoSelection: Function, isExpanded: boolean, closeVideo: Function }) {
    const [playing, setPlaying] = React.useState(false);
    const onStateChange = React.useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
        }
    }, []);
    const togglePlaying = React.useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);

    const formatNumber = (value: string) => Intl.NumberFormat('en', { notation: 'compact' }).format(Number(value));

    const { video, handleVideoSelection, isExpanded, closeVideo } = props;

    const handleThumbsClick = (status: string) => {
        if (video.status === status) {
            handleVideoSelection({ ...video, status: '' });
        } else {
            handleVideoSelection({ ...video, status: status });
        }
    };

    return (
        <View style={styles.container}>
            <View style={!isExpanded ? styles.row : styles.dashboard}>
                <View style={!isExpanded ? styles.resizedYoutube : {}}>
                    <YoutubePlayer
                        videoId={video.id.videoId}
                        height={Dimensions.get('screen').width * 0.5625}
                        width={!isExpanded ? 100 : undefined}
                        play={playing}
                        onChangeState={onStateChange} />
                </View>
                <View style={!isExpanded ? styles.resizedInfoContainer : styles.infoContainer}>
                    <Text style={styles.title} ellipsizeMode="tail" numberOfLines={!isExpanded ? 1 : 2}>
                        {video.snippet.title}
                    </Text>
                    <Text style={styles.info}>
                        {video.snippet.channelTitle} · {formatNumber(video.statistics.viewCount)} views · {moment(video.snippet.publishedAt).fromNow()}
                    </Text>
                    {isExpanded && (
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
                    )}
                </View>
                {!isExpanded && (
                    <View style={styles.resizedIconRow}>
                        <TouchableOpacity onPress={togglePlaying}>
                            <View style={styles.iconColumn}>
                                <Icon name={playing ? "pause-outline" : "caret-forward-outline"} color='#909090' size={35} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => closeVideo()}>
                            <View style={styles.iconColumn}>
                                <Icon name="close-outline" color='#909090' size={35} />
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
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
    },
    row: {
        display: 'flex',
        flexDirection: 'row'
    },
    resizedYoutube: {
        width: '100px',
        height: '57px'
    },
    resizedInfoContainer: {
        width: 'calc(100% - 200px)',
        margin: '5px'
    },
    resizedIconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5
    }
});