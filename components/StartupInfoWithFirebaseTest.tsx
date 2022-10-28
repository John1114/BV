import { useRouter } from "next/router";
import {
	doc,
  	getDoc,
	getFirestore,
} from "firebase/firestore";
import opensea from '../images/opensea_logo.png'
import { app } from "../src/firebaseConfig";
import { useEffect, useState } from "react";

interface StartupDataFormat {
	companyName?: string;
	industry?: string;
	yearFounded?: number;
	email?: string;
	website?: string;
	description?: string;
	accentColor?: string;
	// TODO: add image src and mission statement
}

interface startupIdProp {startupId: string}

export default function StartupInfo({startupId}: startupIdProp) {
    // const router = useRouter();
    // const { startupId } = router.query;

	const [startupData, setStartup] = useState<StartupDataFormat>({});
	const [loaded, setLoaded] = useState<boolean>(false);
	// const [accentColor, setColor] = useState<string>("");

	useEffect(() => {
		const getDocAsync = async function(){
				const docSnapshot = await getDoc(docRef)
				if (docSnapshot.exists()) {
					const startupData = docSnapshot.data();
					// const accentColorClass = `bg-[${startupData.accentColor}]`;
					// console.log(accentColorClass);
					setStartup(startupData);
					// setColor(accentColorClass);
					setLoaded(true);
				}
		}
		const db = getFirestore(app);
		const docRef = doc(db, "startups", startupId);
		if (!loaded){
			getDocAsync();
		}
	})


	if (loaded){
		return (
			<div className="">
	
				{/* If we are storing an "accentColor" attribute for each company,
				this class needs to change with each company (Ex: "bg-[#2c6dd4]")
				but Tailwind CSS does not allow dynamically generated colors even from whole variables.
				So I think the best solution here may be to give startups a list of vibrant colors to choose from,
				and then have a map of the colors to corresponding classes.
				See: https://tailwindcss.com/docs/content-configuration#dynamic-class-names
				*/}
				<div className="bg-blue-600">
	
	
					<div className="max-w-3xl px-4 mx-auto h-64 relative overflow-x-hidden">
						<div className="absolute bottom-0">
							<h1 className="text-3xl md:text-5xl font-bold text-white">
								At a glance: <span className="font-light">{startupData.companyName}</span>
							</h1>
						</div>
					</div>
	
	
				</div>
				<div className="max-w-3xl px-4 mx-auto mt-6 pb-8">
					<div className="flex justify-start items-center space-x-8 mb-8">
	
						<div>
							<div className="font-bold">
								Industry
							</div>
							{startupData.industry}
						</div>
	
						<div>
							<div className="font-bold">
								Year
							</div>
							{startupData.yearFounded}
						</div>
	
						<div>
							<div className="font-bold">
								Contact
							</div>
							{startupData.email}
						</div>
	
						<div>
							<div className="font-bold">
								Website
							</div>
							<a href={startupData.website} className="hover:text-blue-600 text-blue-500 focus:underline">{startupData.website}</a>
						</div>
	
					</div>
	
	
					<div>
						<span className="font-bold">Mission Statement:</span> TODO: Implement
					</div>
	
					<div className="mt-4">
						<span className="font-bold">Description:</span> {startupData.description}
					</div>
	
				</div>
				<div className="top-48 left-20 absolute">
								<img src={opensea.src} className="h-32 w-32 mx-auto rounded-full border-4 border-white" />
							</div>
			</div>
		)
	}else{return null}
}