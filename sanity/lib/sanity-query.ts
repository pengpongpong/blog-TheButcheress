import { groq } from "next-sanity"

export type Lang = "DE" | "EN"
//GROQ query for data @home page
export const homeQuery = (lang: Lang) => {
  return groq`*[_type == "home"][0]{
      introduction{title{"title": title${lang}}, content{"content": content${lang}}},
      recipe{title{"title": title${lang}}, content{"content": content${lang}}, image},
      travel{title{"title": title${lang}}, content{"content": content${lang}}, image}, 
      imageSlider
    }`
}

//nav query
export const navQuery = (lang: Lang) => {
  return (groq`*[_type == "navigation"] {
    order,
    "title": title${lang},
    _type,
    "slug": slug.current,
    submenus[]->{
      "title": title${lang},
      _type,
      "slug": slug.current,
      submenus[]->{
        "title": title${lang},
        _type,
        "slug": slug.current,
        submenus[]->{
          "title": title${lang},
          _type,
          "slug": slug.current,
          submenus[]->{
            "title": title${lang},
            _type,
            "slug": slug.current,
            submenus[]->{
              "title": title${lang},
              _type,
              "slug": slug.current,
              link->{
                "title": title${lang},
                _type,
                "slug": slug.current,
              }
            },
            link->{
              "title": title${lang},
              _type,
              "slug": slug.current,
            }
          },
          link->{
            "title": title${lang},
            _type,
            "slug": slug.current,
          }
        },
        link->{
          "title": title${lang},
          _type,
          "slug": slug.current,
        }
      },
      link->{
        "title": title${lang},
        _type,
        "slug": slug.current,
      }
    },
  } | order(order)`)
}

//get all recipes
export const recipesQuery = (lang: Lang) => {
  return (groq`*[_type == "recipe"]{
        "title": title${lang},
        "description": description.description${lang},
        "imageUrl": image,
        "url": slug.current}`)
}

//get specific recipe
export const recipeQuery = (lang: Lang) => {
  return (groq`*[_type == "recipe" && slug.current == $slug][0]{
        ingredients[]{"title": title${lang},
        ingredientsList[]{"title": title${lang},
        "quantity": quantity${lang}}},
        instructions[]{"title": title${lang},"content": content${lang}, image, _id, tipp[]{"title": title${lang}, _id, "content": content${lang}}},
        prepTime,
        totalTime,
        servings,
        "imageUrl": image.asset->url,
        tags[]->{_id, "title": title${lang}, "url": slug.current},
        "title": title${lang},
        "description": description.description${lang}
        }
        `)
}