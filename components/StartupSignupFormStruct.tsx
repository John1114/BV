import { useState } from "react";

export interface FormQuestion {
  pageId: number;
  question: string;
  triggerFunction: any;
  requiredNames: string[];
  questionFormat: any;
  pageFunction: any;
  lastPage: boolean;
}

export default function StartupFormStruct({
  pageId,
  question,
  requiredNames,
  triggerFunction,
  questionFormat,
  pageFunction,
  lastPage,
}: FormQuestion) {
  // const { trigger } = useForm();
  const [valState, setValState] = useState<boolean>(true);
  const onNextPage = async function () {
    const val = await triggerFunction(requiredNames);
    setValState(val);
    if (val) {
      pageFunction(pageId + 1);
    }
  };
  return (
    <div
      id={pageId.toString()}
      className="relative rounded-lg overflow-y-scroll shadow-lg mx-auto h-5/6 w-4/6 bg-white flex flex-col justify-between"
    >
      <div className="bg-slate-100 sticky">
        <div className="max-w-3xl pl-20 h-24 relative overflow-x-hidden">
          <div className="absolute bottom-0">
            <h1 className="text-3xl md:text-5xl font-bold text-slate-400">
              {question}
            </h1>
          </div>
        </div>
      </div>
      <div className="overflow-y-scroll h-[500px] flex flex-col justify-between">
        {questionFormat}
        <div className="flex flex-row-reverse justify-between bottom-0">
          {pageId != 0 ? (
            <div className="flex pr-5 py-5">
              <button
                type="button"
                onClick={(event) => {
                  if (lastPage) {
                    event.currentTarget.disabled = true;
                  }
                  onNextPage();
                }}
                className="bg-red-500 hover:bg-red-400 text-white font-bold py-6 px-16 rounded"
              >
                {lastPage ? "Submit" : "Next Page"}
              </button>
            </div>
          ) : (
            <div className="flex flex-row-reverse pr-5 mb-5">
              <button
                type="button"
                onClick={(event) => {
                  if (lastPage) {
                    event.currentTarget.disabled = true;
                  }
                  onNextPage();
                }}
                className="bg-red-500 hover:bg-red-400 text-white font-bold py-6 px-16 rounded"
              >
                {lastPage ? "Submit" : "Next Page"}
              </button>
            </div>
          )}
          {valState ? null : (
            <div className="right-60 bottom-6 text-red-600">
              Please fill out all fields before proceeding
            </div>
          )}
          <div className="flex pl-5 h-min pt-5 flex-row">
            {pageId > 0 ? (
              <button
                type="button"
                onClick={(event) => {
                  pageFunction(pageId - 1);
                }}
                className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-6 px-16 rounded previous-page"
              >
                Previous Page
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>

    // <div
    //   id={pageId.toString()}
    //   className="relative rounded-lg overflow-auto shadow-lg mx-auto h-5/6 w-4/6 bg-white"
    // >
    //   <div className="bg-slate-100">
    //     <div className="max-w-3xl pl-20 h-24 relative overflow-x-hidden">
    //       <div className="absolute bottom-0">
    //         <h1 className="text-3xl md:text-5xl font-bold text-slate-400">
    //           {question}
    //         </h1>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="overflow-y-scroll h-[500px]">
    //     {questionFormat}
    //     <div className="flex flex-row-reverse">
    //     {pageId != 0 ? (
    //       <div className="flex flex-row-reverse pr-5 py-6">
    //         <button
    //           type="button"
    //           onClick={(event) => {
    //             if (lastPage) {
    //               event.currentTarget.disabled = true;
    //             }
    //             onNextPage();
    //           }}
    //           className="bg-red-500 hover:bg-red-400 text-white font-bold py-6 px-16 rounded"
    //         >
    //           {lastPage ? "Submit" : "Next Page"}
    //         </button>
    //       </div>
    //     ) : (
    //         <div className="flex flex-row-reverse pr-5">
    //           <button
    //             type="button"
    //             onClick={(event) => {
    //               if (lastPage) {
    //                 event.currentTarget.disabled = true;
    //               }
    //               onNextPage();
    //             }}
    //             className="bg-red-500 hover:bg-red-400 text-white font-bold py-6 px-16 rounded"
    //           >
    //             {lastPage ? "Submit" : "Next Page"}
    //           </button>
    //         </div>
    //     )}
    //     {valState ? null : (
    //       <div className="right-60 bottom-6 text-red-600">
    //         Please fill out all fields before proceeding
    //       </div>
    //     )}
    //     <div className="left-6 bottom-6">
    //       {pageId > 0 ? (
    //         <button
    //           type="button"
    //           onClick={(event) => {
    //             pageFunction(pageId - 1);
    //           }}
    //           className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-6 px-16 rounded"
    //         >
    //           Previous Page
    //         </button>
    //       ) : null}
    //     </div>
    //     </div>
    //   </div>
    // </div>
  );
}
