import { Dialog, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";
import { affiliations, industryList, roles, Option } from "../util/profileOptions";


function capitalize(s: string){
    return s[0].toUpperCase() + s.slice(1);
}

const findOptionInOpts = (label: string, options: Option[], useLabel: boolean = false) => {
    if (useLabel){
      return options.find(opt => opt.label == label);
    }
    return options.find(opt => opt.value == label);
  }


export function UserCard({data} : {data : any}) {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    let education = null;
    if (data.education.length > 0) {
        education = data.education[0];
    }
    const optionLists: any = {
        aff: affiliations,
        ind: industryList,
        roles: roles
      }

    function closeModal() {
        setModalOpen(false);
    }

    // TODO: take this from util/constants.ts
    const firebaseStorageUrl: string = "https://firebasestorage.googleapis.com/v0/b/bruno-ventures-v2.appspot.com/o/"

    const imageUrl: string = `${firebaseStorageUrl}${encodeURIComponent(data.profilePicRef)}?alt=media`
    return (
        <>
        <div className="flex flex-col lg:hidden bg-red-300 w-5/6 rounded-md">
        <div className="group flex items-center rounded-md bg-[#FF5A5F] shadow-lg px-8 py-5">
        <img className="shrink-0 h-12 w-12 rounded-full" src={imageUrl} alt="" />
        <div className="ml-3 w-11/12">
            <p className="text-sm md:text-base font-medium text-white">
            {capitalize(data.first_name)} {capitalize(data.last_name)}
            </p>
            <p className="text-sm md:text-base font-light text-white">{findOptionInOpts(data.industry, industryList, false)?.label}</p>
        </div>
        <div className="flex flex-row justify-end w-1/2
        hidden md:flex md:transition-none md:opacity-100 md:visible">
            <div className="flex flex-col text-sm text-white">
                <a href={data.linkedin? data.linkedin: "#"} target={data.linkedin? "_blank": ""}
                className="flex flex-row">
                    LinkedIn &nbsp;<svg height="15px" width="15px" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" mirror-in-rtl="true"><path fill="#ffffff" d="M12.1.6a.944.944 0 0 0 .2 1.04l1.352 1.353L10.28 6.37a.956.956 0 0 0 1.35 1.35l3.382-3.38 1.352 1.352a.944.944 0 0 0 1.04.2.958.958 0 0 0 .596-.875V.96a.964.964 0 0 0-.96-.96h-4.057a.958.958 0 0 0-.883.6z"/><path fill="#ffffff" d="M14 11v5a2.006 2.006 0 0 1-2 2H2a2.006 2.006 0 0 1-2-2V6a2.006 2.006 0 0 1 2-2h5a1 1 0 0 1 0 2H2v10h10v-5a1 1 0 0 1 2 0z"/></svg>
                </a>
                <a href={data.company_website? data.company_website: "#"} target={data.company_website? "_blank": ""}
                className="flex flex-row">
                    Company Website &nbsp;<svg height="15px" width="15px" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" mirror-in-rtl="true"><path fill="#ffffff" d="M12.1.6a.944.944 0 0 0 .2 1.04l1.352 1.353L10.28 6.37a.956.956 0 0 0 1.35 1.35l3.382-3.38 1.352 1.352a.944.944 0 0 0 1.04.2.958.958 0 0 0 .596-.875V.96a.964.964 0 0 0-.96-.96h-4.057a.958.958 0 0 0-.883.6z"/><path fill="#ffffff" d="M14 11v5a2.006 2.006 0 0 1-2 2H2a2.006 2.006 0 0 1-2-2V6a2.006 2.006 0 0 1 2-2h5a1 1 0 0 1 0 2H2v10h10v-5a1 1 0 0 1 2 0z"/></svg>
                    </a>
                <a href={data.other_website? data.other_website: "#"} target={data.other_website? "_blank": ""}
                className="flex flex-row"> Other &nbsp;<svg height="15px" width="15px" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" mirror-in-rtl="true"><path fill="#ffffff" d="M12.1.6a.944.944 0 0 0 .2 1.04l1.352 1.353L10.28 6.37a.956.956 0 0 0 1.35 1.35l3.382-3.38 1.352 1.352a.944.944 0 0 0 1.04.2.958.958 0 0 0 .596-.875V.96a.964.964 0 0 0-.96-.96h-4.057a.958.958 0 0 0-.883.6z"/><path fill="#ffffff" d="M14 11v5a2.006 2.006 0 0 1-2 2H2a2.006 2.006 0 0 1-2-2V6a2.006 2.006 0 0 1 2-2h5a1 1 0 0 1 0 2H2v10h10v-5a1 1 0 0 1 2 0z"/></svg>
                </a>
            </div>
        </div>
        </div>
        <div className="pl-10 pr-8 py-5 text-xs md:text-sm text-white">
        <div className="mb-3"><b>School:</b><br/>{education? education.institution: ""}</div>
        <div className=""><b>Role:</b><br/>{findOptionInOpts(data.role, roles, false)?.label}</div>
        </div>
        <button type="button" onClick={() => setModalOpen(true)}
        className="w-1/2 mx-auto py-2 mb-3 rounded-full bg-[#FF5A5F] text-white text-xs md:text-base">Learn More</button>
        </div>
        <div 
        className="w-9/12 rounded-md border-box shadow-lg bg-[#FF5A5F] p-10 text-white
        hidden lg:flex lg:transition-none lg:opacity-100 lg:visible">
            <div className="flex-col w-1/4">
            <img src={imageUrl} className="rounded-lg mb-7
            w-32 h-32
            xl:w-44 xl:h-44"/>
            <div className="mb-7"><b>School:</b><br/>{education? education.institution: ""}</div>
            <div className="mb-7"><b>Industry:</b><br/>{findOptionInOpts(data.industry, industryList, false)?.label}</div>
            <div className="mb-7"><b>Role:</b><br/>{findOptionInOpts(data.role, roles, false)?.label}</div>
            </div>
            <div className="flex-col w-3/4 ml-3">
                <div className="flex flex-row">
                    <div className="flex-col w-2/3">
                        <h2 className="w-full text-5xl flex-wrap overflow-wrap font-extrabold mb-3">
                                    {capitalize(data.first_name)} {capitalize(data.last_name)}
                        </h2>
                    </div>
                    <div className="flex-col w-1/3">
                        <div className="flex flex-row justify-end">
                            <button type="button" onClick={() => setModalOpen(true)} className="bg-white text-[#FF5A5F] px-5 py-3 xl:px-8 xl:py-4 rounded-lg text-lg xl:text-xl"><b>LEARN MORE</b></button>
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <a href={data.linkedin? data.linkedin: "#"} target={data.linkedin? "_blank": ""}>LinkedIn</a> |
                    <a href={data.company_website? data.company_website: "#"} target={data.company_website? "_blank": ""}> Company Website</a> |
                    <a href={data.other_website? data.other_website: "#"} target={data.other_website? "_blank": ""}> Other</a>
                    </div>
                    <div className="w-full h-3/4 text-black flex flex-row">
                    <div className="w-full h-full text-black">
                        <div className="h-24 xl:h-1/3 bg-white rounded-md p-4 mb-3">
                            {/* Text area */}
                                <b>
                                    Expertise:
                                </b>
                                <div className="flex flex-row flex-wrap mt-1 overflow-hidden">
                                {((data.expertise_find.length > 0)? data.expertise_find.slice(1).reduce((cumulation: string, current: string, index: number) => {
                                    if (index <= 5) {
                                        return cumulation + ", " + findOptionInOpts(current, industryList, false)?.label;
                                    } else {
                                        return cumulation;
                                    }
                                }, findOptionInOpts(data.expertise_find[0], industryList, false)?.label)
                                + ((data.expertise_find.length > 5)? "...": ""): "")}
                                </div>
                        </div>
                        <div className="h-24 xl:h-1/3 bg-white rounded-md p-4 mb-3">
                            {/* Text area */}
                                <b>
                                    Open to be Contacted For:
                                </b>

                        </div>
                        <div className="h-24 xl:h-1/3 bg-white rounded-md p-4 mb-3">
                            {/* Text area */}
                                <b>
                                    Startups:
                                </b>

                        </div>
                    </div>
                    </div>
            </div>

             {/* MODAL START */}

             <Transition.Root show={modalOpen} as={Fragment}>
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
                  {/* <div className="relative  my-6 mx-auto"> */}
                  <Dialog.Panel>
                  <div className="relative max-w-2xl ">
                            <div className="relative bg-[#FF5A5F] rounded-lg shadow pb-4 pr-4 pl-4">
                                <div className="flex items-start justify-between p-4 border-b rounded-t">
                                    <h3 className="text-xl font-semibold text-white">
                                    {capitalize(data.first_name)} {capitalize(data.last_name)}'s Profile Details
                                    </h3>
                                    <button type="button" onClick={closeModal}
                                    className="text-white bg-transparent hover:bg-[#fa7f83] rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="defaultModal">
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div className="p-6 space-y-6 bg-white m-4">
                                    <p className="leading-relaxed text-black">
                                        With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply. With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply. With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply. With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                  </div>
                {/* </div> */}
                </Transition.Child>
                  </Dialog>
                </Transition.Root>
      
                {/* MODAL END */}

        </div>
        </>
    );
}