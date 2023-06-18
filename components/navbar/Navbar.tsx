import Link from "next/link";
import React from "react";
import { NavigationItem } from "@/sanity.config";
import LanguageSwitch from "../language-switch/LanguageSwitch";
import SearchIcon from "/public/icons/bx-search.svg"
import Image from "next/image";
import Socials from "../socials/Socials";
import { Lang } from "@/sanity/lib/sanity-query";
import MobileNav, { SubMenu } from "./MobileNav";


//interface and data for dropdown menu
interface MenuListInterface {
  title: string;
  url?: string;
  main?: boolean;
  dropContent?: {
    title: string;
    dropContent?: {
      title: string;
      dropContent?: {
        title: string;
      }[];
    }[];
  }[];
}

//type dropdown menu for navbar
export type MenuListType = {
  list: MenuListInterface[];
};


//desktop navbar
const DesktopNav = ({ list }: MenuListType) => {

  const mainNavItems = list?.map(item => {
    if (item.dropContent && item.main) {
      return (
        <li key={item.title} tabIndex={0}>
          <Link href={`/${item.url}`} className="hover:bg-primary focus:bg-primary">
            {item.title}
            <svg
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
            </svg>
          </Link>
          <MenuList list={item.dropContent} />
        </li>
      )
    } else if (item.dropContent && !item.main) {
      return (
        <li key={item.title} tabIndex={0}>
          <span className="hover:bg-primary focus:bg-primary">
            {item.title}
            <svg
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
            </svg>
          </span>
          <MenuList list={item.dropContent} />
        </li>
      )
    } else if (item.main) {
      return (
        <li key={item.title}>
          <Link href={`/${item.url}`} className="hover:bg-primary focus:bg-primary">
            {item.title}
          </Link>
        </li>
      )
    } else {
      return (
        <li key={item.title}>
          <Link href={`/${item.url}`} className="hover:bg-primary focus:bg-primary">
            {item.title}
          </Link>
        </li>
      )
    }
  })

  return (
    <ul className="menu menu-horizontal gap-16 p-1 font-text text-2xl">{mainNavItems}</ul>
  )
}

//creates list for dropdown menu desktop navbar
const MenuList = ({ list }: MenuListType) => {
  const items = list.map((obj: MenuListInterface) => {
    if (obj.dropContent) {
      return (
        <li key={obj.title} tabIndex={0}>
          <span>
            {obj.title}
            <svg
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
            </svg>
          </span>
          <MenuList list={obj.dropContent} />
        </li>
      );
    } else {
      return (
        <li key={obj.title}>
          <Link href={`/kategorie/${obj.url}`}>{obj.title}</Link>
        </li>
      );
    }
  });

  return <ul className="menu bg-primary p-0">{items}</ul>;
};

//Navbar
async function Navbar({ navData, lang }: { lang: Lang, navData: NavigationItem[] }) {

  //creates structure for navbar from data
  const navStructure = (list: NavigationItem[]): MenuListInterface[] => {

    return list?.map((obj) => {
      if (obj.order && !obj.submenus) {
        return {
          title: `${obj.title}`,
          url: `${!obj.slug ? "" : obj.slug}`,
          main: true
        }
      } else if (obj.order && obj.submenus) {
        return {
          title: `${obj.title}`,
          url: `${obj.slug}`,
          dropContent: navStructure(obj.submenus!),
          main: true
        }
      }
      else if (obj.slug && !obj.order && !obj.submenus) {
        return {
          title: `${obj.title}`,
          url: `${obj.slug}`
        }
      }
      else {
        return {
          title: `${obj.title}`,
          dropContent: navStructure(obj.submenus!),
        }
      }
    })
  }

  const structure = navStructure(navData)

  return (
    <>
      <header className="navbar relative z-10 m-8 w-auto flex flex-col p-0 lg:pt-0 lg:ml-16 lg:mr-16 lg:mb-16 lg:mt-10">
        <nav className="w-full mb-4 mt-2 lg:mt-0 justify-center lg:justify-end">
          <nav className="lg:mr-5 mb-4 mt-2 lg:mt-0 flex justify-center items-center gap-8">
            <Link href="/suche"><Image alt="" src={SearchIcon} /></Link>
            <Socials />
            <LanguageSwitch />
          </nav>
        </nav>
        <nav className="flex w-full justify-between items-center">
          <Link href={`/${lang.toLowerCase()}`} className="font-headline text-4xl lg:text-5xl">
            TheButcheress_
          </Link>
          {/* mobile navbar */}
          <nav className="lg:hidden">
            <MobileNav >
              <SubMenu list={structure} />
            </MobileNav>
          </nav>
          {/* desktop navbar */}
          <nav className="hidden lg:block">
            <DesktopNav list={structure} />
          </nav>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
