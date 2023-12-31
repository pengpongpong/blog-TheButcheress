"use client"
import React, { useEffect, useRef } from "react";
import Swiper, { SwiperOptions, type Swiper as SwiperRef } from "swiper";
import { register } from "swiper/element/bundle";
import { urlFor } from "@/sanity/lib/sanity-utils";

import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import Loading from "../loading/Loading";

export interface ImageSliderProps {
  _type: "imageSlide";
  _key: string;
  asset: {
    _ref: string;
    _type: "reference"
  }
}

function ImageSlider({ list }: { list: ImageSliderProps[] }) {
  register();
  const swiperRef = useRef<SwiperRef | null>(null);

  useEffect(() => {
    const swiperParams: SwiperOptions = {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: true,
      },
      loop: true,
      breakpoints: {
        320: {
          initialSlide: 1,
          slidesPerView: 1,
          spaceBetween: 0,
        },
        640: {
          initialSlide: 2,
          slidesPerView: 2,
          spaceBetween: 0,
        },
        770: {
          initialSlide: 2,
          slidesPerView: 3,
          spaceBetween: 0,
        },
        1280: {
          initialSlide: 3,
          slidesPerView: 4,
          spaceBetween: 10,
        },
      },
      effect: "coverflow",
      coverflowEffect: {
        rotate: 20,
        slideShadows: true,
      },
    };
    const swiper = new Swiper(".swiper", swiperParams);

    swiperRef.current = swiper;
  }, []);

  type diashowType = {
    imageSrc: string;
    id: string;
  };

  const diashowLinks: diashowType[] = list.map((obj, index) => {
    return {
      imageSrc: urlFor(obj).size(1920, 1080).auto("format").url(),
      id: obj.asset._ref + index
    }
  })

  const swiperEl = diashowLinks.map((obj) => (
    <picture className="swiper-slide" key={obj.id} >
      <Image src={obj.imageSrc} fill={true} sizes="400, 300" style={{ objectFit: "cover" }} alt="" />
    </picture>
  ));

  return (

    !swiperEl.length
      ? <div className="flex justify-center"><Loading /> </div>
      : <div className="swiper">
        <div className="swiper-wrapper">{swiperEl}</div>

        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </div>

  );
}

export default ImageSlider;
