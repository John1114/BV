import { app } from "./firebaseConfig"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;
      const userId = result.user.uid;
      console.log(result.user);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
      localStorage.setItem("userId", userId);
    })
    .catch((error) => {
      console.log(error);
    });
}