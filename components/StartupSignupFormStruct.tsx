import { useState } from "react";

export interface FormQuestion {
	pageId: number;
	question: string;
	triggerFunction: any;
	requiredNames: string[];
	questionFormat: any;
	pageFunction: any;
  }
  
  export default function StartupFormStruct({
	pageId,
	question,
	requiredNames,
	triggerFunction,
	questionFormat,
	pageFunction,
  }: FormQuestion) {
	// const { trigger } = useForm();
	const [valState, setValState] = useState<boolean>(true);
	const onNextPage = async function(){
		const val = await triggerFunction(requiredNames);
		setValState(val);
		if (val){
			pageFunction(pageId + 1)
		}
	}
	return (
		<div id={pageId.toString()} className="relative rounded-lg overflow-hidden shadow-lg mx-auto h-5/6 w-4/6 bg-white">

		<div className="bg-slate-100">
			<div className="max-w-3xl pl-20 h-24 relative overflow-x-hidden">
				<div className="absolute bottom-0">
					<h1 className="text-3xl md:text-5xl font-bold text-slate-400">
						{question}
					</h1>
				</div>
			</div>


		</div>
		{questionFormat}

		<div className="absolute right-6 bottom-6">
			<button type="button" onClick={onNextPage} className="bg-red-500 hover:bg-red-400 text-white font-bold py-6 px-16 rounded">
				Next Page
			</button>
		</div>
		{valState? null:
		<div className="absolute right-60 bottom-6 text-red-600">
			Please fill out all fields before proceeding
		</div>}
		
		<div className="absolute left-6 bottom-6">
		{ (pageId > 0) ?
			(<button type="button" onClick={() => (pageFunction(pageId - 1))} className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-6 px-16 rounded">
				Previous Page
			</button>) : null
		}
		</div>
	</div>
	);
  }