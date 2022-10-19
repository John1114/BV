import { useRouter } from "next/router";
// import { useAuth } from "../util/firebaseAuthHelpers";
import opensea from '../images/opensea_logo.png'

/* THIS IS CURRENTLY A DUMMY DATA FILE (Update to incorporate firebase query)*/

export default function StartupInfo() {
    const router = useRouter();
    const { startupSlug } = router.query;

    // const { user } = useAuth();

    return (
        <div className="">

            {/* If we are storing an "accentColor" attribute for each company,
            this class needs to change with each company */}
            <div className="bg-blue-600">


                <div className="max-w-3xl px-4 mx-auto h-64 relative overflow-x-hidden">
                    <div className="absolute bottom-0">
                        <h1 className="text-3xl md:text-5xl font-bold text-white">
                            At a glance: <span className="font-light">OpenSea</span>
                        </h1>
                    </div>
                </div>


            </div>
            <div className="max-w-3xl px-4 mx-auto mt-6 pb-8">
                <div className="flex justify-start items-center space-x-8 mb-8">

                    <div>
                        <div className="font-bold">
                            Industry
                        </div>
                        Blockchain
                    </div>

                    <div>
                        <div className="font-bold">
                            Year
                        </div>
                        2019
                    </div>

                    <div>
                        <div className="font-bold">
                            Contact
                        </div>
                        hello@opensea.io
                    </div>

                    <div>
                        <div className="font-bold">
                            Website
                        </div>
                        <a href="https://opensea.io" className="hover:text-blue-600 text-blue-500 focus:underline">opensea.io</a>
                    </div>

                </div>


                <div>
                    <span className="font-bold">Mission Statement:</span> We're building tools that allow consumers to trade their assets freely, creators to launch new digital works, and developers to build rich, integrated marketplaces for their digital assets.
                </div>

                <div className="mt-4">
                    <span className="font-bold">Description:</span> OpenSea is a peer-to-peer marketplace for crypto collectibles and non-fungible tokens. It includes collectibles, gaming items, and other virtual goods backed by a blockchain. On OpenSea, anyone can buy or sell these items through a smart contract.
                </div>

            </div>
            <div className="top-48 left-20 absolute">
                            <img src={opensea.src} className="h-32 w-32 mx-auto rounded-full border-4 border-white" />
                        </div>
        </div>
    )
}