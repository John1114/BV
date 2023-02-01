import {
  Dispatch,
  SetStateAction,
  useState,
  createRef,
  useEffect,
  useRef,
} from "react";
import { Crop } from "react-image-crop";
import ReactImageUploading, { ImageListType } from "react-images-uploading";
import styles from "../styles/Form.module.css";

type Application = {
  name: string;
  founders: string;
  email: string;
  website: string;
  twitter: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  mission: string;
  year: string;
  industry: string;
  accentColor: string;
  imageData: string;
  approved: boolean;
};

const empty = {
  name: "i",
  founders: "i",
  email: "i",
  website: "i",
  twitter: "i",
  instagram: "i",
  facebook: "i",
  linkedin: "i",
  mission: "i",
  year: "i",
  industry: "i",
  accentColor: "i",
  imageData: "i",
  approved: false,
};
interface LogoFormProps {
  setAccentColor: Dispatch<SetStateAction<string>>;
  imageUpdater: any;
}

export function LogoForm({ setAccentColor, imageUpdater }: LogoFormProps) {
  const [app, updateApp] = useState<Application>(empty);
  const fileInputRef = createRef<HTMLInputElement>();
  const colorInputRef = createRef<HTMLInputElement>();

  const [image, setImage] = useState<string>("");
  const [accentColor, setLocalAccentColor] = useState<string>("#FF5A5F");
  const [_uploadedFile, setUploadedFile] = useState<File>();
  const [cropped, setCropped] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
    if (cropped) {
      setModalOpen(false);
    }
  };

  const [crop, setCrop] = useState<Crop>({
    x: 0,
    y: 0,
    height: 0,
    unit: "%",
    width: 0,
  });
  useEffect(() => setCropped(true), [crop]);
  // const [imageElt, setImageElt] = useState<HTMLImageElement | undefined>(
  //   undefined
  // );
  const [croppedImageData, setCroppedImageData] = useState("");
  const imageElt = useRef<HTMLImageElement>(null);

  const getCroppedImage = (crop: Crop) => {
    if (!imageElt.current) {
      console.log("NO IMAGE");
      return;
    }
    const canvas = document.createElement("canvas");
    const pixelRatio = window.devicePixelRatio;
    const scaleX = imageElt.current.naturalWidth / imageElt.current.width;
    const scaleY = imageElt.current.naturalHeight / imageElt.current.height;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.log("NO CTX");
      return;
    }

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      imageElt.current,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    setCroppedImageData(canvas.toDataURL("image/jpeg"));
  };

  const onLogoUploaded = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) {
      return;
    }
    setUploadedFile(event.target.files[0]);

    let reader = new FileReader();
    reader.onload = (ev: ProgressEvent<FileReader>) => {
      if (ev.target?.result != null) {
        setImage(ev.target.result.toString());
      }
      handleOpen();
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const logoOnClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const colorOnClick = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  const [images, setImages] = useState([]);
  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList[0], addUpdateIndex);
    imageUpdater(imageList[0]);
    setImages(imageList as never[]);
    console.log(images);
  };

  return (
    <div className="flex flex-col items-center pb-5">
      <div className="pt-2 pb-5 border-dashed border-gray-600">
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
            <div className="border-dashed border-2 border-gray-600 rounded align-middle">
              <button
                className="h-20 p-10 flex-row align-middle rounded-sm"
                type="button"
                onClick={onImageUpload}
              >
                Upload Image
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
      </div>
      <div className={styles.color_selector} onClick={colorOnClick}>
        <div>Select an Accent Color</div>
        <div
          className={styles.color_box}
          style={{
            backgroundColor: accentColor,
          }}
        />
        <input
          type="color"
          style={{
            opacity: 0,
            cursor: "pointer",
          }}
          onChange={(event) => {
            if (event.target?.value) {
              setAccentColor(event.target.value);
              setLocalAccentColor(event.target.value);
            }
          }}
          ref={colorInputRef}
        />
      </div>
      <div className="pt-2 pb-5 border-dashed border-gray-600">
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
            <div className="border-dashed border-2 border-gray-600 rounded align-middle">
              <button
                className="h-20 p-10 flex-row align-middle rounded-sm"
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
      </div>
    </div>
  );
}

export interface VectorProps {
  accentColor: string;
}
export function FirstVector({ accentColor }: VectorProps) {
  return (
    <svg
      className={`${styles.top_left_vector}  ${styles.noselect} ${styles.nodrag} lg:w-fit w-0`}
      width="581"
      z-index="-1"
      height="760"
      viewBox="0 0 581 760"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M194.796 -60.6554L501.485 287.537L-34.3108 759.468L-341 411.276L194.796 -60.6554Z"
        fill={accentColor}
      />
      <path
        d="M501.485 287.537C405.334 372.227 258.734 362.936 174.044 266.785C89.3542 170.635 98.645 24.0345 194.796 -60.6554C290.946 -145.345 437.546 -136.055 522.236 -39.904C606.926 56.2466 597.635 202.847 501.485 287.537Z"
        fill={accentColor}
      />
    </svg>
  );
}

export function SecondVector({ accentColor }: VectorProps) {
  return (
    <svg
      className={`${styles.bottom_right_vector}  ${styles.noselect} ${styles.nodrag}`}
      width="636"
      height="754"
      viewBox="0 0 636 754"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M368.962 794.473L96.9548 418.563L675.402 -4.19617e-05L947.409 375.91L368.962 794.473Z"
        fill={accentColor}
      />
      <path
        d="M96.9548 418.563C200.759 343.45 345.801 366.71 420.913 470.514C496.026 574.319 472.767 719.36 368.962 794.473C265.158 869.585 120.116 846.326 45.0037 742.521C-30.1091 638.717 -6.84975 493.676 96.9548 418.563Z"
        fill={accentColor}
      />
    </svg>
  );
}
