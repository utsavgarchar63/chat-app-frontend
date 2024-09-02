import { useEffect } from "react";
import Head from "next/head";
import "../styles/global.css";
import { NextUIProvider } from "@nextui-org/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-phone-input-2/lib/style.css";
import { Toaster } from "react-hot-toast";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextUIProvider>
        <Head>
          <title>Ecommerce App</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
          />
        </Head>
        <Component {...pageProps} />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#363636",
              color: "#ffff",
            },
          }}
        />
      </NextUIProvider>
    </>
  );
}
