import { FirstPage } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { MainFormProps } from "./StartupForm";
import Page, { PageProps } from "./formComponents/Page";
import React from "react";
import UserFirstPage from "./UserFormPages/UserFirstPage";
import UserSecondPage from './UserFormPages/UserSecondPage';

export default function UserForm() {
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

  const router = useRouter();

  const onSubmit = async (data: any) => console.log(data);

  const pages: PageProps[] = [
    {
      rows: UserFirstPage({ register }),
      title: "Welcome!",
      changePage: [incrementPage, decrementPage],
    },
    {
        rows: UserSecondPage({ register }),
        title: "Tell us about yourself",
        changePage: [incrementPage, decrementPage]
    }
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
