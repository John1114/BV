import StartupFormStruct from "../components/StartupSignupFormStruct"

export default function StartupSignup() {
    return <div className="bg-form_background bg-[length:531px_631px] bg-no-repeat h-screen pt-40">
		<StartupFormStruct pageId="1" question="Tell us about your startup" questionFormat={<>some text <strong>bold text</strong> and more.</>}/>
    </div>
}