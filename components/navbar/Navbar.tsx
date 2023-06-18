"use client"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Slide } from "@mui/material";
import Link from "next/link";
import React, { useState, ReactNode, useEffect } from "react";
import { NavigationItem } from "@/sanity.config";
import LanguageSwitch from "../language-switch/LanguageSwitch";
import { usePathname } from 'next/navigation'
import SearchIcon from "/public/icons/bx-search.svg"
import Image from "next/image";
import Socials from "../socials/Socials";
import { client } from "@/sanity/lib/sanity-utils";
import { Lang, navQuery } from "@/sanity/lib/sanity-query";


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
type MenuListType = {
  list: MenuListInterface[];
};

//mobile navbar
const style = "w-full h-full p-16 py-24 bg-primary font-text text-3xl absolute"

const ChildModal = ({ children, title }: { children: ReactNode, title: string }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button onClick={handleOpen}>
        {title}
        <svg
          className="inline-block fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
        </svg>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-label="submenu navbar"
      >
        <Slide direction="left" in={open} mountOnEnter unmountOnExit>
          <Box className={style}>
            <Button className="btn btn-md btn-square glass absolute top-4 right-4" onClick={handleClose}>
              <svg
                className="fill-black swap-on"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            </Button>
            {children}
          </Box>
        </Slide>
      </Modal>
    </>
  );
}

const MobileNav = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname()

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  //close menu when changing path
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <>
      <Button className="btn btn-md btn-square glass" onClick={handleOpen}>
        <svg
          className="fill-black swap-off"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512"
        >
          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
        </svg>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Slide direction="left" in={open} mountOnEnter unmountOnExit>
          <Box className={style}>
            <Button className="btn btn-md btn-square glass absolute top-4 right-4" onClick={handleClose}>
              <svg
                className="fill-black swap-on"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            </Button>
            {children}
          </Box>
        </Slide>
      </Modal>
    </ >
  );
}

const SubMenu = ({ list }: MenuListType) => {
  const listStyle = "mb-8"
  const items = list.map(obj => {
    if (obj.dropContent) {
      return (
        <li className={listStyle} key={obj.title}>
          <ChildModal title={obj.title}>
            <SubMenu list={obj.dropContent} />
          </ChildModal>
        </li>
      )
    } else if (obj.main && !obj.dropContent) {
      return (
        <li className={listStyle} key={obj.title}>
          <Link href={`/${obj.url}`}>{obj.title}</Link>
        </li>
      )
    } else if (!obj.main && !obj.dropContent) {
      return (
        <li className={listStyle} key={obj.title}>
          <Link href={`/kategorie/${obj.url}`}>{obj.title}</Link>
        </li>
      )
    }
  })

  return (
    <ul>
      {items}
    </ul>
  )
}

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
