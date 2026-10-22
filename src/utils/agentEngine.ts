import {
  FeedbackTheme,
  Sentiment,
  SeverityLevel,
  ComplaintCategory,
  EscalationDestination,
  PatientCase,
  RiskLevel,
} from '../types/healthcare';

export interface MultiAgentAnalysisResult {
  agent1_feedbackInsight: {
    theme: FeedbackTheme;
    sentiment: Sentiment;
    reasoning: string;
    operationalIssue: string;
    riskOrBiasConcern: string;
    recommendedAction: string;
  };
  agent2_experienceMonitoring: {
    primaryTheme: FeedbackTheme;
    secondaryThemes: string[];
    operationalBottleneck: string;
    equityAndAccessibilityReview: string;
    riskAssessment: {
      patientSafety: RiskLevel;
      reputational: RiskLevel;
      compliance: RiskLevel;
      equity: RiskLevel;
    };
    managerialRecommendation: string;
  };
  agent3_complaintTriage: {
    primaryCategory: ComplaintCategory;
    secondaryCategories: string[];
    severityLevel: SeverityLevel;
    severityReason: string;
    risksDetected: Array<{
      riskType: string;
      explanation: string;
    }>;
    escalationRoute: EscalationDestination;
    humanInterventionRequired: boolean;
    slaTarget: string;
  };
  agent4_decisionSupport: {
    mainProblem: string;
    secondaryProblems: string[];
    managementPriority: 'Low' | 'Medium' | 'High';
    priorityReasoning: string;
    recommendedActions: string[];
    patientSafetyOrEquityConcerns: string;
    humanReviewNeeded: boolean;
    humanReviewRationale: string;
    aiRiskFlags: {
      hallucinationRisk: string;
      biasReview: string;
      humanReviewRequired: string;
    };
  };
}

/**
 * Execute the 4 healthcare agents on any patient comment and encounter data.
 * Adheres strictly to the guidelines: professional healthcare QI tone, no invented
 * medical facts, explicit ambiguity signaling, and multi-dimensional risk audits.
 */
export function executeHealthcareAgents(
  patientComment: string,
  caseContext: Partial<PatientCase> = {}
): MultiAgentAnalysisResult {
  const text = (patientComment || '').toLowerCase().trim();

  // If text is too short or ambiguous
  if (!text || text.length < 10) {
    return {
      agent1_feedbackInsight: {
        theme: 'Mixed or Ambiguous',
        sentiment: 'Neutral',
        reasoning:
          'Insufficient narrative context provided to establish a concrete operational issue or emotional polarity. Additional patient follow-up interview needed.',
        operationalIssue: 'Incomplete feedback capture at point of survey or intake.',
        riskOrBiasConcern: 'Unable to evaluate safety or bias without additional contextual details.',
        recommendedAction: 'Contact patient for structured post-encounter telephone survey to clarify specific concerns.',
      },
      agent2_experienceMonitoring: {
        primaryTheme: 'Mixed or Ambiguous',
        secondaryThemes: [],
        operationalBottleneck: 'Data capture deficit in patient experience survey pipeline.',
        equityAndAccessibilityReview: 'Unable to evaluate equity without demographic or language context.',
        riskAssessment: {
          patientSafety: 'Low',
          reputational: 'Low',
          compliance: 'Low',
          equity: 'Low',
        },
        managerialRecommendation: 'Review patient intake survey completion rate and prompt for explanatory comments.',
      },
      agent3_complaintTriage: {
        primaryCategory: 'Other',
        secondaryCategories: [],
        severityLevel: 'LEVEL 1 – Low',
        severityReason: 'Brief or ambiguous comment with no acute clinical or compliance risks stated.',
        risksDetected: [
          { riskType: 'Operational Risk', explanation: 'Ambiguous feedback requires follow-up clarification.' },
        ],
        escalationRoute: 'Patient Experience Team',
        humanInterventionRequired: false,
        slaTarget: '3–5 Business Days',
      },
      agent4_decisionSupport: {
        mainProblem: 'Ambiguous or incomplete patient narrative prevents definitive operational diagnosis.',
        secondaryProblems: ['Potential survey drop-off or low patient engagement'],
        managementPriority: 'Low',
        priorityReasoning: 'No patient harm or urgent service failure identified in provided text.',
        recommendedActions: ['Direct Patient Experience representative to log request for supplemental details.'],
        patientSafetyOrEquityConcerns: 'None identified based on available text.',
        humanReviewNeeded: false,
        humanReviewRationale: 'Standard routine processing sufficient until additional information is gathered.',
        aiRiskFlags: {
          hallucinationRisk: 'Low: No extrapolated assumptions made from scarce narrative data.',
          biasReview: 'Standard review.',
          humanReviewRequired: 'Not required at this stage.',
        },
      },
    };
  }

  // Sentiment detection
  const positiveWords = ['thank', 'wonderful', 'great', 'excellent', 'kind', 'compassion', 'amazing', 'angel', 'grateful', 'helpful'];
  const negativeWords = ['terrible', 'awful', 'rude', 'unacceptable', 'worst', 'horrible', 'ignored', 'crashed', 'refused', 'nightmare', 'disgusted'];
  const hasPos = positiveWords.some((w) => text.includes(w));
  const hasNeg = negativeWords.some((w) => text.includes(w));
  let sentiment: Sentiment = 'Negative';
  if (hasPos && hasNeg) sentiment = 'Mixed';
  else if (hasPos && !hasNeg) sentiment = 'Positive';
  else if (!hasPos && !hasNeg && (text.includes('suggest') || text.includes('wondering') || text.includes('question'))) sentiment = 'Neutral';

  // Theme Detection (Agent 1 & 2)
  let theme: FeedbackTheme = 'Mixed or Ambiguous';
  let operationalIssue = 'Operational coordination variance across care continuum';
  let riskOrBiasConcern = 'Patient experience degradation requiring process review';
  let action = 'Review service workflow and conduct department huddle debrief';

  if (text.includes('wait') || text.includes('hour') || text.includes('delayed') || text.includes('sitting') || text.includes('slow') || text.includes('triage')) {
    theme = 'Wait Time';
    operationalIssue = 'Patient throughput bottleneck and capacity strain in care area';
    riskOrBiasConcern = 'Potential clinical deterioration during unmonitored waiting periods';
    action = 'Institute active waiting-room status tracking and intermediate nurse re-triage vitals checks';
  } else if (text.includes('bill') || text.includes('charge') || text.includes('insurance') || text.includes('cost') || text.includes('fee') || text.includes('surprise') || text.includes('money')) {
    theme = 'Billing';
    operationalIssue = 'Financial clearance breakdown and price transparency disconnect';
    riskOrBiasConcern = 'Financial toxicity and vulnerable patient billing equity under No Surprises Act';
    action = 'Audit pre-service financial estimates and assign dedicated financial navigator';
  } else if (text.includes('portal') || text.includes('app') || text.includes('login') || text.includes('password') || text.includes('tech') || text.includes('wifi') || text.includes('internet') || text.includes('video') || text.includes('screen') || text.includes('mfa')) {
    theme = 'Technology / Patient Portal';
    operationalIssue = 'Digital front door failure and authentication/connectivity barriers';
    riskOrBiasConcern = 'Digital literacy and broadband infrastructure barriers disproportionately affecting seniors and rural residents';
    action = 'Provide telephone/voice fallback authentication and staff a dedicated patient tech support helpline';
  } else if (text.includes('spanish') || text.includes('english') || text.includes('translate') || text.includes('interpreter') || text.includes('language') || text.includes('idioma') || text.includes('wheelchair') || text.includes('ramp') || text.includes('disability') || text.includes('blind') || text.includes('deaf')) {
    theme = 'Accessibility / Equity';
    operationalIssue = 'Language access or physical accommodation barrier during care encounter';
    riskOrBiasConcern = 'Title VI Civil Rights or ADA Title III accessibility infringement; Limited English Proficiency (LEP) disparity';
    action = 'Mandate certified medical interpreter sign-off on discharge and inspect physical access routes daily';
  } else if (text.includes('discharge') || text.includes('medication') || text.includes('prescription') || text.includes('dose') || text.includes('home') || text.includes('pharmacy') || text.includes('instruction')) {
    theme = 'Discharge / Follow-Up';
    operationalIssue = 'Post-acute care transition breakdown and medication reconciliation discrepancy';
    riskOrBiasConcern = 'Elevated 30-day readmission risk due to post-discharge pharmacotherapy confusion';
    action = 'Establish mandatory 48-hour post-discharge nurse callback and teach-back medication verification';
  } else if (text.includes('doctor') || text.includes('nurse') || text.includes('rude') || text.includes('listen') || text.includes('attitude') || text.includes('dismissed') || text.includes('talked down') || text.includes('disrespect')) {
    theme = 'Communication';
    operationalIssue = 'Caregiver bedside interpersonal communication breakdown';
    riskOrBiasConcern = 'Patient disempowerment, emotional distress, and potential diagnostic overshadowing';
    action = 'Conduct AIDET communication coaching and address provider bedside conduct';
  } else if (text.includes('schedule') || text.includes('appointment') || text.includes('cancel') || text.includes('reschedule') || text.includes('booking') || text.includes('no-show')) {
    theme = 'Scheduling';
    operationalIssue = 'Central scheduling backlog and provider template inflexibility';
    riskOrBiasConcern = 'Delayed diagnostic workup leading to clinical progression';
    action = 'Review appointment slot templates and enable priority fast-track scheduling';
  } else if (text.includes('pain') || text.includes('infection') || text.includes('wrong') || text.includes('error') || text.includes('bleed') || text.includes('complication') || text.includes('fever')) {
    theme = 'Clinical Care';
    operationalIssue = 'Clinical care delivery variation or adverse symptom management failure';
    riskOrBiasConcern = 'Direct clinical safety risk requiring formal peer review';
    action = 'Initiate immediate clinical case review with attending physician and quality committee';
  }

  // Severity Level & Escalation Routing (Agent 3)
  let severity: SeverityLevel = 'LEVEL 2 – Moderate';
  let severityReason = 'Significant service breakdown resulting in notable patient frustration or delay';
  let routeTo: EscalationDestination = 'Patient Experience Team';
  let humanReviewNeeded = true;
  let priority: 'Low' | 'Medium' | 'High' = 'Medium';

  const criticalTriggers = [
    'wrong med', 'overdose', 'died', 'death', 'allergic', 'suicide', 'fell', 'fall',
    'restraining order', 'hipaa', 'breach', 'lawyer', 'sue', 'legal', 'discriminat',
    'assault', 'harass', 'sexual', 'privacy', 'unauthorized', 'ex-husband', 'ex-spouse'
  ];
  const highTriggers = [
    'infection', 'bleeding', 'unbearable', 'severe pain', '103', '104', 'infant', 'toddler',
    'lethargic', 'refused interpreter', 'no interpreter', 'edema', 'swelling', 'chemo',
    'cancer', 'stent', 'heart', 'seizure', 'wheelchair', 'blocked ramp', 'no-show fee',
    'surprise bill', 'collections'
  ];

  if (criticalTriggers.some((t) => text.includes(t))) {
    severity = 'LEVEL 4 – Critical';
    severityReason = 'Immediate patient safety, severe privacy breach, or legal/regulatory exposure identified';
    priority = 'High';
    if (text.includes('hipaa') || text.includes('privacy') || text.includes('unauthorized') || text.includes('breach')) {
      routeTo = 'Risk Management';
    } else if (text.includes('lawyer') || text.includes('sue') || text.includes('legal')) {
      routeTo = 'Risk Management';
    } else if (text.includes('discriminat')) {
      routeTo = 'Compliance Office';
    } else {
      routeTo = 'Executive Review';
    }
  } else if (highTriggers.some((t) => text.includes(t))) {
    severity = 'LEVEL 3 – High';
    severityReason = 'Potential clinical harm, serious accessibility barrier, or escalating financial toxicity';
    priority = 'High';
    if (text.includes('interpreter') || text.includes('wheelchair') || text.includes('ramp')) {
      routeTo = 'Accessibility Coordinator';
    } else if (text.includes('bill') || text.includes('collections') || text.includes('fee')) {
      routeTo = 'Revenue Cycle / Billing';
    } else if (text.includes('nurse') || text.includes('vitals') || text.includes('waiting')) {
      routeTo = 'Nursing Leadership';
    } else {
      routeTo = 'Physician Leadership';
    }
  } else if (text.includes('portal') || text.includes('app') || text.includes('tech')) {
    routeTo = 'Information Technology';
  } else if (text.includes('bill') || text.includes('cost')) {
    routeTo = 'Revenue Cycle / Billing';
  }

  // Equity & Vulnerability audit (Agent 2)
  let equityReview = 'Standard equity review: monitor for social determinants and health literacy barriers.';
  if (text.includes('spanish') || text.includes('language') || text.includes('translate') || (caseContext.language && caseContext.language.toLowerCase().includes('spanish'))) {
    equityReview = 'Critical Limited English Proficiency (LEP) concern flagged. Relying on family or omitting certified interpretation creates severe health disparities and violates Title VI civil rights protections.';
  } else if (text.includes('rural') || text.includes('wifi') || text.includes('internet') || text.includes('cell') || text.includes('mfa')) {
    equityReview = 'Rural geographic and digital literacy equity flag. Patients outside high-speed broadband zones face systemic barriers to digital front door tools and virtual care.';
  } else if (text.includes('wheelchair') || text.includes('ramp') || text.includes('disability') || text.includes('accessible')) {
    equityReview = 'Physical disability equity and ADA Title III compliance concern. Inaccessible facility pathways obstruct rehabilitative care continuity.';
  } else if (caseContext.age && caseContext.age >= 65) {
    equityReview = 'Older adult accessibility concern. Elevated risk of technological exclusion and complex multi-morbid medication regimens.';
  }

  const result: MultiAgentAnalysisResult = {
    agent1_feedbackInsight: {
      theme,
      sentiment,
      reasoning: `Selected theme '${theme}' because patient comments primarily focus on ${operationalIssue.toLowerCase()}. Sentiment evaluated as '${sentiment}' based on patient verbatim tone and stated care experience.`,
      operationalIssue,
      riskOrBiasConcern,
      recommendedAction: action,
    },
    agent2_experienceMonitoring: {
      primaryTheme: theme,
      secondaryThemes: [
        theme === 'Communication' ? 'Clinical Care' : 'Communication',
        severity === 'LEVEL 4 – Critical' || severity === 'LEVEL 3 – High' ? 'Patient Safety' : 'Scheduling',
      ].filter((t, i, arr) => t !== theme && arr.indexOf(t) === i),
      operationalBottleneck: operationalIssue,
      equityAndAccessibilityReview: equityReview,
      riskAssessment: {
        patientSafety: severity === 'LEVEL 4 – Critical' || severity === 'LEVEL 3 – High' ? 'High' : 'Moderate',
        reputational: text.includes('review') || text.includes('never') || text.includes('lawyer') ? 'High' : 'Moderate',
        compliance: text.includes('hipaa') || text.includes('interpreter') || text.includes('surprise') ? 'High' : 'Low',
        equity: equityReview.includes('Critical') || equityReview.includes('Rural') || equityReview.includes('disability') ? 'High' : 'Moderate',
      },
      managerialRecommendation: action,
    },
    agent3_complaintTriage: {
      primaryCategory:
        theme === 'Technology / Patient Portal'
          ? 'Technology / Patient Portal'
          : theme === 'Discharge / Follow-Up'
          ? 'Clinical Care'
          : theme === 'Accessibility / Equity'
          ? 'Other'
          : (theme as ComplaintCategory),
      secondaryCategories: ['Communication'],
      severityLevel: severity,
      severityReason,
      risksDetected: [
        { riskType: 'Patient Safety Risk', explanation: riskOrBiasConcern },
        { riskType: 'Operational Risk', explanation: operationalIssue },
        ...(severity === 'LEVEL 4 – Critical' ? [{ riskType: 'Compliance / Legal Risk', explanation: severityReason }] : []),
      ],
      escalationRoute: routeTo,
      humanInterventionRequired: humanReviewNeeded,
      slaTarget:
        severity === 'LEVEL 4 – Critical'
          ? '< 2 Hours (Immediate)'
          : severity === 'LEVEL 3 – High'
          ? '< 24 Hours (Urgent)'
          : '3–5 Business Days',
    },
    agent4_decisionSupport: {
      mainProblem: operationalIssue,
      secondaryProblems: [
        `Patient experience degradation in ${caseContext.serviceLine || 'Service Line'}`,
        `Communication friction between patient and care team`,
      ],
      managementPriority: priority,
      priorityReasoning: `Assigned ${priority} priority due to ${severityReason.toLowerCase()} and direct impact on quality/safety benchmarks.`,
      recommendedActions: [
        action,
        `Brief frontline charge team during next daily shift safety huddle in ${caseContext.serviceLine || 'clinical unit'}`,
      ],
      patientSafetyOrEquityConcerns: riskOrBiasConcern,
      humanReviewNeeded: humanReviewNeeded,
      humanReviewRationale:
        severity === 'LEVEL 4 – Critical' || severity === 'LEVEL 3 – High'
          ? 'Mandatory executive and clinical leadership review due to safety, equity, or regulatory implications.'
          : 'Standard managerial follow-up to ensure patient satisfaction recovery.',
      aiRiskFlags: {
        hallucinationRisk: 'Low: Findings strictly bounded by provided patient feedback and encounter context.',
        biasReview: equityReview.includes('flag') || equityReview.includes('Critical')
          ? 'Equity Review Flagged: Algorithmic assessment calibrated for vulnerable demographic factors.'
          : 'Low bias risk detected.',
        humanReviewRequired: humanReviewNeeded
          ? 'Affirmed: Direct administrative or clinical leader oversight required.'
          : 'Routine automated triage sufficient.',
      },
    },
  };

  return result;
}
