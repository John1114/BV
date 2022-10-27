import { useRouter } from "next/router";
import { useState } from "react";
import { Dropzone } from "../components/Dropzone";
import StartupFormStruct, { FormQuestion } from "../components/StartupSignupFormStruct"
import addStartupFromForm from "../src/startupSignupApi";

const questionPages: FormQuestion[] = [];


questionPages.push(
  {"pageId": 0, "question": "What is your company's name?", "pageFunction": null,
"questionFormat": (
  	<div className="max-w-full pl-20 pr-20 mt-6 pt-20 justify-center items-center">
      <input required className="shadow appearance-none border rounded w-full h-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-4xl text-center" id="companyName" name="companyName" type="text" placeholder="Company Name"/>
		</div>
)},
{"pageId": 1, "question": "Tell us about your startup", "pageFunction": null,
"questionFormat": (
  	<div className="max-w-full pl-20 pr-20 mt-6 pt-10 justify-center items-center">
      <div className="flex-col w-full">
      <div className="flex justify-center items-center p-4">
      <div className = "flex-col w-1/3 justify-center">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="yearFounded">
          Year Founded
        </label>
        <input required className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" id="yearFounded" name="yearFounded" type="number" placeholder="Year Founded" defaultValue={2022}/>
      </div>
      <div className = "flex-col w-1/3 justify-center">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="founders">
          Founder(s)
        </label>
        <input required className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" id="founders" name="founders" type="text" placeholder="Founder(s)" />
      </div>
      <div className = "flex-col w-1/3 justify-center">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="industry">
          Industry
        </label>
        <input required className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" id="industry" name="industry" type="text" placeholder="Select" />
      </div>
      </div>
      <div className="flex justify-center p-4">
      <div className = "flex-col w-full">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
        Description
      </label>
      <input required className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" id="description" name="description" type="text" placeholder="Description" />
      </div>
      </div>
      </div>
		</div>
)},
{"pageId": 2, "question": "Where can we find you?", "pageFunction": null,
"questionFormat": (
  	<div className="max-w-full pl-20 pr-20 mt-6 pt-20 justify-center items-center columns-2">
       <div className="flex-col">
       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
        Email
      </label>
       <input required className="shadow appearance-none border rounded w-full h-16 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-2xl" id="email" name="email" type="text" placeholder="Email" />
       
       </div>
       <div className="flex-col">
       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="website">
        Website
      </label>
       <input required className="shadow appearance-none border rounded w-full h-16 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-2xl" id="website" name="website" type="text" placeholder="Website" />
       </div>
		</div>
)}, 
{"pageId": 3, "question": "How do you want to look?", "pageFunction": null, "questionFormat": (<div>
  <Dropzone />
</div>)}
);

interface FormInterface {
  [key: string]: string
}

//TODO: nextPage function for last page should be different

export default function StartupSignup() {

    const router = useRouter();

    // TODO: Add React useState for current pageId
    const [pageNumber, setPage] = useState<number>(0);

    const toPage = async function(num: number){
      if (num > questionPages[questionPages.length - 1].pageId){
        document.forms[0].requestSubmit()
      }else if (num >= 0){
        setPage(num)
      }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      let formData = new FormData(event.currentTarget)
      let formObj: FormInterface = {}
      for (let [key, value] of Array.from(formData.entries())) {
        formObj[key] = value.toString()
      }
      //TODO: Add userId as part of form data to be uploaded

      //TODO: test API
      const res = await addStartupFromForm(formObj);

      //TODO: perhaps display results to user?
      console.log(res);
      //TODO: route user to index page?
      router.push("/");
   };

    return (
      <form id="startup_form" onSubmit={handleSubmit} method="post" className="bg-form_background bg-[length:531px_631px] bg-no-repeat h-screen pt-40">
      {questionPages.map((page: FormQuestion) => (
        <div key={page.pageId.toString()} hidden={page.pageId != pageNumber} className="h-full">
          <StartupFormStruct pageId={page.pageId} question={page.question} pageFunction={toPage} questionFormat={page.questionFormat}/>
        </div>
      ))}
      </form>)
}