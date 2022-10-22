export interface FormQuestion {
	pageId: number;
	question: string;
	questionFormat: any;
	nextPageFunction: any;
  }
  
  export default function StartupFormStruct({
	pageId,
	question,
	questionFormat,
	nextPageFunction
  }: FormQuestion) {
	return (
		<div id={pageId.toString()} className="relative rounded-lg overflow-hidden shadow-lg mx-auto h-5/6 w-5/6 bg-white">

		<div className="bg-slate-100">


			<div className="max-w-3xl pl-20 h-24 relative overflow-x-hidden">
				<div className="absolute bottom-0">
					<h1 className="text-3xl md:text-5xl font-bold text-slate-400">
						{question}
					</h1>
				</div>
			</div>


		</div>
		<div className="max-w-3xl pl-20 mt-6 pb-8">
			<div className="flex justify-start items-center space-x-8 mb-8">
				{questionFormat}
			</div>
		</div>

		<div className="absolute right-0 bottom-0">
		{/* <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-4 px-8 rounded-l">
			Prev
		</button> */}
		<button type="button" onClick={nextPageFunction(pageId + 1)} className="bg-red-500 hover:bg-red-400 text-white font-bold py-6 px-16 rounded">
			Next Page
		</button>
  </div>
		{/* <div className="max-w-3xl relative overflow-x-hidden inline-flex">
		
		</div> */}
	</div>
	);
  }