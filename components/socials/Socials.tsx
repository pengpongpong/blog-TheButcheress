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
        <div className="w-full flex items-center justify-around gap-8">
            <Link rel="noopener noreferrer" target="_blank" href="">
                <Image src={instagramIcon} alt="instagram icon" />
            </Link>
            <Link rel="noopener noreferrer" target="_blank" href="">
                <Image src={youtubeIcon} alt="youtube icon" />
            </Link>
            <Link rel="noopener noreferrer" target="_blank" href="">
                <Image src={tiktokIcon} alt="tiktok icon" />
            </Link>
            <Link rel="noopener noreferrer" target="_blank" href="">
                <Image src={twitterIcon} alt="twitter icon" />
            </Link>
            <Link rel="noopener noreferrer" target="_blank" href="">
                <Image src={facebookIcon} alt="facebook icon" />
            </Link>
            <Link rel="noopener noreferrer" target="_blank" href="">
                <Image src={twitchIcon} alt="twitch icon" />
            </Link>
        </div>
    )
}

export default Socials