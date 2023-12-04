import React from "react";
import Link from "next/link";
import Socials from "../socials/Socials";
// import Newsletter from "./Newsletter";

const FooterLink = ({ text, url }: { text: string, url: string }) => {
  return (
    <Link href={`/${url}`} className="mb-2 link-hover link underline md:text-lg">
      {text}
    </Link>
  );
};


const Footer = ({ lang }: { lang: "de" | "en" }) => {

  return (
    <>
      <footer className="bg-base-200 p-8 font-text text-neutral lg:px-16 lg:py-12">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:gap-0">
          <nav className="flex justify-between md:justify-around lg:flex-col lg:justify-start">
            <FooterLink url={`${lang}/ueber-mich`} text={lang === "en" ? "About me" : "Über mich"} />
            <FooterLink url={`${lang}/kontakt`} text={lang === "en" ? "Contact" : "Kontakt"} />
            <FooterLink url={`${lang}/datenschutz`} text={lang === "en" ? "Privacy Policy" : "Datenschutz"} />
            {/* <FooterLink url={`${lang}/impressum`} text="Impressum" /> */}
          </nav>
          <div className="flex flex-col text-center lg:text-left">
            <span className="footer-title">Social</span>
            <Socials />
          </div>
          {/* <Newsletter lang={lang}/> */}
        </div>
      </footer>
    </>
  );
}

export default Footer;
