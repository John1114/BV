import React, { useState } from "react";
import logo from '../assets/brunoventures.png';
import SearchBar from "../components/SearchBar";
import { StaticImageData } from 'next/image';
import SearchComponent from '../components/SearchComponent';
import { Transition } from "@headlessui/react";
import { CompanyData } from "../components/StartupInfoWithFirebase";
import { fakeCompany1, fakeCompany2 } from '../src/mockData';
import { height, minHeight } from "@mui/system";
import Select from "react-select";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


interface Option {
    value: string,
    label: string
}


let testDropdownOption: Option[] = [
    {value: "test", label: "Test"},
]

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
        <div className="flex h-full" style={{
            backgroundColor: interfaceBackgroundColor,
        }} >
                <button onMouseOver={() => setShowSidebar(true)} onMouseLeave={() => setShowSidebar(false)}
                    className={`w-24 hover:w-64 h-full`} >
                    <> 
                        {
                            showSidebar ? (
                                // https://www.npmjs.com/package/react-tabs?activeTab=readme thx
                                <Tabs>
                                    <div style={{ minHeight: '80%' }} className="w-full h-full align-middle">
                                        <TabList className="bg-white object-top justify-center flex gap-4">
                                            <Tab className="outline m-2 p-2 hover:bg-slate-400">People</Tab>
                                            <Tab className="outline m-2 p-2 hover:bg-slate-400">Startups</Tab>
                                        </TabList>
                                
                                        <div>
                                            <div style={{ minHeight: '20rem' }}className=" w=8/12 bg-white rounded-lg py-4 px-4 content-center">
                                                
                                                {/* People panel (industry, role, expertise, affiliation, someone seeking role) */}
                                                <TabPanel>
                                                    <div className="content-center w-full my-5 align-middle">
                                                        <b>Current Industry</b>
                                                        <Select options={testDropdownOption} id="hi" isMulti key={"dropdown"}
                                                            onChange={(value: any, _: any) => {}}/>
                                                    </div>
                                                    <div className="content-center w-full my-5 align-middle">
                                                        <b>Role</b>
                                                        <Select options={testDropdownOption} id="hi" isMulti key={"dropdown"}
                                                            onChange={(value: any, _: any) => {}}/>
                                                    </div>
                                                    <div className="content-center w-full my-5 align-middle">
                                                        <b>Expertise</b>
                                                        <Select options={testDropdownOption} id="hi" isMulti key={"dropdown"}
                                                            onChange={(value: any, _: any) => {}}/>
                                                    </div>
                                                    <div className="content-center w-full my-5 align-middle">
                                                        <b>Affiliationy</b>
                                                        <Select options={testDropdownOption} id="hi" isMulti key={"dropdown"}
                                                            onChange={(value: any, _: any) => {}}/>
                                                    </div>
                                                </TabPanel>

                                                {/* Startups panel (industry, needs, size) */}
                                                <TabPanel>
                                                    <div className="content-center w-full my-5 align-middle">
                                                        <b>Industry</b>
                                                        <Select options={testDropdownOption} id="hi" isMulti key={"dropdown"}
                                                            onChange={(value: any, _: any) => {}}/>
                                                    </div>
                                                    <div className="content-center w-full my-5 align-middle">
                                                        <b>Needs</b>
                                                        <Select options={testDropdownOption} id="hi" isMulti key={"dropdown"}
                                                            onChange={(value: any, _: any) => {}}/>
                                                    </div>
                                                    <div className="content-center w-full my-5 align-middle">
                                                        <b>Size</b>
                                                        <Select options={testDropdownOption} id="hi" isMulti key={"dropdown"}
                                                            onChange={(value: any, _: any) => {}}/>
                                                    </div>
                                                </TabPanel>
                                            
                                            </div>
                                            
                                        </div>
                                    </div>
                                </Tabs>
                                    
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

                    }} 

        className=" w-9/12 rounded-md border-box shadow-lg">
            {/* Top */}
            <div className="flex justify-center">
                <div className="my-2 mx-4 h-1/2 max-h-fit w-11/12">
                    <div className="flex justify-content items-center align-middle">
                        <img src={data.imageData} className="left-0 inset-y-0 w-24 h-24"/>
                        {/* Information */}
                        <div className="mx-4 w-full">
                            <div className="justify-content items-center">
                                <h2 className="w-full my-2 text-2xl flex-wrap mx-1 overflow-wrap">
                                    {data.name}
                                </h2>
                            </div>
                            {/* Bottom part of upper area */}
                            <div className="grid-cols-3 gap-4 justify-content items-center flex flex-wrap content-between overflow-wrap">
                                <div>
                                    <b>Industry</b>
                                    <p>{data.industry}</p>
                                </div>
                                <div >
                                    <b>Founders</b>
                                    <p className="w-full flex-wrap mx-1">{data.founders}</p>
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
            <div className="flex justify-center w-full h-full pb-10">
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

