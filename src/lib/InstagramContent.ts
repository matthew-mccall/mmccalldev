import {Content, ContentProvider} from "@mmccalldev/lib/Content";

const GetInstagramContent: ContentProvider = async () => {

    const userAccessToken = process.env.INSTAGRAM_USER_ACCESS_TOKEN;

    const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${userAccessToken}`);
    const data = await response.json();

    const content: Promise<Content>[] = data.data
        .filter((post: any) => post.media_type !== 'VIDEO')
        .map(async (post: any) => ({
            image: post.media_url,
            description: post.caption,
            link: post.permalink,
            date: new Date(post.timestamp),
            icon: 'instagram',
            overlay: true,
        }));

    return content;
};

export default GetInstagramContent;