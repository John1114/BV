import Modal from "@mui/material/Modal";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { skills } from "../util/skills";
import "../util/signupUtils";
import StartupForm from "../components/SignupForm/StartupForm";
import { FirstVector, SecondVector } from "../util/signupUtils";





const skill = skills;

export default function StartupSignup() {

  const [accentColor, setAccentColor] = useState<string>("#FF5A5F");

  return (
    <div className="flex justify-center align-middle h-screen pt-5 pb-5 w-screen bg-slate-100 items-center">
      <StartupForm setAccent={setAccentColor} accent={accentColor} />
      <FirstVector accentColor={accentColor}></FirstVector>
      <SecondVector accentColor={accentColor}></SecondVector>
    </div>
  );
}
