import Modal from "@mui/material/Modal";
import { useRouter } from "next/router";
import {
  createRef,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactCrop, { Crop } from "react-image-crop";
import Select from "react-select";
import { toast } from "react-toastify";
import StartupFormStruct, {
  FormQuestion,
} from "../components/StartupSignupFormStruct";
import addStartupFromForm, {
  uploadImageWithRef,
} from "../util/startupSignupApi";
import styles from "../styles/Form.module.css";
import { skills } from "../util/skills";
import SplashScreen from "../util/splashscreen";
import ReactImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import { useForm } from "react-hook-form";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../util/firebaseConfig";
import { Founders } from "../components/Founders";

const questionPages: FormQuestion[] = [];
interface VectorProps {
  accentColor: string;
}
function FirstVector({ accentColor }: VectorProps) {
  return (
    <svg
      className={`${styles.top_left_vector}  ${styles.noselect} ${styles.nodrag}`}
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

function SecondVector({ accentColor }: VectorProps) {
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

const skill = skills;

function addPages(
  setAccent: any,
  setSkills: any,
  registerFunction: any,
  imageUpdater: any
) {
  questionPages.push(
    {
      pageId: 0,
      question: "Tell us about your startup",
      triggerFunction: null,
      //requiredNames: ["companyName", "yearFounded", "founders", "industry"],
      requiredNames: [],
      pageFunction: null,
      lastPage: false,
      questionFormat: (
        <div className="max-w-full pl-20 pr-20 mt-1 pt-10 justify-center items-center overscroll-contain">
          <div className="flex-col w-full">
            <div className="p-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="yearFounded"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border-2 border-black rounded w-full h-14 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-4xl text-center"
                id="companyName"
                type="text"
                {...registerFunction("companyName", { required: true })}
              />
            </div>
            <div className="flex justify-center items-center p-4">
              <div className="flex-col w-1/2 justify-center">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="yearFounded"
                >
                  Year Founded
                </label>
                <input
                  required
                  className="shadow w-5/6 h-14 appearance-none border-2 rounded border-black py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                  id="yearFounded"
                  type="number"
                  defaultValue={2022}
                  {...registerFunction("yearFounded", { required: true })}
                />
              </div>
              <div className="flex-col w-1/2 justify-center mt-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="industry"
                >
                  Industry
                </label>
                <input
                  className="shadow w-5/6 h-14 appearance-none border-2 border-black rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                  id="industry"
                  type="text"
                  {...registerFunction("industry", { required: true })}
                />
              </div>
            </div>
            <div className="flex justify-center items-center p-4">
              <Founders registerFunction={registerFunction}/>
            </div>
            <div className="flex justify-center items-center p-4">
              <div className="flex-col w-1/2 justify-center">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="current_stage"
                >
                  Current Stage
                </label>
                <input
                  required
                  className="shadow h-14 w-5/6 appearance-none border-2 border-black rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                  id="current_stage"
                  type="text"
                  {...registerFunction("Current Stage", { required: true })}
                />
              </div>
              <div className="flex-col w-1/2 justify-center">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="size"
                >
                  Size
                </label>
                <input
                  required
                  className="shadow w-5/6 h-14 appearance-none border-2 border-black rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                  id="size"
                  type="text"
                  {...registerFunction("size", { required: true })}
                />
              </div>
            </div>
            <div className="flex-col w-full p-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="location"
              >
                Location
              </label>
              <p className="font-light text-xs">
                Where are you based? Remotely?
              </p>
              <input
                className="shadow h-14 appearance-none border-2 border-black rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm align-text-top"
                id="description"
                {...registerFunction("location", { required: true })}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      pageId: 1,
      question: "Where can we find you?",
      triggerFunction: null,
      // requiredNames: ["email", "website"],
      requiredNames: [],
      pageFunction: null,
      lastPage: false,
      questionFormat: (
        <div className="max-w-full pl-20 pr-20 mt-6 pt-20 justify-center items-center">
          <div className="flex-row">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <p className="font-light text-xs">Tell us what your startup does</p>
            <textarea
              className="shadow appearance-none border-2 border-black rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm h-24 align-text-top"
              id="description"
              placeholder="Description"
              {...registerFunction("description", { required: true })}
            />
          </div>
          <div className="flex-row pt-5">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="mission_statement"
            >
              Mission Statement
            </label>
            <p className="font-light text-xs">
              Tell us what your core values are and what drives you as a
              company.
            </p>
            <textarea
              className="shadow appearance-none border-2 border-black rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm h-24 align-text-top"
              id="description"
              placeholder="Mission Statement"
              {...registerFunction("mission_statement", { required: true })}
            />
          </div>
        </div>
      ),
    },
    {
      pageId: 2,
      question: "How do you want to look?",
      triggerFunction: null,
      requiredNames: [],
      pageFunction: null,
      lastPage: false,
      questionFormat: (
        <div className="appearance-none rounded ml-20 mr-20">
          <LogoForm setAccentColor={setAccent} imageUpdater={imageUpdater} />
        </div>
      ),
    },
    {
      pageId: 3,
      question: "Where can we find you?",
      triggerFunction: null,
      requiredNames: [],
      pageFunction: null,
      lastPage: true,
      questionFormat: (
        <div className="appearance-none rounded ml-20 mr-20 pt-10 mb-20">
          <div className="flex-col">
            {/* <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full h-16 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-2xl"
              id="email"
              type="text"
              placeholder="Email"
              {...registerFunction("email", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            /> */}
          </div>
          <div className="flex-col">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="website"
            >
              Website
            </label>
            <input
              className="shadow appearance-none border-2 border-black rounded w-full h-16 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-2xl"
              id="website"
              type="text"
              placeholder="Website"
              {...registerFunction("website", { required: true })}
            />
          </div>
        </div>
      ),
    }
  );
}

interface FormInterface {
  [key: string]: string;
}

export default function StartupSignup() {
  // Add React useState for current pageId
  const [pageNumber, setPage] = useState<number>(0);
  const [accentColor, setAccentColor] = useState<string>("#FF5A5F");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [logoImage, setLogoImage] = useState<ImageType | null>(null);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [fading, setFading] = useState<boolean>(false);
  // Waits until the session is loaded before loading the page
  // if (firebaseAuthState.isLoading) return null

  useEffect(() => {
    // Solve Hydration issue with useEffect
    // https://github.com/vercel/next.js/discussions/17443
    addPages(setAccentColor, setSelectedSkills, register, setLogoImage);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
    loading
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");
  }, []);

  const StopLoading = () => {
    setFading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  setTimeout(StopLoading, 200);

  const toPage = async function (num: number) {
    if (num > questionPages[questionPages.length - 1].pageId) {
      document.forms[0].requestSubmit();
    } else if (num >= 0) {
      setPage(num);
    }
  };

  const onSubmit = async (data: any) => {
    if (logoImage !== null && logoImage.file !== undefined) {
      // Add skills to form obj
      data["skills"] = selectedSkills.join(",");

      // Check if there is image uploaded, if there is, get and upload file
      // https://firebase.google.com/docs/storage/web/upload-files#upload_from_a_blob_or_file

      var datetime = new Date();

      // Generate a unique image path by taking the millisecond timestamp of the image being uploaded
      // Maybe TODO: if user must be registered to use this form,
      // use user id in conjunction with timestamp to create unique image path
      const imageStorageUri = `images/${datetime.getTime().toString()}.jpg`;
      const imageRef = ref(storage, imageStorageUri);
      const imageRes = await uploadImageWithRef(imageRef, logoImage.file);

      if (imageRes) {
        data["imageRef"] = imageStorageUri;

        console.log(data);

        // upload data with API
        const res = await addStartupFromForm(data);

        console.log(res);

        router.push(
          {
            pathname: "/",
            query: {
              useFlash: true,
              message: "Successfully created startup!",
              backgroundColor: "bg-green-300",
              textColor: "text-emerald-800",
            },
          },
          "/"
        );
      }
    }
    router.push(
      {
        pathname: "/",
        query: {
          useFlash: true,
          message: "Successfully created startup!",
          backgroundColor: "bg-green-300",
          textColor: "text-emerald-800",
        },
      },
      "/"
    );
  };

  return (
    <div>
      {loading && <SplashScreen fading={fading} />}
      <FirstVector accentColor={accentColor} />
      <SecondVector accentColor={accentColor} />
      <form
        id="startup_form"
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[length:531px_631px] bg-no-repeat h-screen pt-20"
      >
        {questionPages.map((page: FormQuestion) => (
          <div
            key={page.pageId.toString()}
            hidden={page.pageId != pageNumber}
            className="h-full"
          >
            <StartupFormStruct
              pageId={page.pageId}
              question={page.question}
              pageFunction={toPage}
              triggerFunction={trigger}
              requiredNames={page.requiredNames}
              questionFormat={page.questionFormat}
              lastPage={page.lastPage}
            />
          </div>
        ))}
      </form>
    </div>
  );
}

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
    <div className="flex flex-col items-center pt-20 pb-20">
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
