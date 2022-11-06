import { Header } from "./main_interface";
import bear from '../assets/thanks-bear.png';
import { useForm } from "react-hook-form";
import updateUserProfile from "../util/userProfileUpdateApi";
import { AuthState, useAuth } from "../util/firebaseFunctions";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


/*
TODO:
* ASK IF I CAN MOVE checkIfRegistered FUNCTION to a more accessible API place
- allow change image profile picture
- load in original data for users
- test API with authenticated and unauthenticated user
*/

export default function editProfile() {
  const { register, handleSubmit } = useForm();
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

  const onSubmit = async (data: any) => {
    if (user === undefined){
      router.push("/");
    }else{
      // check if user is registered

      const cleanedData = removeEmptyFields(data);
      console.log(cleanedData);

      // update user with API
      // TODO: Test API
      await updateUserProfile(user.id, data);
  
      //router.push("/");
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
                  Following
                </h6>
              </div>
              <div className="flex-auto p-6" />
            </div>
            <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 shadow mb-4">
              <div className="py-3 px-6 mb-0 bg-gray-200 border-b-1 border-gray-300 text-gray-900 py-3">
                <h6 className="fw-bold m-0" style={{ color: "#FF5A5F" }}>
                  Skills
                </h6>
              </div>
              <div className="flex-auto p-6" />
            </div>
            <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 shadow mb-4">
              <div className="py-3 px-6 mb-0 bg-gray-200 border-b-1 border-gray-300 text-gray-900 py-3">
                <h6 className="fw-bold m-0" style={{ color: "#FF5A5F" }}>
                  Short Bio
                </h6>
              </div>
              <div className="flex-auto p-6">
                <textarea style={{ height: 84 }} defaultValue={""} />
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
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                            <label className="form-label" htmlFor="concentration">
                              <strong>Concentration</strong>
                            </label>
                            <input
                              id="concentration"
                              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                              type="text"
                              placeholder="Computer Science"
                              {...register("concentration")}
                            />
                          </div>
                        </div>
                        <div className="relative flex-grow max-w-full flex-1 px-4">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="class_year">
                              <strong>Class Year</strong>
                            </label>
                            <input
                              id="class_year"
                              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                              type="number"
                              placeholder={"2022"}
                              {...register("class_year")}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap ">
                        <div className="relative flex-grow max-w-full flex-1 px-4">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="industry">
                              <strong>Current Industry</strong>
                            </label>
                            <input
                              id="industry"
                              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                              type="text"
                              placeholder="Software"
                              {...register("industry")}
                            />
                          </div>
                        </div>
                        <div className="relative flex-grow max-w-full flex-1 px-4">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="recent_experience">
                              <strong>Most Recent Experience</strong>
                              <br />
                            </label>
                            <input
                              id="recent_experience"
                              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                              type="text"
                              placeholder="MongoDB"
                              {...register("recent_experience")}
                            />
                          </div>
                        </div>
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
                    </form>
                  </div>
                </div>
                <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 shadow">
                  <div className="py-3 px-6 mb-0 bg-gray-200 border-b-1 border-gray-300 text-gray-900 py-3">
                    <p className="m-0 fw-bold" style={{ color: "#FF5A5F" }}>
                      Resume &amp; Website
                    </p>
                  </div>
                  <div className="flex-auto p-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="resume">
                          <strong>Resume Link</strong>
                          <br />
                        </label>
                        <input
                          id="resume"
                          className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                          type="url"
                          placeholder="https://drive.google.com"
                          {...register("resume")}
                        />
                      </div>
					            <div className="mb-3">
                        <label className="form-label" htmlFor="website">
                          <strong>Personal Website (LinkedIn, GitHub, Portfolio)</strong>
                          <br />
                        </label>
                        <input
                          id="website"
                          className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                          type="url"
                          placeholder="https://example.com"
                          {...register("website")}
                        />
                      </div>
                      <div className="mb-3">
                        <button
                          className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded  no-underline bg-blue-600 text-white hover:bg-blue-600 py-1 px-2 leading-tight text-xs "
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
            </div>
          </div>
        </div>
        <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 shadow m-4">
          <div className="py-3 px-6 mb-0 bg-gray-200 border-b-1 border-gray-300 text-gray-900 overflow-x-hidden overflow-y-hidden rounded-t">
            <p className="m-0 fw-bold" style={{ color: "#FF5A5F" }}>
              Experience
            </p>
          </div>
          <div className="flex-auto p-6">
            <div className="flex flex-wrap ">
              <div className="relative flex-grow max-w-full flex-1 px-4">
                <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 m-4">
                  <div className="flex-auto p-6">
                    <h4 className="mb-3">Experience a b c</h4>
                    <h6 className="text-gray-700 -mt-2 mb-0 mb-2">Job Title</h6>
                    <h6 className="text-gray-700 -mt-2 mb-0 mb-2">
                      time range
                    </h6>
                    <p className="mb-0">
                      Nullam id dolor id nibh ultricies vehicula ut id elit.
                      Cras justo odio, dapibus ac facilisis in, egestas eget
                      quam. Donec id elit non mi porta gravida at eget metus.
                    </p>
                  </div>
                </div>
                <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 m-4">
                  <div className="flex-auto p-6">
                    <h4 className="mb-3">Experience a b c</h4>
                    <h6 className="text-gray-700 -mt-2 mb-0 mb-2">Job Title</h6>
                    <h6 className="text-gray-700 -mt-2 mb-0 mb-2">
                      time range
                    </h6>
                    <p className="mb-0">
                      Nullam id dolor id nibh ultricies vehicula ut id elit.
                      Cras justo odio, dapibus ac facilisis in, egestas eget
                      quam. Donec id elit non mi porta gravida at eget metus.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="flex flex-wrap mt-4">
              <div className="relative flex-grow">
                  
              </div>
            </div> */}
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