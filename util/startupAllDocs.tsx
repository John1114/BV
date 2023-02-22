import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebaseConfig";

export default async function getStartupDocs(){
	
	const snapshot = await getDocs(collection(firestore, "startups"))
	const allDocs: any = {};
	snapshot.forEach((doc: any) => {
		allDocs[doc.id] = doc.data();
		//console.log(doc.data());
	});
	return allDocs;
}