type Degree = {
    type: string;
    school: string;
    concentration: string;
    year: string;
}

export type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    residence: string;
    education: Degree[];
    profilePicture: string;
    resume: string;
    linkedin: string;
    websites: string[];
    type: string[];
    addtionalInfo: string;
    industry: string;
    companyWebsite: string;
    jobsInfo: string;
    myStartup: string;
    expertise: string[];
    expertiseAddional: string;
    lookingFor: string;
    lookingForAdditional: string;
    seekingExpertise: string[];
    seekingExpertiseAdditional: string;
    reasonContacted: string[];
    reasonContactedAdditional: string;
    brownAffilitation: string[];
    brownAffilitationOther: string[];


}