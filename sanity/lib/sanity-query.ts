import { groq } from "next-sanity"

export type Lang = "DE" | "EN"

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
