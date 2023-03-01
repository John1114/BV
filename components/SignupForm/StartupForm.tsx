import React, { SetStateAction } from "react";
import FirstPage from "./StartupFormPages/FirstPage";
import Page, { FormRow } from "./formComponents/Page";
import { PageProps } from "./formComponents/Page";
import SecondPage from "./StartupFormPages/SecondPage";
import ThirdPage from "./StartupFormPages/ThirdPage";
import FourthPage from "./StartupFormPages/FourthPage";
import { useForm } from "react-hook-form";
import { Dispatch } from "react";
import { NextRouter, useRouter } from 'next/router';
import { Startup } from "../../util/types";
import addStartupFromForm, { uploadImageWithRef } from "../../util/startupSignupApi";
import { storage } from "../../util/firebaseConfig";
import { ref } from "firebase/storage";

export interface MainFormProps {
  accent: string;
  setAccent: Dispatch<SetStateAction<string>>;
}

function StartupForm({ accent, setAccent }: MainFormProps) {
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

  const onSubmit = async (data: any) => {
    // console.log(data)
    var date = new Date();
    // console.log(data["Upload Logo"][0])
    const imageURI = `images/${date.getTime().toString()}.jpg`;
    const imageRef = ref(storage, imageURI);
    const imageRes = await uploadImageWithRef(imageRef, data["Upload Logo"][0]);
    if (imageRes) {
      data["Upload Logo"] = imageURI;
    } else {
      data["Upload Logo"] = "";
    }
    let img_lst = [data["Upload Media"]].map(function(x: any, index) {
      const imageURI = `images/${date.getTime().toString() + index}.jpg`;
      const imageRef = ref(storage, imageURI);
      uploadImageWithRef(imageRef, x[0] as File);
      return imageURI;

    })

    let startupData: Startup = {
      name: data["Name"],
      yearFounded: data["Year Founded"],
      industry: data["Industry"],
      founders: data["founders"],
      currentStage: data["Current Stage"],
      size: data["Size (number of employees)"],
      location: data["Location"],
      description: data["Description"],
      missionStatement: data["Mission Statement"],
      logo: data["Upload Logo"],
      additionalMedia: img_lst,
      accentColor: accent,
      website: data["Website"],
      twitter: data["Twitter"],
      linkedin: data["LinkedIn"],
      facebook: data["Facebook"],
      instagram: data["Instagram"],

    }
    console.log(data)
    console.log(startupData)
    addStartupFromForm(startupData);
  };

  const pages: PageProps[] = [
    {
      rows: FirstPage({ register }),
      title: "Tell us about your Startup",
      changePage: [incrementPage, decrementPage],
    },
    {
      rows: SecondPage({ register }),
      title: "Tell us about your Startup...",
      changePage: [incrementPage, decrementPage],
    },
    {
      rows: ThirdPage({ setAccent, register }),
      title: "How do you want to look?",
      changePage: [incrementPage, decrementPage],
    },
    {
      rows: FourthPage({ register }),
      title: "Where can we find you?",
      changePage: [incrementPage, decrementPage],
    },
  ];

  return (
    <div className="flex lg:w-[700px] w-[95%] border-black rounded-lg lg:shrink-0 h-[95%] lg:h-[80%] shadow-lg shadow-slate-700 bg-white z-50">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {pages.map((page, index) => {
          if (index !== pageNumber) return null;
          return (
            <div
              key={index} className="flex flex-col w-full h-full">
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

// const submitDataAndRouter = (data: any, router: NextRouter) => {
//   if (logoImage !== null && logoImage.file !== undefined) {
//     // Add skills to form obj
//     data["skills"] = selectedSkills.join(",");

//     // Check if there is image uploaded, if there is, get and upload file
//     // https://firebase.google.com/docs/storage/web/upload-files#upload_from_a_blob_or_file

//     var datetime = new Date();

//     // Generate a unique image path by taking the millisecond timestamp of the image being uploaded
//     // Maybe TODO: if user must be registered to use this form,
//     // use user id in conjunction with timestamp to create unique image path
//     const imageStorageUri = `images/${datetime.getTime().toString()}.jpg`;
//     const imageRef = ref(storage, imageStorageUri);
//     const imageRes = await uploadImageWithRef(imageRef, logoImage.file);

//     if (imageRes) {
//       data["imageRef"] = imageStorageUri;

//       console.log(data);

//       // upload data with API
//       const res = await addStartupFromForm(data);

//       console.log(res);

//       router.push(
//         {
//           pathname: "/",
//           query: {
//             useFlash: true,
//             message: "Successfully created startup!",
//             backgroundColor: "bg-green-300",
//             textColor: "text-emerald-800",
//           },
//         },
//         "/"
//       );
//     }
//   }
//   router.push(
//     {
//       pathname: "/",
//       query: {
//         useFlash: true,
//         message: "Successfully created startup!",
//         backgroundColor: "bg-green-300",
//         textColor: "text-emerald-800",
//       },
//     },
//     "/"
//   );
// };

export default StartupForm;
