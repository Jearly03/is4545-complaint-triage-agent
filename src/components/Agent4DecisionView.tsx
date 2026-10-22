import React, { useState } from 'react';
import {
  Briefcase,
  AlertTriangle,
  UserCheck,
  CheckCircle,
  FileText,
  ShieldAlert,
  ArrowRight,
  TrendingDown,
  Layers,
} from 'lucide-react';
import { PatientCase } from '../types/healthcare';

interface Agent4DecisionViewProps {
  cases: PatientCase[];
  isProjectorMode: boolean;
  onSelectCase: (c: PatientCase) => void;
  onOpenAnalyzer: () => void;
}

export const Agent4DecisionView: React.FC<Agent4DecisionViewProps> = ({
  cases,
  isProjectorMode,
  onSelectCase,
  onOpenAnalyzer,
}) => {
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'High' | 'Medium' | 'Low'>('all');

  const filteredCases = cases.filter((c) => {
    if (priorityFilter !== 'all' && c.agent4.managementPriority !== priorityFilter) return false;
    return true;
  });

  const getPriorityBadge = (pri: 'Low' | 'Medium' | 'High') => {
    if (pri === 'High') return 'text-red-700 dark:text-red-400 font-bold bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900/50';
    if (pri === 'Medium') return 'text-amber-700 dark:text-amber-400 font-semibold bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/50';
    return 'text-slate-700 dark:text-slate-300 font-normal bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
  };

  return (
    <div className="space-y-6">
      {/* Agent 4 Mandate Card */}
      <section
        className={`p-6 rounded-xl border ${
          isProjectorMode
            ? 'bg-slate-900 border-slate-700 text-white'
            : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              <span>Agent 04</span>
              <span aria-hidden="true">·</span>
              <span>Hospital Manager Decision Support Agent</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              Executive Patient-Level Decision Intelligence & AI Risk Verification
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
              Transforms granular patient records into operational decisions. Evaluates patient persona, service line, satisfaction, communication, follow-up compliance, readmission risk, and AI risk flags (Hallucination Risk, Bias Review, Human Review) to establish management priorities and immediate leadership actions.
            </p>
          </div>
          <button
            onClick={onOpenAnalyzer}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition-colors shrink-0 shadow-sm"
          >
            Review Case Portfolio
          </button>
        </div>

        {/* Priority Filter */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs">
          <span className="font-semibold text-slate-600 dark:text-slate-300">
            Management Priority:
          </span>
          <button
            onClick={() => setPriorityFilter('all')}
            className={`px-3 py-1.5 rounded-lg border transition-colors ${
              priorityFilter === 'all'
                ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 font-semibold'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            All Priorities ({cases.length})
          </button>
          <button
            onClick={() => setPriorityFilter('High')}
            className={`px-3 py-1.5 rounded-lg border transition-colors ${
              priorityFilter === 'High'
                ? 'bg-red-600 text-white border-red-700 font-semibold'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            High Priority ({cases.filter((c) => c.agent4.managementPriority === 'High').length})
          </button>
          <button
            onClick={() => setPriorityFilter('Medium')}
            className={`px-3 py-1.5 rounded-lg border transition-colors ${
              priorityFilter === 'Medium'
                ? 'bg-amber-600 text-white border-amber-700 font-semibold'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            Medium Priority ({cases.filter((c) => c.agent4.managementPriority === 'Medium').length})
          </button>
          <button
            onClick={() => setPriorityFilter('Low')}
            className={`px-3 py-1.5 rounded-lg border transition-colors ${
              priorityFilter === 'Low'
                ? 'bg-slate-700 text-white border-slate-800 font-semibold'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            Low Priority ({cases.filter((c) => c.agent4.managementPriority === 'Low').length})
          </button>
        </div>
      </section>

      {/* Case-by-Case Deep Managerial Profile */}
      <div className="space-y-6">
        {filteredCases.map((c) => {
          const d = c.agent4;
          return (
            <div
              key={c.id}
              onClick={() => onSelectCase(c)}
              className={`p-6 rounded-xl border cursor-pointer transition-all hover:shadow-md ${
                isProjectorMode
                  ? 'bg-slate-900 border-slate-700 hover:border-slate-500 text-white'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Top Row: Case Identity, Service Line, Operational Meta */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {c.id}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{c.persona}</span>
                    <span aria-hidden="true">·</span>
                    <span>Age {c.age} ({c.gender})</span>
                    <span aria-hidden="true">·</span>
                    <span>{c.serviceLine}</span>
                    <span aria-hidden="true">·</span>
                    <span>{c.visitType}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    1. Main Problem: {d.mainProblem}
                  </h3>
                </div>

                <div className="flex items-center flex-wrap gap-2 shrink-0">
                  <div className={`px-3 py-1 rounded-lg border text-xs ${getPriorityBadge(d.managementPriority)}`}>
                    Priority: <span className="font-bold">{d.managementPriority}</span>
                  </div>

                  <div className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 font-mono">
                    Readmission Risk: <span className="font-bold">{c.readmissionRisk}</span>
                  </div>

                  <div className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 font-mono">
                    Sat: <span className="font-bold">{c.satisfactionScore}/10</span>
                  </div>
                </div>
              </div>

              {/* Patient Core Indicators Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-b border-slate-200 dark:border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Communication Rating</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {c.communicationRating} / 5
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Follow-Up Compliance</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {c.followUpCompliance}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Portal Usage</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {c.portalUsage}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Human Review Needed</span>
                  <span
                    className={`font-semibold ${
                      d.humanReviewNeeded ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'
                    }`}
                  >
                    {d.humanReviewNeeded ? 'Yes (Mandatory)' : 'No'}
                  </span>
                </div>
              </div>

              {/* Main Findings & Recommendations Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4 text-xs">
                {/* Secondary Problems & Priority Reasoning */}
                <div className="space-y-3">
                  <div>
                    <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide text-[11px]">
                      2. Secondary Problems
                    </span>
                    <ul className="mt-1 space-y-1 list-disc list-inside text-slate-600 dark:text-slate-300">
                      {d.secondaryProblems.map((prob, i) => (
                        <li key={i}>{prob}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide text-[11px]">
                      4. Priority Rationale
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                      {d.priorityReasoning}
                    </p>
                  </div>
                </div>

                {/* 5. Recommended Actions & Concerns */}
                <div className="space-y-3">
                  <div>
                    <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide text-[11px]">
                      5. Recommended Management Actions
                    </span>
                    <div className="mt-1 space-y-1.5">
                      {d.recommendedActions.map((act, i) => (
                        <div
                          key={i}
                          className="p-2.5 rounded-lg bg-teal-50/70 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/40 text-slate-800 dark:text-slate-200 font-medium leading-relaxed"
                        >
                          {act}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide text-[11px]">
                      6. Patient Safety / Equity Concerns
                    </span>
                    <p className="text-amber-700 dark:text-amber-400 mt-0.5 font-medium leading-relaxed">
                      {d.patientSafetyOrEquityConcerns}
                    </p>
                  </div>
                </div>

                {/* AI Risk Flags Inspector */}
                <div className="space-y-2 p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide text-[11px]">
                    <ShieldAlert className="w-3.5 h-3.5 text-indigo-500" />
                    <span>AI Risk Flags Audit</span>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Hallucination Risk:
                    </span>
                    <p className="text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                      {d.aiRiskFlags.hallucinationRisk}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Bias Review:
                    </span>
                    <p className="text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                      {d.aiRiskFlags.biasReview}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Human Review Determination:
                    </span>
                    <p className="text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                      {d.aiRiskFlags.humanReviewRequired}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
