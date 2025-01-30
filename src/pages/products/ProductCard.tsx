import React, { useState } from "react";
import ImageGallery from "./ImageGallery"; // Importa la galería de imágenes

// Lista de departamentos y distritos
const peruRegions = {
  Lima: ["Miraflores", "San Isidro", "Surco", "Comas", "San Juan de Lurigancho"],
  Arequipa: ["Cayma", "Cerro Colorado", "Yanahuara", "Paucarpata"],
  Cusco: ["Wanchaq", "San Sebastián", "Santiago", "Poroy"],
  Piura: ["Piura", "Sullana", "Talara", "Chulucanas"],
  "La Libertad": ["Trujillo", "Víctor Larco", "Florencia de Mora", "El Porvenir"],

  Huánuco: ["Huánuco", "Ambo", "Dos de Mayo", "Huacaybamba", "Huamalíes", "Leoncio Prado", "Marañón", "Pachitea", "Puerto Inca",  "Lauricocha","Yarowilca", ]
};

const ProductCard = ({ product }: { product: any }) => {
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(""); // Talla seleccionada
  const [paymentOption, setPaymentOption] = useState(""); // Opción seleccionada
  const [showPaymentModal, setShowPaymentModal] = useState(false); // Modal de Yape
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    country: "Perú",
    department: "",
    district: "",
    exactAddress: "",
    reference: "",
  });

  const handlePurchase = () => {
    if (
      !selectedSize ||
      !customerInfo.name ||
      !customerInfo.phone ||
      !customerInfo.department ||
      !customerInfo.district ||
      !customerInfo.exactAddress ||
      !paymentOption
    ) {
      alert("Por favor completa todos los campos, selecciona una talla y elige una opción antes de continuar.");
      return;
    }

    if (paymentOption === "asesor") {
      sendToWhatsApp("asesor");
    } else if (paymentOption === "pago") {
      setShowPaymentModal(true); // Mostrar el modal de Yape
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const sendToWhatsApp = (option: string) => {
    const whatsappNumber = "51936551949"; // Número del asesor
    const baseMessage = `¡Hola! Estoy interesado en este producto.\n\nDatos del cliente:\n- Producto: ${product.title}\n- Talla: ${selectedSize}\n- Nombre: ${customerInfo.name}\n- Teléfono: ${customerInfo.phone}\n- Dirección: ${customerInfo.exactAddress}, ${customerInfo.district}, ${customerInfo.department}, ${customerInfo.country}\n- Referencia: ${customerInfo.reference}`;
    const additionalMessage =
      option === "asesor"
        ? "\n\nQuiero hablar con un asesor para más información."
        : "\n\nEstoy enviando mi constancia de pago para confirmar mi pedido.";

    const encodedMessage = encodeURIComponent(baseMessage + additionalMessage);
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappLink, "_blank");
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    sendToWhatsApp("pago"); // Después de cerrar el modal, abrir WhatsApp
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10 border-b pb-10">
     {/* Galería de imágenes con zoom */}
<div>
  <ImageGallery images={product.images} />
</div>

      {/* Detalles del producto */}
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <p className="text-lg text-gray-600 mb-6">{product.description}</p>
        <p className="text-2xl font-semibold text-primary mb-4">{product.price}</p>

        {/* Selección de talla */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-4">Selecciona una Talla:</h2>
          <div className="flex space-x-4">
            {product.sizes.map((size: string) => (
              <button
                key={size}
                className={`px-4 py-2 border rounded-lg ${
                  selectedSize === size ? "bg-primary text-white" : "bg-white"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Formulario de datos del cliente */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-4">Tus Datos</h2>
          <label className="block text-lg mb-2">Nombre:</label>
          <input
            type="text"
            name="name"
            value={customerInfo.name}
            onChange={handleInputChange}
            placeholder="Ingresa tu nombre"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />

          <label className="block text-lg mb-2">Teléfono:</label>
          <input
            type="tel"
            name="phone"
            value={customerInfo.phone}
            onChange={handleInputChange}
            placeholder="Ingresa tu número de contacto"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />

          <label className="block text-lg mb-2">Departamento:</label>
          <select
            name="department"
            value={customerInfo.department}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          >
            <option value="" disabled>
              Selecciona tu departamento
            </option>
            {Object.keys(peruRegions).map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>

          <label className="block text-lg mb-2">Distrito:</label>
          <select
            name="district"
            value={customerInfo.district}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            disabled={!customerInfo.department}
          >
            <option value="" disabled>
              Selecciona tu distrito
            </option>
            {customerInfo.department &&
              peruRegions[customerInfo.department]?.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
          </select>

          <label className="block text-lg mb-2">Dirección Exacta:</label>
          <input
            type="text"
            name="exactAddress"
            value={customerInfo.exactAddress}
            onChange={handleInputChange}
            placeholder="Ej: Jirón Los Olivos 123"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />

          <label className="block text-lg mb-2">Referencia:</label>
          <input
            type="text"
            name="reference"
            value={customerInfo.reference}
            onChange={handleInputChange}
            placeholder="Ej: Cerca del parque principal"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />
        </div>

        {/* Opciones de acción */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-4">Elige una Opción:</h2>
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 border rounded-lg ${
                paymentOption === "asesor" ? "bg-primary text-white" : "bg-white"
              }`}
              onClick={() => setPaymentOption("asesor")}
            >
              Hablar con un Asesor
            </button>
            <button
              className={`px-4 py-2 border rounded-lg ${
                paymentOption === "pago" ? "bg-primary text-white" : "bg-white"
              }`}
              onClick={() => setPaymentOption("pago")}
            >
              Pagar con Yape y Separar Pedido
            </button>
          </div>
        </div>

        {/* Botón para continuar */}
        <button
          className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-opacity-90"
          onClick={handlePurchase}
        >
          Continuar
        </button>
      </div>

      {/* Modal de pago con Yape */}
      {showPaymentModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-center">Paga con Yape</h2>
            <div className="text-center mb-6">
              <img
                src="/images/joven-yape.jpeg"
                alt="Código QR Yape"
                className="w-40 h-40 mx-auto"
              />
            </div>
            <button
              className="btn btn-primary w-full"
              onClick={closePaymentModal}
            >
              Confirmar y Enviar a WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
