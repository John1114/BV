import React from "react";
import { Founders } from "./Founders";
import StyledInput from "./StyledInput";
import { FieldValues, UseFormRegister } from "react-hook-form";

export interface FormItem {
  name: string;
  element: JSX.Element;
}

export interface FormRow {
  items: FormItem[];
}

export interface FormPage {
  rows: FormRow[];
  register: UseFormRegister<FieldValues>
}


export interface PageProps {
  title: string;
  rows: FormRow[];
  changePage: [() => void, () => void];
}

export default function Page({ title, rows, changePage }: PageProps) {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="w-full bg-slate-100 text-center rounded-t-lg h-[10%] mb-1 align-middle flex justify-left pl-[5%] flex-row items-center">
        <h1 className="text-3xl font-bold text-slate-400">{title}</h1>
      </div>
      <div className="w-full flex flex-col items-center overflow-scroll h-full">
        {rows.map((row, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row justify-center w-5/6 lg:my-3 lg:space-x-2"
          >
            {row.items.map((item, index) => (
              <div key={index} className="w-full">
                {item.element}
              </div>
            ))}
          </div>
        ))}
        <div className="flex flex-row-reverse justify-between mb-3 w-5/6">
          <button
            onClick={changePage[0]}
            className="bg-red-500 hover:bg-red-400 text-white font-bold py-6 rounded w-[45%]"
          >
            Next
          </button>
          <button
            onClick={changePage[1]}
            className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-6 rounded w-[45%]"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
