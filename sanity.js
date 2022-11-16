import {
    createCurrentUserHook,
    createClient,
} from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'

export const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: "2021-08-31",
    useCdn: process.env.NODE_ENV === "production"
};

//set up the sanity client for fetching data in the getProps page functions
export const sanityClient = createClient(config);

/** setup a helper function for generating Image Urls with only the asset reference data in your documents
 * Read more : https://www.sanity.io/docs/image-url
 */
export const urlFor = (source) => createImageUrlBuilder(config).image(source);


//helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config);