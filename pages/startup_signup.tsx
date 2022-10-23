import { EnergySavingsLeaf } from "@mui/icons-material";
import { useState } from "react";
import StartupFormStruct, { FormQuestion } from "../components/StartupSignupFormStruct"

const questionPages: FormQuestion[] = [];


questionPages.push(
  {"pageId": 0, "question": "What is your company's name?", "pageFunction": null,
"questionFormat": (
  	<div className="max-w-full pl-20 pr-20 mt-6 pt-20 justify-center items-center">
      <input required className="shadow appearance-none border rounded w-full h-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-4xl text-center" id="companyName" type="text" placeholder="Company Name" />
		</div>
)},
{"pageId": 1, "question": "Tell us about your startup", "pageFunction": null,
"questionFormat": (
  	<div className="max-w-full pl-20 pr-20 mt-6 pt-10 justify-center items-center">
      <div className="flex-col w-full">
      <div className="flex justify-center items-center p-4">
      <div className = "flex-col w-1/3 justify-center">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Year Founded
        </label>
        <input required className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" id="yearFounded" type="text" placeholder="Year Founded" />
      </div>
      <div className = "flex-col w-1/3 justify-center">
      <div className="">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Founder(s)
        </label>
        <input required className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" id="founders" type="text" placeholder="Founder(s)" />
        </div>
      </div>
      <div className = "flex-col w-1/3 justify-center">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Industry
        </label>
        <input required className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" id="yearFounded" type="text" placeholder="Select" />
      </div>
      </div>
      <div className="flex justify-center p-4">
      <div className = "flex-col w-full">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Description
      </label>
      <input required className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" id="description" type="text" placeholder="Description" />
      </div>
      </div>
      </div>
		</div>
)},
{"pageId": 2, "question": "Where can we find you?", "pageFunction": null,
"questionFormat": (
  	<div className="max-w-full pl-20 pr-20 mt-6 pt-20 justify-center items-center columns-2">
       <div className="flex-col">
       <label className="block text-gray-700 text-sm font-bold mb-2">
        Email
      </label>
       <input required className="shadow appearance-none border rounded w-full h-16 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-2xl" id="email" type="text" placeholder="Email" />
       
       </div>
       <div className="flex-col">
       <label className="block text-gray-700 text-sm font-bold mb-2">
        Website
      </label>
       <input required className="shadow appearance-none border rounded w-full h-16 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-2xl" id="website" type="text" placeholder="Website" />
       </div>
		</div>
)},
);

// const questionPages: FormQuestion[] = [
//   {
//     pageId: "0",

//   }
// ]

//TODO: nextPage function for last page should be different

export default function StartupSignup() {

    // TODO: Add React useState for current pageId
    const [pageNumber, setPage] = useState<number>(0);

    console.log(pageNumber);

    const toPage = async function(num: number){
      if (num > questionPages[questionPages.length - 1].pageId){
        // TODO: Submit form
      }else if (num >= 0){
        setPage(num)
      }
    }

    return (<div className="bg-form_background bg-[length:531px_631px] bg-no-repeat h-screen pt-40">
      {questionPages.map((page: FormQuestion) => (
        <div key={page.pageId.toString()} hidden={page.pageId != pageNumber} className="h-full">
          <StartupFormStruct pageId={page.pageId} question={page.question} pageFunction={toPage} questionFormat={page.questionFormat}/>
        </div>
        // TODO: Pass setState for page and hidden based on current pageId
      ))}
    </div>)
}