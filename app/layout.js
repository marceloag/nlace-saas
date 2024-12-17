import localFont from 'next/font/local';
import './globals.css';

export const metadata = {
  title: 'Nlace Saas Alpha',
  description: 'Marcelo Aguila para Nlace'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
