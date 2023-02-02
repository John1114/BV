import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Startups from "./startups"
import logo from "../assets/logo.jpeg";
import Navbar from "../components/Navbar";


export default function Landing() {
    return(
    <>
        <Navbar />
        <div className="flex flex-col">
            <Hero tagLine={"Startups start here."} />
            {/* <button className="login-with-google-btn" onClick={signInWithGoogle}>
            Sign in with Google
            </button> */}
        </div>
        <div className="relative top-48">
            <Startups />
        </div>

        <div className="relative top-32 h-2 my-24">
            <Footer logo={logo} />
        </div>
    </>
)}