"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import React from "react";
import WebsiteProvider from "./websiteProvider";
import Footer from "../components/Footer";

export default function ReduxProvider({ children }: { children: any }) {
  return (
    <Provider store={store}>
      <WebsiteProvider>
        {children}
        <Footer />
      </WebsiteProvider>
    </Provider>
  );
}
