import { Header } from "./main_interface";
import bear from '../assets/thanks-bear.png';
import { useForm } from "react-hook-form";
import updateUserProfile, { checkIfRegistered, uploadFileWithRef } from "../util/userProfileUpdateApi";
import { AuthState, useAuth, User, FirebaseAuthContext } from "../util/firebaseFunctions";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DocumentData, QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore";
import { affiliations, industryList, roles, degreeTypes, Option } from "../util/profileOptions";
import Select from "react-select";
import { ref } from "firebase/storage";
import { storage } from "../util/firebaseConfig";
import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import Message from "../components/FlashMessage";

/*
TODO:
- add flash message after saving settings
- discuss API function placements
- add Select... for finding startup
- load in original data for users
- check if image changed before allowing users to upload
- test API with authenticated and unauthenticated user
*/

const formNames = [
  "resumeForm",
  "affiliationForm",
  "websiteForm",
  "userForm",
  "discoveryForm",
  "jobExpForm"
];

export class PictureUploader extends React.Component<{uploadFunction: any, stateUpdateFunction: any},
{picture: any, src: any, uploadFunction: any, stateUpdateFunction: any}> {
  /* Modified after: https://www.pluralsight.com/guides/using-react.js-and-jquery-to-update-a-profile-picture-with-a-preview#module-overallcode */
  constructor(props: any) {
    super(props);

    this.state = {
      picture: false,
      src: false,
      uploadFunction: props.uploadFunction,
      stateUpdateFunction: props.stateUpdateFunction
    }
  }

  handlePictureSelected(event: any) {
    var picture = event.target.files[0];
    if (picture) {
      var src = URL.createObjectURL(picture);

      this.setState({
        picture: picture,
        src: src
      });
      this.state.stateUpdateFunction({
        picture: picture,
        src: src
      })
    }
  }

  renderPreview() {
    if(this.state.src) {
      return (
        <img src={this.state.src}
        className="rounded-full mb-3 mt-4"
          width={160}
          height={160}/>
      );
    } else {
      return (
        <img src={bear.src}
        className="rounded-full mb-3 mt-4"
          width={160}
          height={160}/>
      );
    }
  }

  render() {
    return (
      <div className="flex-auto p-6 text-center shadow">
        {this.renderPreview()}
        <div className="mb-3">
        <button
          className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded  no-underline bg-blue-600 text-white hover:bg-blue-600 py-1 px-2 leading-tight text-xs "
          type="button"
          onClick={() => {
            var picInput = document.getElementById("profilePicture");
            if (picInput !== null){
              picInput.click();
            }
          }}
          style={{ background: "#FF5A5F" }}
        >
          Change Photo
        </button>
          <input
          type="file"
          id="profilePicture"
          accept="image/*"
          onChange={this.handlePictureSelected.bind(this)}
          style={{ display: "none" }}
        />
        </div>
      </div>
    );
  }
}

export default function editProfile() {
  const hookForms = Object.assign({}, ...formNames.map((x: string) =>
  {
    const {register: r, handleSubmit: hs, reset: resetF} = useForm();
    return {[x]: {
      registerFunc: r,
      handleFunc: hs,
      resetFunc: resetF
    }}
  }))

  const { register: registerEducation, handleSubmit: handleAddEducation, reset } = useForm();
  const [brownAffiliation, setAffiliation] = useState<string>("");
  const [affiliationDefaultValue, setAffDefault] = useState<Option | undefined>(undefined);
  const [myRole, setMyRole] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [expertiseFind, setExpertiseFind] = useState<string[]>([]);
  const [roleFind, setRoleFind] = useState<string[]>([]);
  const [openEdModal, setOpenModal] = useState<boolean>(false);
  const [educationList, setEducationList] = useState<any[]>([]);
  const [profilePicState, setProfilePicState] = useState<{picture: any, src: any}>({picture: false, src: false});
  const [flashTimeout, setFlashTimeout] = useState<number>(1500);
  const [flashState, setFlashState] = useState<{
    useFlash: boolean, message: string, backgroundColor: string, textColor: string
  }>({useFlash: false, message: "", backgroundColor: "", textColor: ""});

  const [educationEditId, setEducationEditId] = useState<number>(-1);
  const { user } = useAuth();
  const router = useRouter();

  // {
  //   institution: "Brown University",
  //   concentration: "Computer Science",
  //   degree_type: "Bachelors",
  //   grad_year: 2026
  // }

  useEffect(() => {
    console.log(user);
    if (user !== undefined){
      setAffDefault(findOptionInOpts("Alumni", affiliations, true));
      console.log(affiliationDefaultValue);
      onLoad();
    }
  });

  const onLoad = async () => {
    const snapshot = await checkUserValidity();
    if (snapshot !== null){
      // TODO: get current user info
      const userData = snapshot.data();
      console.log(userData);
    }else{
      console.log("hi");
      router.push({pathname: "/", query: {
        useFlash: true,
        message: "You have not logged in yet",
        backgroundColor: "bg-red-600",
        textColor: "text-[#750404]"}}, "/");
    }
  }

  const setAllDefaults = async () => {
    
  }

  const findOptionInOpts = (label: string, options: Option[], useLabel: boolean = false) => {
    if (useLabel){
      return options.find(opt => opt.label == label);
    }
    return options.find(opt => opt.value == label);
    
  }

  const hideFlash = () => {
    setFlashState({useFlash: false, message: "", backgroundColor: "", textColor: ""});
  }

  const showFlash = (newState: any) => {
    setFlashState(newState);
    window.setTimeout(hideFlash, flashTimeout);
  }

  function removeEmptyFields(data: any) {
    Object.keys(data).forEach(key => {
      if (data[key] === '' || data[key] == null || data[key] == undefined || ((data[key].length? true: false) && (data[key].length == 0))) {
        delete data[key];
      }
    });
    return data;
  }

  function isEmpty(obj: Object) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

  const submitAllForms = async () => {
    let formsToSubmit: number[] = [];
    for (var i = 0; i < document.forms.length; i++){
      if (document.forms[i].id in formNames){
        formsToSubmit.push(i);
      }
    }
    formsToSubmit.forEach(index => {
      document.forms[index].requestSubmit();
    });
    onProfilePicSubmit();
    onManualSubmit({"education": educationList});
  }

  const checkUserValidity = async () => {
    if (user === undefined){
      showFlash({
        useFlash: true,
        message: "You have not logged in with a valid email yet",
        backgroundColor: "bg-red-600",
        textColor: "text-[#750404]"
      });
      return null;
    }
    const userSnapshot: QueryDocumentSnapshot<DocumentData> | null = await checkIfRegistered(user);
    if (userSnapshot === null){
      showFlash({
        useFlash: true,
        message: "You have not logged in with a valid email yet", backgroundColor: "bg-red-600", textColor: "text-[#750404]"
      });
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

  const onProfilePicSubmit = async () => {
    const userSnapshot = await checkUserValidity();
    console.log(userSnapshot);
    if ((userSnapshot !== null) && (profilePicState.picture !== false)){
      console.log("hello");
      var datetime = new Date();
      const imgStorageUri = `images/${userSnapshot.id}-${datetime.getTime().toString()}.jpg`;
      const picRef = ref(storage, imgStorageUri);
      const picResult = await uploadFileWithRef(picRef, profilePicState.picture);
      if (picResult){
        await updateUserProfile(userSnapshot, {profilePicRef: imgStorageUri});
        showFlash({
          useFlash: true,
          message: "Update successful!",
          backgroundColor: "bg-green-300",
          textColor: "text-emerald-800"});
      }
    }
  }

  const onResumeSubmit = async (data: any) => {
    const userSnapshot = await checkUserValidity();
    if (userSnapshot !== null){
      const resume = data["resume"][0];
      if (resume !== undefined){
        var datetime = new Date();
        const pdfStorageUri = `resume/${userSnapshot.id}-${datetime.getTime().toString()}.pdf`;
        const resumeRef = ref(storage, pdfStorageUri);
        const resumeResult = await uploadFileWithRef(resumeRef, resume);
        if (resumeResult){
          await updateUserProfile(userSnapshot, {resumeRef: pdfStorageUri});
          showFlash({
            useFlash: true,
            message: "Update successful!",
            backgroundColor: "bg-green-300",
            textColor: "text-emerald-800"})
        }
      }
    }
  }

  const onAffiliationSubmit = async (data: any) => {
    const userSnapshot = await checkUserValidity();
    if (userSnapshot !== null){
      data["affiliation"] = brownAffiliation;
      const cleanedData = removeEmptyFields(data);
      console.log(cleanedData);

      // check there is data
      if (!isEmpty(cleanedData)){
        // update user with API
        // TODO: Test API
        await updateUserProfile(userSnapshot, data);
        showFlash({
          useFlash: true,
          message: "Update successful!",
          backgroundColor: "bg-green-300",
          textColor: "text-emerald-800"});
      }
    }
  }

  const onDiscoverySubmit = async (data: any) => {
    const userSnapshot = await checkUserValidity();
    if (userSnapshot !== null){
      data["role"] = myRole;
      data["industry"] = industry;
      data["expertise_find"] = expertiseFind;
      data["role_find"] = roleFind;
      const cleanedData = removeEmptyFields(data);
      console.log(cleanedData);

      // check there is data
      if (!isEmpty(cleanedData)){
        // update user with API
        // TODO: Test API
        await updateUserProfile(userSnapshot, data);
        showFlash({
          useFlash: true,
          message: "Update successful!",
          backgroundColor: "bg-green-300",
          textColor: "text-emerald-800"});
      }
    }
  }

  const noSelectSubmit = async (data: any) => {
    const userSnapshot = await checkUserValidity();
    if (userSnapshot !== null){
      const cleanedData = removeEmptyFields(data);
      console.log(cleanedData);

      // check there is data
      if (!isEmpty(cleanedData)){
        await updateUserProfile(userSnapshot, data);
        showFlash({
          useFlash: true,
          message: "Update successful!",
          backgroundColor: "bg-green-300",
          textColor: "text-emerald-800"});
      }
    }
  }

  const onManualSubmit = async (data: any) => {
    const userSnapshot = await checkUserValidity();
    if (userSnapshot !== null){
      console.log(data);

      // check there is data
      if (!isEmpty(data)){
        // update user with API
        // TODO: Test API
        await updateUserProfile(userSnapshot, data);
        showFlash({
          useFlash: true,
          message: "Update successful!",
          backgroundColor: "bg-green-300",
          textColor: "text-emerald-800"});
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
    newList.splice(edId, 1);
    console.log(newList);
    setEducationList(newList);
  }

  function closeModal(){
    setOpenModal(false);
  }

	return (
		<div id="wrapper" className="h-screen">
            {flashState.useFlash &&
            (<Message
              message={flashState.message}
              backgroundColor={flashState.backgroundColor}
              textColor={flashState.textColor}
              duration={1500}/>)}
			<Header />
  <div id="content-wrapper" className="flex flex-col">
    <div id="content">
      <div className="container mx-auto sm:px-4 max-w-full mx-auto sm:px-4">
        <h3 className="text-gray-900 m-4 text-4xl">Profile</h3>
        <div className="flex flex-wrap  mb-3">
          <div className="lg:w-1/3 pr-4 pl-4">
          <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 mb-3">

            <PictureUploader uploadFunction={() => {onProfilePicSubmit()}} stateUpdateFunction={setProfilePicState}/>
            <button
            className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded  no-underline bg-blue-600 text-white hover:bg-blue-600 py-1 px-2 leading-tight text-xs"
            type="button"
            onClick={onProfilePicSubmit}
            style={{ background: "#FF5A5F" }}
          >
            Upload
          </button>
          <button
            className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded  no-underline bg-blue-600 text-white hover:bg-blue-600 py-1 px-2 leading-tight text-xs"
            type="button"
            onClick={() => {console.log(flashState)}}
            style={{ background: "#FF5A5F" }}
          >
            log FlashState (debug)
          </button>
          </div>
            <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 shadow mb-4">
              <div className="py-3 px-6 mb-0 bg-gray-200 border-b-1 border-gray-300 text-gray-900 py-3">
                <h6 className="fw-bold m-0" style={{ color: "#FF5A5F" }}>
                  Resume
                </h6>
              </div>
              <div className="flex-auto p-6">
                <form
                id="resumeForm"
                onSubmit={hookForms["resumeForm"].handleFunc(onResumeSubmit)}>
                <div className="flex flex-wrap ">
                    <div className="relative flex-grow max-w-full flex-1 px-4">
                <div className="mb-3">
                  <input type="file" accept="application/pdf" {...hookForms["resumeForm"].registerFunc("resume")}/>
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
                id="affiliationForm"
                onSubmit={hookForms["affiliationForm"].handleFunc(onAffiliationSubmit)}>
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
                          {...hookForms["affiliationForm"].registerFunc("startup")}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="affiliation">
                          <strong>Brown University Affiliation</strong>
                          <br />
                        </label>
                        
                        <div className="block appearance-none w-full mb-1 bg-white text-gray-800 rounded"
                        >
                        <Select options={affiliations} key={"dropdown"} value={affiliationDefaultValue || 'Select'}
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
                id="websiteForm"
                onSubmit={hookForms["websiteForm"].handleFunc(noSelectSubmit)}>
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
                          {...hookForms["websiteForm"].registerFunc("linkedin")}
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
                          {...hookForms["websiteForm"].registerFunc("company_website")}
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
                          {...hookForms["websiteForm"].registerFunc("other_website")}
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
                    id="userForm"
                    onSubmit={hookForms["userForm"].handleFunc(noSelectSubmit)}>
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
                              {...hookForms["userForm"].registerFunc("first_name")}
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
                              {...hookForms["userForm"].registerFunc("last_name")}
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
                              {...hookForms["userForm"].registerFunc("email")}
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
                              {...hookForms["userForm"].registerFunc("residence")}
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
                    id="discoveryForm"
                    onSubmit={hookForms["discoveryForm"].handleFunc(onDiscoverySubmit)}>
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
                id="jobExpForm"
                onSubmit={hookForms["jobExpForm"].handleFunc(noSelectSubmit)}>
                  <label className="form-label" htmlFor="experience">
                    <strong>Tell us about your job experience(s)</strong>
                  </label>
                  <textarea
                  id="experience"
                  className="w-full h-64 border p-2"
                  {...hookForms["jobExpForm"].registerFunc("experience")}
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
        <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 shadow m-4 mr-8 mb-16">
          <div className="py-3 px-6 mb-0 bg-gray-200 border-b-1 border-gray-300 text-gray-900 overflow-x-hidden overflow-y-hidden rounded-t">
            <p className="m-0 fw-bold" style={{ color: "#FF5A5F" }}>
              Education
            </p>
          </div>
          <div className="flex-auto p-6">
            <div className="flex flex-wrap ">
              <div className="relative flex-grow max-w-full flex-1 px-4">
                {(educationList.length == 0) ?
                  (<div className="text-[#858796]">
                    No education currently
                  </div>)
                :
                
                educationList.map((item, index) => {
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
      <button type="button"
      onClick={submitAllForms}
      className="fixed bg-red-500 hover:bg-red-400 text-white font-bold py-3 px-16 rounded-t bottom-0 w-full">
          Save all changes
      </button>
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
                              placeholder="Ex: ABC University"
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
                              placeholder="Ex: Computer Science"
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
                              placeholder="Ex: 2022"
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
  </div>
</div>

	)
}