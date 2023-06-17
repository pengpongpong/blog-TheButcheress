import { SlugValidationContext } from "sanity";

export async function isUniqueAcrossAllDocuments(
  slug: string,
  context: SlugValidationContext
) {
  const { document, getClient } = context;
  const client = getClient({ apiVersion: "2023-04-24" });
  const id = document?._id.replace(/^drafts\./, "");
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
    slugDE: slug,
    slugEN: slug
  };
  const query = `!defined(*[!(_id in [$draft, $published]) && (slug.current == $slug || slugDE.current == $slugDE|| slugEN.current == $slugEN)][0]._id)`;
  const result = await client.fetch(query, params);

  return result;
}
