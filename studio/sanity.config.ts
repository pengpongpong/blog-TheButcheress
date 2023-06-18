import { defineConfig } from 'sanity'
import { DefaultDocumentNodeResolver, deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from "../sanity/schemas/index"

export const devStructure: DefaultDocumentNodeResolver = (S, { schemaType, documentId }) => {
    switch (schemaType) {
        default:
            return S.document().views([S.view.form()])
    }
}

export default defineConfig({
    name: 'default',
    title: 'blog-butcheress',

    projectId: '94y9p2mz',
    dataset: 'production',

    apiVersion: "2023-04-24",
    basePath: "/de/admin",

    plugins: [deskTool({
        defaultDocumentNode: devStructure
    }), visionTool()],

    useCdn: true,
    
    schema: {
        types: schemaTypes,
    },
})
