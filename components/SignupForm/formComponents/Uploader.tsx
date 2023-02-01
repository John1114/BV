import React, { useState } from "react";
import ReactImageUploading, { ImageListType, ImageType } from "react-images-uploading";

export interface UploaderProps {
  name: string;
}

export default function Uploader({ name }: UploaderProps) {
  //return input type file with a styled div
  const [images, setImages] = useState([]);
  const [logoImage, setLogoImage] = useState<ImageType | null>(null);
  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList[0], addUpdateIndex);
    setLogoImage(imageList[0]);
    setImages(imageList as never[]);
    console.log(images);
  };
  return (
    <ReactImageUploading
          value={images}
          multiple={false}
          onChange={onChange}
        >
          {({
            imageList,
            onImageUpload,
            onImageUpdate,
            onImageRemove,
          }: any) => (
            // write your building UI
            <div className="h-[300px] border-dashed my-2 border-2 border-gray-600 rounded align-middle justify-center text-center ">
              <button
                className="h-20 w-full flex-row align-middle rounded-sm"
                type="button"
                onClick={onImageUpload}
              >
                Upload Additional Media
              </button>
              {imageList.map((image: any, index: any) => (
                <div key={index} className="flex-col items-center mt-5 pt-2">
                  <img src={image.dataURL} alt="" width="100" />
                  <div>
                    <button type="button" onClick={() => onImageRemove(index)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ReactImageUploading>
  );
}
