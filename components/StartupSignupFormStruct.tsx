export interface FormQuestion {
	pageId: number;
	question: string;
	questionFormat: any;
	pageFunction: any;
  }
  
  export default function StartupFormStruct({
	pageId,
	question,
	questionFormat,
	pageFunction,
  }: FormQuestion) {
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
			<button type="button" onClick={() => (pageFunction(pageId + 1))} className="bg-red-500 hover:bg-red-400 text-white font-bold py-6 px-16 rounded">
				Next Page
			</button>
		</div>
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