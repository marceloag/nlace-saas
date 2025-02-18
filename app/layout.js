import localFont from 'next/font/local';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'NLACE AI Agents Studio',
  description:
    'Aplicación de creación de agentes de IA personalizados para clientes de Nlace.com',
  verification: { google: 'fYWPfQTQ9E_Dm8caRdmht8Q83ZhM7_W5AjgCVGhQd70' }
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
