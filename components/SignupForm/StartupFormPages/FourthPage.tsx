import StyledInput from "../formComponents/StyledInput";
import { TemplateProps } from './FirstPage';
import { FormRow } from '../formComponents/Page';

export default function FourthPage({register}: TemplateProps): FormRow[] {
  return [
    {
      items: [
        {
          name: "Website",
          element: <StyledInput name="Website" register={register}/>,
        },
      ],
    },
    {
      items: [
        {
          name: "Twitter",
          element: <StyledInput name="Twitter" register={register}/>,
        },
        {
          name: "Facebook",

          element: <StyledInput name="Facebook" register={register} />,
        },
      ],
    },
    {
      items: [
        {
          name: "Instagram",
          element: <StyledInput name="Instagram" register={register}/>,
        },
        {
          name: "LinkedIn",
          element: <StyledInput name="LinkedIn" register={register}/>,
        },
      ],
    },
  ];
}
