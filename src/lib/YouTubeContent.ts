import {ContentProvider} from "@mmccalldev/lib/Content";
import {google, youtube_v3} from "googleapis";

const youtube = google.youtube({
    version: "v3",
    auth: process.env.YOUTUBE_API_KEY
});

const GetYouTubeContent: ContentProvider = async ()=> {

    let response;

    try {
        response = await youtube.search.list({
            part: ["snippet", "id"],
            channelId: process.env.YOUTUBE_CHANNEL_ID,
            order: "date",
            maxResults: 10,
        });
    } catch (e) {
        console.error(e);
        return [];
    }

    if (!response.data.items) {
        return [];
    }

    return response.data.items
        .reduce((accumulator: youtube_v3.Schema$SearchResult[], item) => {
            const snippet = item.snippet;

            if (snippet && snippet.thumbnails && snippet.title && snippet.publishedAt && item.id?.videoId) {
                accumulator.push(item);
            }

            return accumulator;
        }, [])
        .map(async (item) => {
            const snippet = item.snippet!

            const thumbnail =
                snippet.thumbnails?.maxres?.url ||
                snippet.thumbnails?.high?.url ||
                snippet.thumbnails?.medium?.url ||
                snippet.thumbnails?.default?.url;

            return {
                image: thumbnail,
                title: snippet.title!,
                description: snippet.description,
                link: `https://www.youtube.com/watch?v=${item.id!.videoId}`,
                date: snippet.publishedAt!,
                icon: 'youtube',
            }
        });
}

export default GetYouTubeContent;