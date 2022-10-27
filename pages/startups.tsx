import '../styles/Home.module.css';
import Casper from "../assets/casper.png";
import Opensea from "../assets/opensea.png";
import Airbnb from "../assets/airbnb.png";
import Warby from "../assets/warby.png";
import SearchBar from "../components/SearchBar";
import Dropdown from "../components/Dropdown";
import CompanyCard from '../components/CompanyCard';
import Startup from './[startupSlug]';
import { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react';




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
  id: string;
  imageData: string;
  accentColor: string;
}

/* DUMMY DATA: remove this! it's just for show */
let arr: companies[] = [];
arr.push({"id": "eG44NvYvCP145Q8RO2Pd", "imageData": Casper.src, "accentColor": "0053A6"},
{"id": "ZfDNnkPrFXw7voMwpIYY", "imageData": Opensea.src, "accentColor": "2081E2"},
{"id": "gZCT37XxMiBwXBukMRPU", "imageData": Airbnb.src, "accentColor": "FF5A5F"},
{"id": "ZfDNnkPrFXw7voMwpIYY", "imageData": Warby.src, "accentColor": "DFDFDF"});

export default function Startups() {
  const router = useRouter();
  const [startups, setStartups] = useState<any[]>([]);
  const [openedModal, setOpenedModal] = useState<string>("");

  function closeModal(){
    setOpenedModal("");
  }

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

          {/* MODAL START */}

          <Transition.Root show={openedModal == startup.id} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-10/12 h-5/6 my-6 mx-auto">
            <Dialog.Panel>
              <div className="border-0 rounded-lg overflow-hidden flex shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* STARTUP INFO */}
                <Startup startupId={startup.id}/>
              </div>
              </Dialog.Panel>
            </div>
          </div>
          </Transition.Child>
            </Dialog>
          </Transition.Root>

          {/* MODAL END */}

          </div>
        ))}
      </div>
    </div>
  );
}
