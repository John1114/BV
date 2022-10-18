import { useRouter } from "next/router";
import React from "react";
// import { useAuth, User } from "../util/firebaseAuthHelpers";

const Navbar = () => {

  /* Working authentication code from Bruno Ventures (Commented out until setup of firebase) */
  // const { signInWithGoogle } = useAuth();
  // const router = useRouter();
  // const handleSignin = async () => {
  //   try {
  //     await signInWithGoogle();
  //     router.push("/form");
  //   } 
  //   catch(e) {
  //     console.log(e);
  //   }
  // }

  const dummySignin = async () => {console.log("signin attempt")}

  return (
    <div className="flex flex-auto justify-end items-center h-28 absolute left-0 right-0 top-0">
          
          {/* Desktop Nav */}

          <div className="flex justify-evenly w-1/5 mr-12 lg:visible sm:invisible">
             <button onClick={dummySignin} className="text-lg font-light text-white transition-all hover:text-red-500">For Startups</button>
              <a href="#about" className="text-lg font-light text-white transition-all hover:text-red-500">About Us</a>
          </div>

    </div>
  );
};

export default Navbar;
