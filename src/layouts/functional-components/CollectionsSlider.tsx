import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CollectionsSlider = ({ collections }: { collections: any }) => {
  const [collectionsData, setCollectionsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (collections) {
      setCollectionsData(collections);
      setLoading(false);
    }
  }, [collections]);

  if (loading) {
    return <p className="text-center text-lg font-semibold text-gray-600">Cargando colecciones...</p>;
  }

  // 🏷 **Filtrar Polos y Pantalones**
  const polos = collectionsData.filter((item) => !item.title.includes("Pantalón"));
  const pantalones = collectionsData.filter((item) => item.title.includes("Pantalón"));

  return (
    <div className="container mx-auto px-4 lg:px-8">
      {/* 🏷 Sección de Polos */}
      <h2 className="text-left mb-6 font-extrabold text-4xl text-gray-900 dark:text-gray-100 uppercase tracking-wide border-b-2 border-primary pb-2">
        Polos
      </h2>
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1.2}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        navigation
        pagination={{ clickable: true }}
      >
        {polos.map((product) => (
          <SwiperSlide key={product.id} className="p-4">
            <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <img src={product.featuredImage?.url} alt={product.title} className="w-full h-[220px] md:h-[300px] lg:h-[350px] object-cover" />
              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold">{product.brand}</h3>
                <a href={product.link} className="inline-block mt-3 px-5 py-2 text-sm font-medium text-white bg-primary rounded-lg shadow-md hover:bg-opacity-90 transition-all duration-300">
                  Ver más
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 👖 Sección de Pantalones */}
      <h2 className="text-left mt-10 mb-6 font-extrabold text-4xl text-gray-900 dark:text-gray-100 uppercase tracking-wide border-b-2 border-primary pb-2">
        Pantalones
      </h2>
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1.2}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        navigation
        pagination={{ clickable: true }}
      >
        {pantalones.map((product) => (
          <SwiperSlide key={product.id} className="p-4">
            <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <img src={product.featuredImage?.url} alt={product.title} className="w-full h-[220px] md:h-[300px] lg:h-[350px] object-cover" />
              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold">{product.brand}</h3>
                <a href={product.link} className="inline-block mt-3 px-5 py-2 text-sm font-medium text-white bg-primary rounded-lg shadow-md hover:bg-opacity-90 transition-all duration-300">
                  Ver más
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};


export default CollectionsSlider;
