interface Option {
    value: string,
    label: string
}

const industry_or_skills = `Entrepreneurship
Healthcare
Education
Marketing
Sales
Venture capital
Fintech
Entertainment
Consulting
E-commerce
Media
Retail
Investment Banking
Real Estate
Visual Design
Biohacking
Crypto
Machine Learning/AI
Product Design
Software Development
Quantitative Finance
VR/AR
Product Management
Robotics
Social impact
Diversity and inclusion
Photography
Fitness
Culinary Arts
Music
Film
Writing
Sports
Other`

let affiliations: Option[] = [
	{value: "alumni", label: "Alumni"},
	{value: "current-student", label: "Current Student"},
	{value: "faculty/staff", label: "Faculty/Staff"},
	{value: "parent/guardian/family-member", label: "Parent/Guardian/Family Member"},
	{value: "other", label: "Other"}
]

let roles: Option[] = [
	{value: "co-founder", label: "Co-Founder"},
	{value: "investor-(angel/early-stage)", label: "Investor (Angel/Early Stage)"},
	{value: "investor-(vc/later-stage)", label: "Investor (VC/Later Stage)"},
	{value: "subject-matter-expert-(equity-advisor)", label: "Subject Matter Expert (Equity Advisor)"},
	{value: "subject-matter-expert-(expert-interviews)", label: "Subject Matter Expert (Expert Interviews)"},
	{value: "seasoned-board-member", label: "Seasoned Board Member"},
	{value: "mentor", label: "Mentor"},
	{value: "interviewee-(customer-discovery)", label: "Interviewee (Customer Discovery)"},
	{value: "beta-tester", label: "Beta Tester"},
	{value: "startup-employees/interns", label: "Startup Employees/Interns"},
	{value: "other", label: "Other"}
]

let degreeTypes: Option[] = [
	{value: "associates", label: "Associates"},
	{value: "bachelors", label: "Bachelors"},
	{value: "masters", label: "Masters"},
	{value: "doctorate", label: "Doctorate"},
	{value: "postdoctoral-studies", label: "Postdoctoral Studies"},
	{value: "technical-diploma", label: "Technical Diploma"}
]

let industryList: Option[] = []

industry_or_skills.split("\n").forEach(industry => {
	const industryOp: Option = {value: industry.toLowerCase().replaceAll(" ", "-"), label: industry}
    industryList.push(industryOp)
})

export {roles}
export {industryList}
export {affiliations}
export {degreeTypes}