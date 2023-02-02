import React, { SetStateAction } from "react";
import FirstPage from "./StartupFormPages/FirstPage";
import Page, { FormRow } from "./formComponents/Page";
import { PageProps } from "./formComponents/Page";
import SecondPage from "./StartupFormPages/SecondPage";
import ThirdPage from "./StartupFormPages/ThirdPage";
import FourthPage from "./StartupFormPages/FourthPage";
import { useForm } from "react-hook-form";
import {Dispatch} from 'react';

export interface MainFormProps{
  setAccent: Dispatch<SetStateAction<string>>
}

function StartupForm({setAccent}: MainFormProps) {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();
  const [pageNumber, setPageNumber] = React.useState(0);
  //sets page number to next page, dont go below 0 or above pages.length
  const incrementPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, pages.length - 1));
  };
  const decrementPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = async (data: any) => console.log(data);

  const pages: PageProps[] = [
    {
      rows: FirstPage({ register }),
      title: "Tell us about your Startup",
      changePage: [incrementPage, decrementPage],
    },
    {
      rows: SecondPage({ register}),
      title: "Tell us about your Startup...",
      changePage: [incrementPage, decrementPage],
    },
    {
      rows: ThirdPage({setAccent}),
      title: "How do you want to look?",
      changePage: [incrementPage, decrementPage],
    },
    {
      rows: FourthPage({ register}),
      title: "How do you want to look?",
      changePage: [incrementPage, decrementPage],
    },
  ];

  return (
    <div className="flex lg:w-[700px] w-[95%] border-black rounded-lg lg:shrink-0 h-[95%] lg:h-[80%] shadow-lg shadow-slate-700 bg-white z-50">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {pages.map((page, index) => {
          if (index !== pageNumber) return null;
          return (
            <div key={index} className="flex flex-col w-full h-full">
              <Page
                title={page.title}
                rows={page.rows}
                changePage={[incrementPage, decrementPage]}
              />
            </div>
          );
        })}
      </form>
    </div>
  );
}

export default StartupForm;
