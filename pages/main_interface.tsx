import React, { useState } from "react";
import logo from '../assets/brunoventures.png';
import SearchBar from "../components/SearchBar";
import { StaticImageData } from 'next/image';
import SearchComponent from '../components/SearchComponent';
import { Transition } from "@headlessui/react";
import { CompanyData } from "../components/StartupInfoWithFirebase";
import { User } from "../util/types";
import { fakeCompany1, fakeCompany2 } from '../src/mockData';
import { height, minHeight } from "@mui/system";
import Select from "react-select";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import getStartupDocs from "../util/startupAllDocs";
import { json } from "stream/consumers";
import { useEffect } from 'react';
import { Info } from "@mui/icons-material";
import useWindowSize from '../util/getWindowHook';


/*

    how to organize front page

    make sure switching between pages is easy

    navbar
        main logo (takes you to main page)
        search
        pfp
    lower area
        sidebar
        navigatible area
            data loader
                company/person cards
                    (these should start in mobile mode, then extend out into desktop mode)
                    description is hidden until either desktop becomes big enough or show more is shown

*/




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
        }} className="fixed items-center align-middle flex w-screen h-14 px-4 sm:px-6">
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

    const [showUsers, setShowUsers] = useState(false);

    return (
        <div className="w-screen h-screen flex">
            <SearchOptions setShowUsers={setShowUsers}/>
            <MainArea isUser={showUsers}/>
        </div>
    )
}

export function SearchOptions({ setShowUsers } : { setShowUsers : any} ) {
    const [showSidebar, setShowSidebar] = useState(false);
  

    // EVENTUAL TODO, little artifact when it pops out, it takes a second to load in
    // also, resizing isn't picking up for this top part? maybe just restart
    return (
        <div className="hidden md:static md:block md:visible md:opacity-100 md:transition-none sm:h-full" style={{
            backgroundColor: interfaceBackgroundColor,
        }} >
            
                <button onMouseOver={() =>  setShowSidebar(true)} onMouseLeave={() => setShowSidebar(false)}
                    className={`duration-150 hover:duration-150 w-16 hover:w-64 h-full`} >
                    <> 
                        {
                            showSidebar ? (
                                // https://www.npmjs.com/package/react-tabs?activeTab=readme thx
                                <Tabs>
                                    <div style={{ minHeight: '80%' }} className="w-full h-full align-middle">
                                        <TabList className="bg-white object-top justify-center flex gap-4">
                                            <Tab className="outline m-2 p-2 hover:bg-slate-400" onClick={ () => setShowUsers(true) }>People</Tab>
                                            <Tab className="outline m-2 p-2 hover:bg-slate-400" onClick={ () => setShowUsers(false) }>Startups</Tab>
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

export function MainArea({isUser} : {isUser : boolean}) {
    return (

        <>
         { isUser ? ( 
            <div
            className="h-screen w-screen bg-white bg-opacity-100">
                <UserCardList/>
            </div>
            
            ) : (

                <div
            className="h-screen w-screen bg-white bg-opacity-100">
                <CompanyCardList/>
            </div>
            )


        }
        </>
        
    );
}

export function UserCardList() {
    return (
        <div className="h-screen flex flex-col items-center align-middle pt-12 justify-start gap-y-12">
            <UserCard data={fakeCompany1}/>
        </div>
    );
}

export function CompanyCardList() {

    //useEffect(() => {
        
    var docs = getStartupDocs().
    then(r => {
        console.log(r);
    }).catch(r => {
        console.log("caught, error: " + r);
    });
        
        
    

    

    
    

    return (
        <div className="h-screen flex flex-col items-center align-middle pt-24 justify-start gap-y-12">
            <CompanyCard data={fakeCompany1}/>
            <CompanyCard data={fakeCompany2}/>
        </div>
    );
}




export function CompanyCard({data} : {data : CompanyData}) {

    const [showDescription, setShowDescription] = useState(false);

    
    const { width } = useWindowSize();



    return (
        <div style={{backgroundColor: data.accentColor,
        // 
    }} className="w-11/12 rounded-xl">
            {/* Header */}
            <div className="flex flex-col justify-between items-center">
                <img src={data.imageData} className="w-12 h-12 md:w-24 md:h-24"/>
                
                <h2 className="my-2 text-lg  md:text-center md:text3xl flex-wrap">{data.name}</h2>
            </div>
            {/* Middle */}
            
            <CompanyCardInformation data={data}></CompanyCardInformation>
            {/* Bottom */}
            <div>
                {/* Description */}
                <div className="flex justify-center align-middle md:py-10">
                    <>
                        {
                            (showDescription || width >= 768) ? (
                            
                            <div className="h-44 w-11/12 bg-white rounded-md">
                                {/* Text area */}
                                <p> 
                                    <b>
                                        Description:
                                    </b>
                                    {data.mission}
                                </p>
                            </div>) : (<div></div>)
                        }
                    </>
                </div>
                {/* More information */}
                <div className="flex md:hidden  justify-center pt-3">
                    <MoreInformationButton setShowInfo={setShowDescription}></MoreInformationButton>
                </div>
            </div>
            
        </div>
        


    )

}

function CompanyCardInformation({data} : {data : CompanyData}) {

    // h-screen flex flex-col items-center align-middle pt-24 justify-start gap-y-12
    return (
        <div>
            {/* For smaller screens */}
            <div className="md:hidden flex text-base justify-center gap-x-14">
                
                <div>
                    <a href={data.email}>Contact</a>
                </div>
                <div>
                    <a href={data.website}>Website</a>
                </div>
            </div>

            {/* For larger screens */}
            <div className="hidden md:block md:visible md:opacity-100 md:transition-none">
                <div className="flex md:flex-col lg:flex-row justify-between align-middle">
                {/* <div className="grid grid-rows-2 justify-between align-middle"> */}
                    <InfoBlock title="Contact"  pText={data.email}></InfoBlock>
                    <InfoBlock title="Industry"  pText={data.industry}></InfoBlock>
                    <InfoBlock title="Founders"  pText={data.founders}></InfoBlock>
                    <InfoBlock title="Website"  pText={data.website}></InfoBlock>
                </div>
            </div>
        </div>

        

    )
}
function InfoBlock({ title, pText } : {title : string, pText : string}) {
    return (
        <div>
            <b>{title}</b>
            <p className=" truncate text-clip">{pText}</p>
        </div>

    );
}


function MoreInformationButton({ setShowInfo } : {setShowInfo : any}) {

    var displaying = false; 
    return (
        <button className="border-4 m-2 text-lg rounded-full outline-1 outline-black"
         onMouseDown={() => { displaying = !displaying; setShowInfo(displaying); }}>
            <div className="m-2 mx-4">
                Learn More 
            </div>
                       
        </button>

    )
}




// export function CompanyCard({data} : {data : CompanyData}) {
//     return (
//         <div style={{
//             backgroundColor: data.accentColor,

//                     }} 

//         className="w-9/12 rounded-md border-box shadow-lg">
//             {/* Top */}
//             <div className="flex justify-center">
//                 <div className="my-2 mx-4 h-1/2 max-h-fit w-11/12">
//                     <div className="flex justify-content xl:items-center xl:align-middle">
//                         <img src={data.imageData} className="left-0 inset-y-0 w-12 h-12 md:w-24 md:h-24"/>
//                         {/* Information */}
//                         <div className="mx-4 w-full">
//                             {/* <div className="lg:justify-content lg:items-center"> */}
//                                 <h2 className="w-full my-2 text-2xl flex-wrap mx-1 overflow-wrap">
//                                     {data.name}
//                                 </h2>
//                             {/* </div> */}
//                             {/* Bottom part of upper area */}
//                             {/* <div className="grid-cols-4 gap-4 justify-content items-center flex flex-wrap content-between overflow-wrap"> */}
//                             <div className="grid-cols-4 flex justify-around overflow-wrap flex-wrap items-center">
//                                 <div className="basis-1/4">
//                                     <div className="hidden lg:block lg:visible lg:opacity-100 lg:transition-none">
//                                         <b>Industry</b>
//                                         <p>{data.industry}</p>
//                                     </div>
//                                 </div>
//                                 <div className="basis-1/4">
//                                     <div className="hidden lg:block lg:visible lg:opacity-100 lg:transition-none">
//                                         <b>Founders</b>
//                                         <p>{data.founders}</p>
//                                     </div>
//                                     {/* <p className="w-full flex-wrap mx-1">{data.founders}</p> */}
//                                 </div>
//                                 <div className="basis-1/4">
//                                     <div className="lg:hidden">
//                                         <a href={data.email}>Contact</a>
//                                     </div>
//                                     <div className="hidden lg:block lg:visible lg:opacity-100 lg:transition-none">
//                                         <b>Contact</b>
//                                         <p>{data.email}</p>
//                                     </div>
//                                 </div>
//                                 <div className="basis-1/4">
//                                     <div className="lg:hidden">
//                                         <a href={data.website}>Website</a>
//                                     </div>
//                                     <div className="hidden lg:block lg:visible lg:opacity-100 lg:transition-none">
//                                         <b>Website</b>
//                                         <p>{data.website}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Bottom */}
//             <div className="hidden lg:flex justify-center w-full h-full pb-10">
//                 <div className="h-44 w-11/12 bg-white rounded-md">
//                     {/* Text area */}
//                     <p> 
//                         <b>
//                             Description:
//                         </b>
//                         {data.mission}
//                     </p>

//                 </div>
//             </div>
            
            
//         </div>
//     );
// }


export function UserCard({data} : {data : CompanyData}) {
    return (
        <div style={{
            backgroundColor: data.accentColor,

                    }} 

        className=" rounded-md border-box shadow-lg">
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
                                    <b>User Info</b>
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
            <div className="hidden xl:flex justify-center w-full h-full pb-10">
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

