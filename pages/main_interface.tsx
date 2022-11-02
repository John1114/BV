import React, { useState } from "react";
import logo from '../assets/brunoventures.png';
import SearchBar from "../components/SearchBar";
import { StaticImageData } from 'next/image';
import SearchComponent from '../components/SearchComponent';
import { Transition } from "@headlessui/react";
import { CompanyData } from "../components/StartupInfoWithFirebase";
import { fakeCompany1 } from '../src/mockData';


export const interfaceBackgroundColor: string = '#EFEFEF'

function Logo({logo}: {logo: StaticImageData}) {
    return (<img src={logo.src} alt="logo" className="h-12 w-12 object-scale-down"/>);
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
            <Logo logo={logo}/>
            <SearchComponent/>
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
                    className={`w-20 hover:w-60`} >
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
        </div>
    );
}

export function CompanyCard({data} : {data : CompanyData}) {
    return (
        <div style={{backgroundColor: data.accentColor}} 
        className="h-32 w-96 rounded-md border-box">
            {/* Top */}
            <div>
                <img src={data.imageData}/>
                {/* Information */}
                <div>
                    <h2>
                        {data.name}
                    </h2>
                    {/* Bottom part of upper area */}
                    <div>
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
            {/* Bottom */}
            <div>
                {/* Text area */}
                <p>
                    <b>
                        Description:
                    </b>
                    {data.mission}
                </p>

            </div>
            
            
        </div>
    );
}

