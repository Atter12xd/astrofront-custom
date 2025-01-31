import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const ImageGallery = ({ images }: { images: string[] }) => {
  const [mainImage, setMainImage] = useState(images[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: "50%", y: "50%" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x: `${x}%`, y: `${y}%` });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const touch = e.touches[0];
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((touch.clientX - left) / width) * 100;
    const y = ((touch.clientY - top) / height) * 100;
    setZoomPosition({ x: `${x}%`, y: `${y}%` });
  };

  const changeImage = (newIndex: number) => {
    setCurrentIndex(newIndex);
    setMainImage(images[newIndex]);
  };

  return (
    <div className="image-gallery flex flex-col items-center gap-4">
      <div
        className="relative overflow-hidden rounded-lg w-full max-w-md"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onTouchStart={() => setIsZoomed(true)}
        onTouchEnd={() => setIsZoomed(false)}
      >
        {/* Flecha Izquierda */}
        <button
          onClick={() => changeImage(currentIndex === 0 ? images.length - 1 : currentIndex - 1)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-black/60 to-black/20 text-white p-3 rounded-full opacity-90 hover:opacity-100 hover:scale-110 transition-all shadow-lg hover:shadow-xl"
        >
          <ChevronLeftIcon className="w-8 h-8" />
        </button>

        {/* Imagen Principal */}
        <img
          src={mainImage}
          alt="Producto principal"
          className={`w-full rounded-lg object-cover transition-transform duration-300 ${
            isZoomed ? "scale-[2]" : "scale-100"
          }`}
          style={{
            transformOrigin: `${zoomPosition.x} ${zoomPosition.y}`,
            cursor: isZoomed ? "grab" : "zoom-in",
          }}
        />

        {/* Flecha Derecha */}
        <button
          onClick={() => changeImage(currentIndex === images.length - 1 ? 0 : currentIndex + 1)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-l from-black/60 to-black/20 text-white p-3 rounded-full opacity-90 hover:opacity-100 hover:scale-110 transition-all shadow-lg hover:shadow-xl"
        >
          <ChevronRightIcon className="w-8 h-8" />
        </button>
      </div>

      {/* Miniaturas con borde activo */}
      <div className="flex space-x-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Vista ${index + 1}`}
            className={`w-20 h-20 rounded-lg object-cover cursor-pointer border-2 transition-all duration-200 ${
              mainImage === image ? "border-primary scale-110 shadow-md" : "border-gray-300 hover:scale-110"
            }`}
            onClick={() => changeImage(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
