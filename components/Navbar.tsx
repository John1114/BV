import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuth, useFirebaseAuth, FirebaseAuthContext, isLoggedIn, checkIfRegistered } from "../util/firebaseFunctions";
import { firestore } from "../util/firebaseConfig"
import { collection, getDocs, where } from "@firebase/firestore";
import { query } from "firebase/firestore";

const Navbar = () => {
  const [isSignedin, setIsSignedIn] = useState<boolean>(isLoggedIn())

  /* Working authentication code from Bruno Ventures (Commented out until setup of firebase) */
  const { signInWithGoogle, signOut } = useAuth();
  const router = useRouter();

  function handleSignIn() {
    signInWithGoogle().then((user) => {
      checkIfRegistered(user.email).then((isRegistered) => {
        if (isRegistered) {
          router.push("/dashboard");
        } else {
          router.push("/landing");
          //toastify that you need to create an account
        }
      })
    })
  }

  function handleSignup() {
    signInWithGoogle().then((user) => {
      checkIfRegistered(user.email).then((isRegistered) => {
        if (isRegistered) {
          router.push("/dashboard");
          //toastify that account already exists and we logged you in
        } else {
          if (auth?.user?.email.includes("@brown.edu")) {
            router.push("/signup_form")
          } else {
            router.push("/landing");
            //toastify that invalid email address
          }
        }
      })
    })
  }


  const dummySignin = async () => {console.log("signin attempt")}

  let auth = React.useContext(FirebaseAuthContext)
  // console.log(auth)
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
