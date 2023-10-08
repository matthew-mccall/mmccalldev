import {ContentProvider} from "@mmccalldev/lib/Content";
import {createApi} from "unsplash-js";
import { getAverageColor} from "fast-average-color-node";

const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY!,
});

const GetUnsplashContent: ContentProvider = async ()=> {

    const photos = (await unsplash.users.getPhotos({
        username: '__mmccall',
    })).response?.results;

    if (!photos) {
        return [];
    }

    return photos.map(async ({urls, alt_description, links, created_at, width, height, color}) => {
        return {
            image: urls.regular,
            overlay: height > width,
            icon: 'image',
            color: color ?? (await getAverageColor(urls.regular)).hex,
            title: alt_description ?? "Shared a photo",
            link: links.html,
            date: created_at,
        }
    })
}

export default GetUnsplashContent;