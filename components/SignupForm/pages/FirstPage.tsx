import React from "react";
import { Founders } from "../formComponents/Founders";
import StyledInput from "../formComponents/StyledInput";
import { UseFormRegister, FieldValues } from 'react-hook-form';

export interface TemplateProps {
  register: UseFormRegister<FieldValues>;
}

export default function FirstPage({register}: TemplateProps) {
  return [
    {
      items: [
        {
          name: "Name",
          element: <StyledInput name="Name" register={register}/>,
        },
      ],
    },
    {
      items: [
        {
          name: "Year Founded",
          element: <StyledInput name="Year Founded" register={register} />,
        },
        {
          name: "Industry",
          element: <StyledInput name="Industry" register={register} />,
        },
      ],
    },
    {
      items: [
        {
          name: "Founders",
          element: <Founders register={register} />,
        },
      ],
    },
    {
      items: [
        {
          name: "Current Stage",
          element: <StyledInput name="Current Stage" register={register} />,
        },
        {
          name: "Size (number of employees)",
          element: <StyledInput name="Size (number of employees)" register={register} />,
        },
      ],
    },
    {
      items: [
        {
          name: "Location",
          element: <StyledInput name="Location" register={register} />,
        },
      ],
    },
  ];
}
