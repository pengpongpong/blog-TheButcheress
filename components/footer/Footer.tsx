import React, { useRef } from "react";
import Link from "next/link";
import Socials from "../socials/Socials";
import Newsletter from "./Newsletter";

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


const Footer = ({ tags, lang }: { tags?: TagsProps[], lang: "de" | "en" }) => {

  return (
    <>
      {tags ? <Tags tags={tags} /> : ""}
      <footer className="bg-base-200 p-8 font-text text-neutral lg:px-16 lg:py-12">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:gap-0">
          <div className="flex justify-between md:justify-around lg:flex-col lg:justify-start">
            <FooterLink url={"ueber-mich"} text={lang === "en" ? "About me" : "Über mich"} />
            <FooterLink url={"kontakt"} text={lang === "en" ? "Contact" : "Kontakt"} />
            <FooterLink url={"datenschutz"} text={lang === "en" ? "Data privacy" : "Datenschutz"} />
            <FooterLink url={"impressum"} text="Impressum" />
          </div>
          <div className="flex flex-col text-center lg:text-left">
            <span className="footer-title">Social</span>
            <Socials />
          </div>
          <Newsletter lang={lang}/>
        </div>
      </footer>
    </>
  );
}

export default Footer;
