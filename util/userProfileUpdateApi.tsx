import { doc, query, updateDoc, collection, where, getDocs, QueryDocumentSnapshot } from "firebase/firestore";
import { StorageReference, uploadBytes, deleteObject } from "firebase/storage";
import { firestore } from "./firebaseConfig";
import { useAuth, User } from "./firebaseFunctions";

// TODO: add type check for inputted data to check that all required fields are filled.
// If not, then fill in default values.

export default async function updateUserProfile(userSnapshot: QueryDocumentSnapshot, updatedFields: any){
	try {
		// const q = query(collection(firestore, "users"), where("email", "==", userEmail), limit(1));
    	// const docs = await getDoc(q);
		await updateDoc(userSnapshot.ref, updatedFields);
	  } catch (e) {
		console.error("Error adding document: ", e);
	  }
}

export async function checkIfRegistered(user: User | undefined){
    const q = query(collection(firestore, "users"), where("email", "==", user?.email));
    const snapshot = await getDocs(q)
    if (snapshot.empty) {
      console.log("Need to register")
      return null
    } else {
      console.log("You are registered")
      return snapshot.docs[0]
    }
  }

export async function uploadFileWithRef(storageRef: StorageReference, file: File){
  return uploadBytes(storageRef, file).then((snapshot) => {
    return true;
  }).catch((error) => {
    console.log(error);
    return false;
  })
}

export async function deleteFileWithRef(storageRef: StorageReference){
  return deleteObject(storageRef).then(() => {
    // File deleted successfully
    return true;
  }).catch((error) => {
    // Uh-oh, an error occurred!
    return false;
  });
}
