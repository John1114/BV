import React from "react";


const MinimizableElement = ({child, name, backgroundColor, extraClasses, extraButtonToggleClasses}: { child: JSX.Element, name: string, backgroundColor: string, extraClasses?: string, extraButtonToggleClasses?: string}) => {
	if (typeof(extraClasses) == 'undefined') {
		extraClasses = "";
	}
	if (typeof(extraButtonToggleClasses) == 'undefined') {
		extraButtonToggleClasses = "";
	}
    return (
		<div>
		{/* Modeled after this: https://tailwindcss.com/docs/hover-focus-and-other-states#open-closed-state
		However, used the peer to toggle CSS logic of object appearance.
		Reason for this method is to save number of loading times with React useState */}
	  <details className={`lg:hidden peer flex items-center justify-between p-3 text-white border-2 border-gray-200 rounded-lg mb-4 ${extraButtonToggleClasses}`}
	  style={{
		backgroundColor: backgroundColor
	  }}>                           
		<summary className="w-full text-lg font-semibold">
			{name}
		</summary>
	</details>
	  <div className={`
	  hidden peer-open:flex peer-open:transition-none peer-open:opacity-100 peer-open:visible
	  lg:flex lg:transition-none lg:opacity-100 lg:visible ${extraClasses}
	  `}>
		{child}
	  </div>
	  </div>
    );
};

export default MinimizableElement;