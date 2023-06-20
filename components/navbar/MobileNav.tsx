"use client"
import React, { useState, ReactNode, useEffect } from "react";
import { usePathname } from 'next/navigation'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Slide } from "@mui/material";
import { MenuListType } from "./Navbar";
import Link from "next/link";


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

export const SubMenu = ({ list }: MenuListType) => {
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
                        <Button className="btn btn-md btn-square glass absolute top-6 right-6" onClick={handleClose}>
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

export default MobileNav