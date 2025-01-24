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
    return <p className="text-center text-lg">Cargando colecciones...</p>;
  }

  const groupedCollections = collectionsData.reduce((acc: any, item: any) => {
    acc[item.brand] = acc[item.brand] || [];
    acc[item.brand].push(item);
    return acc;
  }, {});

  return (
    <div className="container mx-auto">
      {Object.entries(groupedCollections).map(([brand, products]: [string, any]) => (
        <div key={brand} className="mb-16">
          {/* Encabezado de la marca */}
          <h2 className="text-center mb-8 font-bold text-3xl text-gray-800 dark:text-gray-200">
            {brand}
          </h2>

          {/* Carrusel de productos */}
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
            {products.map((product: any) => (
              <SwiperSlide key={product.id} className="p-4">
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                  {/* Imagen del producto */}
                  <img
                    src={product.featuredImage?.url}
                    alt={product.title || product.brand}
                    className="w-full h-[200px] md:h-[300px] lg:h-[350px] object-cover"
                  />

                  {/* Información del producto */}
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {product.title || product.brand}
                    </h3>
                    <a
                      href={product.link}
                      className="text-primary font-medium underline mt-2 block"
                    >
                      Ver más de esta marca
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}
    </div>
  );
};

export default CollectionsSlider;