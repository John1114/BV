import styles from "../styles/Home.module.css";

import SplashScreen from "../util/splashscreen";
import { useState, useEffect } from "react";

import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Startups from "./startups";

import Message from "../components/FlashMessage";
import { useRouter, Router } from "next/router";
import Landing from "./landing";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [fading, setFading] = useState<boolean>(false);
  const [flashState, setFlashState] = useState<any>({useFlash: false});
  const router = useRouter();
  // Waits until the session is loaded before loading the page
  // if (firebaseAuthState.isLoading) return null

  useEffect(() => {
    if (router.pathname !== undefined){
      if ((router.query.useFlash !== undefined) && router.query.useFlash){
        setFlashState(router.query);
      }
    }
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
    loading
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");
  });

  const StopLoading = () => {
    setFading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  setTimeout(StopLoading, 2000);

  return (
    <div>
      {loading && <SplashScreen fading={fading} />}
<<<<<<< HEAD
      {flashState.useFlash &&
            (<Message message={flashState.message}
            backgroundColor={flashState.backgroundColor}
            textColor={flashState.textColor} width="w-1/2"/>)}
=======
      {flashState.useFlash ?
            (<Message message={flashState.message} backgroundColor={flashState.backgroundColor} textColor={flashState.textColor} />)
            : null}
>>>>>>> startup-signup-2
      <div className="box-border">
      <Landing />
      </div>
    </div>
  );
}
