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
  return groq`*[_type == "navigation"] {
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
  } | order(order)`
}