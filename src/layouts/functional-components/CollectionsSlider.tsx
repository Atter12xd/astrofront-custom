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

  const groupedCollections = collectionsData.reduce((acc: any, item: any) => {
    acc[item.brand] = acc[item.brand] || [];
    acc[item.brand].push(item);
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 lg:px-8">
      {Object.entries(groupedCollections).map(([brand, products]: [string, any]) => (
        <div key={brand} className="mb-16">
          {/* Encabezado de la marca */}
          <h2 className="text-left mb-6 font-extrabold text-4xl text-gray-900 dark:text-gray-100 uppercase tracking-wide border-b-2 border-primary pb-2">
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
                <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  {/* Imagen del producto con efecto hover */}
                  <div className="relative group">
                    <img
                      src={product.featuredImage?.url}
                      alt={product.title || product.brand}
                      className="w-full h-[220px] md:h-[300px] lg:h-[350px] object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Información del producto */}
                  <div className="p-5 text-center">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 truncate">
                      {product.title || product.brand}
                    </h3>
                    <a
                      href={product.link}
                      className="inline-block mt-3 px-5 py-2 text-sm font-medium text-white bg-primary rounded-lg shadow-md hover:bg-opacity-90 transition-all duration-300"
                    >
                      Ver más
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
