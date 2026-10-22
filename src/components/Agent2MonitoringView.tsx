import React, { useState } from 'react';
import { Activity, ShieldCheck, AlertTriangle, Users, Globe, ExternalLink } from 'lucide-react';
import { PatientCase, RiskLevel } from '../types/healthcare';

interface Agent2MonitoringViewProps {
  cases: PatientCase[];
  isProjectorMode: boolean;
  onSelectCase: (c: PatientCase) => void;
  onOpenAnalyzer: () => void;
}

export const Agent2MonitoringView: React.FC<Agent2MonitoringViewProps> = ({
  cases,
  isProjectorMode,
  onSelectCase,
  onOpenAnalyzer,
}) => {
  const [riskCategoryFilter, setRiskCategoryFilter] = useState<'all' | 'safety' | 'equity' | 'compliance' | 'reputational'>('all');

  const filteredCases = cases.filter((c) => {
    if (riskCategoryFilter === 'safety') return c.agent2.riskAssessment.patientSafety === 'High';
    if (riskCategoryFilter === 'equity') return c.agent2.riskAssessment.equity === 'High';
    if (riskCategoryFilter === 'compliance') return c.agent2.riskAssessment.compliance === 'High';
    if (riskCategoryFilter === 'reputational') return c.agent2.riskAssessment.reputational === 'High';
    return true;
  });

  const getRiskColor = (level: RiskLevel) => {
    if (level === 'High') return 'text-red-700 dark:text-red-400 font-bold';
    if (level === 'Moderate') return 'text-amber-700 dark:text-amber-400 font-semibold';
    return 'text-emerald-700 dark:text-emerald-400 font-normal';
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
              <span>Agent 02</span>
              <span aria-hidden="true">·</span>
              <span>Patient Experience Monitoring Agent</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              Continuous Operational Bottlenecks & Healthcare Equity Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
              Tracks multi-channel feedback (surveys, portal messages, complaints, reviews) across 5 standardized analytical steps: Theme Classification (Primary/Secondary), Operational Bottlenecks, Healthcare Equity & Accessibility Review, Organizational Risk Assessment (Safety, Reputational, Compliance, Equity), and Actionable Leadership Recommendations.
            </p>
          </div>
          <button
            onClick={onOpenAnalyzer}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition-colors shrink-0 shadow-sm"
          >
            Run Experience Audit
          </button>
        </div>

        {/* Risk Category Segmented Filters */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs">
          <span className="font-semibold text-slate-600 dark:text-slate-300">
            High Risk Filter:
          </span>
          <button
            onClick={() => setRiskCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-lg border transition-colors ${
              riskCategoryFilter === 'all'
                ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            All Encounters ({cases.length})
          </button>
          <button
            onClick={() => setRiskCategoryFilter('safety')}
            className={`px-3 py-1.5 rounded-lg border transition-colors ${
              riskCategoryFilter === 'safety'
                ? 'bg-red-600 text-white border-red-700'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            High Patient Safety Risk
          </button>
          <button
            onClick={() => setRiskCategoryFilter('equity')}
            className={`px-3 py-1.5 rounded-lg border transition-colors ${
              riskCategoryFilter === 'equity'
                ? 'bg-amber-600 text-white border-amber-700'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            High Equity & Accessibility Risk
          </button>
          <button
            onClick={() => setRiskCategoryFilter('compliance')}
            className={`px-3 py-1.5 rounded-lg border transition-colors ${
              riskCategoryFilter === 'compliance'
                ? 'bg-indigo-600 text-white border-indigo-700'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            High Compliance Risk
          </button>
          <button
            onClick={() => setRiskCategoryFilter('reputational')}
            className={`px-3 py-1.5 rounded-lg border transition-colors ${
              riskCategoryFilter === 'reputational'
                ? 'bg-purple-600 text-white border-purple-700'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            High Reputational Risk
          </button>
        </div>
      </section>

      {/* Case Roster with Agent 2 5-Step Breakdown */}
      <div className="space-y-4">
        {filteredCases.map((c) => {
          const m = c.agent2;
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
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {c.id}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{c.persona}</span>
                    <span aria-hidden="true">·</span>
                    <span>{c.serviceLine}</span>
                    <span aria-hidden="true">·</span>
                    <span>Language: {c.language}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                    {c.agent4.mainProblem}
                  </h3>
                </div>

                {/* 4-Dimension Risk Quad Badge */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-slate-50 dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block">Safety</span>
                    <span className={getRiskColor(m.riskAssessment.patientSafety)}>
                      {m.riskAssessment.patientSafety}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block">Equity</span>
                    <span className={getRiskColor(m.riskAssessment.equity)}>
                      {m.riskAssessment.equity}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block">Compliance</span>
                    <span className={getRiskColor(m.riskAssessment.compliance)}>
                      {m.riskAssessment.compliance}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block">Reputational</span>
                    <span className={getRiskColor(m.riskAssessment.reputational)}>
                      {m.riskAssessment.reputational}
                    </span>
                  </div>
                </div>
              </div>

              {/* 5-Step Agent Breakdown Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 text-xs">
                {/* Step 1 & 2 */}
                <div className="space-y-2">
                  <div className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide text-[11px]">
                    Step 1: Theme Classification
                  </div>
                  <div>
                    <span className="font-medium text-slate-500">Primary:</span>{' '}
                    <span className="font-semibold text-teal-700 dark:text-teal-300">{m.primaryTheme}</span>
                  </div>
                  {m.secondaryThemes.length > 0 && (
                    <div>
                      <span className="font-medium text-slate-500">Secondary:</span>{' '}
                      <span className="text-slate-700 dark:text-slate-300">
                        {m.secondaryThemes.join(', ')}
                      </span>
                    </div>
                  )}

                  <div className="pt-2 font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide text-[11px]">
                    Step 2: Operational Bottleneck
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {m.operationalBottleneck}
                  </p>
                </div>

                {/* Step 3: Equity Review */}
                <div className="space-y-2 md:col-span-1 lg:col-span-2">
                  <div className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide text-[11px] flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-amber-500" />
                    <span>Step 3: Equity & Accessibility Review</span>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/40 text-slate-700 dark:text-slate-200 leading-relaxed">
                    {m.equityAndAccessibilityReview}
                  </div>
                </div>

                {/* Step 5: Managerial Recommendation */}
                <div className="space-y-2">
                  <div className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide text-[11px]">
                    Step 5: Managerial Action
                  </div>
                  <div className="p-3 rounded-lg bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200/50 dark:border-teal-900/40 text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                    {m.managerialRecommendation}
                  </div>
                  <div className="text-[11px] text-teal-600 dark:text-teal-400 text-right mt-1 font-semibold">
                    Inspect Full Audit Profile →
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
