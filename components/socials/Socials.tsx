import React from "react";
import Link from "next/link";
import Image from "next/image";
import instagramIcon from "/public/icons/socials/bxl-instagram.svg"
import facebookIcon from "/public/icons/socials/bxl-facebook.svg"
import tiktokIcon from "/public/icons/socials/bxl-tiktok.svg"
import twitchIcon from "/public/icons/socials/bxl-twitch.svg"
import twitterIcon from "/public/icons/socials/bxl-twitter.svg"
import youtubeIcon from "/public/icons/socials/bxl-youtube.svg"

export const Socials = () => {
    return (
        <nav className="w-full flex items-center justify-around gap-8">
            <Link rel="noopener noreferrer" target="_blank" href="https://www.instagram.com">
                <Image src={instagramIcon} alt="instagram icon" />
            </Link>
            <Link rel="noopener noreferrer" target="_blank" href="https://www.youtube.com">
                <Image src={youtubeIcon} alt="youtube icon" />
            </Link>
            <Link rel="noopener noreferrer" target="_blank" href="https://www.tiktok.com">
                <Image src={tiktokIcon} alt="tiktok icon" />
            </Link>
            <Link rel="noopener noreferrer" target="_blank" href="https://www.twitter.com">
                <Image src={twitterIcon} alt="twitter icon" />
            </Link>
            <Link rel="noopener noreferrer" target="_blank" href="https://www.facebook.com">
                <Image src={facebookIcon} alt="facebook icon" />
            </Link>
            <Link rel="noopener noreferrer" target="_blank" href="https://www.twitch.com">
                <Image src={twitchIcon} alt="twitch icon" />
            </Link>
        </nav>
    )
}

export default Socials