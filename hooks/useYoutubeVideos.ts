
import axios from 'axios';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

const API_KEY = 'GOOGLE_CLOUD_API_KEY';

export default function useYoutubeVideos(refreshing: boolean, setRefreshing: Function, topic: string) {
    const [youtubeVideosList, setYoutubeVideos] = useState([]);

    async function loadYoutubeVideos() {
        function generateRandomNumber() {
            return `${(Math.random() * (1000000)) << 0}`
        }

        try {
            const { data } = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${topic}&key=${API_KEY}&part=id,snippet&order=date&maxResults=5`);

            //To get statistics we should make another GET to this URL: https://www.googleapis.com/youtube/v3/videos?part=statistics&id=VIDEO_IDS&key=GOOGLE_CLOUD_API_KEY
            //I decided to just create my own statistics to avoid exceeding my daily quota of queries to the googleapi's endpoint
            const list = data.items.map((item: Video) => {
                item.statistics = {
                    "viewCount": generateRandomNumber(),
                    "likeCount": generateRandomNumber(),
                    "dislikeCount": generateRandomNumber(),
                    "favoriteCount": generateRandomNumber()
                };
                return item;
            });
            setYoutubeVideos(list);
        } catch (e) {
            // We might want to provide this error information to an error reporting service
            console.warn(e);
        } finally {
            setRefreshing(false);
            SplashScreen.hideAsync();
        }
    }

    // Load any resources or data that we need when refreshing is set to true
    useEffect(() => {
        if (refreshing) {
            loadYoutubeVideos();
        }
    }, [refreshing]);

    useEffect(() => {
        loadYoutubeVideos();
    }, [topic]);

    return youtubeVideosList;
}
