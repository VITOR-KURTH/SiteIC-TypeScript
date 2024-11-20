import React from "react"
import Navbar from "../Components/navbar/Navbar"
import Footer from "../Components/footer/footer"
import '../styles/Global.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="PT-br">
      <body>
        <Navbar/>
      {children}
      <Footer/>
      </body>
    </html>
  )
}
