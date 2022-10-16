import "../styles/globals.css";
import "react-image-crop/dist/ReactCrop.css";
import "../styles/button.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
// import {
//   FirebaseAuthProvider,
//   useFirebaseAuth,
// } from "../util/firebaseAuthHelpers";
import Head from "next/head";

import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }: AppProps) {
  // const firebaseAuthState = useFirebaseAuth();

  /* "FirebaseAuthProvider" seems like an important component to use firebase with (Commented out until setup of firebase)*/

  return (
    // <FirebaseAuthProvider value={firebaseAuthState}>
      <div>
      <Head>
        <title>🐻 Bruno Ventures</title>
      </Head>
      <Component {...pageProps} />
      <ToastContainer />
      {/* </FirebaseAuthProvider> */}
      </div>
  );
  // return <Component {...pageProps} />
}

export default MyApp;
