"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Any URL that doesn't match a page (e.g. /adsadsadas) sends the visitor to the home page.
// This redirects in the browser because the not-found page is prebuilt at build time, where
// a server redirect() can't run; the server still answers 404 so search engines skip it.
export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  // Fallback for visitors without JavaScript.
  return <meta httpEquiv="refresh" content="0;url=/" />;
}
