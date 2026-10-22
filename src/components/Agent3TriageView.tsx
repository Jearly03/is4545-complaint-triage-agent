import React, { useState } from 'react';
import {
  ShieldAlert,
  Clock,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { PatientCase, SeverityLevel } from '../types/healthcare';
import { SEVERITY_LEVELS } from '../data/mockCases';

interface Agent3TriageViewProps {
  cases: PatientCase[];
  isProjectorMode: boolean;
  onSelectCase: (c: PatientCase) => void;
  onOpenAnalyzer: () => void;
}

export const Agent3TriageView: React.FC<Agent3TriageViewProps> = ({
  cases,
  isProjectorMode,
  onSelectCase,
  onOpenAnalyzer,
}) => {
  const [selectedSeverityTab, setSelectedSeverityTab] = useState<string>('all');

  const filteredCases = cases.filter((c) => {
    if (selectedSeverityTab !== 'all' && c.agent3.severityLevel !== selectedSeverityTab) return false;
    return true;
  });

  const getSeverityStyle = (sev: SeverityLevel) => {
    switch (sev) {
      case 'LEVEL 4 – Critical':
        return {
          headerBg: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/30',
          badge: 'text-red-600 dark:text-red-400 font-bold',
        };
      case 'LEVEL 3 – High':
        return {
          headerBg: 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/30',
          badge: 'text-orange-600 dark:text-orange-400 font-bold',
        };
      case 'LEVEL 2 – Moderate':
        return {
          headerBg: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30',
          badge: 'text-amber-600 dark:text-amber-400 font-semibold',
        };
      default:
        return {
          headerBg: 'bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-500/30',
          badge: 'text-slate-600 dark:text-slate-400',
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Mandate Card */}
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
              <span>Agent 03</span>
              <span aria-hidden="true">·</span>
              <span>Healthcare Complaint Triage Assistant</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              Priority Escalation & Departmental Routing Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
              Triages patient grievances and clinical incident alerts to establish what happened, assign severity level (1–4), detect multi-dimensional organizational risks, mandate human oversight, and route directly to responsible leaders (Risk Management, Nursing, Compliance, Billing, IT, Executive Review).
            </p>
          </div>
          <button
            onClick={onOpenAnalyzer}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition-colors shrink-0 shadow-sm"
          >
            Triage Inbound Complaint
          </button>
        </div>

        {/* Severity Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs">
          <button
            onClick={() => setSelectedSeverityTab('all')}
            className={`px-3 py-1.5 rounded-lg border transition-colors ${
              selectedSeverityTab === 'all'
                ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 font-semibold'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            All Severity Levels ({cases.length})
          </button>
          {SEVERITY_LEVELS.map((sev) => {
            const count = cases.filter((c) => c.agent3.severityLevel === sev).length;
            const isSelected = selectedSeverityTab === sev;
            return (
              <button
                key={sev}
                onClick={() => setSelectedSeverityTab(sev)}
                className={`px-3 py-1.5 rounded-lg border transition-colors ${
                  isSelected
                    ? 'bg-teal-600 text-white border-teal-700 font-semibold'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {sev} ({count})
              </button>
            );
          })}
        </div>
      </section>

      {/* Triage Matrix Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredCases.map((c) => {
          const t = c.agent3;
          const styling = getSeverityStyle(t.severityLevel);
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
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                {/* Meta */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {c.id}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {c.persona} ({c.serviceLine})
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Source: {c.source}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {c.agent4.mainProblem}
                  </h3>
                </div>

                {/* Right: Severity & Route pill */}
                <div className="flex items-center flex-wrap gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block">SLA Target</span>
                    <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                      {t.slaTarget}
                    </span>
                  </div>

                  <div className={`px-3 py-1.5 rounded-lg border text-xs ${styling.headerBg}`}>
                    <span className="font-bold">{t.severityLevel}</span>
                  </div>

                  <div className="px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-300 dark:border-teal-800 text-xs text-teal-800 dark:text-teal-200 font-medium">
                    Route: <span className="font-bold">{t.escalationRoute}</span>
                  </div>
                </div>
              </div>

              {/* Triage Steps Detail */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 text-xs">
                {/* Step 1 & 2: Category & Severity Reasoning */}
                <div className="space-y-2">
                  <div>
                    <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide text-[11px]">
                      Step 1: Primary Category
                    </span>
                    <div className="text-slate-900 dark:text-white font-semibold mt-0.5">
                      {t.primaryCategory}
                    </div>
                    {t.secondaryCategories.length > 0 && (
                      <div className="text-slate-500 mt-0.5">
                        Secondary: {t.secondaryCategories.join(', ')}
                      </div>
                    )}
                  </div>

                  <div className="pt-2">
                    <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide text-[11px]">
                      Step 2: Severity Reasoning
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                      {t.severityReason}
                    </p>
                  </div>
                </div>

                {/* Step 5: Risk Detection */}
                <div className="space-y-2">
                  <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide text-[11px]">
                    Step 5: Identified Risks
                  </span>
                  <div className="space-y-1.5">
                    {t.risksDetected.map((risk, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700"
                      >
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {risk.riskType}
                        </div>
                        <div className="text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                          {risk.explanation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 6 & Human Review */}
                <div className="space-y-3">
                  <div>
                    <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide text-[11px]">
                      Step 6: Escalation Protocol
                    </span>
                    <div className="p-3 rounded-lg bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/40 text-slate-800 dark:text-slate-200 mt-1">
                      <div className="font-semibold text-teal-800 dark:text-teal-300">
                        Assigned To: {c.assignedTo || t.escalationRoute}
                      </div>
                      <div className="text-slate-500 dark:text-slate-400 mt-1">
                        Status: <span className="font-medium text-slate-700 dark:text-slate-300">{c.status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <UserCheck
                      className={`w-4 h-4 ${
                        t.humanInterventionRequired ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'
                      }`}
                    />
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Human Intervention:
                    </span>
                    <span
                      className={`font-bold ${
                        t.humanInterventionRequired ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'
                      }`}
                    >
                      {t.humanInterventionRequired ? 'Required' : 'Standard Routine'}
                    </span>
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
