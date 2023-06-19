import React from "react";
import Image from "next/image";

import Steps from "@/components/recipe/Steps";
import RecipeTable from "@/components/recipe/RecipeTable";
import CookingTime from "@/components/recipe/CookingTime";
import SocialShare from "@/components/socials/SocialShare";
import { Locale } from "../../HomePage";


interface Time {
    hours?: number;
    minutes?: number;
}

interface ImageSanity {
    asset: {
        _ref: string;
        _type: "reference"
    };
    _type: "image";
    title: string
}

export interface Instruction {
    _type: "instruction";
    _id: string;
    title: string;
    content: string;
    image?: ImageSanity;
    tipp?: {
        _type: "tippContent";
        _id: string;
        title: string;
        content: string;
    }[]
}

export interface IngredientList {
    title: string;
    quantity: string;
}

export interface Ingredients {
    title: string;
    ingredientsList: IngredientList[]
}

export interface TagsType {
    _id: string;
    title: string;
    url: string;
}

interface RecipeData {
    title: string;
    totalTime: Time;
    prepTime: Time;
    servings: number;
    instructions: Instruction[];
    ingredients: Ingredients[];
    tags: TagsType[];
    imageUrl: string;
    category: {
        title: string;
    },
}

export interface RecipeProps {
    pageData: RecipeData;
    lang: Locale
}

const styles = {
    main: "flex flex-row lg:flex-col gap-4 lg:gap-2 justify-center items-center",
    first:"pr-4 pl-4 lg:pr-0 lg:pl-0 lg:pb-2 lg:pt-2 border-r-2 border-l-2 lg:border-r-0 lg:border-l-0 lg:border-b-2 lg:border-t-2 border-solid", 
    last: "pr-4 pl-4 lg:pr-0 lg:pl-0 lg:pb-2 lg:pt-2 border-r-2 border-l-2 lg:border-r-0 lg:border-l-0 lg:border-t-2 border-solid"
}

const Recipe = ({ pageData, lang }: RecipeProps) => {
    return (
        <>
            <main>
                <section className="flex flex-col gap-4 font-text lg:mx-16 lg:flex-row">
                    <div className="w-full flex flex-col-reverse gap-4 lg:gap-0 lg:flex-row">
                        <div className="max-w-full lg:max-w-fit lg:pr-8 my-auto lg:w-1/6 text-center">
                            <SocialShare lang={lang} title={pageData?.title} styles={styles}/>
                        </div>
                        <div className="mb-4 lg:mb-0 flex flex-col items-center justify-between">
                            <h1 className="m-4 mb-8 text-4xl tracking-wide lg:mt-8 lg:text-6xl">
                                {pageData?.title}
                            </h1>
                            <div className="flex flex-row whitespace-pre lg:gap-8">
                                <CookingTime
                                    hours={pageData?.prepTime.hours}
                                    minutes={pageData?.prepTime.minutes}
                                    lang={lang}
                                    title={lang === "en" ? "Preparation" : "Vorbereitung"}
                                    styling={"text-center mr-4 lg:mr-0"}
                                />
                                <CookingTime
                                    hours={pageData?.totalTime.hours}
                                    minutes={pageData?.totalTime.minutes}
                                    lang={lang}
                                    title={lang === "en" ? "Total" : "Gesamt"}
                                    styling={"border-r-2 border-l-2 border-dashed pl-4 pr-4 lg:pl-8 lg:pr-8 text-center"}
                                />
                                <CookingTime
                                    servings={pageData?.servings}
                                    title={lang === "en" ? "Servings" : "Portionen"}
                                    styling={"text-center ml-4 lg:ml-0"}
                                    lang={lang}
                                />
                            </div>
                        </div>
                    </div>
                    <picture className="mt-4 w-full lg:mt-0">
                        {pageData?.imageUrl ? < Image width={2560} height={1440} loading="lazy" src={pageData?.imageUrl} alt={pageData?.title} /> : ""}
                    </picture>
                </section>
                <section className="mt-8 flex flex-col gap-8 lg:mx-16 lg:my-20 lg:mt-12 lg:flex-row lg:gap-20">
                    <section className="m-4 h-min w-auto bg-primary p-4 pt-8 font-text lg:w-2/5 lg:p-10">
                        <h2 className="mb-8 text-3xl lg:text-4xl">{lang === "en" ? "Ingredients" : "Zutaten"}</h2>
                        <RecipeTable recipe={pageData?.ingredients} />
                    </section>
                    <Steps list={pageData?.instructions} />
                </section>
            </main >
        </>
    );
};


export default Recipe;
