import React, { SetStateAction } from "react";
import ColorPicker from "../formComponents/ColorPicker";
import Uploader from "../formComponents/Uploader";
import {Dispatch} from 'react';

export interface MediaProps{
    setAccent: Dispatch<SetStateAction<string>>;
}

export default function ThirdPage({setAccent}: MediaProps): {
  items: {
    name: string;
    element: JSX.Element;
  }[];
}[] {
  return [
    {
      items: [
        {
          name: "Upload Logo",
          element: <Uploader name="Upload Logo" />,
        },
      
        {
          name: "Logo",
          element: <ColorPicker setAccent={setAccent}/>,
        },
     
        {
          name: "Upload Media",
          element: <Uploader name="Upload Media" />,
        },
      ],
    },
  ];
}
