import { collection, addDoc } from "firebase/firestore";
import { StorageReference, uploadBytes } from "firebase/storage";
import { firestore } from "./firebaseConfig";

// TODO: add type check for inputted data to check that all required fields are filled.
// If not, then fill in default values.

export default async function addStartupFromForm(data: any){
	try {
		const docRef = await addDoc(collection(firestore, "startups"), data);
		console.log("Document written with ID: ", docRef.id);
		return docRef;
	  } catch (e) {
		console.error("Error adding document: ", e);
		return undefined
	  }
}

export async function uploadImageWithRef(storageRef: StorageReference, file: File){

	return uploadBytes(storageRef, file).then((snapshot) => {
		return true;
	}).catch((error) => {
		console.log(error);
		return false;
	})
}