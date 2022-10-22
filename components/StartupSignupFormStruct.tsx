export interface FormQuestion {
	pageId: string;
	question: string;
	questionFormat: any;
  }
  
  export default function StartupFormStruct({
	pageId,
	question,
	questionFormat
  }: FormQuestion) {
	return (
		<div id={pageId} className="rounded-lg overflow-hidden shadow-lg mx-auto h-5/6 w-5/6 bg-white">

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
	</div>
	);
  }