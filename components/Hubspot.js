'use client';
import { useEffect } from 'react';

const HubspotForm = () => {
  useEffect(() => {
    // Crear el script de HubSpot
    const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/embed/39533233.js';
    script.async = true;
    script.defer = true;

    // Agregar el script al documento
    document.body.appendChild(script);

    // Limpieza al desmontar el componente
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="hs-form-frame w-full"
      data-region="na1"
      data-form-id="c830ca7e-0c48-49dd-86d1-2d0a57c5caf4"
      data-portal-id="39533233"
    />
  );
};

export default HubspotForm;
