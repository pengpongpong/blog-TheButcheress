import { defineConfig } from 'sanity'
import { DefaultDocumentNodeResolver, deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'

export const devStructure: DefaultDocumentNodeResolver = (S, { schemaType, documentId }) => {
    switch (schemaType) {
        default:
            return S.document().views([S.view.form()])
    }
}

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;

export default defineConfig({
    name: 'default',
    title: 'blog-butcheress',

    projectId: `${projectId}`,
    dataset: `${dataset}`,

    apiVersion: `${apiVersion}`,
    basePath: "/de/admin",

    plugins: [deskTool({
        defaultDocumentNode: devStructure
    }), visionTool()],

    useCdn: true,

})
