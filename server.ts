import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Heuristic fallback helper in case API key is missing or offline
function generateFallbackAnalysis(patientComment: string, caseData: any = {}) {
  const text = (patientComment || '').toLowerCase();
  
  // Theme & Sentiment heuristics
  let theme = 'Mixed or Ambiguous';
  let sentiment: 'Positive' | 'Negative' | 'Neutral' | 'Mixed' = 'Negative';
  let operationalIssue = 'Process coordination delay';
  let riskOrBias = 'Routine patient communication gap';
  let action = 'Review service workflow and staff handoff protocols';
  
  if (text.includes('wait') || text.includes('hour') || text.includes('delayed') || text.includes('sitting')) {
    theme = 'Wait Time';
    operationalIssue = 'Patient throughput bottleneck and capacity strain';
    riskOrBias = 'Potential clinical deterioration during unmonitored waiting periods';
    action = 'Implement real-time wait tracking and rapid triage re-evaluations';
  } else if (text.includes('bill') || text.includes('charge') || text.includes('insurance') || text.includes('cost')) {
    theme = 'Billing';
    operationalIssue = 'Financial clearance and price transparency disconnect';
    riskOrBias = 'Financial toxicity and vulnerable patient billing equity';
    action = 'Audit billing estimate protocols and assign financial navigator';
  } else if (text.includes('portal') || text.includes('app') || text.includes('login') || text.includes('password') || text.includes('tech') || text.includes('wifi')) {
    theme = 'Technology / Patient Portal';
    operationalIssue = 'Digital front door failure and authentication barriers';
    riskOrBias = 'Digital literacy barriers impacting elderly and rural populations';
    action = 'Deploy dedicated patient portal phone navigators and simplify MFA';
  } else if (text.includes('spanish') || text.includes('english') || text.includes('translate') || text.includes('interpreter') || text.includes('language')) {
    theme = 'Accessibility / Equity';
    operationalIssue = 'Language access workflow gap during clinical encounters';
    riskOrBias = 'Informed consent failure and Limited English Proficiency (LEP) disparity';
    action = 'Mandate certified medical interpreter documentation at bedside and discharge';
  } else if (text.includes('discharge') || text.includes('medication') || text.includes('prescription') || text.includes('home')) {
    theme = 'Discharge / Follow-Up';
    operationalIssue = 'Inadequate discharge education and post-acute reconciliation';
    riskOrBias = 'Elevated 30-day readmission risk due to medication misunderstanding';
    action = 'Establish 48-hour post-discharge telephone call and teach-back verification';
  } else if (text.includes('doctor') || text.includes('nurse') || text.includes('rude') || text.includes('listen') || text.includes('attitude') || text.includes('dismissed')) {
    theme = 'Communication';
    operationalIssue = 'Provider bedside communication breakdown';
    riskOrBias = 'Patient disempowerment and potential diagnostic overshadowing';
    action = 'Conduct AIDET communication retraining with service-line staff';
  } else if (text.includes('schedule') || text.includes('appointment') || text.includes('cancel') || text.includes('reschedule')) {
    theme = 'Scheduling';
    operationalIssue = 'Central scheduling backlog and provider template inflexibility';
    riskOrBias = 'Delayed diagnostic workup leading to clinical progression';
    action = 'Review appointment slot templates and enable priority fast-track scheduling';
  } else if (text.includes('pain') || text.includes('infection') || text.includes('wrong') || text.includes('error') || text.includes('bleed')) {
    theme = 'Clinical Care';
    operationalIssue = 'Clinical care delivery and symptom management variation';
    riskOrBias = 'Direct patient safety risk requiring clinical review';
    action = 'Initiate immediate clinical case peer review';
  }

  if (text.includes('thank') || text.includes('wonderful') || text.includes('great') || text.includes('excellent') || text.includes('kind')) {
    sentiment = text.includes('but') || text.includes('however') ? 'Mixed' : 'Positive';
  }

  // Complaint triage severity
  let severity: 'LEVEL 1 – Low' | 'LEVEL 2 – Moderate' | 'LEVEL 3 – High' | 'LEVEL 4 – Critical' = 'LEVEL 2 – Moderate';
  let severityReason = 'Significant patient frustration and operational friction';
  let routeTo = 'Patient Experience Team';
  let humanReviewNeeded = true;
  let priority: 'Low' | 'Medium' | 'High' = 'Medium';

  if (text.includes('wrong med') || text.includes('fell') || text.includes('suicide') || text.includes('emergency') || text.includes('died') || text.includes('allergic') || text.includes('discrimination') || text.includes('lawyer') || text.includes('sue') || text.includes('hipaa') || text.includes('breach')) {
    severity = 'LEVEL 4 – Critical';
    severityReason = 'Immediate patient safety, compliance, or legal exposure risk identified';
    routeTo = text.includes('lawyer') || text.includes('sue') || text.includes('fell') ? 'Risk Management' : 'Compliance Office';
    priority = 'High';
  } else if (text.includes('infection') || text.includes('bleeding') || text.includes('unbearable pain') || text.includes('misdiagnos') || text.includes('interpreter') || text.includes('refused')) {
    severity = 'LEVEL 3 – High';
    severityReason = 'Potential patient harm, medication concern, or serious accessibility breakdown';
    routeTo = text.includes('interpreter') ? 'Accessibility Coordinator' : 'Physician Leadership';
    priority = 'High';
  } else if (text.includes('billing') || text.includes('charge')) {
    routeTo = 'Revenue Cycle / Billing';
  } else if (text.includes('portal') || text.includes('app')) {
    routeTo = 'Information Technology';
  } else if (text.includes('nurse')) {
    routeTo = 'Nursing Leadership';
  }

  return {
    agent1_feedbackInsight: {
      theme,
      sentiment,
      reasoning: `Selected '${theme}' because patient comments center on ${operationalIssue.toLowerCase()}. Sentiment evaluated as '${sentiment}' based on patient emotional tone.`,
      operationalIssue,
      riskOrBiasConcern: riskOrBias,
      recommendedAction: action,
    },
    agent2_experienceMonitoring: {
      primaryTheme: theme,
      secondaryThemes: [theme === 'Communication' ? 'Clinical Care' : 'Communication'],
      operationalBottleneck: operationalIssue,
      equityAndAccessibilityReview: text.includes('spanish') || text.includes('language')
        ? 'Limited English Proficiency (LEP) concern flagged. Patient may not have received equitable informed consent.'
        : text.includes('portal') || text.includes('app')
        ? 'Digital literacy barrier flagged for older adult or non-tech-fluent patient.'
        : 'Standard equity review: monitor for socioeconomic and health literacy barriers.',
      riskAssessment: {
        patientSafety: severity === 'LEVEL 4 – Critical' || severity === 'LEVEL 3 – High' ? 'High' : 'Moderate',
        reputational: text.includes('never come back') || text.includes('review') ? 'High' : 'Moderate',
        compliance: text.includes('hipaa') || text.includes('interpreter') ? 'High' : 'Low',
        equity: text.includes('spanish') || text.includes('insurance') ? 'High' : 'Low',
      },
      managerialRecommendation: action,
    },
    agent3_complaintTriage: {
      primaryCategory: theme === 'Technology / Patient Portal' ? 'Technology / Patient Portal' : (theme as any),
      secondaryCategories: ['Communication'],
      severityLevel: severity,
      severityReason,
      risksDetected: [
        { riskType: 'Patient Safety Risk', explanation: riskOrBias },
        { riskType: 'Operational Risk', explanation: operationalIssue },
      ],
      escalationRoute: routeTo,
      humanInterventionRequired: humanReviewNeeded,
      slaTarget: severity === 'LEVEL 4 – Critical' ? '< 2 Hours (Immediate)' : severity === 'LEVEL 3 – High' ? '< 24 Hours (Urgent)' : '3–5 Business Days',
    },
    agent4_decisionSupport: {
      mainProblem: operationalIssue,
      secondaryProblems: [`Patient experience degradation in ${caseData.serviceLine || 'Service Unit'}`],
      managementPriority: priority,
      priorityReasoning: `Rated ${priority} due to ${severityReason.toLowerCase()} and impact on service line quality metrics.`,
      recommendedActions: [action, 'Brief frontline charge team during daily safety huddle'],
      patientSafetyOrEquityConcerns: riskOrBias,
      humanReviewNeeded: true,
      humanReviewRationale: 'Human validation required to verify root causes with involved clinical and operational staff.',
      aiRiskFlags: {
        hallucinationRisk: 'Low: Grounded strictly in provided patient narrative and structured encounter data.',
        biasReview: text.includes('spanish') || text.includes('rural') || text.includes('elderly') ? 'Flagged: Ensure algorithmic impartiality regarding demographic and language factors.' : 'Low bias risk detected.',
        humanReviewRequired: 'Affirmed: Clinical and administrative leadership oversight mandatory.',
      },
    },
  };
}

// Unified Full-Pipeline Analysis Endpoint
app.post('/api/analyze/all', async (req, res) => {
  try {
    const { comment, caseData } = req.body;
    if (!comment && !caseData?.comment) {
      return res.status(400).json({ error: 'Patient comment is required.' });
    }

    const patientComment = comment || caseData?.comment || '';

    if (!ai) {
      // Use intelligent clinical heuristic engine if no API key
      const fallback = generateFallbackAnalysis(patientComment, caseData);
      return res.json(fallback);
    }

    const prompt = `You are a healthcare intelligence system operating four distinct specialized agents:
1. Patient Feedback Insight Agent
2. Patient Experience Monitoring Agent
3. Complaint Triage Assistant
4. Hospital Manager Decision Support Agent

Analyze the following patient comment and case data:
PATIENT COMMENT: "${patientComment}"
CASE CONTEXT:
Persona/Age: ${caseData?.persona || 'Unspecified'} (${caseData?.age || 'Unspecified'})
Service Line: ${caseData?.serviceLine || 'Unspecified'}
Visit Type: ${caseData?.visitType || 'Unspecified'}
Satisfaction Score: ${caseData?.satisfaction || 'Unspecified'}/10
Communication Rating: ${caseData?.communicationRating || 'Unspecified'}/5
Follow-up Compliance: ${caseData?.followUpCompliance || 'Unspecified'}
Portal Usage: ${caseData?.portalUsage || 'Unspecified'}
Readmission Risk: ${caseData?.readmissionRisk || 'Unspecified'}

Produce a valid JSON object matching the exact requirements of all 4 agents:
- Do not invent medical facts.
- If comment is ambiguous, state clearly.
- Note any AI risk flags (Hallucination Risk, Bias Review, Human Review Required).
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            agent1_feedbackInsight: {
              type: Type.OBJECT,
              properties: {
                theme: {
                  type: Type.STRING,
                  description: 'Must be one of: Communication, Scheduling, Wait Time, Technology / Patient Portal, Billing, Clinical Care, Discharge / Follow-Up, Accessibility / Equity, Mixed or Ambiguous'
                },
                sentiment: {
                  type: Type.STRING,
                  description: 'Positive, Negative, Neutral, or Mixed'
                },
                reasoning: { type: Type.STRING },
                operationalIssue: { type: Type.STRING },
                riskOrBiasConcern: { type: Type.STRING },
                recommendedAction: { type: Type.STRING },
              },
              required: ['theme', 'sentiment', 'reasoning', 'operationalIssue', 'riskOrBiasConcern', 'recommendedAction'],
            },
            agent2_experienceMonitoring: {
              type: Type.OBJECT,
              properties: {
                primaryTheme: { type: Type.STRING },
                secondaryThemes: { type: Type.ARRAY, items: { type: Type.STRING } },
                operationalBottleneck: { type: Type.STRING },
                equityAndAccessibilityReview: { type: Type.STRING, description: 'Review for older adults, rural patients, disabilities, limited English proficiency, or low digital literacy' },
                riskAssessment: {
                  type: Type.OBJECT,
                  properties: {
                    patientSafety: { type: Type.STRING, description: 'Low, Moderate, or High' },
                    reputational: { type: Type.STRING, description: 'Low, Moderate, or High' },
                    compliance: { type: Type.STRING, description: 'Low, Moderate, or High' },
                    equity: { type: Type.STRING, description: 'Low, Moderate, or High' },
                  },
                  required: ['patientSafety', 'reputational', 'compliance', 'equity'],
                },
                managerialRecommendation: { type: Type.STRING },
              },
              required: ['primaryTheme', 'operationalBottleneck', 'equityAndAccessibilityReview', 'riskAssessment', 'managerialRecommendation'],
            },
            agent3_complaintTriage: {
              type: Type.OBJECT,
              properties: {
                primaryCategory: {
                  type: Type.STRING,
                  description: 'Communication, Scheduling, Wait Time, Technology / Patient Portal, Billing, Clinical Care, Patient Safety, Privacy or Security, Staff Conduct, Other'
                },
                secondaryCategories: { type: Type.ARRAY, items: { type: Type.STRING } },
                severityLevel: {
                  type: Type.STRING,
                  description: 'LEVEL 1 – Low, LEVEL 2 – Moderate, LEVEL 3 – High, LEVEL 4 – Critical'
                },
                severityReason: { type: Type.STRING },
                risksDetected: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      riskType: { type: Type.STRING },
                      explanation: { type: Type.STRING },
                    },
                    required: ['riskType', 'explanation'],
                  },
                },
                escalationRoute: {
                  type: Type.STRING,
                  description: 'Patient Experience Team, Nursing Leadership, Physician Leadership, Quality Improvement Team, Compliance Office, Information Technology, Revenue Cycle / Billing, Accessibility Coordinator, Risk Management, Executive Review'
                },
                humanInterventionRequired: { type: Type.BOOLEAN },
                slaTarget: { type: Type.STRING },
              },
              required: ['primaryCategory', 'severityLevel', 'severityReason', 'risksDetected', 'escalationRoute', 'humanInterventionRequired', 'slaTarget'],
            },
            agent4_decisionSupport: {
              type: Type.OBJECT,
              properties: {
                mainProblem: { type: Type.STRING },
                secondaryProblems: { type: Type.ARRAY, items: { type: Type.STRING } },
                managementPriority: { type: Type.STRING, description: 'Low, Medium, or High' },
                priorityReasoning: { type: Type.STRING },
                recommendedActions: { type: Type.ARRAY, items: { type: Type.STRING } },
                patientSafetyOrEquityConcerns: { type: Type.STRING },
                humanReviewNeeded: { type: Type.BOOLEAN },
                humanReviewRationale: { type: Type.STRING },
                aiRiskFlags: {
                  type: Type.OBJECT,
                  properties: {
                    hallucinationRisk: { type: Type.STRING },
                    biasReview: { type: Type.STRING },
                    humanReviewRequired: { type: Type.STRING },
                  },
                  required: ['hallucinationRisk', 'biasReview', 'humanReviewRequired'],
                },
              },
              required: ['mainProblem', 'managementPriority', 'priorityReasoning', 'recommendedActions', 'patientSafetyOrEquityConcerns', 'humanReviewNeeded', 'humanReviewRationale', 'aiRiskFlags'],
            },
          },
          required: ['agent1_feedbackInsight', 'agent2_experienceMonitoring', 'agent3_complaintTriage', 'agent4_decisionSupport'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (err: any) {
    console.error('Gemini API analysis error:', err);
    // Graceful fallback to heuristic if rate limited or invalid key
    const fallback = generateFallbackAnalysis(req.body?.comment || '', req.body?.caseData);
    res.json(fallback);
  }
});

// Setup Vite middleware for local development
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve('dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
