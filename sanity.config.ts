import { defineConfig } from "sanity";
import { DefaultDocumentNodeResolver, ListBuilder, deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { StructureBuilder, } from "sanity/desk";
import { getNavData } from "@/sanity/lib/sanity-utils";
import Iframe from 'sanity-plugin-iframe-pane'

interface Divider {
    divider?: boolean;
}

interface ListItem {
    title: string;
    listItem: {
        title: string;
        tag?: string;
        type?: string;
    };
}

interface StructureStudio {
    title: string;
    tag?: string;
    child: {
        title: string;
        items: (StructureStudio | ListItem | Divider)[];
    };
}

export interface NavigationItem {
    title: string;
    slug?: string;
    _type: 'navigation' | 'navigationSubmenu' | 'link' | 'tags';
    order?: number;
    submenus?: NavigationItem[];
    link?: string;
}

export type NavigationData = NavigationItem[];

//!fix any
//transform fetched data for recipes from CMS for generateStructure
function transformNavigation(navigation: NavigationItem): any {
    return navigation.submenus!.map((submenu) => {
        if (submenu._type === 'navigationSubmenu' && submenu.submenus) {
            return {
                tag: submenu.slug ?? null,
                title: submenu.title,
                type: "recipe",
                child: {
                    title: submenu.title,
                    items: transformNavigation(submenu)
                }
            };
        } else if (submenu._type === 'tags' && submenu.slug) {
            return {
                title: submenu.title,
                listItem: {
                    title: submenu.title,
                    type: "recipe",
                    tag: submenu.slug,
                }
            };
        } else if (submenu._type === "link") {
            return {
                title: submenu.title,
                listItem: {
                    title: submenu.title,
                    type: "recipe"
                }
            }
        }
    })
}

//create structure from data
const generateStructure = (
    S: StructureBuilder,
    items: (StructureStudio | ListItem | Divider)[],
    title?: string
): ListBuilder => {
    //!fix any
    const structure: any = items.map((item: (StructureStudio | ListItem | Divider)) => {
        if ("listItem" in item) {
            const filter = item.listItem.tag
                ? `_type == "${item.listItem.type}" && "${item.listItem.tag}" in tags[]->slug.current`
                : `_type == "${item.listItem.type}"`;

            return S.listItem()
                .title(item.title)
                .schemaType(item.listItem.type!)
                .child(S.documentList().title(item.listItem.title).filter(`${filter}`));
        }
        else if ("divider" in item) {
            return S.divider()
        } else if ("tag" in item) {
            return S.listItem()
                .title(item.title)
                .child(generateStructure(S, item.child.items, item.child?.title));
        }
    });

    // S.documentTypeListItems()
    return S.list()
        .title(title ?? "Content")
        .items(structure);
};

//structure for recipes
const getRecipeData = async (S: StructureBuilder) => {
    const data = await getNavData("DE")
    const schema = transformNavigation(data[1])
    return generateStructure(S, schema, "Rezepte")
}

//structure for all other documents
const structureStudio: (ListItem | StructureStudio | Divider)[] = [
    {
        title: "Authoren",
        listItem: { title: "Author", type: "author" },
    },
    {
        divider: true
    },
    {
        title: "Navigation",
        listItem: { title: "Navigation", type: "navigation" }
    },
    {
        title: "Submenu",
        listItem: { title: "Submenu", type: "navigationSubmenu" }
    },
    {
        title: "Links",
        listItem: { title: "Links", type: "link" },
    },
    {
        divider: true
    },
    {
        title: "Tags",
        listItem: { title: "Tags", type: "tags" },
    },
    {
        divider: true
    },
    {
        title: "Pages",
        tag: undefined,
        child: {
            title: "Pages",
            items: [
                {
                    title: "Home",
                    listItem: { title: "Home", type: "home" },
                },
                // {
                //   title: "Blog",
                //   listItem: { title: "Blog", type: "blog" },
                // },
            ]
        }
    }
];

export const recipeStructure = (S: StructureBuilder) => {
    return getRecipeData(S);
};

export const otherStructure = (S: StructureBuilder) => {
    return generateStructure(S, structureStudio, "Other")
};

export const devStructure: DefaultDocumentNodeResolver = (S, { schemaType, documentId }) => {
    switch (schemaType) {
        case `home`:
            return S.document().views([
                S.view.form(),
                S.view
                    .component(Iframe)
                    .options({
                        url: `http://localhost:3000/api/preview`,
                    })
                    .title('Preview'),
            ])
        case `recipe`:
            return S.document()
                .schemaType('recipe')
                .documentId(`${documentId}`)
                .views([
                    S.view.form(),
                    S.view
                        .component(Iframe)
                        .options({
                            url: `http://localhost:3000/api/preview?rezept=${documentId}`,
                        })
                        .title('Preview'),
                ])
        case `blog`:
            return S.document()
                .schemaType('blog')
                .documentId(`${documentId}`)
                .views([
                    S.view.form(),
                    S.view
                        .component(Iframe)
                        .options({
                            url: `http://localhost:3000/api/preview?blog=${documentId}`,
                        })
                        .title('Preview'),
                ])
        default:
            return S.document().views([S.view.form()])
    }
}

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;

export default defineConfig({
    name: "blog-butcheress",
    title: "TheButcheress_",

    projectId: `${projectId}`,
    dataset: `${dataset}`,

    apiVersion: `${apiVersion}`,
    basePath: "/admin",

    plugins: [
        deskTool({
            name: "dashboard",
            title: "Rezepte",
            structure: recipeStructure
        }),
        deskTool({
            name: "tags",
            title: "Other",
            structure: otherStructure
        }),
        deskTool({
            name: "DEV",
            title: "DEV",
            defaultDocumentNode: devStructure
        }),
        visionTool(),
    ],

    useCdn: true,

    schema: {
        types: schemaTypes,
    },
});
