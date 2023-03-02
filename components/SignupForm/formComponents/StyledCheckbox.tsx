import React from "react";
import { InputProps } from './StyledInput';

export default function StyledCheckbox({name, register}: InputProps) {
  return (
    <div>
      <label
        className="block text-gray-700 text-sm font-bold mb-2 text-left whitespace-nowrap"
        htmlFor={name}
      >
        {name}
      </label>
      <input
        type="checkbox"
        placeholder={name}
        {...register(name)}
        className="w-5 h-5"
      />{" "}
    </div>
  );
}
