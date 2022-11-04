import { Label } from "@mui/icons-material"

const skillString = "Auditing,AutoCAD,Automotive,Art,Analytical Skills,Adobe Photoshop,Art Direction,Automation,Adobe Illustrator,Agile Methodologies,Business Analysis,Budgeting,,Business Strategy,,Business Process Improvement,Business Services,Business Planning,Branding,Business Intelligence,Business Process,Customer Service,Communication,Company Research,Change Management,Coaching,Construction,Customer Relationship Management,Contractual Agreements,Customer Satisfaction,Contract Negotiation,Design,Databases,Data Analysis,Digital Marketing,Decision Making,Digital Media,Drawing,Development Tools,Event Planning,Editing,Entrepreneurship,Email,Employee Benefits Design,Energy,Electronics,Enterprise Software,Ecommerce,Finance,Financial Analysis,Fundraising,Facility Management,Food and Beverage,Forecasting,Facilitation,Financial Risk,Financial Reporting,Government Agencies,Grocery,Graphic Design,Gas,Graphics,Grant Writing,General Ledger,HTML,Heavy Equipment,Hospitals,Higher Education,History,Healthcare,Hospitality Industry,Helping Clients Succeed,Healthcare Management,HTML5,Information Technology,Interpersonal Skills,Information Systems,Internal Audit,Integration,Insurance,Investments,Interviewing,Invoicing,Integrated Marketing,Java,Javascript,JQuery,Journalism,Job Scanning,Job Description Development,Journals,Joint Ventures,Key Performance Indicators,K12 Education,Knowledge Management,Kanban,Key Account Development,Knowledge Sharing,Knowledge Base,Kindergarten,Leadership,Logistics Management,Local Marketing,Legal Issues,Linux,Leadership Development,Laboratory Skills,Lean Manufacturing,Litigation,Legal Writing,Negotiation,Nonprofit Organizations,New Business Opportunities,Newsletters,New Hires,Network Communications,Network Administration,Network Systems,Network Attached Storage,Nutrition,Order Fulfillment,Online Advertising,Operating Systems,Organizational Development,Operations Management,Organizational Structure,Office Administration,Oracle Database,Outsourcing,Performance Tuning,Public Speaking,Project Planning,Program Management,Public Relations,Public Policy,Problem Solving,Partnerships,Presentations,Pricing Strategy,Qualitative Research,Queues,QuickBooks,Quality System,Quotations,Quality Auditing,Quantitative Research,Qualifying Prospects,Quality Improvement,Query Writing,Research,Retail,Recruiting,Real Estate,Reviews,Requirements Analysis,Range,Regulations,Residential Homes,Records,Strategic Planning,Social Media,Staff Development,Sales Management,Strategy,Software,Supervisory Skills,SQL,Software Documentation,Schedules,Training,Teamwork,Team Leadership,Teaching,Team Building,Testing,Time Management,Team Management,Troubleshooting,Telecommunications,Unix,User Interface Design,User Experience,Underwriting,Department of Defense,Unified Modeling Language,University Teaching,User Acceptance Testing,Vendor Management,Video,Video Production,Volunteering,Validation,Vendors,Volunteer Management,Video Editing,Visual Merchandising,Windows,Writing,Web Design,Web Development,Windows Server,Workshops,Web Applications,Water Resource Management,WordPress,Wireless Technologies,Marine Corps,Medical Compliance,Military Aviation,Military Weapons,Mechanical Engineering,Basketball,Football,Baseball,Swimming,Volleyball,Soccer,Gymnastics,Golf,Diving"

const skillArray = skillString.split(",")

const options: Option[] = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

interface Option {
    value: string,
    label: string
}

let opt: Option[] = []

skillArray.forEach(skill => {
    const op: Option = {value: skill.toLowerCase(), label: skill}
    opt.push(op)
})

const skills = opt

export {skills}

