"use client"
import React, { useState, ReactNode, useEffect, Dispatch, SetStateAction } from "react";
import { usePathname } from 'next/navigation'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Slide } from "@mui/material";
import { MenuListType } from "./Navbar";
import Link from "next/link";
import { Locale } from "@/app/[lang]/HomePage";

const style = "w-full h-full p-14 py-24 bg-primary font-text text-3xl md:text-5xl md:p-20 md:py-32 absolute" // styles for container

interface SetOpenMain {
    setOpenMain: Dispatch<SetStateAction<boolean>>;
}

// sub menu modal
const ChildModal = ({ children, title, setOpenMain }: { children: ReactNode, title: string } & SetOpenMain) => {
    const [open, setOpen] = useState(false);

    // handle sub menu open
    const handleOpen = () => {
        setOpen(true);
    };

    // handle sub menu close
    const handleClose = () => {
        setOpen(false);
    };

    // handle main nav 
    const handleCloseMain = () => {
        setOpenMain(false);
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
                        <button className="w-16 btn btn-square glass absolute top-6 right-24 md:top-8 md:right-28 box-shadow" onClick={handleClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" className="fill-black">
                                <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path>
                            </svg>
                        </button>
                        <button className="w-16 btn btn-square glass absolute top-6 right-6 md:top-8 md:right-8 box-shadow" onClick={handleCloseMain}>
                            <svg
                                className="fill-black"
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 512 512"
                            >
                                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                            </svg>
                        </button>
                        {children}
                    </Box>
                </Slide>
            </Modal>
        </>
    );
}

export const SubMenu = ({ list, setOpenMain, lang }: MenuListType & SetOpenMain & { lang: Locale }) => {
    const listStyle = "mb-8"
    const items = list.map(obj => {
        if (obj.dropContent) {
            return (
                <li className={listStyle} key={obj.title}>
                    <ChildModal title={obj.title} setOpenMain={setOpenMain}>
                        <SubMenu list={obj.dropContent} setOpenMain={setOpenMain} lang={lang} />
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
                    <Link href={`/${lang}/kategorie/${obj.url}`}>{obj.title}</Link>
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

const MobileNav = ({ list, lang }: MenuListType & { lang: Locale }) => {
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
            {/* hamburger menu button */}
            <button className="w-16 btn btn-square glass box-shadow" aria-label="open navigation menu" role="navigation" onClick={handleOpen}>
                <svg
                    className="fill-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                >
                    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                </svg>
            </button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Slide direction="left" in={open} mountOnEnter unmountOnExit>
                    <Box className={style}>
                        {/* close button */}
                        <button className="w-16 btn btn-square glass absolute top-6 right-6 md:top-8 md:right-8 box-shadow" onClick={handleClose}>
                            <svg
                                className="fill-black"
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 512 512"
                            >
                                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                            </svg>
                        </button>
                        <SubMenu list={list} setOpenMain={setOpen} lang={lang} />
                    </Box>
                </Slide>
            </Modal>
        </ >
    );
}

export default MobileNav