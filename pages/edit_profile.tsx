import { Header } from "./main_interface";
import bear from '../assets/thanks-bear.png';
import { useForm } from "react-hook-form";
import updateUserProfile, { checkIfRegistered, uploadFileWithRef } from "../util/userProfileUpdateApi";
import { AuthState, useAuth, User } from "../util/firebaseFunctions";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DocumentData, QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore";
import { affiliations, industryList, roles, degreeTypes } from "../util/profileOptions";
import Select from "react-select";
import { ref } from "firebase/storage";
import { storage } from "../util/firebaseConfig";
import { Dialog, Transition } from "@headlessui/react";

/*
TODO:
* ASK IF I CAN MOVE checkIfRegistered FUNCTION to a more accessible API place
- add Select... for finding startup
- allow change image profile picture
- load in original data for users
- test API with authenticated and unauthenticated user
*/

export default function editProfile() {
  const { register, handleSubmit } = useForm();
  const { register: registerResume, handleSubmit: handleSubmitResume } = useForm();
  const { register: registerEducation, handleSubmit: handleAddEducation, reset } = useForm();
  const [brownAffiliation, setAffiliation] = useState<string>("");
  const [myRole, setMyRole] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [expertiseFind, setExpertiseFind] = useState<string[]>([]);
  const [roleFind, setRoleFind] = useState<string[]>([]);
  const [openEdModal, setOpenModal] = useState<boolean>(false);
  const [educationList, setEducationList] = useState<any[]>([
    {
      institution: "Brown University",
      concentration: "Computer Science",
      degree_type: "Bachelors",
      grad_year: 2026
    }
  ]);
  const [educationEditId, setEducationEditId] = useState<number>(-1);
  const router = useRouter();
  const { user } = useAuth();

  function removeEmptyFields(data: any) {
    Object.keys(data).forEach(key => {
      if (data[key] === '' || data[key] == null || data[key] == undefined) {
        delete data[key];
      }
    });
    return data;
  }

  function isEmpty(obj: Object) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

  // const submitAllForms = async () => {
  //   // Maybe TODO
  // }

  const checkUserValidity = async () => {
    if (user === undefined){
      return null;
    }
    const userSnapshot: QueryDocumentSnapshot<DocumentData> | null = await checkIfRegistered(user);
    if (userSnapshot === null){
      return null;
    }else{
      return userSnapshot
    }
  }

  const addEducation = async (data: any) => {
    console.log(data);
    if (educationEditId === -1){
      educationList.push(data);
      setEducationList(educationList);
    }else{
      educationList[educationEditId] = data;
      setEducationList(educationList);
    }
    closeModal();
  }

  const onResumeSubmit = async (data: any) => {
    const userSnapshot = await checkUserValidity();
    if (userSnapshot !== null){
      const resume = data["resume"][0];
      if (resume !== undefined){
        var datetime = new Date();
        const pdfStorageUri = `resume/${userSnapshot.id}-${datetime.getTime().toString()}.pdf`
        const resumeRef = ref(storage, pdfStorageUri);
        const resumeResult = await uploadFileWithRef(resumeRef, resume)
        if (resumeResult){
          await updateUserProfile(userSnapshot, {resumeRef: pdfStorageUri})
          router.push("/");
        }
      }
    }
  }

  const onSubmit = async (data: any) => {
    const userSnapshot = await checkUserValidity();
    if (userSnapshot !== null){
      data["affiliation"] = brownAffiliation;
      data["role"] = myRole;
      data["industry"] = industry;
      data["expertise_find"] = expertiseFind.join(",");
      data["role_find"] = roleFind.join(",");
      const cleanedData = removeEmptyFields(data);
      console.log(cleanedData);

      // check there is data
      if (!isEmpty(cleanedData)){
        // update user with API
        // TODO: Test API
        await updateUserProfile(userSnapshot, data);
      }
    }
  }

  function editEducation(edId: number){
    if (edId >= 0){
      reset(educationList[edId]);
    }else{
      reset({
        institution: "",
        concentration: "",
        degree_type: "",
        grad_year: ""
      });
    }
    setEducationEditId(edId);
    setOpenModal(true);
  }

  function deleteEducation(edId: number){
    const newList = educationList.map((v) => (v));
    newList.splice(edId, edId);
    console.log(newList);
    setEducationList(newList);
  }

  function closeModal(){
    setOpenModal(false);
  }

	return (
		<div id="wrapper" className="h-screen">
			<Header />
  <div id="content-wrapper" className="flex flex-col">
    <div id="content">
      <div className="container mx-auto sm:px-4 max-w-full mx-auto sm:px-4">
        <h3 className="text-gray-900 m-4 text-4xl">Profile</h3>
        <div className="flex flex-wrap  mb-3">
          <div className="lg:w-1/3 pr-4 pl-4">
            <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 mb-3">
              <div className="flex-auto p-6 text-center shadow">
                <img
                  className="rounded-full mb-3 mt-4"
                  src={bear.src}
                  width={160}
                  height={160}
                />
                <div className="mb-3">
                  <button
                    className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded  no-underline bg-blue-600 text-white hover:bg-blue-600 py-1 px-2 leading-tight text-xs "
                    type="button"
                    style={{ background: "#FF5A5F" }}
                  >
                    Change Photo
                  </button>
                </div>
              </div>
            </div>
            <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 shadow mb-4">
              <div className="py-3 px-6 mb-0 bg-gray-200 border-b-1 border-gray-300 text-gray-900 py-3">
                <h6 className="fw-bold m-0" style={{ color: "#FF5A5F" }}>
                  Resume
                </h6>
              </div>
              <div className="flex-auto p-6">
                <form
                onSubmit={handleSubmitResume(onResumeSubmit)}>
                <div className="flex flex-wrap ">
                    <div className="relative flex-grow max-w-full flex-1 px-4">
                <div className="mb-3">
                  <input type="file" accept="application/pdf" {...registerResume("resume")}/>
                </div>
                <div className="mb-3">
                    <button
                      className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded  no-underline bg-blue-600 text-white hover:bg-blue-600 py-1 px-2 leading-tight text-xs "
                      type="submit"
                      style={{ background: "#FF5A5F" }}
                    >
                      Save Settings
                    </button>
                    </div>
                    </div>
                    </div>
                </form>
              </div>
            </div>
            <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 shadow mb-4">
              <div className="py-3 px-6 mb-0 bg-gray-200 border-b-1 border-gray-300 text-gray-900 py-3">
                <p className="m-0 fw-bold" style={{ color: "#FF5A5F" }}>
                  Affiliations
                </p>
              </div>
              <div className="flex-auto p-6">
                <form
                onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-wrap ">
                    <div className="relative flex-grow max-w-full flex-1 px-4">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="startup">
                          <strong>Startup</strong>
                          <br />
                        </label>
                        <input
                          id="startup"
                          className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                          type="text"
                          placeholder="Select..."
                          {...register("startup")}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="affiliation">
                          <strong>Brown University Affiliation</strong>
                          <br />
                        </label>
                        
                        <div className="block appearance-none w-full mb-1 bg-white text-gray-800 rounded"
                        >
                        <Select options={affiliations} key={"dropdown"}
                        onChange={(opt: any, _: any) => {setAffiliation(opt.value)}}/>
                      </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <button
                      className="inline-block ml-4 align-middle text-center select-none border font-normal whitespace-no-wrap rounded  no-underline bg-blue-600 text-white hover:bg-blue-600 py-1 px-2 leading-tight text-xs "
                      type="submit"
                      style={{ background: "#FF5A5F" }}
                    >
                      Save&nbsp;Settings
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 shadow">
              <div className="py-3 px-6 mb-0 bg-gray-200 border-b-1 border-gray-300 text-gray-900 py-3">
                <p className="m-0 fw-bold" style={{ color: "#FF5A5F" }}>
                  Websites
                </p>
              </div>
              <div className="flex-auto p-6">
                <form
                onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-wrap ">
                    <div className="relative flex-grow max-w-full flex-1 px-4">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="address">
                          <strong>LinkedIn</strong>
                          <br />
                        </label>
                        <input
                          id="linkedin"
                          className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                          type="url"
                          placeholder="LinkedIn"
                          {...register("linkedin")}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="address">
                          <strong>Company Website</strong>
                          <br />
                        </label>
                        <input
                          id="company_website"
                          className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                          type="url"
                          placeholder="Company Website"
                          {...register("company_website")}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="address">
                          <strong>Other Websites</strong>
                          <br />
                        </label>
                        <input
                          id="other_website"
                          className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                          type="url"
                          placeholder="Other (Github, Portfolio, etc.)"
                          {...register("other_website")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <button
                      className="inline-block ml-4 align-middle text-center select-none border font-normal whitespace-no-wrap rounded  no-underline bg-blue-600 text-white hover:bg-blue-600 py-1 px-2 leading-tight text-xs "
                      type="submit"
                      style={{ background: "#FF5A5F" }}
                    >
                      Save&nbsp;Settings
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="lg:w-2/3 pr-4 pl-4">
            <div className="flex flex-wrap ">
              <div className="relative flex-grow max-w-full flex-1 px-4">
                <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 shadow mb-3">
                  <div className="py-3 px-6 mb-0 bg-gray-200 border-b-1 border-gray-300 text-gray-900 py-3">
                    <p className="m-0 fw-bold" style={{ color: "#FF5A5F" }}>
                      User Settings
                    </p>
                  </div>
                  <div className="flex-auto p-6">
                    <form
                    onSubmit={handleSubmit(onSubmit)}>
                      <div className="flex flex-wrap ">
                        <div className="relative flex-grow max-w-full flex-1 px-4">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="first_name">
                              <strong>First Name</strong>
                            </label>
                            <input
                              id="first_name"
                              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                              type="text"
                              placeholder="John"
                              {...register("first_name")}
                            />
                          </div>
                        </div>
                        <div className="relative flex-grow max-w-full flex-1 px-4">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="last_name">
                              <strong>Last Name</strong>
                            </label>
                            <input
                              id="last_name"
                              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                              type="text"
                              placeholder="Doe"
                              {...register("last_name")}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap ">
                        <div className="relative flex-grow max-w-full flex-1 px-4">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="email">
                              <strong>Email</strong>
                            </label>
                            <input
                              id="email"
                              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                              type="text"
                              placeholder="abc@brown.edu"
                              {...register("email")}
                            />
                          </div>
                        </div>
                        <div className="relative flex-grow max-w-full flex-1 px-4">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="residence">
                              <strong>Place of Residence</strong>
                              <br />
                            </label>
                            <input
                              id="residence"
                              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                              type="text"
                              placeholder="Providence"
                              {...register("residence")}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <button
                          className="inline-block ml-4 align-middle text-center select-none border font-normal whitespace-no-wrap rounded  no-underline bg-blue-600 text-white hover:bg-blue-600 py-1 px-2 leading-tight text-xs "
                          type="submit"
                          style={{ background: "#FF5A5F" }}
                        >
                          Save Settings
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 shadow mb-3">
                  <div className="py-3 px-6 mb-0 bg-gray-200 border-b-1 border-gray-300 text-gray-900 py-3">
                    <p className="m-0 fw-bold" style={{ color: "#FF5A5F" }}>
                      Discovery Settings
                    </p>
                  </div>
                  <div className="flex-auto p-6">
                    <form
                    onSubmit={handleSubmit(onSubmit)}>
                      <div className="flex flex-wrap ">
                        <div className="relative flex-grow max-w-full flex-1 px-4">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="role">
                              <strong>My Role</strong>
                              <br />
                            </label>
                            <div className="block appearance-none w-full mb-1 bg-white text-gray-800 rounded"
                              >
                              <Select options={roles} key={"dropdown"}
                              onChange={(opt: any, _: any) => {setMyRole(opt.value)}}/>
                            </div>
                          </div>
                        </div>
                        <div className="relative flex-grow max-w-full flex-1 px-4">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="industry">
                              <strong>Current Industry</strong>
                            </label>
                            <div className="block appearance-none w-full mb-1 bg-white text-gray-800 rounded"
                              >
                              <Select options={industryList} key={"dropdown"}
                              onChange={(opt: any, _: any) => {setIndustry(opt.value)}}/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap ">
                        <div className="relative flex-grow max-w-full flex-1 px-4">
                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="expertise_find"
                            >
                              <strong>Expertise I'm searching for...</strong>
                              <br />
                            </label>
                            <div className="block appearance-none w-full mb-1 bg-white text-gray-800 rounded"
                              >
                              <Select options={industryList} isMulti key={"dropdown"}
                              onChange={(value: any, _: any) => {setExpertiseFind(value.map((item: any) => {return item.value}))}}/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap ">
                        <div className="relative flex-grow max-w-full flex-1 px-4">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="role_find">
                              <strong>Roles I'm looking for...</strong>
                            </label>
                            <div className="block appearance-none w-full mb-1 bg-white text-gray-800 rounded"
                              >
                              <Select options={roles} isMulti key={"dropdown"}
                              onChange={(value: any, _: any) => {setRoleFind(value.map((item: any) => {return item.value}))}}/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <button
                          className="inline-block ml-4 align-middle text-center select-none border font-normal whitespace-no-wrap rounded  no-underline bg-blue-600 text-white hover:bg-blue-600 py-1 px-2 leading-tight text-xs "
                          type="submit"
                          style={{ background: "#FF5A5F" }}
                        >
                          Save Settings
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 shadow mb-5">
              <div className="py-3 px-6 mb-0 bg-gray-200 border-b-1 border-gray-300 text-gray-900 py-3">
                <p className="m-0 fw-bold" style={{ color: "#FF5A5F" }}>
                  Job Experience
                </p>
              </div>
              <div className="flex-auto p-6">
                <form
                onSubmit={handleSubmit(onSubmit)}>
                  <textarea
                  className="w-full h-64 border"
                  {...register("experience")}
                    rows={12}
                    defaultValue={""}
                  />
                  <div className="mb-3">
                    <button
                      className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded  no-underline bg-blue-600 text-white hover:bg-blue-600 py-1 px-2 leading-tight text-xs "
                      type="submit"
                      style={{ background: "#FF5A5F" }}
                    >
                      Save Settings
                    </button>
                  </div>
                  </form>
              </div>
            </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 shadow m-4 mr-8">
          <div className="py-3 px-6 mb-0 bg-gray-200 border-b-1 border-gray-300 text-gray-900 overflow-x-hidden overflow-y-hidden rounded-t">
            <p className="m-0 fw-bold" style={{ color: "#FF5A5F" }}>
              Education
            </p>
          </div>
          <div className="flex-auto p-6">
            <div className="flex flex-wrap ">
              <div className="relative flex-grow max-w-full flex-1 px-4">
                {educationList.map((item, index) => {
                  return (
                    <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 mb-3">
                  <div
                    style={{
                      position: "static",
                      borderStyle: "none",
                      padding: 4
                    }}
                  >
                    <button
                      className="absolute right-20 bg-transparent border-none text-[#858796] hover:text-gray-400"
                      type="button"
                      onClick={() => {editEducation(index);}}
                    >
                      Edit
                    </button>
                    <button
                      className="absolute right-4 bg-transparent border-none text-[#858796] hover:text-gray-400"
                      type="button"
                      onClick={() => {deleteEducation(index);}}
                    >
                      Delete
                    </button>
                  </div>
                  <div className="flex-auto p-6">
                    <h4 className="mb-3 text-xl text-slate-600">{item["institution"]}</h4>
                    <h6 className="text-slate-600 -mt-2 mb-0 mb-2">
                      {item["concentration"]}, {item["degree_type"]}, Class of {item["grad_year"]}
                    </h6>
                  </div>
                </div>
                  )
                })
                }
              </div>
            </div>
          </div>
          <div className="mb-0 bg-[#FF5A5F] border-b-1 border-gray-300 text-gray-900 overflow-x-hidden overflow-y-hidden rounded-b">
              <button className="bg-[#FF5A5F] border-gray-300 whitespace-no-wrap rounded py-1 px-3 no-underline text-white w-full"
              onClick={() => {editEducation(-1)}}
              type="button">
                     Add Education
             </button>
           </div>
        </div>
      </div>
    </div>

          {/* MODAL START */}

          <Transition.Root show={openEdModal} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
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
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none h-full"
          >
            <Dialog.Panel className="relative min-w-0 break-words w-10/12 my-6 mx-auto border-1 border-gray-300 rounded-lg overflow-hidden flex shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="py-6 px-12 mb-0 bg-gray-200 border-b-1 border-gray-300 text-gray-900 py-3">
                    <p className="m-0 fw-bold text-3xl" style={{ color: "#FF5A5F" }}>
                      Add Education
                    </p>
                  </div>
                  <div className="flex-auto p-6">
                    <form
                    onSubmit={handleAddEducation(addEducation)}>
                        <div className="relative flex-grow max-w-full flex-1 px-4">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="institution">
                              <strong>Institution</strong>
                            </label>
                            <input
                              id="institution"
                              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                              type="text"
                              placeholder="Brown University"
                              {...registerEducation("institution", {required: true})}
                            />
                          </div>
                        </div>
                      <div className="flex flex-wrap ">
                      <div className="relative flex-grow max-w-full flex-1 px-4">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="concentration">
                              <strong>Concentration</strong>
                            </label>
                            <input
                              id="concentration"
                              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                              type="text"
                              placeholder="Computer Science"
                              {...registerEducation("concentration", {required: true})}
                            />
                          </div>
                        </div>
                        <div className="relative flex-grow max-w-full flex-1 px-4">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="degree_type">
                              <strong>Degree Type</strong>
                            </label>
                            {/* <input
                              id="degree_type"
                              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                              type="text"
                              placeholder="BS"
                              
                            /> */}
                            <select id="degree_type"
                            placeholder="Degree Type"
                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                            {...registerEducation("degree_type", {required: true})}>
                              <option value="" disabled selected>Select degree type</option>
                              {/* Here is where I got the degree types: https://support.joinhandshake.com/hc/en-us/articles/360033919914-Segments-Class-Of-Degree-Types */}
                              {degreeTypes.map((item) => (
                                <option value={item.label}>{item.label}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="relative flex-grow max-w-full flex-1 px-4">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="grad_year">
                              <strong>Graduation Year</strong>
                              <br />
                            </label>
                            <input
                              id="grad_year"
                              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                              type="number"
                              placeholder="2022"
                              {...registerEducation("grad_year", {required: true})}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="text-gray-400 ml-4 mb-3">* please fill in all fields</div>
                      <div className="mb-3">
                        <button
                          className="inline-block ml-4 align-middle text-center select-none border font-normal whitespace-no-wrap rounded  no-underline bg-blue-600 text-white hover:bg-blue-600 py-1 px-2 leading-tight text-xs "
                          type="submit"
                          style={{ background: "#FF5A5F" }}
                        >
                          {(educationEditId === -1) ? "Add": "Save"}
                        </button>
                      </div>
                    </form>
                  </div>
              </Dialog.Panel>
          </div>
          </Transition.Child>
            </Dialog>
          </Transition.Root>

          {/* MODAL END */}
    <footer className="bg-white sticky-footer">
      <div className="container mx-auto sm:px-4 my-auto">
        <div className="text-center my-auto copyright">
          <span>Copyright © BV 2022</span>
        </div>
      </div>
    </footer>
  </div>
  <a className="border rounded inline scroll-to-top" href="#page-top">
    <i className="fas fa-angle-up" />
  </a>
</div>

	)
}