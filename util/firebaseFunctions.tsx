import { app, firestore } from "./firebaseConfig"
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User as FirebaseUser,
  signOut as signOutFirebase,
} from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react";
import { query, collection, where, getDocs } from "firebase/firestore";
import { User } from "./types";


export interface AuthState {
    /** Indicates if the current user is logged in. */
    isAuthenticated: boolean;
    /** Indicates whether the auth session is currently being loaded. */
    isLoading: boolean;
    /** The current user, if logged in. */
    user?: User;
    /** Signs the current user out, if logged in. */
    signOut: () => void;
    /** Signs a user in with Google. */
    signInWithGoogle: () => Promise<User>;
}

const auth = getAuth(app);

/** Converts the user returns from Firebase into the User object. */
function firebaseUserToUser(firebaseUser: FirebaseUser): User {
    return {
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        name: firebaseUser.displayName!,
        profilePicture: firebaseUser.photoURL!
    };
}

function signOut() {
    signOutFirebase(auth);
}

/** Opens a Google sign-in popup and authenticates the user. */
async function signInWithGoogle(): Promise<User | null> {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({'hd': 'brown.edu'});
    try {
        const result = await signInWithPopup(auth, provider);
        console.log(result)
        const user = result.user;
        const name = result.user.displayName;
        const email = result.user.email;
        const profilePic = result.user.photoURL;
    
        return firebaseUserToUser(user);
    } catch (e) {
        return null;
    }
    // TODO: Need to deal with cancelled requlests
}

/** Creates an auth state object */
function createAuthState(isAuthenticated = false, isLoading = true, user: User | undefined = undefined): AuthState {
    return {isAuthenticated, isLoading, user, signOut, signInWithGoogle};
}

/** The initial authentication state */
export const defaultAuthState: AuthState = createAuthState();

export const FirebaseAuthContext = createContext<AuthState>(defaultAuthState);
// export const FirebaseAuthProvider = FirebaseAuthContext.Provider;

/** Hook that provides a session listener and various session methods */
export function useFirebaseAuth() {
    const [authState, setAuthState] = useState(defaultAuthState);

    useEffect(() => {
        // create authentication state listener
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in.
                setAuthState(createAuthState(true, false, firebaseUserToUser(user)));
            } else {
                // User is signed out.
                setAuthState(createAuthState(false, false));
            }
        });
    }, []);

    return authState;
}

/** Hook for reading and interacting with the app's current Firebase auth session */
export function useAuth() {
    return useContext(FirebaseAuthContext);
}

export function isLoggedIn() {
    if (auth.currentUser?.email != null && auth.currentUser?.displayName != null) {
        return checkIfRegistered(auth.currentUser?.email).then(r => {
            if (r) {return true} else {return false}
        }).catch(e => {
            return false
        })
    } 
    return false
  }

export async function checkIfRegistered(email: string) {
    const q = query(collection(firestore, "users"), where("email", "==", email));
    const snapshot = await getDocs(q)
    if (snapshot.empty) {
      console.log("Need to register")
      return false
    } else {
      console.log("You are registered")
      return true
    }
  }