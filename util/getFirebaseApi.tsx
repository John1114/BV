import { doc, query, updateDoc, collection, where, getDocs, QueryDocumentSnapshot } from "firebase/firestore";
import { StorageReference, uploadBytes, deleteObject } from "firebase/storage";
import { firestore } from "./firebaseConfig";
import { useAuth } from "./firebaseFunctions";


export default async function getFromFileStorage(path: string){
	// TODO: implement
}