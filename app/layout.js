import localFont from 'next/font/local';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

export const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-space-grotesk'
});

export const metadata = {
  title: 'NLACE AI Studio',
  description:
    'Aplicación de creación de agentes de IA personalizados para clientes de Nlace.com',
  verification: { google: 'fYWPfQTQ9E_Dm8caRdmht8Q83ZhM7_W5AjgCVGhQd70' }
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} ${space_grotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
