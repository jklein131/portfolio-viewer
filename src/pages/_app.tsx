import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { ClerkProvider } from "@clerk/nextjs";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}
