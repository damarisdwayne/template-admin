import "@/styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { GlobalStyles } from "@damaris-ui/core";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <GlobalStyles />
    </>
  );
}
