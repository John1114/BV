import React from "react";
import StyledInput from "../formComponents/StyledInput";
import FatInput from "../formComponents/FatInput";
import { TemplateProps } from './FirstPage';

export default function SecondPage({register}: TemplateProps): {
  items: {
    name: string;
    element: JSX.Element;
  }[];
}[] {
  return [
    {
      items: [
        {
          name: "Name",
          element: (
            <FatInput
              name="Description"
              description="Tell us what your starup does"
              register={register}
            />
          ),
        },
      ],
    },
    {
      items: [
        {
          name: "Mission Statement",
          element: (
            <FatInput
              name="Mission Statement"
              description="Tell us what your core values are and what drives you as a company."
              register={register}
            />
          ),
        },
      ],
    },
  ];
}
