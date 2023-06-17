import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Socials from "../socials/Socials";

interface TagsProps {
  _id: string;
  title: string;
  url: string;
}
const Tags = ({ tags }: { tags: TagsProps[] }) => {
  const tagItems = tags.map((tag) => {
    return (
      <li className="py-2 px-4 bg-primary rounded-full" key={tag._id}>
        <Link href={`/kategorie/${tag.url}`}>#{tag.title}</Link>
      </li>
    );
  });

  return (
    <ul className="mb-4 flex items-center justify-center gap-2 font-text underline">
      <>{tagItems}</>
    </ul>
  );
};

const FooterLink = ({ text, url }: { text: string, url: string }) => {
  return (
    <Link href={`/${url}`} className="mb-2 link-hover link underline">
      {text}
    </Link>
  );
};


function Footer({ tags, lang }: { tags?: TagsProps[], lang: "de" | "en" }) {

  return (
    <>
      {tags ? <Tags tags={tags} /> : ""}
      <footer className="bg-base-200 p-8 font-text text-neutral md:px-16 md:py-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:gap-0">
          <div className="flex justify-between md:flex-col md:justify-start">
            <FooterLink url={"ueber-mich"} text={lang === "en" ? "About me" : "Über mich"} />
            <FooterLink url={"kontakt"} text={lang === "en" ? "Contact" : "Kontakt"} />
            <FooterLink url={"datenschutz"} text={lang === "en" ? "Data privacy" : "Datenschutz"} />
            <FooterLink url={"impressum"} text="Impressum" />
          </div>
          <div className="flex flex-col text-center md:text-left">
            <span className="footer-title">Social</span>
            <Socials />
          </div>
          <div className="flex flex-col text-center md:text-left">
            <span className="footer-title">Newsletter</span>
            <div className="flex flex-col gap-4 md:flex-row">
              <input
                type="text"
                placeholder={lang === "en" ? "your@email.com" : "deine@email.com"}
                className="input-bordered input w-full pr-16"
              />
              <button className="btn-outline btn hover:bg-primary hover:text-neutral">
                Subscribe
              </button>
            </div>
            <span className="mt-2">{lang === "en" ? "Stay in contact!" : "Bleibe in Kontakt!"} </span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
