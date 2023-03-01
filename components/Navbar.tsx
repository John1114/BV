import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth, FirebaseAuthContext, isLoggedIn, checkIfRegistered, useFirebaseAuth } from "../util/firebaseFunctions";
import { firestore } from "../util/firebaseConfig"
import { collection, getDocs, where } from "@firebase/firestore";
import { query } from "firebase/firestore";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isSignedin, setIsSignedIn] = useState<boolean>(false)

  /* Working authentication code from Bruno Ventures (Commented out until setup of firebase) */
  const { signInWithGoogle, signOut } = useAuth();
  const router = useRouter();
  const authState = useFirebaseAuth();

  useEffect(() => {
    (async () => {
    setIsSignedIn(await isLoggedIn());
    })()
  }, [])

  function handleSignIn() {
    signInWithGoogle().then((user) => {
      if (user != null) {
      checkIfRegistered(user.email).then((isRegistered) => {
        if (isRegistered) {
          router.push("/main_interface");
        } else {
          router.push("/landing");
          toast.error("Please sign up first!",
          {
            position: "top-left",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
          //toastify that you need to create an account
        }
      })
    }
    })
  }

  function handleSignup() {
    signInWithGoogle().then((user) => {
      if (user != null) {
        checkIfRegistered(user.email).then((isRegistered) => {
          if (isRegistered) {
            router.push("/dashboard");
            toast.info("Account exists! Logging you in!",
            {
              position: "top-left",
              autoClose: 1500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
            //toastify that account already exists and we logged you in
          } else {
            if (authState.user?.email.includes("@brown.edu")) {
              router.push("/signup_form")
            } else {
              router.push("/landing");
              toast.error("Please sign in with a Brown email!",
              {
                position: "top-left",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
              //toastify that invalid email address
            }
          }
        })
      }
    })
  }
  return (
    <div className="flex flex-auto justify-end items-center h-28 absolute left-0 right-0 top-0" style={{backgroundColor: 'rgba(250,250,250,0.2)'}}>
          
          {/* Desktop Nav */}

          <div className="flex justify-evenly w-1/3 mr-12 lg:visible sm:invisible">
            { isSignedin ? 
              <>
                <a href="#about" className="text-lg font-light text-white transition-all hover:text-red-500">Dashboard</a>
                <a href="#about" className="text-lg font-light text-white transition-all hover:text-red-500">About Us</a>
                <button onClick={signOut} className="text-lg font-light text-white transition-all hover:text-red-500">Sign Out</button>
              </> : 
              <>
                <button onClick={handleSignIn} className="text-lg font-light text-white transition-all hover:text-red-500">Sign in</button>
                <button onClick={handleSignup} className="text-lg font-light text-white transition-all hover:text-red-500">Sign up</button>
                <a href="#about" className="text-lg font-light text-white transition-all hover:text-red-500">About Us</a>
              </>}
          </div>

    </div>
  );
};

export default Navbar;
