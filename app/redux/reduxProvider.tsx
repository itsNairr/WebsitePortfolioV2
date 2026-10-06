"use client";

import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import WebsiteProvider from "./websiteProvider";
import Footer from "../components/Footer";

export default function ReduxProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <WebsiteProvider>
        {children}
        <Footer />
      </WebsiteProvider>
    </Provider>
  );
}
