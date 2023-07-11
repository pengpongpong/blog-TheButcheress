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
// transform fetched data for recipes from CMS for generateStructure
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

// create structure from data
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

// structure for recipes
const getRecipeData = async (S: StructureBuilder) => {
    const data = await getNavData("DE")
    const schema = transformNavigation(data[1])
    return generateStructure(S, schema, "Rezepte")
}

// structure for setting documents
const structureSetting: (ListItem | StructureStudio | Divider)[] = [
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
];

// structure for pages
const structurePages: (ListItem | StructureStudio | Divider)[] = [
    {
        title: "Home",
        listItem: { title: "Home", type: "home" }
    },
    {
        title: "Blog",
        listItem: { title: "Blog", type: "blog" }
    },
    {
        title: "Über mich",
        listItem: { title: "Über mich", type: "aboutMe" }
    },
    {
        title: "Impressum",
        listItem: { title: "Impressum", type: "impressum" }
    },
    {
        title: "Datenschutz",
        listItem: { title: "Datenschutz", type: "privacyPolicy" }
    },
]

// show recipes
export const recipeStructure = (S: StructureBuilder) => {
    return getRecipeData(S);
};

// show settings
export const settingStructure = (S: StructureBuilder) => {
    return generateStructure(S, structureSetting, "Setting")
};

// show pages
export const pageStructure = (S: StructureBuilder) => {
    return generateStructure(S, structurePages, "Pages")
};

// show all documents
export const mainStructure: DefaultDocumentNodeResolver = (S, { schemaType, documentId }) => {
    switch (schemaType) {
        case `home`:
            return S.document().views([
                S.view.form(),
                S.view
                    .component(Iframe)
                    .options({
                        url: `http://localhost:3000/de/api/preview`,
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
                            url: `http://localhost:3000/de/api/preview?rezept=${documentId}`,
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
                            url: `http://localhost:3000/de/api/preview?blog=${documentId}`,
                        })
                        .title('Preview'),
                ])
        case `aboutMe`:
            return S.document()
                .schemaType('aboutMe')
                .documentId(`${documentId}`)
                .views([
                    S.view.form(),
                    S.view
                        .component(Iframe)
                        .options({
                            url: `http://localhost:3000/de/api/preview?about-me`,
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
    basePath: "/de/admin",

    plugins: [
        deskTool({
            name: "dashboard",
            title: "Rezepte",
            structure: recipeStructure
        }),
        deskTool({
            name: "pages",
            title: "Seiten",
            structure: pageStructure
        }),
        deskTool({
            name: "all",
            title: "Alles",
            defaultDocumentNode: mainStructure
        }),
        deskTool({
            name: "setting",
            title: "Einstellungen",
            structure: settingStructure
        }),
        visionTool(),
    ],

    useCdn: true,

    schema: {
        types: schemaTypes,
    },
});
