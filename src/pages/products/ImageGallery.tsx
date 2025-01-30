import React, { useState } from "react";

const ImageGallery = ({ images }: { images: string[] }) => {
  const [mainImage, setMainImage] = useState(images[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: "50%", y: "50%" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x: `${x}%`, y: `${y}%` });
  };

  return (
    <div className="image-gallery flex flex-col items-center gap-4">
      {/* Imagen principal con zoom interactivo */}
      <div
        className="relative overflow-hidden rounded-lg w-full max-w-md"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsZoomed(true)}
        onTouchEnd={() => setIsZoomed(false)}
      >
        <img
          src={mainImage}
          alt="Producto principal"
          className={`w-full rounded-lg object-cover transition-transform duration-300 ${
            isZoomed ? "scale-150" : "scale-100"
          }`}
          style={{
            transformOrigin: `${zoomPosition.x} ${zoomPosition.y}`,
          }}
        />
      </div>

      {/* Miniaturas con borde activo */}
      <div className="flex space-x-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Vista ${index + 1}`}
            className={`w-20 h-20 rounded-lg object-cover cursor-pointer border-2 transition-all duration-200 ${
              mainImage === image ? "border-primary scale-105 shadow-md" : "border-gray-300 hover:scale-105"
            }`}
            onClick={() => setMainImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;