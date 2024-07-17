import { useEffect } from "react";
import { NextUIProvider } from "@nextui-org/react";
import Head from "next/head";
import "../styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-phone-input-2/lib/style.css";
import { Toaster } from "react-hot-toast";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const handleFocus = (event) => {
      document.body.style.overflow = "hidden";
    };

    const handleBlur = (event) => {
      document.body.style.overflow = "auto";
    };

    const inputs = document.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("focus", handleFocus);
      input.addEventListener("blur", handleBlur);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
      });
    };
  }, []);
  return (
    <>
      <NextUIProvider>
        <Head>
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
