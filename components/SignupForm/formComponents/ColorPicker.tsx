import React, { Dispatch, SetStateAction } from "react";

export default function ColorPicker({setAccent}: {setAccent: Dispatch<SetStateAction<string>>}) {
  return (
    <div className="h-[100px] my-2 w-full rounded-lg border justify-center flex align-middle items-center">
      <input type="color" className="rounded-lg border w-[50px] h-[50px]" onChange={color => {
        setAccent(color.currentTarget.value)
        }} 
        />
    </div>
  );
}
