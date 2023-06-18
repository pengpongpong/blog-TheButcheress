import { definePreview } from 'next-sanity/preview'

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_DATASET;

function onPublicAccessOnly() {
    throw new Error(`Unable to load preview as you're not logged in`)
}
export const usePreview = definePreview({
    projectId: `${projectId}`,
    dataset: `${dataset}`,
    // onPublicAccessOnly
})