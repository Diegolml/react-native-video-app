import * as React from 'react';
import VideoCard from './VideoCard'
import { SafeAreaView, ScrollView, StyleSheet, StatusBar } from 'react-native';
const { RefreshControl } = require('react-native-web-refresh-control');
import useYoutubeVideos from '../../hooks/useYoutubeVideos';
import PropTypes, { InferProps } from 'prop-types';

export default function VideosList({ topic, handleVideoSelection }: InferProps<typeof VideosList.propTypes>) {
    const [refreshing, setRefreshing] = React.useState(false);
    let youtubeVideosList = useYoutubeVideos(refreshing, setRefreshing, topic);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
                {youtubeVideosList.map((video: Video) => (
                    <VideoCard key={`video_${video.id.videoId}`} video={video} handleVideoSelection={handleVideoSelection} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

VideosList.propTypes = {
    topic: PropTypes.string.isRequired,
    handleVideoSelection: PropTypes.func.isRequired
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        backgroundColor: 'white',
    },
    text: {
        fontSize: 42,
    },
});
