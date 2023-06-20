import Image from "next/image"
import React from 'react'
import aboutMeImage from "/public/about-me/aboutme.jpg"

type Props = {}

const AboutMePage = (props: Props) => {
    return (
        <>
            <header className="mb-8 flex flex-col justify-center items-center">
                <Image src={aboutMeImage} priority width={1000} height={700} style={{ width: "100vw", height: "auto" }} alt="about" />
            </header>
            <main className="my-8 lg:my-36 max-w-7xl mx-auto flex flex-col lg:flex-row justify-center items-center">
                <h1 className="lg:mr-12 text-9xl lg:text-[17rem] -rotate-12 font-headline">Hey!</h1>
                <section className="m-8 lg:m-0 flex flex-col">
                    <p className="mb-6 text-6xl lg:text-8xl uppercase tracking-wide">I&aposm Marie</p>
                    <p className="lg:max-w-xl text-lg lg:text-xl">A passionate blogger who shares her love for cooking, baking, and all things food-related on her blog. She is a self-taught chef who enjoys experimenting with flavors and techniques, always pushing herself to try new recipes and methods in the kitchen. Her blog is a reflection of her personality - warm, inviting, and full of creativity. Through her writing and recipe sharing, Marie inspires her readers to explore their own culinary journeys and discover new ways to enjoy the pleasures of food.</p>
                </section>
            </main>
        </>
    )
}

export default AboutMePage