import React, { useEffect, useRef } from "react";
import Swiper, { SwiperOptions, type Swiper as SwiperRef } from "swiper";
import { register } from "swiper/element/bundle";
import { urlFor } from "@/sanity/lib/sanity-utils";

import Image from "next/image";

export interface ImageSliderProps  {
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
          spaceBetween: 20,
        },
        480: {
          initialSlide: 2,
          slidesPerView: 2,
          spaceBetween: 10,
        },
        640: {
          initialSlide: 4,
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
      imageSrc: urlFor(obj).size(600, 400).auto("format").url(),
      id: obj.asset._ref + index
    }
  })

  const swiperEl = diashowLinks.map((obj) => (
    <picture className="swiper-slide" key={obj.id}>
      <Image src={obj.imageSrc} fill sizes="600, 400" alt="" />
    </picture>
  ));
  return (
    <div className="swiper">
      <div className="swiper-wrapper">{swiperEl}</div>

      {/* <div className="swiper-pagination"></div> */}
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </div>
  );
}

export default ImageSlider;
