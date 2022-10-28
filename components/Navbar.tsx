import { useRouter } from "next/router";
import React from "react";
import { useAuth, useFirebaseAuth, FirebaseAuthContext, User } from "../util/firebaseFunctions";
import { firestore } from "../util/firebaseConfig"
import { collection, getDocs, where } from "@firebase/firestore";
import { query } from "firebase/firestore";

const Navbar = () => {

  /* Working authentication code from Bruno Ventures (Commented out until setup of firebase) */
  const { signInWithGoogle, signOut } = useAuth();
  const router = useRouter();
  const handleSignInForStartups = async () => {
    try {
        signInWithGoogle().then((User) => {
          console.log(User.email)
          console.log(User.id)
          console.log(User.profilePicture)
          console.log(User.name)
        })
      router.push("/form");
    } 
    catch(e) {
      console.log(e);
    }
  }
  const handleSignInForStudents = async () => {
    try {
        signInWithGoogle().then((User) => {
        if (auth?.user?.email.includes("@brown.edu")) {
          console.log("valid email")
          console.log(checkIfRegistered(auth?.user))
          checkIfRegistered(auth?.user).then((isRegistered) => {
            if (isRegistered) {
              router.push("/mainpage");
            } else {
              router.push("/register");
            }
          })
        } else {
          console.log("Not a brown student")
          // this needs to be a popup
        }
        })
    } 
    catch(e) {
      console.log(e);
    }
  }

  const checkIfRegistered = async (user: User | undefined) => {
    const q = query(collection(firestore, "users"), where("email", "==", user?.email));
    const snapshot = await getDocs(q)
    if (snapshot.empty) {
      console.log("Need to register")
      return false
    } else {
      console.log("You are registered")
      return true
    }
  }


  const dummySignin = async () => {console.log("signin attempt")}

  let auth = React.useContext(FirebaseAuthContext)
  // console.log(auth)
  return (
    <div className="flex flex-auto justify-end items-center h-28 absolute left-0 right-0 top-0">
          
          {/* Desktop Nav */}

          <div className="flex justify-evenly w-1/5 mr-12 lg:visible sm:invisible">
             <button onClick={handleSignInForStartups} className="text-lg font-light text-white transition-all hover:text-red-500">For Startups</button>
             <button onClick={handleSignInForStudents} className="text-lg font-light text-white transition-all hover:text-red-500">For Students</button>
              <a href="#about" className="text-lg font-light text-white transition-all hover:text-red-500">About Us</a>
             <button onClick={signOut} className="text-lg font-light text-white transition-all hover:text-red-500">Sign Out</button>
          </div>

    </div>
  );
};

export default Navbar;
