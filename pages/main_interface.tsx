import React, { useState } from "react";
import logo from '../assets/brunoventures.png';
import SearchBar from "../components/SearchBar";
import { StaticImageData } from 'next/image';
import SearchComponent from '../components/SearchComponent';
import { Transition } from "@headlessui/react";
import { CompanyData } from "../components/StartupInfoWithFirebase";
import { fakeCompany1, fakeCompany2 } from '../src/mockData';
import { height, minHeight } from "@mui/system";


export const interfaceBackgroundColor: string = '#EFEFEF'

function Logo({logo}: {logo: StaticImageData}) {
    return (<a href="/main_interface"><img src={logo.src} alt="logo" className="h-12 w-12 object-scale-down"/></a>);
}

function ProfilePic({pic}: {pic: StaticImageData}) {
    return (<a href="/edit_profile" className="text-lg font-light text-gray-600 transition-all hover:text-red-500 right-12">
        <img src={pic.src} alt="pfp" className="h-12 w-12 object-scale-down shadow rounded-full "/></a>);
}


export default function MainPage() {

    return (
        <div className="h-screen">
            <Header/>
            <InteractSection/>
        </div>
    );
}

export function Header() {
    // Should have profile icon, search thing
    return (
        <div style={{
            backgroundColor: interfaceBackgroundColor,
        }} className="items-center align-middle flex w-screen h-14 px-4 sm:px-6">
            <div className="items-center align-middle flex w-screen h-14 px-4 sm:px-6">
                <Logo logo={logo}/>
                <SearchComponent/>
            </div>
            <div>
                


            </div>
            <div>
                <ProfilePic pic={logo}/>
            </div> 
        </div>
    )
}


export function InteractSection() {
    return (
        <div className="w-screen h-screen flex">
            <SearchOptions/>
            <MainArea/>
        </div>
    )
}

export function SearchOptions() {
    const [showSidebar, setShowSidebar] = useState(false);
  
    return (
        <div className="flex" style={{
            backgroundColor: interfaceBackgroundColor,
        }} >
                <button onMouseOver={() => setShowSidebar(true)} onMouseLeave={() => setShowSidebar(false)}
                    className={`w-24 hover:w-64`} >
                    <> 
                        {
                            showSidebar ? (
                                <div>
                                    
                                    
                                </div>
                            ) : (<div></div>)
                        }
                    </>
                </button>
        </div>
    );
}

export function MainArea() {
    return (
        <div
        className="h-screen w-screen bg-white bg-opacity-100">
            <CompanyCardList/>
        </div>
    );
}

export function CompanyCardList() {
    return (
        <div className="h-screen flex flex-col items-center align-middle pt-12 justify-start gap-y-12">
            <CompanyCard data={fakeCompany1}/>
            <CompanyCard data={fakeCompany2}/>
        </div>
    );
}

export function CompanyCard({data} : {data : CompanyData}) {
    return (
        <div style={{
            backgroundColor: data.accentColor,
            minHeight: '18rem',
            

                    }} 

        className=" w-9/12 rounded-md border-box shadow-lg">
            {/* Top */}
            <div className="flex justify-center">
                <div className="my-2 mx-4 w-11/12">
                    <div className="flex justify-content items-center align-middle">
                        <img src={data.imageData} className="left-0 inset-y-0 w-24 h-24"/>
                        {/* Information */}
                        <div className="mx-4">
                            <h2 className="my-2 text-2xl">
                                {data.name}
                            </h2>
                            {/* Bottom part of upper area */}
                            <div className="grid-cols-3 gap-4 justify-content items-center flex content-between">
                                <div>
                                    <b>Industry</b>
                                    <p>{data.industry}</p>
                                </div>
                                <div>
                                    <b>Founders</b>
                                    <p>{data.founders}</p>
                                </div>
                                <div>
                                    <b>Contact</b>
                                    <p>{data.email}</p>
                                </div>
                                <div>
                                    <b>Website</b>
                                    <p>{data.website}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="mb-8 mt-2 flex justify-center w-full">
                <div className="h-44 w-11/12 bg-white rounded-md">
                    {/* Text area */}
                    <p> 
                        <b>
                            Description:
                        </b>
                        {data.mission}
                    </p>

                </div>
            </div>
            
            
        </div>
    );
}

