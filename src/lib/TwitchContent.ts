import {ContentProvider} from "@mmccalldev/lib/Content";
import {AppTokenAuthProvider} from "@twurple/auth";
import {ApiClient} from "@twurple/api";

const authProvider = new AppTokenAuthProvider(process.env.TWITCH_CLIENT_ID!, process.env.TWITCH_CLIENT_SECRET!)
const apiClient = new ApiClient({authProvider});

const GetTwitchContent: ContentProvider = async ()=> {

    const user = await apiClient.users.getUserByName('mmapptv');

    if (!user) {
        return [];
    }

    const { data: videos } = await apiClient.videos.getVideosByUser(user);

    return videos.map(async ({title, url, creationDate, thumbnailUrl}) => {

        thumbnailUrl = thumbnailUrl.replace(/%{width}x%{height}/, '320x200');

        return {
            title,
            date: creationDate.toString(),
            icon: 'twitch',
            link: url,
            image: thumbnailUrl,
            // overlay: true,
        }
    })
}

export default GetTwitchContent;