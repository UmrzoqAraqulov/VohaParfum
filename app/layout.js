"use client";

import { Inter } from "next/font/google";
import "@/globals.css";

const inter = Inter({ subsets: ["latin"] });

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "antd/dist/reset.css";
import { Spin } from "antd";
import { Provider } from "react-redux";
import { store } from "@/redux/store/store";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        />
        <title>E-commerce</title>
      </head>
      <Provider store={store}>
        <body className={inter.className}>
          {children}
          <Spin />
        </body>
      </Provider>
    </html>
  );
}
