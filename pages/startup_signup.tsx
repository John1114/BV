import Modal from "@mui/material/Modal";
import { useRouter } from "next/router";
import { createRef, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import Select from "react-select";
import { toast } from "react-toastify";
import StartupFormStruct, {
  FormQuestion,
} from "../components/StartupSignupFormStruct";
import addStartupFromForm from "../util/startupSignupApi";
import styles from "../styles/Form.module.css";
import { skills } from "../util/skills";
import SplashScreen from "../util/splashscreen";

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

function addPages(setAccent: any) {
  questionPages.push(
    {
      pageId: 0,
      question: "Tell us about your startup",
      pageFunction: null,
      questionFormat: (
        <div className="max-w-full pl-20 pr-20 mt-1 pt-10 justify-center items-center">
          <div className="flex-col w-full">
            <div>
              <input
                required
                className="shadow appearance-none border rounded w-full h-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-4xl text-center"
                id="companyName"
                name="companyName"
                type="text"
                placeholder="Company Name"
              />
            </div>
            <div className="flex justify-center items-center p-4">
              <div className="flex-col w-1/3 justify-center">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="yearFounded"
                >
                  Year Founded
                </label>
                <input
                  required
                  className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                  id="yearFounded"
                  name="yearFounded"
                  type="number"
                  placeholder="Year Founded"
                  defaultValue={2022}
                />
              </div>
              <div className="flex-col w-1/3 justify-center">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="founders"
                >
                  Founder(s)
                </label>
                <input
                  required
                  className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                  id="founders"
                  name="founders"
                  type="text"
                  placeholder="Founder(s)"
                />
              </div>
              <div className="flex-col w-1/3 justify-center">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="industry"
                >
                  Industry
                </label>
                <input
                  required
                  className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                  id="industry"
                  name="industry"
                  type="text"
                  placeholder="Select"
                />
              </div>
            </div>
            <div className="flex justify-center p-4">
              <div className="flex-col w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <input
                  required
                  className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Description"
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      pageId: 1,
      question: "Where can we find you?",
      pageFunction: null,
      questionFormat: (
        <div className="max-w-full pl-20 pr-20 mt-6 pt-20 justify-center items-center columns-2">
          <div className="flex-col">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              required
              className="shadow appearance-none border rounded w-full h-16 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-2xl"
              id="email"
              name="email"
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="flex-col">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="website"
            >
              Website
            </label>
            <input
              required
              className="shadow appearance-none border rounded w-full h-16 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-2xl"
              id="website"
              name="website"
              type="text"
              placeholder="Website"
            />
          </div>
        </div>
      ),
    },
    {
      pageId: 2,
      question: "How do you want to look?",
      pageFunction: null,
      questionFormat: (
        <div>
          <LogoForm setAccentColor={setAccent} />
        </div>
      ),
    },
    {
      pageId: 3,
      question: "What are you looking for?",
      pageFunction: null,
      questionFormat: (
        <div>
          <label>What skills do you need?</label>
          <Select options={skill} isMulti key={"dropdown"}/>
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
  
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [fading, setFading] = useState<boolean>(false);
  // Waits until the session is loaded before loading the page
  // if (firebaseAuthState.isLoading) return null

  useEffect(() => {
    // Solve Hydration issue with useEffect
    // https://github.com/vercel/next.js/discussions/17443
    addPages(setAccentColor);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
    loading
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");
  }, [])

  const StopLoading = () => {
    setFading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  setTimeout(StopLoading, 2000);

  const toPage = async function(num: number){
    if (num > questionPages[questionPages.length - 1].pageId){
      document.forms[0].requestSubmit()
    }else if (num >= 0){
      setPage(num)
    }
  }

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  let formData = new FormData(event.currentTarget);
  let formObj: FormInterface = {};
  for (let [key, value] of Array.from(formData.entries())) {
    formObj[key] = value.toString();
  }
  //TODO: Add userId as part of form data to be uploaded

    //TODO: test API
    const res = await addStartupFromForm(formObj);

    //TODO: perhaps display results to user?
    console.log(res);
    //TODO: route user to index page?
    router.push("/");
  };

  return (
    <div>
      {loading && <SplashScreen fading={fading} />}
      <FirstVector accentColor={accentColor} />
      <SecondVector accentColor={accentColor} />
      <form
        id="startup_form"
        onSubmit={handleSubmit}
        method="post"
        className="bg-[length:531px_631px] bg-no-repeat h-screen pt-40"
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
              questionFormat={page.questionFormat}
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
}

export function LogoForm({ setAccentColor }: LogoFormProps) {
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
  // const [imageElt, setImageElt] = useState<HTMLImageElement | undefined>(
  //   undefined
  // );
  const [croppedImageData, setCroppedImageData] = useState("");
  const imageElt = useRef<HTMLImageElement>(null)

  const getCroppedImage = (crop: Crop) => {
    if (!imageElt.current) {
      console.log("NO IMAGE")
      return;
    }
    const canvas = document.createElement("canvas");
    const pixelRatio = window.devicePixelRatio;
    const scaleX = imageElt.current.naturalWidth / imageElt.current.width;
    const scaleY = imageElt.current.naturalHeight / imageElt.current.height;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.log("NO CTX")
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

  return (
    <div className={styles.logo_form}>
      <Modal open={modalOpen} onClose={handleClose}>
        <div className={styles.upload_modal}>
          <div className={styles.modal_box} onClick={() => setCropped(true)}>
            <ReactCrop
              crop={crop}
              ruleOfThirds
              onComplete={getCroppedImage}
              onChange={(newcrop) => setCrop(newcrop)}
            > 
            <img src={image} ref={imageElt}/>
            </ReactCrop>
          </div>
          <div>
            <button
              className={styles.button}
              onClick={() => {
                setCropped(true)
                if (cropped) {
                  setImage(croppedImageData);
                  handleClose();
                } else {
                  toast.info(
                    "Drag on the image or adjust an existing crop box to crop!",
                    {
                      autoClose: 5000,
                      hideProgressBar: false,
                      position: "top-center",
                      closeOnClick: true,
                      progress: undefined,
                      draggable: true,
                      pauseOnHover: true,
                    }
                  );
                }
              }}
              style={{
                background: "#FF5A5F",
                color: "#FFFFFF",
                fontFamily: "Inter",
              }}
            >
              Crop Logo
            </button>
          </div>
        </div>
      </Modal>
      <div className={styles.logo_selector} onClick={logoOnClick}>
        <div
          className="image_upload_text"
          style={image == "" ? { marginBottom: "0.5rem" } : { display: "none" }}
        >
          {" "}
          Upload your Logo
        </div>
        {image == "" ? (
          <div>
            <img
              style={image == "" ? { opacity: "70%" } : { display: "none" }}
              src="/upload_24px.png"
            />
          </div>
        ) : (
          <div>
            <img
              style={{ maxHeight: "9.5rem", maxWidth: "9.5rem" }}
              src={image}
            />
          </div>
        )}
        <input
          type="file"
          style={{
            opacity: 0.0,
            position: "absolute",
            top: 0,
            left: -500000, // hide file input off screen to use my styled div
          }}
          ref={fileInputRef}
          onChange={onLogoUploaded}
        />
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
              setLocalAccentColor(event.target.value)
            }
          }}
          ref={colorInputRef}
        />
      </div>
    </div>
  );
}
