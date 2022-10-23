import styles from "../styles/Home.module.css";
import { signInWithGoogle } from "../src/firebaseFunctions";

import SplashScreen from "../util/splashscreen";
import { useState, useEffect } from "react";

import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Startups from "./startups";

import logo from "../assets/logo.jpeg";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [fading, setFading] = useState<boolean>(false);
  // Waits until the session is loaded before loading the page
  // if (firebaseAuthState.isLoading) return null

  useEffect(() => {
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
      <div className="box-border">
        <div className="flex flex-col">
          <Navbar />
          <Hero tagLine={"Startups start here."} />
          <button className="login-with-google-btn" onClick={signInWithGoogle}>
            Sign in with Google
          </button>

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
