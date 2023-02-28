import React, { useState } from "react";

export interface UploaderProps {
  name: string;
  register: any;
}

export default function Uploader({ name, register }: UploaderProps) {
  //return input type file with a styled div
  const [image, setImage] = useState();
  const onImageChange = (data: any) => {
    console.log("Here")
    console.log(data.target.files[0])
    if (data.target.files[0] == undefined) {
      return;
    }
    const image = URL.createObjectURL(data.target.files[0]);
    setImage(image as any)
    console.log(image)
  };
  return (
    <div className="w-full h-full flex flex-col justify-center">
      <input type="file" {...register(name)} onChange={onImageChange} />

      {
        image != null && <> <img src={image} />

          <button onClick={() => setImage(undefined)}>Remove</button></>
      }
    </div >
  );
}
