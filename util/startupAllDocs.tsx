import { collection, addDoc, getDocs } from "firebase/firestore";
import { StorageReference, uploadBytes } from "firebase/storage";
import { firestore } from "./firebaseConfig";

export default async function getStartupDocs(data: any){
	
		const snapshot = await getDocs(collection(firestore, "startups"))
		const allDocs: any = {};
		snapshot.forEach((doc: any) => {
			allDocs[doc.id] = doc.data();
		});
		return collection;
}