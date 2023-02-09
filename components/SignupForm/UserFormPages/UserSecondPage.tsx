import { TemplateProps } from "./UserFirstPage";
import FatInput from '../formComponents/FatInput';
import StyledInput from '../formComponents/StyledInput';

export default function UserSecondPage({ register }: TemplateProps) {
    return [
        {
            items: [
                {
                    name: "Which of the following best describes you?",
                    element: <FatInput name="Description" register={register} description={"Which of the following best describes you?"} />,
                }
            ]
        },
        {
            items: [
                {
                    name: "Additional Information",
                    element: <FatInput name="Additional Information" register={register} description={"Is there anything else you would like to add?"} />,
                }
            ]
        },
        {
            items: [
                {
                    name: "Current Industry",
                    element: <StyledInput name="Current Industry" register={register} />,
                },
                {
                    name: "Current Website *if applicable*",
                    element: <StyledInput name="Current Website" register={register} />,
                }
            ]
        }
    ]
}
