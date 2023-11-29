"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import React from "react";
import TailwindProvider from "./tailwindProvider";
import Footer from "../components/Footer";


export default function ReduxProvider({children}: {children: any }) {
  return <Provider store={store}>
    <TailwindProvider>
      {children}
      <Footer/>
    </TailwindProvider>
    </Provider>;
}