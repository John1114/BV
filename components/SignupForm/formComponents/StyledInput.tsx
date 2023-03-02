import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

export interface InputProps {
  name: string;
  register: UseFormRegister<FieldValues>;
}

export default function StyledInput({ name, register }: InputProps, required = true) {
  return (
    <div className="w-full mb-2 lg:mb-0">
      <label
        className="block text-gray-700 text-sm font-bold mb-2 text-left whitespace-nowrap"
        htmlFor={name}
      >
        {name}
      </label>
      <input type="text" placeholder={name} {...register(name, {
        required: true
      })} className="form-primary" />
    </div>
  );
}
