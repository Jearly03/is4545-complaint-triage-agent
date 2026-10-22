import React from 'react';
import { AlertTriangle, ShieldAlert, Users, HeartPulse, ExternalLink } from 'lucide-react';
import { PatientCase } from '../types/healthcare';

interface TopAlertBannerProps {
  cases: PatientCase[];
  isProjectorMode: boolean;
  onFilterCritical: () => void;
  onSelectCase: (c: PatientCase) => void;
}

export const TopAlertBanner: React.FC<TopAlertBannerProps> = ({
  cases,
  isProjectorMode,
  onFilterCritical,
  onSelectCase,
}) => {
  const criticalCases = cases.filter((c) => c.agent3.severityLevel === 'LEVEL 4 – Critical');
  const equityCases = cases.filter(
    (c) =>
      c.agent2.equityAndAccessibilityReview.toLowerCase().includes('critical') ||
      c.agent2.equityAndAccessibilityReview.toLowerCase().includes('lep') ||
      c.agent2.equityAndAccessibilityReview.toLowerCase().includes('disability') ||
      c.agent2.riskAssessment.equity === 'High'
  );
  const humanReviewCases = cases.filter((c) => c.agent4.humanReviewNeeded);
  const highReadmissionCases = cases.filter(
    (c) => c.readmissionRisk === 'Critical' || c.readmissionRisk === 'High'
  );

  // Identify the most urgent finding
  const primaryCriticalCase = criticalCases[0] || cases[0];

  return (
    <section
      aria-label="Executive Alert Banner"
      className={`relative w-full border-b transition-colors ${
        isProjectorMode
          ? 'bg-slate-900 border-amber-500/50 text-white'
          : 'bg-gradient-to-r from-red-950/90 via-slate-900 to-slate-950 border-red-800/40 text-slate-100 shadow-sm'
      } px-4 sm:px-6 py-4`}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Left: Main Hospital Management Alert */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="p-2 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 shrink-0 mt-0.5">
            <ShieldAlert className="w-5 h-5 animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-400">
              <span>Primary Management Alert</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span className="text-amber-300 font-mono">Immediate Executive Action Required</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight mt-0.5 truncate">
              {primaryCriticalCase ? primaryCriticalCase.agent4.mainProblem : 'No active critical alerts.'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5 line-clamp-1">
              Affecting <span className="font-semibold text-white">{primaryCriticalCase?.serviceLine}</span> ({primaryCriticalCase?.roomOrClinic}): {primaryCriticalCase?.agent1.riskOrBiasConcern}
            </p>
          </div>
        </div>

        {/* Center / Right: Quick Critical Metrics */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3 shrink-0 text-xs">
          <button
            onClick={onFilterCritical}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-red-900/50 hover:bg-red-800/70 border border-red-700/60 text-red-200 transition-colors"
            title="Filter to critical severity complaints"
          >
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span>Critical Severity:</span>
            <span className="font-mono font-bold tabular-nums text-white text-sm">
              {criticalCases.length}
            </span>
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800/80 border border-slate-700 text-slate-200">
            <Users className="w-4 h-4 text-amber-400" />
            <span>Equity / LEP Alerts:</span>
            <span className="font-mono font-bold tabular-nums text-white text-sm">
              {equityCases.length}
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800/80 border border-slate-700 text-slate-200">
            <HeartPulse className="w-4 h-4 text-emerald-400" />
            <span>Readmission At-Risk:</span>
            <span className="font-mono font-bold tabular-nums text-white text-sm">
              {highReadmissionCases.length}
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800/80 border border-slate-700 text-slate-200">
            <span>Human Review Queue:</span>
            <span className="font-mono font-bold tabular-nums text-white text-sm">
              {humanReviewCases.length}
            </span>
          </div>

          {primaryCriticalCase && (
            <button
              onClick={() => onSelectCase(primaryCriticalCase)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-teal-600 hover:bg-teal-500 text-white font-medium transition-colors"
            >
              <span>Examine Finding</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
