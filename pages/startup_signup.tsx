import { useState } from "react";
import StartupFormStruct, { FormQuestion } from "../components/StartupSignupFormStruct"

const questionPages: FormQuestion[] = [];

// const questionPages: FormQuestion[] = [
//   {
//     pageId: "0",

//   }
// ]

//TODO: nextPage function for last page should be different

export default function StartupSignup() {

    // TODO: Add React useState for current pageId
    const [pageNumber, setPage] = useState<number>(0);


    return <div className="bg-form_background bg-[length:531px_631px] bg-no-repeat h-screen pt-40">
      {questionPages.map((page: FormQuestion) => (

        // TODO: Pass setState for page and hidden based on current pageId
        <StartupFormStruct pageId={1} question="Tell us about your startup" nextPageFunction={setPage} questionFormat={<>some text <strong>bold text</strong> and more.</>}/>
      ))}
    </div>
}