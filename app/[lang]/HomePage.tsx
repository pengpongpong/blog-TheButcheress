import React, { lazy } from "react";
import Link from "next/link";
import Image from "next/image";

import { urlFor } from "@/sanity/lib/sanity-utils";
import { ImageSliderProps } from "@/components/image-slider/ImageSlider";

interface TitleContent {
    title: {
        title: string;
    };
    content: {
        content: string;
    };
}

interface ImageType {
    _type: "image";
    asset: {
        _ref: string;
        _type: "reference"
    }
}

interface RecipeContent extends TitleContent {
    image: {
        middleImage: ImageType;
        leftImage: ImageType;
        rightImage: ImageType;
    }
}

interface TravelContent extends TitleContent {
    image: ImageType
}

interface PageDataProps {
    introduction: TitleContent;
    recipe: RecipeContent;
    travel: TravelContent;
    imageSlider: ImageSliderProps[]
}

interface LinksContent {
    text: string;
    url: string;
}

interface Links {
    about: LinksContent;
    recipe: LinksContent;
    travel: LinksContent;
}

export type Locale = "en" | "de"

export interface HomeProps {
    pageData: PageDataProps;
    lang: Locale;
}

const ImageSlider = lazy(() => import("@/components/image-slider/ImageSlider"))

const Home = ({ pageData, lang }: HomeProps) => {
    const links: Links = {
        about: {
            text: lang === "en" ? "About me" : "Über mich",
            url: lang === "en" ? "/en/ueber-mich" : "de/ueber-mich"
        },
        recipe: {
            text: lang === "en" ? "All recipes" : "Alle Rezepte",
            url: lang === "en" ? "en/rezepte" : "de/rezepte"
        },
        travel: {
            text: lang === "en" ? "All travels" : "Alle Reisen",
            url: lang === "en" ? "en/reisen" : "de/reisen"
        },
    }

    return (
        <>
            <header>
                <h1 className="text-black mx-auto my-8 text-center font-headline text-6xl lg:my-20 lg:text-9xl ">
                    Nice to <span className="pl-2">🥩</span> you!
                </h1>
            </header>
            <main>
                <ImageSlider list={pageData?.imageSlider} />
                <section className="mx-8 my-16 flex flex-col items-center justify-center font-text lg:mx-16 lg:my-28">
                    <h2 className="text-6xl text-primary lg:text-8xl">{pageData?.introduction.title.title}</h2>
                    <p className="my-6 text-center text-lg text-neutral lg:my-8 lg:w-1/2 lg:text-2xl">
                        {pageData?.introduction.content.content}
                    </p>
                    <Link
                        className="btn-outline btn text-lg hover:bg-primary hover:text-neutral box-shadow"
                        href={`${links.about.url}`}
                    >
                        {links.about.text}
                    </Link>
                </section>
                <section className="mx-8 my-16 font-text lg:mx-16 lg:my-28">
                    <h2 className="mb-8 text-center text-6xl text-primary lg:text-8xl">
                        {pageData?.recipe.title.title}
                    </h2>
                    <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
                        <picture className="flex w-full items-center justify-end">
                            <Image
                                width={500}
                                height={500}
                                loading="lazy"
                                className="hidden object-cover lg:block lg:h-[32rem] lg:w-[25rem]"
                                src={urlFor(pageData?.recipe.image.leftImage).size(2560, 1440).auto("format").url()}
                                alt=""
                            />
                        </picture>
                        <div className="flex w-full flex-col items-center justify-center">
                            <Image
                                width={500}
                                height={600}
                                loading="lazy"
                                className="h-[15rem] w-full object-cover md:h-[25rem] lg:h-[30rem] lg:w-[28rem]"
                                src={urlFor(pageData?.recipe.image.middleImage).size(2560, 1440).auto("format").url()}
                                alt=""
                            />
                            <p className="m-6 text-center text-lg text-neutral md:m-8 lg:text-2xl">
                                {pageData?.recipe.content.content}
                            </p>
                            <Link
                                className="btn-outline btn text-lg hover:bg-primary hover:text-neutral box-shadow"
                                href={`${links.recipe.url}`}
                            >
                                {links.recipe.text}
                            </Link>
                        </div>
                        <picture className="flex w-full items-center justify-start">
                            <Image
                                width={500}
                                height={500}
                                className="hidden object-cover lg:block lg:h-[32rem] lg:w-[25rem]"
                                src={urlFor(pageData?.recipe.image.rightImage).size(2560, 1440).auto("format").url()}
                                alt=""
                            />
                        </picture>
                    </div>
                </section>
                <section className="mx-8 my-16 mt-24 font-text lg:mx-16 lg:my-28 lg:mt-0">
                    <Image
                        style={{ width: "100%", height: "auto" }}
                        width={2560}
                        height={1440}
                        priority
                        className="h-[25rem] w-full object-cover lg:h-[45rem]"
                        src={urlFor(pageData?.travel.image).size(2560, 1440).auto("format").url()}
                        alt="travel image"
                    />
                    <div className="my-16 flex flex-col items-center justify-center font-text lg:flex-row">
                        <h2 className="w-full text-center text-6xl text-primary lg:text-8xl">
                            {pageData?.travel.title.title}
                        </h2>
                        <div className="w-full text-center lg:pr-20 lg:text-left">
                            <p className="mt-4 text-lg text-neutral lg:mt-0 lg:text-2xl">
                                {pageData?.travel.content.content}
                            </p>
                            <Link
                                className="btn-outline btn mt-8 text-lg hover:bg-primary hover:text-neutral box-shadow"
                                href={`${links.travel.url}`}
                            >
                                {links.travel.text}
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Home;