import type { Product } from "@/lib/shopify/types";
import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade"; // Importamos el efecto fade
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const HeroSlider = ({ products }: { products: Product[] }) => {
  return (
    <>
      <Swiper
        pagination={{
          clickable: true,
          bulletClass: "banner-pagination-bullet",
          bulletActiveClass: "banner-pagination-bullet-active",
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }} // Avanza cada 3s
        loop={true} // Hace que el carrusel sea infinito
        speed={1200} // Suaviza la transición
        effect="fade" // Aplicamos un desvanecimiento entre slides
        modules={[Pagination, Autoplay, EffectFade]} // Añadimos el módulo EffectFade
      >
        {products?.map((item: Product) => (
          <SwiperSlide key={item.id}>
            <div className="row items-center px-7 xl:px-16 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-lg shadow-lg">
              <div className="sm:col-12 lg:col-6 order-2 lg:order-0">
                <div className="text-center py-10 lg:py-0">
                  {item?.description && (
                    <p className="mb-2 lg:mb-3 text-gray-600 dark:text-gray-300 font-medium md:text-xl">
                      {item.description}
                    </p>
                  )}
                  <div className="row">
                    <h1 className="mb-4 lg:mb-10 col-10 sm:col-8 lg:col-12 mx-auto text-3xl font-bold text-gray-900 dark:text-white">
                      {item.title}
                    </h1>
                  </div>
                  {item.link && (
                    <a
                      className="btn btn-sm md:btn-lg px-6 py-3 text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 rounded-full shadow-md hover:shadow-lg transition-all"
                      href={item.link}
                    >
                      🔥 VER MÁS
                    </a>
                  )}
                </div>
              </div>

              <div className="sm:col-12 lg:col-6">
                {item.featuredImage && (
                  <img
                    src={item.featuredImage.url}
                    className="mx-auto w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] max-h-[500px] object-cover rounded-lg shadow-md hover:shadow-xl transition-all"
                    width={420}
                    height={420}
                    alt="banner image"
                  />
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default HeroSlider;
