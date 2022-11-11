import StartupInfo from "../components/StartupInfoDummy";
// import StartupInfo from "../components/StartupInfoWithFirebaseTest"
// import StartupInfoWithFirebase from "../components/StartupInfoWithFirebase";
/* Switch after Firebase setup */

interface startupIdProp {startupId: string}

export default function Startup({startupId}: startupIdProp) {
    return <div>
        <StartupInfo />
        {/* <StartupInfo startupId={startupId}/> */}

    </div>
}
