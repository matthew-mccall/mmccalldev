import {ContentProvider} from "@mmccalldev/lib/Content";

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID!;
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET!;

const GetTwitchContent: ContentProvider = async () => {
    const tokenResponse = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&grant_type=client_credentials`, {
        method: 'POST'
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const response = await fetch(`https://api.twitch.tv/helix/users?login=mmapptv`, {
        headers: {
            'Client-ID': TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const data = await response.json();
    const userId = data.data[0].id;

    const videoResponse = await fetch(`https://api.twitch.tv/helix/videos?user_id=${userId}`, {
        headers: {
            'Client-ID': TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const videoData = await videoResponse.json();

    return videoData.data.map(({title, url, created_at, thumbnail_url}: any) => {
        thumbnail_url = thumbnail_url.replace(/%{width}x%{height}/, '320x200');

        return {
            title,
            date: new Date(created_at).toString(),
            icon: 'twitch',
            link: url,
            image: thumbnail_url,
            // overlay: true,
            color: '#9146FF'
        }
    });
}

export default GetTwitchContent;