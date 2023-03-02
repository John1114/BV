import React from "react";
import { Founders } from "../formComponents/Founders";
import StyledInput from "../formComponents/StyledInput";
import { UseFormRegister, FieldValues } from "react-hook-form";
import { FormRow } from "../formComponents/Page";
import StyledCheckbox from "../formComponents/StyledCheckbox";

//

export interface TemplateProps {
  register: UseFormRegister<FieldValues>;
}

export default function UserFirstPage({register}: TemplateProps): FormRow[] {
  return [
    {
      items: [
        {
          name: "First Name",
          element: <StyledInput name="First Name" register={register} />,
        },
        {
          name: "Last Name",
          element: <StyledInput name="Last Name" register={register} />,
        },
      ],
    },
    {
        items: [
            {
                name: "Is your startup registered?",
                element: <StyledCheckbox name="Is your startup registered?" register={register} />,
            },
        ],
    },
    {
        items: [
            {
                name: "Email",
                element: <StyledInput name="Email" register={register} />,
            },
            {
                name: "Place of Residence",
                element: <StyledInput name="Place of Residence" register={register} />,
            }
        ]
    },
    {
        items: [
            {
                name: "Education",
                element: <StyledInput name="Education" register={register} />,
            }
        ]
    },
    {
        items: [
            {
                name: "Upload Profile Picture",
                element: <StyledInput name="Upload Profile Picture" register={register} />,
            },
            {
                name: "Upload Resume",
                element: <StyledInput name="Upload Resume" register={register} />,
            }
        ]
    },
    {
        items: [
            {
                name: "LinkedIn",
                element: <StyledInput name="LinkedIn" register={register} />,
            },
            {
                name: "Other Websites",
                element: <StyledInput name="Other Websites" register={register} />,
            }
        ]
    }
  ];
}
