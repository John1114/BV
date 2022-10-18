import '../styles/Home.module.css';
import Casper from "../assets/casper.png";
import Opensea from "../assets/opensea.png";
import Airbnb from "../assets/airbnb.png";
import Warby from "../assets/warby.png";
import SearchBar from "../components/SearchBar";
import Dropdown from "../components/Dropdown";
import CompanyCard from '../components/CompanyCard';
import Startup from './[startupSlug]';
import { useEffect, useState } from "react";
import Modal from "react-modal";



// Modal.setAppElement("#root");
// import {
//   collection,
//   getDocs,
//   getFirestore,
//   query,
//   where,
// } from "@firebase/firestore";
import { useRouter } from "next/router";
import { StaticImageData } from "next/image";

interface companies {
  id: number;
  imageData: string;
  accentColor: string;
}

/* DUMMY DATA: remove this! it's just for show */
let arr: companies[] = [];
arr.push({"id": 0, "imageData": Casper.src, "accentColor": "0053A6"},
{"id": 1, "imageData": Opensea.src, "accentColor": "2081E2"},
{"id": 2, "imageData": Airbnb.src, "accentColor": "FF5A5F"},
{"id": 3, "imageData": Warby.src, "accentColor": "DFDFDF"});

export default function Startups() {
  const router = useRouter();
  const [startups, setStartups] = useState<any[]>([]);
  const [openedModal, setOpenedModal] = useState(-1);

  useEffect(() => {

    /* Actual code to get data from firebase (Commented out until setup of firebase) */
    // const db = getFirestore();
    // const q = query(collection(db, "apps"), where("approved", "==", true));
    // getDocs(q).then((docRefs) => {
    //   const docs = docRefs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    //   setStartups(docs);
    // });

    setStartups(arr);
    
  });
  return (
    <div className="holder">
      <h1>Our Companies</h1>
      <SearchBar/>
      {/* <div className="dropdown">
         <Dropdown placeholder={"Industry"}/>
         <Dropdown placeholder={"Funding Stage"}/>
         <a href="#application"><p className="px-56 py-2 cursor-pointer"><b>Add your startup</b> <span
             className="text-red-800">&#8594;</span></p></a>
      </div> */}
      <div className="grid">
        {startups.map((startup: any) => (
          <div key={startup.id}>
          {/* <button
            className="card block"
            onClick={() => router.push("/" + startup.id)}
          > */}
          <button
            className="card block"
            onClick={() => setOpenedModal(startup.id)}
          >
            <img
              src={startup.imageData}
              className="left-0 right-0 object-contain"
            />
          </button>
          <Modal isOpen={openedModal == startup.id} onRequestClose={() => setOpenedModal(-1)}>
            <Startup />
            {/* <CompanyCard accentColor={startup.accentColor} imageUrl={startup.imageData} identifier={startup.id}/> */}
          </Modal>
          </div>
        ))}
      </div>
    </div>
  );
}
