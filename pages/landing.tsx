import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Startups from "./startups"
import logo from "../assets/logo.jpeg";
import Navbar from "../components/Navbar";


export default function Landing() {
    // return (
    //     <>
    //     <Navbar/>
    //     <Hero tagLine={"Startups start here."} />
    //     <Startups />
    //     <Footer logo={logo} />
    //     </>
    // )
    return(
    <div >
        <Navbar />
        <Hero tagLine={"Startups start here."} />
        <div className="relative top-16">
            <Startups />
        </div>
        <div className="relative top-16">
        <Footer logo={logo} />
        </div>
        
        {/* <div className="flex flex-col h-screen w-screen">
            <Hero tagLine={"Startups start here."} />
        </div>
        <div className="relative top-48">
            <Startups />
        </div>

        <div className="relative top-32 h-2 my-24">
            <Footer logo={logo} />
        </div> */}
    </div>
)
}