import React, { useState } from "react";

const ImageGallery = ({ images }: { images: string[] }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div>
      <div className="mb-6">
        <img
          src={mainImage}
          alt="Producto principal"
          className="w-full rounded-lg object-cover"
        />
      </div>
      <div className="flex space-x-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Vista ${index + 1}`}
            className="w-20 h-20 rounded-lg object-cover cursor-pointer border border-gray-300 hover:border-primary"
            onClick={() => setMainImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
