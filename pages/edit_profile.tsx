import { Header } from "./main_interface";
import bear from '../assets/thanks-bear.png';


export default function editProfile() {

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
            <div className="flex flex-wrap  mb-3 hidden">
              <div className="relative flex-grow max-w-full flex-1 px-4">
                <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 text-white bg-blue-600 shadow">
                  <div className="flex-auto p-6">
                    <div className="flex flex-wrap  mb-2">
                      <div className="relative flex-grow max-w-full flex-1 px-4">
                        <p className="m-0">Peformance</p>
                        <p className="m-0">
                          <strong>65.2%</strong>
                        </p>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-rocket fa-2x" />
                      </div>
                    </div>
                    <p className="text-white-50 text-xs m-0">
                      <i className="fas fa-arrow-up" />
                      &nbsp;5% since last month
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative flex-grow max-w-full flex-1 px-4">
                <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 text-white bg-green-500 shadow">
                  <div className="flex-auto p-6">
                    <div className="flex flex-wrap  mb-2">
                      <div className="relative flex-grow max-w-full flex-1 px-4">
                        <p className="m-0">Peformance</p>
                        <p className="m-0">
                          <strong>65.2%</strong>
                        </p>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-rocket fa-2x" />
                      </div>
                    </div>
                    <p className="text-white-50 text-xs m-0">
                      <i className="fas fa-arrow-up" />
                      &nbsp;5% since last month
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap ">
              <div className="relative flex-grow max-w-full flex-1 px-4">
                <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 shadow mb-3">
                  <div className="py-3 px-6 mb-0 bg-gray-200 border-b-1 border-gray-300 text-gray-900 py-3">
                    <p className="m-0 fw-bold" style={{ color: "#FF5A5F" }}>
                      User Settings
                    </p>
                  </div>
                  <div className="flex-auto p-6">
                    <form>
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
                              name="first_name"
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
                              name="last_name"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap ">
                        <div className="relative flex-grow max-w-full flex-1 px-4">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="username">
                              <strong>Concentration</strong>
                            </label>
                            <input
                              id="username"
                              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                              type="text"
                              placeholder="Computer Science"
                              name="concentration"
                            />
                          </div>
                        </div>
                        <div className="relative flex-grow max-w-full flex-1 px-4">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="email">
                              <strong>Class Year</strong>
                            </label>
                            <input
                              id="class_year"
                              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                              type="number"
                              placeholder={"2022"}
                              name="class_year"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap ">
                        <div className="relative flex-grow max-w-full flex-1 px-4">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="first_name">
                              <strong>Current Industry</strong>
                            </label>
                            <input
                              id="first_name-1"
                              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                              type="text"
                              placeholder="Software"
                              name="industry"
                            />
                          </div>
                        </div>
                        <div className="relative flex-grow max-w-full flex-1 px-4">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="last_name">
                              <strong>Most Recent Experience</strong>
                              <br />
                            </label>
                            <input
                              id="last_name-1"
                              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                              type="text"
                              placeholder="MongoDB"
                              name="recent_experience"
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
                    <form>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="address">
                          <strong>Resume Link</strong>
                          <br />
                        </label>
                        <input
                          id="resume"
                          className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                          type="url"
                          placeholder="https://drive.google.com"
                          name="resume"
                        />
                      </div>
					  <div className="mb-3">
                        <label className="form-label" htmlFor="address">
                          <strong>Personal Website (LinkedIn, GitHub, Portfolio)</strong>
                          <br />
                        </label>
                        <input
                          id="website"
						  className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
						  type="url"
						  placeholder="https://example.com"
						  name="website"
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
          <div className="py-3 px-6 mb-0 bg-gray-200 border-b-1 border-gray-300 text-gray-900 py-3">
            <p className="m-0 fw-bold" style={{ color: "#FF5A5F" }}>
              Experience
            </p>
          </div>
          <div className="flex-auto p-6">
            <div className="flex flex-wrap ">
              <div className="relative flex-grow max-w-full flex-1 px-4">
                <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300">
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
            <div className="flex flex-wrap " style={{ margin: 12 }}>
              <div className="relative flex-grow max-w-full flex-1 px-4 flex-fill">
                <div className="flex">
                  <button
                    className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600 flex-fill"
                    type="button"
                    style={{ background: "#FF5A5F" }}
                  >
                    Button
                  </button>
                </div>
              </div>
            </div>
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