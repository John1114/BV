import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "./firebaseConfig";
import { useAuth } from "./firebaseFunctions";


// TODO: add type check for inputted data to check that all required fields are filled.
// If not, then fill in default values.

export default async function updateUserProfile(userId: string, updatedFields: any){
	try {
		await updateDoc(doc(firestore, "users", userId), updatedFields);
	  } catch (e) {
		console.error("Error adding document: ", e);
	  }
}