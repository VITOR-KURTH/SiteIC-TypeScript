import React from 'react';
import '../styles/Global.css';
import Navbar from '../Components/navbar/Navbar';
import Footer from '../Components/footer/footer';

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Iniciação Científica',
  description: 'Calculadora de Acústica',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <div className="container">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
