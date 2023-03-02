import { StringLike } from "@firebase/util";

type Degree = {
    type: string;
    school: string;
    concentration: string;
    year: string;
}

export type User = {
    id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    residence?: string;
    education?: Degree[];
    profilePicture?: string;
    resume?: string;
    linkedin?: string;
    websites?: string[];
    type?: string[];
    addtionalInfo?: string;
    industry?: string;
    companyWebsite?: string;
    jobsInfo?: string;
    myStartup?: string;
    expertise?: string[];
    expertiseAdditional?: string;
    lookingFor?: string;
    lookingForAdditional?: string;
    seekingExpertise?: string[];
    seekingExpertiseAdditional?: string;
    reasonContacted?: string[];
    reasonContactedAdditional?: string;
    brownAffilitation?: string[];
    brownAffilitationOther?: string[];
}

type Founder = {
    firstName: string;
    lastName: string;
}

export type Startup = {
    name: string;
    yearFounded: number;
    industry: string;
    founders: Founder[];
    currentStage: string;
    size: number;
    location: string;
    description: string;
    missionStatement: string;
    logo: string,
    additionalMedia: string[],
    accentColor: string,
    website: string,
    twitter: string,
    linkedin: string,
    facebook: string,
    instagram: string

}
