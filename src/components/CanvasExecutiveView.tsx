import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ShieldAlert,
  Users,
  HeartPulse,
  Clock,
  ChevronRight,
  TrendingUp,
  Activity,
  ArrowUpDown,
  UserCheck,
  CheckCircle,
} from 'lucide-react';
import {
  PatientCase,
  FeedbackTheme,
  SeverityLevel,
  ServiceLine,
} from '../types/healthcare';
import { SERVICE_LINES, FEEDBACK_THEMES, SEVERITY_LEVELS } from '../data/mockCases';

interface CanvasExecutiveViewProps {
  cases: PatientCase[];
  isProjectorMode: boolean;
  onSelectCase: (c: PatientCase) => void;
  onOpenAnalyzer: () => void;
}

export const CanvasExecutiveView: React.FC<CanvasExecutiveViewProps> = ({
  cases,
  isProjectorMode,
  onSelectCase,
  onOpenAnalyzer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServiceLine, setSelectedServiceLine] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [onlyHumanReview, setOnlyHumanReview] = useState(false);
  const [onlyEquityAlerts, setOnlyEquityAlerts] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'severity' | 'satisfaction'>('severity');

  // Filtered cases
  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchText =
          c.patientComment.toLowerCase().includes(query) ||
          c.persona.toLowerCase().includes(query) ||
          c.serviceLine.toLowerCase().includes(query) ||
          c.agent1.theme.toLowerCase().includes(query) ||
          c.agent4.mainProblem.toLowerCase().includes(query) ||
          c.patientId.toLowerCase().includes(query);
        if (!matchText) return false;
      }

      if (selectedServiceLine !== 'all' && c.serviceLine !== selectedServiceLine) {
        return false;
      }

      if (selectedSeverity !== 'all' && c.agent3.severityLevel !== selectedSeverity) {
        return false;
      }

      if (selectedTheme !== 'all' && c.agent1.theme !== selectedTheme) {
        return false;
      }

      if (onlyHumanReview && !c.agent4.humanReviewNeeded) {
        return false;
      }

      if (onlyEquityAlerts) {
        const hasEquity =
          c.agent2.equityAndAccessibilityReview.toLowerCase().includes('critical') ||
          c.agent2.equityAndAccessibilityReview.toLowerCase().includes('lep') ||
          c.agent2.equityAndAccessibilityReview.toLowerCase().includes('disability') ||
          c.agent2.riskAssessment.equity === 'High';
        if (!hasEquity) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'severity') {
        const rank = (s: SeverityLevel) =>
          s === 'LEVEL 4 – Critical' ? 4 : s === 'LEVEL 3 – High' ? 3 : s === 'LEVEL 2 – Moderate' ? 2 : 1;
        return rank(b.agent3.severityLevel) - rank(a.agent3.severityLevel);
      }
      if (sortBy === 'satisfaction') {
        return a.satisfactionScore - b.satisfactionScore;
      }
      return new Date(b.encounterDate).getTime() - new Date(a.encounterDate).getTime();
    });
  }, [
    cases,
    searchQuery,
    selectedServiceLine,
    selectedSeverity,
    selectedTheme,
    onlyHumanReview,
    onlyEquityAlerts,
    sortBy,
  ]);

  // Aggregate metrics
  const totalAnalyzed = cases.length;
  const avgSat = (
    cases.reduce((sum, c) => sum + c.satisfactionScore, 0) / (totalAnalyzed || 1)
  ).toFixed(1);
  const criticalCount = cases.filter(
    (c) => c.agent3.severityLevel === 'LEVEL 4 – Critical'
  ).length;
  const humanReviewCount = cases.filter((c) => c.agent4.humanReviewNeeded).length;
  const highReadmitCount = cases.filter(
    (c) => c.readmissionRisk === 'Critical' || c.readmissionRisk === 'High'
  ).length;
  const equityCount = cases.filter(
    (c) =>
      c.agent2.equityAndAccessibilityReview.toLowerCase().includes('critical') ||
      c.agent2.equityAndAccessibilityReview.toLowerCase().includes('lep') ||
      c.agent2.equityAndAccessibilityReview.toLowerCase().includes('disability') ||
      c.agent2.riskAssessment.equity === 'High'
  ).length;

  // Theme counts for bar chart
  const themeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    FEEDBACK_THEMES.forEach((t) => (counts[t] = 0));
    cases.forEach((c) => {
      counts[c.agent1.theme] = (counts[c.agent1.theme] || 0) + 1;
    });
    return counts;
  }, [cases]);

  return (
    <div className="space-y-8">
      {/* 1. Executive Top Metrics Row */}
      <section aria-label="Key Performance Indicators" className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div
          className={`p-4 rounded-xl border ${
            isProjectorMode
              ? 'bg-slate-900 border-slate-700'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="text-xs text-slate-500 font-medium">Cases Triaged</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-1">
            {totalAnalyzed}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">4 Multi-Agent Pipeline</div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isProjectorMode
              ? 'bg-slate-900 border-slate-700'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="text-xs text-slate-500 font-medium">Avg Satisfaction</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-teal-600 dark:text-teal-400 mt-1">
            {avgSat} <span className="text-sm font-normal text-slate-400">/ 10</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Threshold target: 8.5</div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isProjectorMode
              ? 'bg-slate-900 border-red-900/60'
              : 'bg-white border-red-200 shadow-xs'
          }`}
        >
          <div className="text-xs text-red-600 dark:text-red-400 font-medium">Critical Grievances</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-red-600 dark:text-red-400 mt-1">
            {criticalCount}
          </div>
          <div className="text-[11px] text-red-500/80 mt-1">Level 4 Escalation</div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isProjectorMode
              ? 'bg-slate-900 border-amber-900/60'
              : 'bg-white border-amber-200 shadow-xs'
          }`}
        >
          <div className="text-xs text-amber-600 dark:text-amber-400 font-medium">Equity / LEP Flags</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-amber-600 dark:text-amber-400 mt-1">
            {equityCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Language & Access</div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isProjectorMode
              ? 'bg-slate-900 border-slate-700'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="text-xs text-slate-500 font-medium">Readmission Risk</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-orange-600 dark:text-orange-400 mt-1">
            {highReadmitCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">High or Critical Tier</div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isProjectorMode
              ? 'bg-slate-900 border-indigo-900/60'
              : 'bg-white border-indigo-200 shadow-xs'
          }`}
        >
          <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">Human Oversight</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-indigo-600 dark:text-indigo-400 mt-1">
            {humanReviewCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Review Required</div>
        </div>
      </section>

      {/* 2. Analytical Distribution Split: Themes & Operational Bottlenecks */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Theme Breakdown & Volume */}
        <div
          className={`lg:col-span-2 p-6 rounded-xl border ${
            isProjectorMode
              ? 'bg-slate-900 border-slate-700'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Patient Feedback Theme Distribution
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Classified by Agent 1 (Feedback Insight) across all feedback sources
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {totalAnalyzed} Total Comments
            </span>
          </div>

          <div className="space-y-2.5">
            {FEEDBACK_THEMES.map((theme) => {
              const count = themeCounts[theme] || 0;
              const pct = totalAnalyzed ? Math.round((count / totalAnalyzed) * 100) : 0;
              const isSelected = selectedTheme === theme;
              return (
                <button
                  key={theme}
                  onClick={() => setSelectedTheme(isSelected ? 'all' : theme)}
                  className={`w-full text-left group p-1.5 rounded-lg transition-colors ${
                    isSelected
                      ? 'bg-teal-50 dark:bg-teal-950/40 ring-1 ring-teal-500'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {theme}
                    </span>
                    <span className="font-mono tabular-nums text-slate-500 dark:text-slate-400">
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        theme === 'Discharge / Follow-Up' || theme === 'Wait Time'
                          ? 'bg-red-500'
                          : theme === 'Technology / Patient Portal'
                          ? 'bg-amber-500'
                          : theme === 'Accessibility / Equity'
                          ? 'bg-indigo-500'
                          : 'bg-teal-500'
                      }`}
                      style={{ width: `${Math.max(pct, count > 0 ? 8 : 0)}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Healthcare Equity & Safety Vulnerability Radar */}
        <div
          className={`p-6 rounded-xl border flex flex-col justify-between ${
            isProjectorMode
              ? 'bg-slate-900 border-slate-700'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Vulnerability & Equity Watch
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Monitored by Agent 2 (Experience Monitoring) for disproportionate impact on protected populations.
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg border border-red-200/60 bg-red-50/50 dark:bg-red-950/20 dark:border-red-900/40">
                <div className="font-semibold text-red-700 dark:text-red-400">
                  Limited English Proficiency (LEP)
                </div>
                <div className="text-slate-600 dark:text-slate-300 mt-1">
                  Cardiology post-discharge order confusion. Family-member ad hoc translation risk.
                </div>
              </div>

              <div className="p-3 rounded-lg border border-amber-200/60 bg-amber-50/50 dark:bg-amber-950/20 dark:border-amber-900/40">
                <div className="font-semibold text-amber-700 dark:text-amber-400">
                  Rural Digital Divide & Broadband
                </div>
                <div className="text-slate-600 dark:text-slate-300 mt-1">
                  Telehealth video latency and MFA text-message lockouts excluding senior cancer and COPD patients.
                </div>
              </div>

              <div className="p-3 rounded-lg border border-indigo-200/60 bg-indigo-50/50 dark:bg-indigo-950/20 dark:border-indigo-900/40">
                <div className="font-semibold text-indigo-700 dark:text-indigo-400">
                  Disability & ADA Physical Ingress
                </div>
                <div className="text-slate-600 dark:text-slate-300 mt-1">
                  Wheelchair ramp obstruction at outpatient physical therapy pavilion.
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setOnlyEquityAlerts(!onlyEquityAlerts);
            }}
            className={`w-full mt-4 py-2 px-3 text-xs font-semibold rounded-lg border transition-colors flex items-center justify-center gap-1.5 ${
              onlyEquityAlerts
                ? 'bg-amber-500 text-white border-amber-600'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>{onlyEquityAlerts ? 'Showing Equity Cases Only' : 'Filter by Equity / Vulnerabilities'}</span>
          </button>
        </div>
      </section>

      {/* 3. Interactive Case Triage Queue & Search Controls */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Hospital Patient Case Intelligence Roster
            </h3>
            <p className="text-xs text-slate-500">
              Showing {filteredCases.length} of {cases.length} cases evaluated through the 4-Agent pipeline
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOnlyHumanReview(!onlyHumanReview)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 ${
                onlyHumanReview
                  ? 'bg-indigo-600 text-white border-indigo-700'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Human Review Needed ({humanReviewCount})</span>
            </button>

            <button
              onClick={onOpenAnalyzer}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition-colors"
            >
              Analyze New Feedback
            </button>
          </div>
        </div>

        {/* Filter controls row */}
        <div
          className={`p-3.5 rounded-xl border flex flex-wrap items-center gap-3 text-xs ${
            isProjectorMode
              ? 'bg-slate-900 border-slate-700 text-white'
              : 'bg-white border-slate-200 text-slate-800'
          }`}
        >
          {/* Search box */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search comments, patient ID, diagnosis, service line..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500 text-xs"
            />
          </div>

          {/* Service line selector */}
          <select
            value={selectedServiceLine}
            onChange={(e) => setSelectedServiceLine(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500 text-xs"
          >
            <option value="all">All Service Lines</option>
            {SERVICE_LINES.map((sl) => (
              <option key={sl} value={sl}>
                {sl}
              </option>
            ))}
          </select>

          {/* Severity selector */}
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500 text-xs"
          >
            <option value="all">All Severities</option>
            {SEVERITY_LEVELS.map((sev) => (
              <option key={sev} value={sev}>
                {sev}
              </option>
            ))}
          </select>

          {/* Theme selector */}
          <select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500 text-xs"
          >
            <option value="all">All Themes</option>
            {FEEDBACK_THEMES.map((th) => (
              <option key={th} value={th}>
                {th}
              </option>
            ))}
          </select>

          {/* Sort selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500 text-xs"
          >
            <option value="severity">Sort: Highest Severity First</option>
            <option value="satisfaction">Sort: Lowest Satisfaction</option>
            <option value="date">Sort: Most Recent Date</option>
          </select>

          {(searchQuery ||
            selectedServiceLine !== 'all' ||
            selectedSeverity !== 'all' ||
            selectedTheme !== 'all' ||
            onlyHumanReview ||
            onlyEquityAlerts) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedServiceLine('all');
                setSelectedSeverity('all');
                setSelectedTheme('all');
                setOnlyHumanReview(false);
                setOnlyEquityAlerts(false);
              }}
              className="text-xs text-teal-600 dark:text-teal-400 hover:underline px-2"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Case Table / Card List */}
        <div
          className={`rounded-xl border overflow-hidden ${
            isProjectorMode
              ? 'bg-slate-900 border-slate-700'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          {filteredCases.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-sm">
              <p>No patient cases match the selected filter criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedServiceLine('all');
                  setSelectedSeverity('all');
                  setSelectedTheme('all');
                  setOnlyHumanReview(false);
                  setOnlyEquityAlerts(false);
                }}
                className="mt-3 px-4 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold hover:bg-slate-200"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredCases.map((c) => {
                const isCritical = c.agent3.severityLevel === 'LEVEL 4 – Critical';
                const isHigh = c.agent3.severityLevel === 'LEVEL 3 – High';
                return (
                  <article
                    key={c.id}
                    onClick={() => onSelectCase(c)}
                    className="p-4 sm:p-5 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                      {/* Left: Patient Meta & Main Finding */}
                      <div className="flex-1 min-w-0">
                        {/* Static unboxed metadata row */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                          <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                            {c.id}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="font-medium text-slate-800 dark:text-slate-200">
                            {c.persona} ({c.age}y {c.gender})
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{c.serviceLine}</span>
                          <span aria-hidden="true">·</span>
                          <span>{c.encounterDate}</span>
                          <span aria-hidden="true">·</span>
                          <span>{c.source}</span>
                        </div>

                        {/* Main Problem Headline */}
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight">
                          {c.agent4.mainProblem}
                        </h4>

                        {/* Verbatim quote teaser */}
                        <p className="text-xs text-slate-600 dark:text-slate-300 italic mt-1 line-clamp-2">
                          "{c.patientComment}"
                        </p>

                        {/* Agent 1 Theme & Operational Issue */}
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500 dark:text-slate-400">
                          <div>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">
                              Theme:
                            </span>{' '}
                            <span>{c.agent1.theme}</span>
                          </div>
                          <span aria-hidden="true">·</span>
                          <div>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">
                              Route:
                            </span>{' '}
                            <span className="text-teal-700 dark:text-teal-300 font-medium">
                              {c.agent3.escalationRoute}
                            </span>
                          </div>
                          {c.agent4.humanReviewNeeded && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                                Human Review Required
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Right: Scores, Severity & Escalation Badge */}
                      <div className="flex items-center flex-wrap sm:flex-nowrap gap-4 shrink-0 self-end lg:self-center">
                        {/* Scores */}
                        <div className="text-right">
                          <div className="text-xs text-slate-400">Satisfaction</div>
                          <div className="text-sm font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                            {c.satisfactionScore}/10
                          </div>
                        </div>

                        {/* Severity level */}
                        <div className="text-right">
                          <div className="text-xs text-slate-400">Severity</div>
                          <div
                            className={`text-xs font-semibold ${
                              isCritical
                                ? 'text-red-600 dark:text-red-400'
                                : isHigh
                                ? 'text-orange-600 dark:text-orange-400'
                                : 'text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {c.agent3.severityLevel.split('–')[1] || c.agent3.severityLevel}
                          </div>
                        </div>

                        {/* Readmission risk */}
                        <div className="text-right">
                          <div className="text-xs text-slate-400">Readmission</div>
                          <div
                            className={`text-xs font-semibold ${
                              c.readmissionRisk === 'Critical' || c.readmissionRisk === 'High'
                                ? 'text-red-600 dark:text-red-400'
                                : 'text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            {c.readmissionRisk}
                          </div>
                        </div>

                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
