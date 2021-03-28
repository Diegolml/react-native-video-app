interface Thumbnail {
    url: string,
    width: number,
    height: number
}

interface Video {
    etag: string,
    id: {
        videoId: string
    },
    snippet: {
        publishedAt: string,
        title: string,
        thumbnails: {
            default: Thumbnail,
            medium: Thumbnail,
            high: Thumbnail
        },
        channelTitle: string
    },
    statistics: {
        viewCount: string,
        likeCount: string,
        dislikeCount: string,
        favoriteCount: string
    },
    status: string
}
