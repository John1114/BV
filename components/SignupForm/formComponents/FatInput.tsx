import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

export interface FatInputProps {
  name: string;
  description: string;
  register: UseFormRegister<FieldValues>;
}

export default function FatInput({ name, description, register }: FatInputProps, required = true) {
  return (
    <div className="w-full mb-2 lg:mb-0">
      <label
        className="block text-gray-700 text-lg font-bold mb-2 text-left whitespace-nowrap"
        htmlFor={name}
      >
        {name}
      </label>
      <label>{description}</label>
      <textarea className="form-primary h-[200px] lg:h-[150px]" {...register(name, { required: required })} />
    </div>
  );
}
