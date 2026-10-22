export type FeedbackTheme =
  | 'Communication'
  | 'Scheduling'
  | 'Wait Time'
  | 'Technology / Patient Portal'
  | 'Billing'
  | 'Clinical Care'
  | 'Discharge / Follow-Up'
  | 'Accessibility / Equity'
  | 'Mixed or Ambiguous';

export type Sentiment = 'Positive' | 'Negative' | 'Neutral' | 'Mixed';

export type RiskLevel = 'Low' | 'Moderate' | 'High';

export type SeverityLevel =
  | 'LEVEL 1 – Low'
  | 'LEVEL 2 – Moderate'
  | 'LEVEL 3 – High'
  | 'LEVEL 4 – Critical';

export type ComplaintCategory =
  | 'Communication'
  | 'Scheduling'
  | 'Wait Time'
  | 'Technology / Patient Portal'
  | 'Billing'
  | 'Clinical Care'
  | 'Patient Safety'
  | 'Privacy or Security'
  | 'Staff Conduct'
  | 'Other';

export type EscalationDestination =
  | 'Patient Experience Team'
  | 'Nursing Leadership'
  | 'Physician Leadership'
  | 'Quality Improvement Team'
  | 'Compliance Office'
  | 'Information Technology'
  | 'Revenue Cycle / Billing'
  | 'Accessibility Coordinator'
  | 'Risk Management'
  | 'Executive Review';

export type ServiceLine =
  | 'Emergency Department'
  | 'Inpatient / Med-Surg'
  | 'Cardiology & Heart Center'
  | 'Oncology / Cancer Center'
  | 'Orthopedics & Spine'
  | 'Women & Infants / OB-GYN'
  | 'Pediatrics'
  | 'Ambulatory Surgery'
  | 'Primary Care & Family Medicine'
  | 'Telehealth / Virtual Care';

export interface Agent1FeedbackInsight {
  theme: FeedbackTheme;
  sentiment: Sentiment;
  reasoning: string;
  operationalIssue: string;
  riskOrBiasConcern: string;
  recommendedAction: string;
}

export interface Agent2ExperienceMonitoring {
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
}

export interface Agent3ComplaintTriage {
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
}

export interface Agent4DecisionSupport {
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
}

export interface PatientCase {
  id: string;
  patientId: string;
  persona: string;
  age: number;
  gender: string;
  language: string;
  visitType: 'Inpatient' | 'Emergency' | 'Outpatient' | 'Telehealth' | 'Day Surgery';
  serviceLine: ServiceLine;
  roomOrClinic: string;
  encounterDate: string;
  satisfactionScore: number; // 1 - 10
  communicationRating: number; // 1 - 5
  followUpCompliance: 'Compliant' | 'Non-Compliant' | 'Partial' | 'Unknown';
  portalUsage: 'Frequent User' | 'Occasional' | 'Non-User' | 'Authentication Failure';
  readmissionRisk: 'Low' | 'Moderate' | 'High' | 'Critical';
  patientComment: string;
  source: 'Patient Survey' | 'Patient Portal Message' | 'Grievance / Formal Complaint' | 'Online Review' | 'Discharge Follow-Up';
  
  // Agent Multi-Pipeline Output
  agent1: Agent1FeedbackInsight;
  agent2: Agent2ExperienceMonitoring;
  agent3: Agent3ComplaintTriage;
  agent4: Agent4DecisionSupport;
  
  // Resolution metadata
  status: 'Open' | 'In Review' | 'Escalated' | 'Resolved';
  assignedTo?: string;
}

export interface DashboardMetrics {
  totalCases: number;
  avgSatisfaction: number;
  criticalSeverityCount: number;
  equityAlertsCount: number;
  humanReviewNeededCount: number;
  highReadmissionCount: number;
  themeDistribution: Record<FeedbackTheme, number>;
  serviceLineDistribution: Record<ServiceLine, { count: number; avgSat: number; highRisk: number }>;
}
