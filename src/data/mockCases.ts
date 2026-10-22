import { PatientCase } from '../types/healthcare';

export const INITIAL_PATIENT_CASES: PatientCase[] = [
  {
    id: 'CASE-2026-081',
    patientId: 'PT-94102',
    persona: 'Spanish-Speaking Post-CABG Patient',
    age: 68,
    gender: 'Male',
    language: 'Spanish (LEP)',
    visitType: 'Inpatient',
    serviceLine: 'Cardiology & Heart Center',
    roomOrClinic: 'Telemetry 4W, Bed 412',
    encounterDate: '2026-10-18',
    satisfactionScore: 3,
    communicationRating: 1,
    followUpCompliance: 'Non-Compliant',
    portalUsage: 'Non-User',
    readmissionRisk: 'Critical',
    source: 'Discharge Follow-Up',
    patientComment:
      "My daughter had to translate the papers when I left because no Spanish doctor was there. The paper says take Lasix twice a day, but the pharmacy bottle says once a day. I don't know which one is right and my legs are swelling up. We called the clinic twice and nobody called back in Spanish.",
    agent1: {
      theme: 'Discharge / Follow-Up',
      sentiment: 'Negative',
      reasoning:
        "The patient describes conflicting discharge medication instructions and an inability to reach bilingual care providers, leading to immediate clinical complications (leg edema).",
      operationalIssue: 'Post-acute medication reconciliation failure combined with language interpreter absence at discharge.',
      riskOrBiasConcern:
        'Severe patient safety risk and Limited English Proficiency (LEP) equity failure. Risk of acute heart failure exacerbation and emergency readmission.',
      recommendedAction:
        'Immediately dispatch an outpatient cardiac nurse with a certified medical Spanish interpreter for urgent home or telehealth medication reconciliation today.',
    },
    agent2: {
      primaryTheme: 'Discharge / Follow-Up',
      secondaryThemes: ['Accessibility / Equity', 'Communication', 'Patient Safety'],
      operationalBottleneck: 'Discharge workflow did not enforce certified medical interpreter protocol or bilingual discharge pharmacy verification.',
      equityAndAccessibilityReview:
        'Critical Limited English Proficiency (LEP) concern flagged. Relying on adult daughter for complex cardiac medication discharge violates organizational language access policies.',
      riskAssessment: {
        patientSafety: 'High',
        reputational: 'Moderate',
        compliance: 'High',
        equity: 'High',
      },
      managerialRecommendation:
        'Mandate an EHR hard-stop requiring certified medical interpreter sign-off on discharge summaries for all LEP patients before bed release.',
    },
    agent3: {
      primaryCategory: 'Patient Safety',
      secondaryCategories: ['Communication', 'Discharge / Follow-Up', 'Clinical Care'],
      severityLevel: 'LEVEL 4 – Critical',
      severityReason:
        'Immediate patient safety risk due to medication confusion (diuretic dosing discrepancy) resulting in symptomatic peripheral edema and potential cardiac decompensation.',
      risksDetected: [
        { riskType: 'Patient Safety Risk', explanation: 'Potential congestive heart failure crisis due to unverified diuretic regimen.' },
        { riskType: 'Compliance Risk', explanation: 'Title VI Civil Rights Act non-compliance regarding meaningful language access for LEP patients.' },
        { riskType: 'Clinical Risk', explanation: 'Unmonitored fluid overload following recent coronary artery bypass grafting.' },
      ],
      escalationRoute: 'Physician Leadership',
      humanInterventionRequired: true,
      slaTarget: '< 2 Hours (Immediate)',
    },
    agent4: {
      mainProblem: 'Unreconciled cardiac discharge medication orders compounded by language access barrier, inducing acute fluid retention.',
      secondaryProblems: ['Unresponsive outpatient clinic callback queue', 'Digital portal exclusion for non-English speaker'],
      managementPriority: 'High',
      priorityReasoning:
        'Combines severe clinical risk of imminent 30-day readmission with regulatory non-compliance in language services.',
      recommendedActions: [
        'Initiate immediate clinical outreach by bilingual cardiology practitioner within 2 hours.',
        'Review pharmacy-to-discharge EHR documentation bridge for Cardiology 4W.',
      ],
      patientSafetyOrEquityConcerns: 'Acute medication error risk, LEP equity barrier, lack of translated discharge literature.',
      humanReviewNeeded: true,
      humanReviewRationale: 'High clinical risk of acute heart failure readmission and documented communication failure require immediate physician leadership oversight.',
      aiRiskFlags: {
        hallucinationRisk: 'Low: Facts directly derived from documented discharge notes, pharmacy labels, and patient verbatim complaint.',
        biasReview: 'Bias Review Completed: Language barrier directly contributed to unequal discharge quality.',
        humanReviewRequired: 'Human Review Mandatory: Direct clinical intervention needed to prevent decompensation.',
      },
    },
    status: 'Escalated',
    assignedTo: 'Dr. Elena Ramos (Chief Medical Officer)',
  },
  {
    id: 'CASE-2026-082',
    patientId: 'PT-88319',
    persona: 'Elderly Oncology Patient (Living Alone)',
    age: 74,
    gender: 'Female',
    language: 'English',
    visitType: 'Outpatient',
    serviceLine: 'Oncology / Cancer Center',
    roomOrClinic: 'Infusion Suite B',
    encounterDate: '2026-10-19',
    satisfactionScore: 4,
    communicationRating: 2,
    followUpCompliance: 'Partial',
    portalUsage: 'Authentication Failure',
    readmissionRisk: 'Moderate',
    source: 'Patient Portal Message',
    patientComment:
      "I was locked out of my MyChart portal for five days because of the two-factor phone code. I live alone in a rural area with spotty cell service so the text codes never arrived. I needed my pre-chemotherapy blood counts to know if I should take the 45-minute bus ride. The tech support hotline put me on hold for 55 minutes and hung up.",
    agent1: {
      theme: 'Technology / Patient Portal',
      sentiment: 'Negative',
      reasoning:
        "The comment focuses on digital authentication barriers (MFA failure due to rural cellular dead zones) and unhelpful IT support preventing access to vital lab values.",
      operationalIssue: 'Inflexible patient portal multi-factor authentication (MFA) protocols and understaffed digital support helpline.',
      riskOrBiasConcern:
        'Over-automation and digital exclusion impacting rural seniors. Risk of delayed oncology therapy or wasted patient travel.',
      recommendedAction:
        'Provide fallback authentication alternatives (voice call / trusted proxy / clinic verification) and establish an expedited oncology patient tech support line.',
    },
    agent2: {
      primaryTheme: 'Technology / Patient Portal',
      secondaryThemes: ['Accessibility / Equity', 'Wait Time', 'Scheduling'],
      operationalBottleneck: 'Digital front door bottleneck: lack of cellular-independent authentication for rural chemotherapy patients.',
      equityAndAccessibilityReview:
        'Rural geographic and digital literacy equity flags. Older adults with limited cellular connectivity face structural barriers accessing EHR results.',
      riskAssessment: {
        patientSafety: 'Moderate',
        reputational: 'Moderate',
        compliance: 'Low',
        equity: 'High',
      },
      managerialRecommendation:
        'Deploy a dedicated Oncology Patient Digital Navigator to proactively assist seniors with portal access before scheduled infusion cycles.',
    },
    agent3: {
      primaryCategory: 'Technology / Patient Portal',
      secondaryCategories: ['Accessibility Risk', 'Communication', 'Wait Time'],
      severityLevel: 'LEVEL 2 – Moderate',
      severityReason:
        'Significant patient distress and logistical disruption caused by repeated IT authentication failures and extended phone wait times.',
      risksDetected: [
        { riskType: 'Accessibility Risk', explanation: 'Rural connectivity barrier excluding senior cancer patient from timely diagnostic information.' },
        { riskType: 'Operational Risk', explanation: '55-minute IT support abandonment rate creates unnecessary clinical staff phone overhead.' },
      ],
      escalationRoute: 'Information Technology',
      humanInterventionRequired: true,
      slaTarget: '< 24 Hours (Urgent)',
    },
    agent4: {
      mainProblem: 'Multi-factor authentication failure stranded rural oncology patient without critical pre-infusion laboratory results.',
      secondaryProblems: ['Unacceptable IT helpdesk hold duration (55 min)', 'Lack of alternative communication backup'],
      managementPriority: 'Medium',
      priorityReasoning:
        'Interferes with oncology care continuity for vulnerable senior patient; high equity risk for rural patient population.',
      recommendedActions: [
        'Instruct Oncology Clinic Coordinator to verbally verify CBC lab results with patient by phone.',
        'Direct Health IT to implement email/voice OTP or app-based authenticator options.',
      ],
      patientSafetyOrEquityConcerns: 'Digital exclusion of rural older adults; potential chemotherapy delay if lab clearance is stalled.',
      humanReviewNeeded: true,
      humanReviewRationale: 'Ensure cancer therapy appointment schedule is preserved and patient receives lab clearance promptly.',
      aiRiskFlags: {
        hallucinationRisk: 'Low: Technical logs corroborate 5 failed MFA attempts and abandoned helpdesk call.',
        biasReview: 'Bias Review: Algorithmic MFA requirement unfairly disadvantages patients in non-5G rural zones.',
        humanReviewRequired: 'Human Review Needed: IT coordinator and Oncology nurse manager must touch base.',
      },
    },
    status: 'In Review',
    assignedTo: 'Marcus Vance (Director of Health IT & Informatics)',
  },
  {
    id: 'CASE-2026-083',
    patientId: 'PT-62904',
    persona: 'Working Parent with Toddler',
    age: 32,
    gender: 'Female',
    language: 'English',
    visitType: 'Emergency',
    serviceLine: 'Emergency Department',
    roomOrClinic: 'Pediatric Waiting Zone B',
    encounterDate: '2026-10-19',
    satisfactionScore: 2,
    communicationRating: 1,
    followUpCompliance: 'Compliant',
    portalUsage: 'Occasional',
    readmissionRisk: 'Moderate',
    source: 'Patient Survey',
    patientComment:
      "We sat in the pediatric emergency waiting room for 6 hours and 40 minutes with my 2-year-old running a 103.8°F fever. Nobody came to check his vitals after triage. When I asked the desk nurse if we could get an ice pack or water, she told me: 'Everyone here is waiting, sit down and don't badger us.' We almost walked out without being seen.",
    agent1: {
      theme: 'Wait Time',
      sentiment: 'Negative',
      reasoning:
        "The primary grievance is the extreme 6.5+ hour unmonitored delay in the ED waiting area, intensified by abrasive and dismissive staff communication.",
      operationalIssue: 'Emergency Department pediatric throughput bottleneck and absence of waiting-room re-triage monitoring.',
      riskOrBiasConcern:
        'Direct patient safety concern: high pediatric fever without repeat vitals carries risk of febrile seizure or undetected septic decline.',
      recommendedAction:
        'Institute a mandatory 90-minute pediatric re-triage protocol and debrief the triage nursing team on de-escalation communication.',
    },
    agent2: {
      primaryTheme: 'Wait Time',
      secondaryThemes: ['Communication', 'Patient Safety', 'Staff Conduct'],
      operationalBottleneck: 'ED boarding and staffing deficit in Pediatric Fast-Track, leading to unmonitored waiting room queues.',
      equityAndAccessibilityReview:
        'Pediatric vulnerability: non-verbal infants and toddlers cannot self-advocate; reliance on anxious parents requires proactive clinical empathy.',
      riskAssessment: {
        patientSafety: 'High',
        reputational: 'High',
        compliance: 'Moderate',
        equity: 'Low',
      },
      managerialRecommendation:
        'Implement an automated waiting room alert for pediatric patients waiting over 2 hours without vital signs update.',
    },
    agent3: {
      primaryCategory: 'Wait Time',
      secondaryCategories: ['Staff Conduct', 'Patient Safety', 'Communication'],
      severityLevel: 'LEVEL 3 – High',
      severityReason:
        'Prolonged unmonitored delay for high pediatric fever creates clinical deterioration risk, exacerbated by unsupportive staff conduct.',
      risksDetected: [
        { riskType: 'Patient Safety Risk', explanation: 'Pediatric patient with fever >103.5°F unmonitored for >6 hours.' },
        { riskType: 'Reputational Risk', explanation: 'Extreme Left Without Being Seen (LWBS) risk and public complaint risk.' },
      ],
      escalationRoute: 'Nursing Leadership',
      humanInterventionRequired: true,
      slaTarget: '< 24 Hours (Urgent)',
    },
    agent4: {
      mainProblem: 'Critical pediatric ED throughput delay (>6.5 hours) with failure of intermediate safety checks and dismissive staff conduct.',
      secondaryProblems: ['Lack of basic waiting-room amenities (water/ice)', 'Staff compassion fatigue under surge volume'],
      managementPriority: 'High',
      priorityReasoning:
        'Pediatric safety risk is acute; risk of febrile complication and high probability of adverse event or regulatory complaint.',
      recommendedActions: [
        'Review ED nurse staffing and implement a designated Waiting Room Liaison Nurse during peak hours (3 PM - 11 PM).',
        'Nurse Manager to conduct 1-on-1 coaching with triage desk staff on empathetic communication.',
      ],
      patientSafetyOrEquityConcerns: 'Risk of pediatric clinical deterioration while waiting; hostile communication discouraging parent questions.',
      humanReviewNeeded: true,
      humanReviewRationale: 'Nurse executive review required to assess ED pediatric triage compliance logs for that shift.',
      aiRiskFlags: {
        hallucinationRisk: 'Low: Timestamp logs confirm 402 minutes elapsed between triage and room assignment.',
        biasReview: 'Low bias indicator.',
        humanReviewRequired: 'Human Review Confirmed: Mandatory for ED leadership review.',
      },
    },
    status: 'Open',
    assignedTo: 'Sarah Jenkins, RN (Director of Emergency Nursing)',
  },
  {
    id: 'CASE-2026-084',
    patientId: 'PT-45120',
    persona: 'Orthopedic Spine Surgery Patient',
    age: 54,
    gender: 'Male',
    language: 'English',
    visitType: 'Day Surgery',
    serviceLine: 'Orthopedics & Spine',
    roomOrClinic: 'Ambulatory Surgery Center OR 3',
    encounterDate: '2026-10-15',
    satisfactionScore: 3,
    communicationRating: 2,
    followUpCompliance: 'Compliant',
    portalUsage: 'Frequent User',
    readmissionRisk: 'Low',
    source: 'Grievance / Formal Complaint',
    patientComment:
      "I was told before my spinal fusion surgery that everything was pre-approved and in-network with Blue Cross. Today I received a surprise bill for $4,850 from an 'assistant surgeon' I never met or authorized. When I called the billing office, the agent said 'It's your responsibility to check every provider in the OR room.' This feels predatory under the No Surprises Act.",
    agent1: {
      theme: 'Billing',
      sentiment: 'Negative',
      reasoning:
        "The grievance centers on a surprise medical bill for an out-of-network surgical assistant during a planned in-network surgery, and defensive billing staff response.",
      operationalIssue: 'Financial clearance breakdown and non-compliance with the federal No Surprises Act disclosure rules.',
      riskOrBiasConcern:
        'Compliance and legal exposure under federal balance billing regulations; financial toxicity for surgical patient.',
      recommendedAction:
        'Suspend collection activity on the account immediately and audit surgical assistant contracting agreements.',
    },
    agent2: {
      primaryTheme: 'Billing',
      secondaryThemes: ['Staff Conduct', 'Communication'],
      operationalBottleneck: 'Pre-service financial clearance failed to notify patient of non-network assistant surgeon assignment.',
      equityAndAccessibilityReview:
        'Financial equity review: unexpected multi-thousand dollar balance bills cause acute financial hardship for insured working-class patients.',
      riskAssessment: {
        patientSafety: 'Low',
        reputational: 'High',
        compliance: 'High',
        equity: 'Moderate',
      },
      managerialRecommendation:
        'Enforce strict facility-level No Surprises Act protocols ensuring all OR surgical assistants adhere to in-network contracted rates.',
    },
    agent3: {
      primaryCategory: 'Billing',
      secondaryCategories: ['Compliance Risk', 'Staff Conduct', 'Communication'],
      severityLevel: 'LEVEL 3 – High',
      severityReason:
        'Substantial financial dispute ($4,850) citing federal No Surprises Act violations with potential regulatory reporting or litigation.',
      risksDetected: [
        { riskType: 'Compliance Risk', explanation: 'Potential violation of federal No Surprises Act / balance billing ban in facility setting.' },
        { riskType: 'Reputational Risk', explanation: 'Legal grievance potential and adverse consumer protection agency reporting.' },
      ],
      escalationRoute: 'Revenue Cycle / Billing',
      humanInterventionRequired: true,
      slaTarget: '< 24 Hours (Urgent)',
    },
    agent4: {
      mainProblem: 'Out-of-network assistant surgeon billing dispute on elective in-network spinal surgery violating patient expectations.',
      secondaryProblems: ['Adverse billing customer service interaction', 'Lack of transparent OR staffing disclosure'],
      managementPriority: 'High',
      priorityReasoning:
        'Regulatory exposure under federal billing law and acute reputational damage if escalated to state insurance commissioner.',
      recommendedActions: [
        'Revenue Cycle VP to hold billing statement and recalculate patient liability using in-network cost-sharing benchmarks.',
        'Review Ambulatory Surgery Center credentialing contracts to eliminate uncontracted surgical assistants in scheduled cases.',
      ],
      patientSafetyOrEquityConcerns: 'Severe financial toxicity; patient trust erosion in surgical care team.',
      humanReviewNeeded: true,
      humanReviewRationale: 'Requires Revenue Cycle Director and Compliance Officer joint sign-off.',
      aiRiskFlags: {
        hallucinationRisk: 'Low: Billing record #B-9921 shows $4,850 charge pending patient collection.',
        biasReview: 'Standard consumer protection review.',
        humanReviewRequired: 'Human Review Mandatory: Regulatory compliance verification.',
      },
    },
    status: 'In Review',
    assignedTo: 'Arthur Sterling (VP of Revenue Cycle)',
  },
  {
    id: 'CASE-2026-085',
    patientId: 'PT-31084',
    persona: 'Inpatient Telemetry Patient (Privacy Incident)',
    age: 41,
    gender: 'Female',
    language: 'English',
    visitType: 'Inpatient',
    serviceLine: 'Inpatient / Med-Surg',
    roomOrClinic: 'Tower 6, Room 618',
    encounterDate: '2026-10-17',
    satisfactionScore: 1,
    communicationRating: 1,
    followUpCompliance: 'Unknown',
    portalUsage: 'Frequent User',
    readmissionRisk: 'Moderate',
    source: 'Grievance / Formal Complaint',
    patientComment:
      "A nurse or clerk sent my complete psychiatric evaluation and inpatient progress notes to my ex-husband's email address through the patient portal proxy system! He has a restraining order against him and hasn't been my proxy for two years. He texted me mocking my medication and diagnosis. This is an outrageous HIPAA violation and puts my personal safety in jeopardy.",
    agent1: {
      theme: 'Clinical Care',
      sentiment: 'Negative',
      reasoning:
        "Severe breach of patient confidential medical and psychiatric records sent to an unauthorized third party with a restraining order.",
      operationalIssue: 'Patient portal proxy relationship management failure and failure to audit legacy proxy permissions upon admission.',
      riskOrBiasConcern:
        'Immediate personal safety risk and severe HIPAA Privacy Rule violation involving sensitive behavioral health records.',
      recommendedAction:
        'Immediately revoke all portal proxy linkages for the account and trigger an urgent HIPAA Breach Notification investigation with Legal and Compliance.',
    },
    agent2: {
      primaryTheme: 'Mixed or Ambiguous',
      secondaryThemes: ['Patient Safety', 'Technology / Patient Portal', 'Clinical Care'],
      operationalBottleneck: 'EHR proxy delegation did not synchronize with legal restraining order documentation entered in registration.',
      equityAndAccessibilityReview:
        'Interpersonal violence / domestic safety flag: vulnerable patient whose physical safety is compromised by systemic data handling failures.',
      riskAssessment: {
        patientSafety: 'High',
        reputational: 'High',
        compliance: 'High',
        equity: 'High',
      },
      managerialRecommendation:
        'Implement an automated mandatory verification of portal proxy permissions at every inpatient admission.',
    },
    agent3: {
      primaryCategory: 'Privacy or Security',
      secondaryCategories: ['Patient Safety', 'Staff Conduct', 'Technology / Patient Portal'],
      severityLevel: 'LEVEL 4 – Critical',
      severityReason:
        'Critical HIPAA violation involving sensitive psychiatric records disclosed to an unauthorized individual subject to a protective order, creating immediate physical safety concerns.',
      risksDetected: [
        { riskType: 'Privacy Risk', explanation: 'Unauthorized disclosure of protected health information (PHI) including psychiatric consultation.' },
        { riskType: 'Patient Safety Risk', explanation: 'Recipient holds active restraining order; potential stalking or harm.' },
        { riskType: 'Compliance Risk', explanation: 'Federal OCR HIPAA breach reportable within statutory deadlines.' },
      ],
      escalationRoute: 'Risk Management',
      humanInterventionRequired: true,
      slaTarget: '< 2 Hours (Immediate)',
    },
    agent4: {
      mainProblem: 'Catastrophic HIPAA privacy breach: behavioral health records disclosed to unauthorized estranged party with active restraining order.',
      secondaryProblems: ['Disconnection between legal safety flags and portal proxy permissions', 'Severe breach of patient trust'],
      managementPriority: 'High',
      priorityReasoning:
        'Critical organizational liability, potential patient physical endangerment, and mandatory federal reporting under OCR guidelines.',
      recommendedActions: [
        'Risk Management to coordinate immediate patient safety plan and offer hospital security support.',
        'Chief Information Security Officer to disable unauthorized proxy credentials and preserve EHR access audit logs.',
        'Executive Leadership briefing within 4 hours.',
      ],
      patientSafetyOrEquityConcerns: 'Direct patient physical and psychological safety endangerment; privacy failure under 45 CFR § 164.502.',
      humanReviewNeeded: true,
      humanReviewRationale: 'Critical safety breach requiring C-suite, Legal Counsel, and Privacy Officer direct involvement.',
      aiRiskFlags: {
        hallucinationRisk: 'Low: Audit trail records proxy access by external email at 14:22 EST.',
        biasReview: 'High vigilance: domestic violence survivors require strict data confidentiality safeguards.',
        humanReviewRequired: 'Human Review Mandatory: Executive and legal intervention.',
      },
    },
    status: 'Escalated',
    assignedTo: 'Claire Bennett (Chief Compliance & Privacy Officer)',
  },
  {
    id: 'CASE-2026-086',
    patientId: 'PT-19403',
    persona: 'Wheelchair User (Post-Polio Syndrome)',
    age: 79,
    gender: 'Male',
    language: 'English',
    visitType: 'Outpatient',
    serviceLine: 'Primary Care & Family Medicine',
    roomOrClinic: 'Downtown Health Pavilion Clinic 2',
    encounterDate: '2026-10-16',
    satisfactionScore: 4,
    communicationRating: 2,
    followUpCompliance: 'Partial',
    portalUsage: 'Occasional',
    readmissionRisk: 'Low',
    source: 'Patient Survey',
    patientComment:
      "I arrived for my physical therapy appointment in my motorized wheelchair, but the concrete access ramp was blocked by facilities renovation ladders and trash bins. The clinic receptionist told me 'We cannot help you lift that chair, you should reschedule for next month.' Missing my therapy sets back my balance recovery by weeks.",
    agent1: {
      theme: 'Accessibility / Equity',
      sentiment: 'Negative',
      reasoning:
        "Physical access barrier (blocked ADA ramp) and lack of assistance resulting in denied therapy appointment and dismissal by clinic staff.",
      operationalIssue: 'Facility contractor oversight failing to maintain accessible paths of travel, coupled with poor clinic customer service.',
      riskOrBiasConcern:
        'Americans with Disabilities Act (ADA) Title III compliance violation and ableist bias in patient encounter handling.',
      recommendedAction:
        'Clear access pathways immediately, inspect all facility access ramps daily, and provide immediate same-week reschedule with transport assistance.',
    },
    agent2: {
      primaryTheme: 'Accessibility / Equity',
      secondaryThemes: ['Scheduling', 'Staff Conduct'],
      operationalBottleneck: 'Uncoordinated contractor maintenance blocking accessible building ingress routes without barrier-free detour signage.',
      equityAndAccessibilityReview:
        'Severe physical disability equity violation. Denying healthcare access to a wheelchair user due to facility clutter breaches ADA obligations.',
      riskAssessment: {
        patientSafety: 'Moderate',
        reputational: 'High',
        compliance: 'High',
        equity: 'High',
      },
      managerialRecommendation:
        'Direct facilities management to establish 24/7 barrier-free access audits and mandate disability sensitivity training for front desk receptionists.',
    },
    agent3: {
      primaryCategory: 'Other',
      secondaryCategories: ['Accessibility Risk', 'Staff Conduct', 'Scheduling'],
      severityLevel: 'LEVEL 3 – High',
      severityReason:
        'Serious physical accessibility barrier and refusal of service violating ADA regulations and impacting rehabilitative care continuity.',
      risksDetected: [
        { riskType: 'Accessibility Risk', explanation: 'Complete physical blockage of sole wheelchair ingress ramp.' },
        { riskType: 'Compliance Risk', explanation: 'ADA Title III accessibility violation with potential Department of Justice complaint.' },
      ],
      escalationRoute: 'Accessibility Coordinator',
      humanInterventionRequired: true,
      slaTarget: '< 24 Hours (Urgent)',
    },
    agent4: {
      mainProblem: 'Blocked ADA wheelchair ramp prevented elderly disabled patient from receiving necessary physical therapy.',
      secondaryProblems: ['Dismissive receptionist response instructing patient to delay care by a month', 'Lack of detour signage'],
      managementPriority: 'High',
      priorityReasoning:
        'Direct violation of disability access regulations and avoidable disruption of chronic rehabilitation therapy.',
      recommendedActions: [
        'Dispatch Clinic Operations Manager to inspect and clear ramp immediately.',
        'Reschedule patient within 48 hours and provide complimentary accessible medical transport voucher.',
      ],
      patientSafetyOrEquityConcerns: 'Risk of mobility deconditioning and falls; disability equity infringement.',
      humanReviewNeeded: true,
      humanReviewRationale: 'Requires Accessibility Coordinator and Facilities Director review of contractor safety plans.',
      aiRiskFlags: {
        hallucinationRisk: 'Low: Incident logged by clinic security guard at 10:15 AM.',
        biasReview: 'Accessibility Equity Flag: Implicit bias in assuming disabled patients can casually reschedule essential care.',
        humanReviewRequired: 'Human Review Needed.',
      },
    },
    status: 'In Review',
    assignedTo: 'Rachel Diaz (ADA & Patient Accessibility Officer)',
  },
  {
    id: 'CASE-2026-087',
    patientId: 'PT-55219',
    persona: 'Postpartum Mother (First-time Parent)',
    age: 28,
    gender: 'Female',
    language: 'English',
    visitType: 'Inpatient',
    serviceLine: 'Women & Infants / OB-GYN',
    roomOrClinic: 'Mother-Baby Unit 3East, Room 304',
    encounterDate: '2026-10-20',
    satisfactionScore: 6,
    communicationRating: 3,
    followUpCompliance: 'Compliant',
    portalUsage: 'Frequent User',
    readmissionRisk: 'Low',
    source: 'Patient Survey',
    patientComment:
      "The day nurses Maria and Chloe were absolute angels—so patient teaching me how to breastfeed. However, at 2:30 AM during shift change, the night doctor walked in without knocking, turned on all the harsh overhead lights, woke the baby up, talked over my husband, and abruptly changed my pain medication without telling me why. It made an exhausting night terrifying.",
    agent1: {
      theme: 'Communication',
      sentiment: 'Mixed',
      reasoning:
        "Strongly positive sentiment regarding nursing care and lactation support, sharply contrasted with negative provider bedside conduct and unannounced medication alteration.",
      operationalIssue: 'Nocturnal bedside rounding etiquette failure and lack of shared decision-making during shift-change medication changes.',
      riskOrBiasConcern:
        'Communication breakdown causing acute postpartum maternal anxiety; medication modification without patient consent or explanation.',
      recommendedAction:
        'Review nighttime rounding standards (quiet hours, knock-before-entering) and mandate provider explanation for medication adjustments.',
    },
    agent2: {
      primaryTheme: 'Communication',
      secondaryThemes: ['Clinical Care', 'Staff Conduct'],
      operationalBottleneck: 'Inconsistent provider adoption of patient-centered nighttime rounding protocols on Mother-Baby units.',
      equityAndAccessibilityReview:
        'Maternal mental health review: postpartum mothers are especially vulnerable to sleep deprivation, heightened stress, and power imbalances in provider communication.',
      riskAssessment: {
        patientSafety: 'Low',
        reputational: 'Moderate',
        compliance: 'Low',
        equity: 'Low',
      },
      managerialRecommendation:
        'Institute standardized Mother-Baby quiet nighttime rounding guidelines (red-toned ambient lighting, verbal patient consent before entering).',
    },
    agent3: {
      primaryCategory: 'Staff Conduct',
      secondaryCategories: ['Communication', 'Clinical Care'],
      severityLevel: 'LEVEL 2 – Moderate',
      severityReason:
        'Patient distress and communication breakdown caused by disrespectful nighttime provider behavior and unexplained medication changes.',
      risksDetected: [
        { riskType: 'Reputational Risk', explanation: 'Negative word-of-mouth impacting obstetrics service line market reputation.' },
        { riskType: 'Operational Risk', explanation: 'Disjointed communication between night-shift physician and day nursing staff.' },
      ],
      escalationRoute: 'Physician Leadership',
      humanInterventionRequired: false,
      slaTarget: '3–5 Business Days',
    },
    agent4: {
      mainProblem: 'Discordant care experience: exemplary daytime nursing contrasted with disruptive, non-communicative nocturnal physician rounding.',
      secondaryProblems: ['Unexplained analgesic prescription change causing patient mistrust', 'Disruption of newborn sleep cycle'],
      managementPriority: 'Medium',
      priorityReasoning:
        'Affects HCAHPS provider communication domain scores and postpartum patient experience on high-volume maternity unit.',
      recommendedActions: [
        'OB-GYN Department Chair to discuss nighttime bedside manners and rounding etiquette at upcoming medical staff meeting.',
        'Send personalized commendation letters to nurses Maria and Chloe.',
      ],
      patientSafetyOrEquityConcerns: 'Postpartum vulnerability; patient autonomy regarding medication changes.',
      humanReviewNeeded: false,
      humanReviewRationale: 'Standard quality improvement and recognition workflow; no acute safety risk.',
      aiRiskFlags: {
        hallucinationRisk: 'Low: Clear narrative with identified staff and medication timeline.',
        biasReview: 'Low bias indicator.',
        humanReviewRequired: 'Routine managerial review.',
      },
    },
    status: 'In Review',
    assignedTo: 'Dr. Evelyn Morales (OB-GYN Medical Director)',
  },
  {
    id: 'CASE-2026-088',
    patientId: 'PT-73891',
    persona: 'Rural Veteran with COPD',
    age: 63,
    gender: 'Male',
    language: 'English',
    visitType: 'Telehealth',
    serviceLine: 'Telehealth / Virtual Care',
    roomOrClinic: 'Virtual Pulmonary Clinic',
    encounterDate: '2026-10-18',
    satisfactionScore: 2,
    communicationRating: 1,
    followUpCompliance: 'Non-Compliant',
    portalUsage: 'Occasional',
    readmissionRisk: 'High',
    source: 'Patient Portal Message',
    patientComment:
      "I drove 22 miles into town to sit at the public library parking lot because that's where I can get enough WiFi for the telehealth video. The hospital video system kept crashing and saying 'Reconnecting'. After 12 minutes the doctor hung up, marked me as a 'Patient No-Show', and the clinic sent me a $50 no-show fee! Now I have no inhaler refill and my breathing is getting tighter.",
    agent1: {
      theme: 'Technology / Patient Portal',
      sentiment: 'Negative',
      reasoning:
        "Platform stability failure over high-latency rural connections, combined with an automated punitive no-show penalty and stranded respiratory medication refill.",
      operationalIssue: 'Telehealth platform bandwidth sensitivity and rigid clinical no-show policy failing to account for digital infrastructure disparities.',
      riskOrBiasConcern:
        'Clinical risk: patient without maintenance COPD inhaler faces acute respiratory decompensation. Equity risk: penalizing rural patients for digital infrastructure deficits.',
      recommendedAction:
        'Waive the $50 fee immediately, implement an automatic telephone backup protocol when video fails, and coordinate an immediate inhaler refill.',
    },
    agent2: {
      primaryTheme: 'Technology / Patient Portal',
      secondaryThemes: ['Accessibility / Equity', 'Billing', 'Clinical Care'],
      operationalBottleneck: 'Virtual care workflow lacks graceful degradation to cellular audio call when video latency exceeds thresholds.',
      equityAndAccessibilityReview:
        'Rural broadband digital divide: rural patients face structural geography and internet access challenges; punishing them with no-show fees widens health disparities.',
      riskAssessment: {
        patientSafety: 'High',
        reputational: 'Moderate',
        compliance: 'Moderate',
        equity: 'High',
      },
      managerialRecommendation:
        'Adopt a "Phone-First Fallback" policy: if telehealth video drops for >3 minutes, clinicians are required to call patient directly on their telephone number.',
    },
    agent3: {
      primaryCategory: 'Technology / Patient Portal',
      secondaryCategories: ['Clinical Care', 'Billing', 'Accessibility Risk'],
      severityLevel: 'LEVEL 3 – High',
      severityReason:
        'Technical failure resulted in cancelled visit, punitive billing, and withheld essential pulmonary medication for a high-risk COPD patient.',
      risksDetected: [
        { riskType: 'Clinical Risk', explanation: 'Lack of bronchodilator/steroid inhaler refill in severe COPD risks emergency hospitalization.' },
        { riskType: 'Equity Risk', explanation: 'Unfair financial and clinical penalization of rural patient due to broadband deficit.' },
      ],
      escalationRoute: 'Physician Leadership',
      humanInterventionRequired: true,
      slaTarget: '< 24 Hours (Urgent)',
    },
    agent4: {
      mainProblem: 'Telehealth video failure resulted in inappropriate patient no-show classification, unwarranted fee, and lapsed COPD inhaler refill.',
      secondaryProblems: ['Absence of telephony fallback standard operating procedure', 'Unwarranted $50 no-show penalty'],
      managementPriority: 'High',
      priorityReasoning:
        'Direct clinical risk of severe COPD exacerbation plus inequitable punitive fee on rural patient.',
      recommendedActions: [
        'Pulmonology triage nurse to call patient immediately, verify clinical stability, and route 90-day inhaler refill to local pharmacy.',
        'Revenue cycle to void the $50 no-show fee and update policy to exclude dropped telehealth sessions from penalties.',
      ],
      patientSafetyOrEquityConcerns: 'Risk of acute respiratory failure / ED visit; rural health equity barrier.',
      humanReviewNeeded: true,
      humanReviewRationale: 'Immediate clinical review needed to authorize prescription refill and prevent emergency hospitalization.',
      aiRiskFlags: {
        hallucinationRisk: 'Low: Telehealth server connection log confirms 4 dropped packets and 11-minute attempt duration.',
        biasReview: 'Rural Equity Concern: Algorithmic no-show tagging unfairly penalizes geographic bandwidth limitations.',
        humanReviewRequired: 'Human Review Mandatory.',
      },
    },
    status: 'Open',
    assignedTo: 'Dr. Gregory House (Chief of Pulmonary Medicine)',
  },
];

export const SERVICE_LINES = [
  'Emergency Department',
  'Inpatient / Med-Surg',
  'Cardiology & Heart Center',
  'Oncology / Cancer Center',
  'Orthopedics & Spine',
  'Women & Infants / OB-GYN',
  'Pediatrics',
  'Ambulatory Surgery',
  'Primary Care & Family Medicine',
  'Telehealth / Virtual Care',
] as const;

export const FEEDBACK_THEMES = [
  'Communication',
  'Scheduling',
  'Wait Time',
  'Technology / Patient Portal',
  'Billing',
  'Clinical Care',
  'Discharge / Follow-Up',
  'Accessibility / Equity',
  'Mixed or Ambiguous',
] as const;

export const SEVERITY_LEVELS = [
  'LEVEL 1 – Low',
  'LEVEL 2 – Moderate',
  'LEVEL 3 – High',
  'LEVEL 4 – Critical',
] as const;

export const ROUTING_DESTINATIONS = [
  'Patient Experience Team',
  'Nursing Leadership',
  'Physician Leadership',
  'Quality Improvement Team',
  'Compliance Office',
  'Information Technology',
  'Revenue Cycle / Billing',
  'Accessibility Coordinator',
  'Risk Management',
  'Executive Review',
] as const;
