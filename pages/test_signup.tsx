import StartupFormStruct from "../components/StartupSignupFormStruct"

export default function TestSignup() {
    return <div className="flex justify-center mx-auto h-screen pt-40">

       <StartupFormStruct pageId="1" question="Tell us about your startup" questionFormat={<>some text <strong>bold text</strong> and more.</>}/>

    </div>
}