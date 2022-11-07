import { Header } from "./main_interface";
import bear from '../assets/thanks-bear.png';
import { useForm } from "react-hook-form";
import updateUserProfile, { checkIfRegistered } from "../util/userProfileUpdateApi";
import { AuthState, useAuth } from "../util/firebaseFunctions";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DocumentData, QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore";


/*
TODO:
* ASK IF I CAN MOVE checkIfRegistered FUNCTION to a more accessible API place
- allow change image profile picture
- load in original data for users
- test API with authenticated and unauthenticated user
*/

export default function editProfile() {
  const { register, handleSubmit } = useForm();
  const { register: registerResume, handleSubmit: handleSubmitResume } = useForm();
  const router = useRouter();
  const { user } = useAuth();

  function removeEmptyFields(data: any) {
    Object.keys(data).forEach(key => {
      if (data[key] === '' || data[key] == null) {
        delete data[key];
      }
    });
    return data;
  }

  const submitAllForms = async () => {
    // Maybe TODO
  }

  const onResumeSubmit = async (data: any) => {
    // TODO
    console.log(data);
  }

  const onSubmit = async (data: any) => {
    if (user === undefined){
      router.push("/");
    }else{
      
      // check if user is registered
      const userSnapshot: QueryDocumentSnapshot<DocumentData> | null = await checkIfRegistered(user);

      if (userSnapshot === null){
        // TODO: link path to register page
        router.push("/")
      }else{
        const cleanedData = removeEmptyFields(data);
        console.log(cleanedData);
  
        // update user with API
        // TODO: Test API
        await updateUserProfile(userSnapshot, data);
      }
    }
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
                  <input type="file" {...registerResume("resume")}/>
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
                        <input
                          id="affiliation"
                          className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                          type="text"
                          placeholder="Select..."
                          {...register("affiliation")}
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
                            <input
                              id="role"
                              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                              type="text"
                              placeholder="Select..."
                              {...register("role")}
                            />
                          </div>
                        </div>
                        <div className="relative flex-grow max-w-full flex-1 px-4">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="industry">
                              <strong>Current Industry</strong>
                            </label>
                            <input
                              id="industry"
                              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                              type="text"
                              placeholder="Select..."
                              {...register("industry")}
                            />
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
                            <input
                              id="expertise_find"
                              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                              type="text"
                              placeholder="Select..."
                              {...register("expertise_find")}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap ">
                        <div className="relative flex-grow max-w-full flex-1 px-4">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="role_find">
                              <strong>Roles I'm looking for...</strong>
                            </label>
                            <input
                              id="role_find"
                              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                              type="text"
                              placeholder="Select..."
                              {...register("role_find")}
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
                <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300">
                  <div
                    style={{
                      position: "static",
                      borderStyle: "none",
                      padding: 4
                    }}
                  >
                    <button
                      className="absolute right-4"
                      type="button"
                      style={{
                        background: "transparent",
                        color: "rgb(133, 135, 150)",
                        borderStyle: "none"
                      }}
                    >
                      Edit
                    </button>
                  </div>
                  <div className="flex-auto p-6">
                    <h4 className="mb-3 text-xl text-slate-600">Brown University</h4>
                    <h6 className="text-slate-600 -mt-2 mb-0 mb-2">
                      Computer Science, BS, Class of 2026
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-0 bg-[#FF5A5F] border-b-1 border-gray-300 text-gray-900 overflow-x-hidden overflow-y-hidden rounded-b">
              <button className="bg-[#FF5A5F] border-gray-300 whitespace-no-wrap rounded py-1 px-3 no-underline text-white w-full"
              type="button">
                     Add Experience
             </button>
           </div>
        </div>
      </div>
    </div>
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