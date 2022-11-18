import styles from "../styles/Home.module.css";

import SplashScreen from "../util/splashscreen";
import { useState, useEffect } from "react";

import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Startups from "./startups";

import logo from "../assets/logo.jpeg";
import Message from "../components/FlashMessage";
import { useRouter } from "next/router";

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

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => setUserName(!!localStorage.getItem('name') ? localStorage.getItem('name') : ''), [])
  useEffect(() => setEmail(!!localStorage.getItem('email') ? localStorage.getItem('email') : ''), [])

  return (
    <div>
      {loading && <SplashScreen fading={fading} />}
      {flashState.useFlash?
            (<Message message={flashState.message} backgroundColor={flashState.backgroundColor} textColor={flashState.textColor} />)
            :null}
      <div className="box-border">
        <div className="flex flex-col">
          <Navbar />
          <Hero tagLine={"Startups start here."} />
          {/* <button className="login-with-google-btn" onClick={signInWithGoogle}>
            Sign in with Google
          </button> */}

          <h1>"Login Details"</h1>
          <h1>{userName}</h1>
          <h1>{email}</h1>
          <h1>"End of Login Details"</h1>
        </div>
        <div className="relative top-48">
          <Startups />
        </div>

        <div className="relative top-96 h-2 my-24">
          <Footer logo={logo} />
        </div>
      </div>
    </div>
  );
}
