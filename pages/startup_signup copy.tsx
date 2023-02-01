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
import { Founders } from "../components/SignupForm/formComponents/Founders";

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
        <div className="max-w-full pl-20 pr-20 mt-1 justify-center items-center">
          {" "}
          <div className="flex-col w-full">
            <div className="p-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 text-left ml-[4.5%]"
                htmlFor="yearFounded"
              >
                Name
              </label>
              <div className="text-center">
                <input
                  className="shadow appearance-none border-2 border-black rounded w-11/12 h-14 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-4xl text-center"
                  id="companyName"
                  type="text"
                  {...registerFunction("companyName", { required: true })}
                />
              </div>
            </div>
            <div className="flex justify-center items-center p-4 w-full">
              <div className="w-1/2 justify-center items-center relative text-center">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 text-left pl-[9%]"
                  htmlFor="yearFounded"
                >
                  Year Founded
                </label>
                <div className="text-center">
                  <input
                    required
                    className="shadow w-5/6 h-14 appearance-none border-2 rounded border-black py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                    id="yearFounded"
                    type="number"
                    defaultValue={2022}
                    {...registerFunction("yearFounded", { required: true })}
                  />
                </div>
              </div>
              <div className="flex-col w-1/2 justify-center">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 text-left pl-[9%]"
                  htmlFor="industry"
                >
                  Industry
                </label>
                <div className="text-center">
                  <input
                    className="shadow w-5/6 h-14 appearance-none border-2 border-black rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                    id="industry"
                    type="text"
                    {...registerFunction("industry", { required: true })}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center p-4">
              <Founders registerFunction={registerFunction} />
            </div>
            <div className="flex justify-center items-center p-4">
              <div className="flex-col w-1/2 justify-center">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 text-left pl-[9%]"
                  htmlFor="current_stage"
                >
                  Current Stage
                </label>
                <div className="text-center">
                  <input
                    required
                    className="shadow h-14 w-5/6 appearance-none border-2 border-black rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                    id="current_stage"
                    type="text"
                    {...registerFunction("Current Stage", { required: true })}
                  />
                </div>
              </div>
              <div className="flex-col w-1/2 justify-center">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 text-left pl-[9%]"
                  htmlFor="size"
                >
                  Size
                </label>
                <div className="text-center">
                  <input
                    required
                    className="shadow w-5/6 h-14 appearance-none border-2 border-black rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                    id="size"
                    type="text"
                    {...registerFunction("size", { required: true })}
                  />
                </div>
              </div>
            </div>
            <div className="flex-col w-full p-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 text-left ml-[4.5%]"
                htmlFor="location"
              >
                Location
              </label>
              <p className="font-light text-xs ml-[4.5%]">
                Where are you based? Remotely?
              </p>
              <div className="text-center">
                <input
                  className="shadow h-14 appearance-none border-2 border-black rounded w-11/12 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm align-text-top"
                  id="description"
                  {...registerFunction("location", { required: true })}
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
      triggerFunction: null,
      // requiredNames: ["email", "website"],
      requiredNames: [],
      pageFunction: null,
      lastPage: false,
      questionFormat: (
        <div className="max-w-full pl-20 pr-20 mt-6 justify-center items-center">
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
        <div className="appearance-none rounded ml-20 mr-20 ">
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
        <div className="appearance-none rounded ml-20 mr-20 pt-5 mb-20">
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
          <div className="flex-col mb-7">
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
          <div className="flex-col space-y-7 w-full">
            <div className="flex">
              <div className="flex w-1/2 items-center">
                <svg
                  width="26"
                  height="42"
                  viewBox="0 0 26 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-1/6"
                >
                  <path
                    d="M25.1374 2.09794C25.1374 1.79614 25.0185 1.50669 24.8068 1.29329C24.5952 1.07988 24.3081 0.95999 24.0087 0.95999H18.3651C15.5233 0.817271 12.7409 1.81434 10.626 3.73335C8.51101 5.65236 7.23541 8.3373 7.07788 11.2015V17.3464H1.43426C1.13491 17.3464 0.847814 17.4663 0.636137 17.6797C0.424461 17.8932 0.305542 18.1826 0.305542 18.4844V24.4017C0.305542 24.7035 0.424461 24.993 0.636137 25.2064C0.847814 25.4198 1.13491 25.5397 1.43426 25.5397H7.07788V40.7882C7.07788 41.09 7.19679 41.3794 7.40847 41.5928C7.62015 41.8062 7.90724 41.9261 8.2066 41.9261H14.9789C15.2783 41.9261 15.5654 41.8062 15.7771 41.5928C15.9887 41.3794 16.1077 41.09 16.1077 40.7882V25.5397H22.0222C22.2732 25.5433 22.5182 25.4625 22.7185 25.31C22.9189 25.1575 23.0631 24.942 23.1283 24.6976L24.7537 18.7803C24.7986 18.6121 24.8046 18.4358 24.7713 18.265C24.738 18.0941 24.6663 17.9332 24.5616 17.7947C24.4569 17.6562 24.3221 17.5438 24.1676 17.4661C24.013 17.3883 23.8428 17.3474 23.6701 17.3464H16.1077V11.2015C16.1638 10.6382 16.4262 10.1162 16.8436 9.73743C17.2611 9.35868 17.8035 9.15038 18.3651 9.15322H24.0087C24.3081 9.15322 24.5952 9.03333 24.8068 8.81992C25.0185 8.60651 25.1374 8.31707 25.1374 8.01527V2.09794Z"
                    fill="#231F20"
                  />
                </svg>
                <input
                  className="shadow w-full appearance-none border-2 border-black rounded h-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-2xl"
                  id="facebook"
                  type="text"
                  placeholder="Facebook"
                  {...registerFunction("facebook", { required: true })}
                />
              </div>
              <div className="flex w-1/2">
                <svg
                  width="39"
                  height="36"
                  viewBox="0 0 39 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-1/6 items-center"
                >
                  <path
                    d="M10.9638 35.6736C14.1574 35.784 17.34 35.2322 20.3236 34.0508C23.3072 32.8695 26.0311 31.0826 28.3345 28.7958C30.6379 26.5089 32.4739 23.7686 33.7341 20.7366C34.9943 17.7046 35.653 14.4425 35.6714 11.1432C37.135 9.27313 38.2218 7.11984 38.8679 4.8099C38.9161 4.6274 38.9122 4.43439 38.8567 4.25412C38.8011 4.07385 38.6963 3.914 38.5548 3.79382C38.4133 3.67364 38.2412 3.59826 38.0592 3.57675C37.8771 3.55524 37.693 3.58852 37.5288 3.67258C36.7632 4.05315 35.9011 4.17608 35.0642 4.02405C34.2273 3.87202 33.4577 3.45271 32.8638 2.82517C32.1056 1.96789 31.1885 1.27648 30.1667 0.791881C29.145 0.307287 28.0395 0.039376 26.9157 0.00402333C25.7918 -0.0313293 24.6726 0.166596 23.6242 0.58607C22.5758 1.00554 21.6196 1.63803 20.8123 2.44606C19.7069 3.5514 18.8973 4.9332 18.4621 6.45718C18.0268 7.98115 17.9808 9.59546 18.3286 11.1432C11.0934 11.5892 6.1259 8.04346 2.15194 3.18197C2.03256 3.04238 1.87639 2.9417 1.7025 2.89222C1.52862 2.84275 1.34454 2.84664 1.17276 2.9034C1.00098 2.96016 0.848917 3.06734 0.735151 3.21185C0.621385 3.35636 0.550837 3.53196 0.53212 3.71718C-0.224942 8.05332 0.321175 12.5248 2.09712 16.5311C3.87307 20.5375 6.7938 23.8867 10.467 26.1291C8.00411 29.0456 4.54541 30.8671 0.81289 31.2136C0.612922 31.2478 0.428326 31.3457 0.284939 31.4937C0.141551 31.6416 0.046548 31.8321 0.0132246 32.0386C-0.0200989 32.245 0.00992557 32.4571 0.0990959 32.645C0.188266 32.833 0.332119 32.9874 0.510523 33.0868C3.75777 34.7624 7.33371 35.6473 10.9638 35.6736Z"
                    fill="#231F20"
                  />
                </svg>
                <input
                  className="shadow w-full appearance-none border-2 border-black rounded h-16 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-2xl"
                  id="twitter"
                  type="text"
                  placeholder="Twitter"
                  {...registerFunction("twitter", { required: true })}
                />
              </div>
            </div>
            <div className="flex">
              <div className="flex w-1/2">
                <svg
                  width="39"
                  height="42"
                  viewBox="0 0 39 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-1/6 items-center"
                >
                  <path
                    d="M25.8867 12.6217C24.2537 12.6157 22.6356 12.9545 21.125 13.6188C19.6145 14.2832 18.241 15.2599 17.0834 16.4932C15.9257 17.7265 15.0065 19.1921 14.3783 20.8062C13.7502 22.4203 13.4254 24.1512 13.4226 25.8999V39.315C13.4226 39.8595 13.6246 40.3818 13.9842 40.7669C14.3439 41.152 14.8316 41.3683 15.3402 41.3683H19.8144C20.323 41.3683 20.8107 41.152 21.1704 40.7669C21.53 40.3818 21.732 39.8595 21.732 39.315V25.8999C21.7316 25.2779 21.8536 24.6629 22.09 24.0948C22.3264 23.5268 22.672 23.0185 23.1042 22.603C23.5364 22.1875 24.0456 21.8743 24.5984 21.6837C25.1513 21.493 25.7354 21.4293 26.3128 21.4966C27.3483 21.6363 28.2999 22.178 28.9872 23.0191C29.6744 23.8601 30.0496 24.942 30.0414 26.0596V39.315C30.0414 39.8595 30.2434 40.3818 30.603 40.7669C30.9626 41.152 31.4504 41.3683 31.9589 41.3683H36.4332C36.9418 41.3683 37.4295 41.152 37.7891 40.7669C38.1487 40.3818 38.3508 39.8595 38.3508 39.315V25.8999C38.348 24.1512 38.0232 22.4203 37.3951 20.8062C36.7669 19.1921 35.8477 17.7265 34.69 16.4932C33.5323 15.2599 32.1589 14.2832 30.6483 13.6188C29.1378 12.9545 27.5197 12.6157 25.8867 12.6217Z"
                    fill="#231F20"
                  />
                  <path
                    d="M7.6702 14.6741H1.91755C0.858517 14.6741 0 15.5934 0 16.7274V39.314C0 40.4481 0.858517 41.3674 1.91755 41.3674H7.6702C8.72923 41.3674 9.58775 40.4481 9.58775 39.314V16.7274C9.58775 15.5934 8.72923 14.6741 7.6702 14.6741Z"
                    fill="#231F20"
                  />
                  <path
                    d="M4.79388 10.5677C7.44146 10.5677 9.58775 8.26941 9.58775 5.43435C9.58775 2.59929 7.44146 0.301025 4.79388 0.301025C2.14629 0.301025 0 2.59929 0 5.43435C0 8.26941 2.14629 10.5677 4.79388 10.5677Z"
                    fill="#231F20"
                  />
                </svg>
                <input
                  className="shadow appearance-none border-2 border-black rounded w-full h-16 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-2xl"
                  id="linkedin"
                  type="text"
                  placeholder="LinkedIn"
                  {...registerFunction("linkedin", { required: true })}
                />
              </div>
              <div className="flex w-1/2">
                <svg
                  width="50"
                  height="53"
                  viewBox="0 0 50 53"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-1/6 items-center"
                >
                  <path
                    d="M18.75 48.0055H31.25C41.6667 48.0055 45.8334 43.6721 45.8334 32.8388V19.8388C45.8334 9.00545 41.6667 4.67212 31.25 4.67212H18.75C8.33335 4.67212 4.16669 9.00545 4.16669 19.8388V32.8388C4.16669 43.6721 8.33335 48.0055 18.75 48.0055Z"
                    stroke="black"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M25 33.9223C25.9575 33.9223 26.9057 33.7261 27.7904 33.345C28.675 32.9639 29.4789 32.4054 30.156 31.7012C30.8331 30.997 31.3702 30.161 31.7366 29.241C32.103 28.3209 32.2916 27.3348 32.2916 26.3389C32.2916 25.3431 32.103 24.357 31.7366 23.4369C31.3702 22.5169 30.8331 21.6809 30.156 20.9767C29.4789 20.2725 28.675 19.714 27.7904 19.3329C26.9057 18.9518 25.9575 18.7556 25 18.7556C23.0661 18.7556 21.2114 19.5546 19.844 20.9767C18.4765 22.3989 17.7083 24.3277 17.7083 26.3389C17.7083 28.3502 18.4765 30.279 19.844 31.7012C21.2114 33.1233 23.0661 33.9223 25 33.9223V33.9223Z"
                    stroke="black"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M36.7416 15.5056H36.7666"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <input
                  className="shadow appearance-none border-2 border-black rounded w-full h-16 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-2xl"
                  id="instagram"
                  type="text"
                  placeholder="Instagram"
                  {...registerFunction("instagram", { required: true })}
                />
              </div>
            </div>
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
