import React from 'react'
import Navbar from '../components/Navbar';


export const metadata = {
  title: 'Contact',
  description: 'Send me a message!',
}
 
export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 return (
      <section><Navbar/>{children}</section>
  )
}
