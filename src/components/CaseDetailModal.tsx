import React, { useState } from 'react';
import {
  X,
  ShieldAlert,
  AlertTriangle,
  UserCheck,
  CheckCircle2,
  Share2,
  Printer,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { PatientCase } from '../types/healthcare';

interface CaseDetailModalProps {
  patientCase: PatientCase | null;
  onClose: () => void;
  onUpdateStatus: (caseId: string, status: PatientCase['status']) => void;
}

export const CaseDetailModal: React.FC<CaseDetailModalProps> = ({
  patientCase,
  onClose,
  onUpdateStatus,
}) => {
  if (!patientCase) return null;

  const [activeTab, setActiveTab] = useState<'pipeline' | 'agent1' | 'agent2' | 'agent3' | 'agent4'>('pipeline');
  const [currentStatus, setCurrentStatus] = useState<PatientCase['status']>(patientCase.status);

  const handleStatusChange = (newStatus: PatientCase['status']) => {
    setCurrentStatus(newStatus);
    onUpdateStatus(patientCase.id, newStatus);
  };

  const handlePrint = () => {
    window.print();
  };

  const { agent1, agent2, agent3, agent4 } = patientCase;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto"
    >
      <div className="relative w-full max-w-5xl my-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-sm">
                {patientCase.id}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">
                {patientCase.persona}
              </span>
              <span aria-hidden="true">·</span>
              <span>{patientCase.serviceLine}</span>
              <span aria-hidden="true">·</span>
              <span>{patientCase.roomOrClinic}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              {agent4.mainProblem}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Status Selector */}
            <select
              value={currentStatus}
              onChange={(e) => handleStatusChange(e.target.value as any)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-teal-500"
            >
              <option value="Open">Status: Open</option>
              <option value="In Review">Status: In Review</option>
              <option value="Escalated">Status: Escalated</option>
              <option value="Resolved">Status: Resolved</option>
            </select>

            <button
              onClick={handlePrint}
              className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              title="Print Case Briefing"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              title="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Patient Voice & Encounter Ribbon */}
        <div className="px-6 py-4 bg-slate-100/70 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800">
          <div className="text-xs font-bold uppercase text-slate-500 mb-1">
            Patient Verbatim Feedback ({patientCase.source}):
          </div>
          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 italic leading-relaxed">
            "{patientCase.patientComment}"
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-500">
            <span>Age: <strong className="text-slate-700 dark:text-slate-300">{patientCase.age}</strong></span>
            <span>Language: <strong className="text-slate-700 dark:text-slate-300">{patientCase.language}</strong></span>
            <span>Satisfaction: <strong className="text-slate-700 dark:text-slate-300">{patientCase.satisfactionScore}/10</strong></span>
            <span>Communication: <strong className="text-slate-700 dark:text-slate-300">{patientCase.communicationRating}/5</strong></span>
            <span>Readmission Risk: <strong className="text-red-600 dark:text-red-400">{patientCase.readmissionRisk}</strong></span>
            <span>Portal Usage: <strong className="text-slate-700 dark:text-slate-300">{patientCase.portalUsage}</strong></span>
          </div>
        </div>

        {/* Tab Controls for Agents */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-200 dark:border-slate-800 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`pb-2.5 px-3 border-b-2 font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'pipeline'
                ? 'border-teal-600 text-teal-700 dark:text-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            All 4 Agents Pipeline
          </button>
          <button
            onClick={() => setActiveTab('agent1')}
            className={`pb-2.5 px-3 border-b-2 font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'agent1'
                ? 'border-teal-600 text-teal-700 dark:text-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Agent 1: Feedback Insight
          </button>
          <button
            onClick={() => setActiveTab('agent2')}
            className={`pb-2.5 px-3 border-b-2 font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'agent2'
                ? 'border-teal-600 text-teal-700 dark:text-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Agent 2: Experience Monitoring
          </button>
          <button
            onClick={() => setActiveTab('agent3')}
            className={`pb-2.5 px-3 border-b-2 font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'agent3'
                ? 'border-teal-600 text-teal-700 dark:text-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Agent 3: Complaint Triage
          </button>
          <button
            onClick={() => setActiveTab('agent4')}
            className={`pb-2.5 px-3 border-b-2 font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'agent4'
                ? 'border-teal-600 text-teal-700 dark:text-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Agent 4: Decision Support
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          {activeTab === 'pipeline' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Agent 1 Card */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
                <div className="font-bold text-teal-700 dark:text-teal-400 uppercase text-xs">
                  Agent 1: Feedback Insight
                </div>
                <div><strong>Theme:</strong> {agent1.theme} ({agent1.sentiment})</div>
                <div><strong>Operational Issue:</strong> {agent1.operationalIssue}</div>
                <div><strong>Risk / Bias Concern:</strong> <span className="text-amber-700 dark:text-amber-400">{agent1.riskOrBiasConcern}</span></div>
                <div><strong>Recommended Action:</strong> {agent1.recommendedAction}</div>
              </div>

              {/* Agent 2 Card */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
                <div className="font-bold text-teal-700 dark:text-teal-400 uppercase text-xs">
                  Agent 2: Experience Monitoring
                </div>
                <div><strong>Bottleneck:</strong> {agent2.operationalBottleneck}</div>
                <div><strong>Equity & Accessibility:</strong> {agent2.equityAndAccessibilityReview}</div>
                <div className="flex gap-3 text-xs pt-1">
                  <span>Safety: <strong>{agent2.riskAssessment.patientSafety}</strong></span>
                  <span>Equity: <strong>{agent2.riskAssessment.equity}</strong></span>
                  <span>Compliance: <strong>{agent2.riskAssessment.compliance}</strong></span>
                </div>
              </div>

              {/* Agent 3 Card */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
                <div className="font-bold text-teal-700 dark:text-teal-400 uppercase text-xs">
                  Agent 3: Complaint Triage
                </div>
                <div><strong>Severity:</strong> <span className="font-bold text-red-600 dark:text-red-400">{agent3.severityLevel}</span></div>
                <div><strong>Severity Rationale:</strong> {agent3.severityReason}</div>
                <div><strong>Escalation Route:</strong> <span className="font-bold text-teal-800 dark:text-teal-300">{agent3.escalationRoute}</span></div>
                <div><strong>Target SLA:</strong> {agent3.slaTarget} · Human Review: {agent3.humanInterventionRequired ? 'Required' : 'Standard'}</div>
              </div>

              {/* Agent 4 Card */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
                <div className="font-bold text-teal-700 dark:text-teal-400 uppercase text-xs">
                  Agent 4: Decision Support
                </div>
                <div><strong>Management Priority:</strong> <span className="font-bold text-red-600 dark:text-red-400">{agent4.managementPriority}</span></div>
                <div><strong>Priority Reasoning:</strong> {agent4.priorityReasoning}</div>
                <div><strong>Managerial Actions:</strong></div>
                <ul className="list-disc list-inside text-xs space-y-1 text-slate-700 dark:text-slate-300">
                  {agent4.recommendedActions.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'agent1' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Agent 1: Patient Feedback Insight Analysis
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-bold">1. Theme:</span> {agent1.theme}
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-bold">2. Sentiment:</span> {agent1.sentiment}
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-bold">3. Reasoning:</span> {agent1.reasoning}
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-bold">4. Operational Issue:</span> {agent1.operationalIssue}
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-bold">5. Risk or Bias Concern:</span> {agent1.riskOrBiasConcern}
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-bold">6. Recommended Action:</span> {agent1.recommendedAction}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'agent2' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Agent 2: Patient Experience Monitoring Review
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-bold">STEP 1: Theme Classification:</span> Primary: {agent2.primaryTheme} | Secondary: {agent2.secondaryThemes.join(', ') || 'None'}
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-bold">STEP 2: Operational Bottleneck:</span> {agent2.operationalBottleneck}
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-bold">STEP 3: Healthcare Equity & Accessibility Review:</span> {agent2.equityAndAccessibilityReview}
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-bold">STEP 4: Risk Assessment:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                    <div>Patient Safety: <strong>{agent2.riskAssessment.patientSafety}</strong></div>
                    <div>Reputational: <strong>{agent2.riskAssessment.reputational}</strong></div>
                    <div>Compliance: <strong>{agent2.riskAssessment.compliance}</strong></div>
                    <div>Equity: <strong>{agent2.riskAssessment.equity}</strong></div>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-bold">STEP 5: Managerial Recommendation:</span> {agent2.managerialRecommendation}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'agent3' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Agent 3: Complaint Triage Assistant Evaluation
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-bold">STEP 1: Category:</span> Primary: {agent3.primaryCategory} (Secondary: {agent3.secondaryCategories.join(', ') || 'None'})
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-bold">STEP 2: Severity Assessment:</span> {agent3.severityLevel} — {agent3.severityReason}
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-bold">STEP 5: Risk Detection:</span>
                  <div className="space-y-2 mt-2">
                    {agent3.risksDetected.map((r, i) => (
                      <div key={i} className="text-xs">
                        <strong>{r.riskType}:</strong> {r.explanation}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-bold">STEP 6: Escalation Recommendation:</span>
                  <div className="mt-1 text-sm font-bold text-teal-700 dark:text-teal-300">
                    ROUTE TO: {agent3.escalationRoute}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    SLA: {agent3.slaTarget} · Human Intervention Required: {agent3.humanInterventionRequired ? 'Yes' : 'No'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'agent4' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Agent 4: Hospital Manager Decision Support Analysis
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-bold">1. Main Problem:</span> {agent4.mainProblem}
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-bold">2. Secondary Problems:</span>
                  <ul className="list-disc list-inside mt-1">
                    {agent4.secondaryProblems.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-bold">3. Management Priority:</span> {agent4.managementPriority}
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-bold">4. Priority Rationale:</span> {agent4.priorityReasoning}
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-bold">5. Recommended Actions:</span>
                  <div className="space-y-1 mt-1">
                    {agent4.recommendedActions.map((a, i) => (
                      <div key={i} className="font-medium text-teal-800 dark:text-teal-300">· {a}</div>
                    ))}
                  </div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-bold">6. Patient Safety / Equity Concerns:</span> {agent4.patientSafetyOrEquityConcerns}
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-bold">7. Human Review Determination:</span> {agent4.humanReviewNeeded ? 'Mandatory' : 'Optional'} — {agent4.humanReviewRationale}
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-indigo-200 dark:border-indigo-900/50">
                  <span className="font-bold text-indigo-700 dark:text-indigo-400">AI Risk Flags:</span>
                  <div className="mt-1 space-y-1 text-xs">
                    <div><strong>Hallucination Risk:</strong> {agent4.aiRiskFlags.hallucinationRisk}</div>
                    <div><strong>Bias Review:</strong> {agent4.aiRiskFlags.biasReview}</div>
                    <div><strong>Human Review Required:</strong> {agent4.aiRiskFlags.humanReviewRequired}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
