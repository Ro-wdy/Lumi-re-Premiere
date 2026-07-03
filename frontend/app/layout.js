import './globals.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { ToastProvider } from './ToastContext';

export const metadata = {
  title: 'Lumière Premiere | Cinematic release experiences',
  description: 'Design agency for global red-carpet movie launches, teaser campaigns, and exclusive film events.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body>
        <ToastProvider>
          <Navbar />
          <main style={{ minHeight: 'calc(100vh - 80px)', paddingTop: '80px' }}>
            {children}
          </main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
