import React, { useState } from 'react';
import { MessageSquare, AlertCircle, CheckCircle, Info, Filter } from 'lucide-react';
import { PatientCase, FeedbackTheme, Sentiment } from '../types/healthcare';
import { FEEDBACK_THEMES } from '../data/mockCases';

interface Agent1FeedbackViewProps {
  cases: PatientCase[];
  isProjectorMode: boolean;
  onSelectCase: (c: PatientCase) => void;
  onOpenAnalyzer: () => void;
}

export const Agent1FeedbackView: React.FC<Agent1FeedbackViewProps> = ({
  cases,
  isProjectorMode,
  onSelectCase,
  onOpenAnalyzer,
}) => {
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [selectedSentiment, setSelectedSentiment] = useState<string>('all');

  const filtered = cases.filter((c) => {
    if (selectedTheme !== 'all' && c.agent1.theme !== selectedTheme) return false;
    if (selectedSentiment !== 'all' && c.agent1.sentiment !== selectedSentiment) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Agent 1 Mandate Banner */}
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
              <span>Agent 01</span>
              <span aria-hidden="true">·</span>
              <span>Patient Feedback Insight Agent</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              Deep Comment Parsing & Process Analysis
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
              Analyzes raw patient narratives to isolate the primary theme, classify true emotional sentiment, formulate healthcare process issue hypotheses, flag patient safety or bias risks, and propose practical managerial interventions without inventing clinical facts.
            </p>
          </div>
          <button
            onClick={onOpenAnalyzer}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition-colors shrink-0 shadow-sm"
          >
            Analyze New Comment
          </button>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-3 mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs">
          <span className="font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" />
            <span>Theme:</span>
          </span>
          <select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-1 focus:ring-teal-500"
          >
            <option value="all">All Themes ({cases.length})</option>
            {FEEDBACK_THEMES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <span className="font-semibold text-slate-600 dark:text-slate-300 ml-2">
            Sentiment:
          </span>
          <select
            value={selectedSentiment}
            onChange={(e) => setSelectedSentiment(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-1 focus:ring-teal-500"
          >
            <option value="all">All Sentiments</option>
            <option value="Positive">Positive</option>
            <option value="Negative">Negative</option>
            <option value="Neutral">Neutral</option>
            <option value="Mixed">Mixed</option>
          </select>

          {(selectedTheme !== 'all' || selectedSentiment !== 'all') && (
            <button
              onClick={() => {
                setSelectedTheme('all');
                setSelectedSentiment('all');
              }}
              className="text-teal-600 dark:text-teal-400 hover:underline ml-2"
            >
              Reset
            </button>
          )}
        </div>
      </section>

      {/* Grid of Parsed Patient Comments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((c) => {
          const { theme, sentiment, reasoning, operationalIssue, riskOrBiasConcern, recommendedAction } =
            c.agent1;

          const sentimentColor =
            sentiment === 'Positive'
              ? 'text-emerald-700 dark:text-emerald-400'
              : sentiment === 'Negative'
              ? 'text-red-700 dark:text-red-400'
              : sentiment === 'Mixed'
              ? 'text-amber-700 dark:text-amber-400'
              : 'text-slate-700 dark:text-slate-300';

          return (
            <article
              key={c.id}
              onClick={() => onSelectCase(c)}
              className={`p-6 rounded-xl border cursor-pointer transition-all hover:shadow-md flex flex-col justify-between ${
                isProjectorMode
                  ? 'bg-slate-900 border-slate-700 hover:border-slate-500 text-white'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                {/* Meta header */}
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                      {c.id}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{c.serviceLine}</span>
                  </div>
                  <span className={`font-semibold ${sentimentColor}`}>{sentiment} Sentiment</span>
                </div>

                {/* Patient verbatim comment */}
                <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 text-xs sm:text-sm text-slate-800 dark:text-slate-200 italic mb-4 leading-relaxed">
                  "{c.patientComment}"
                </div>

                {/* Structured 6-Point Breakdown */}
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      1. Theme:
                    </span>{' '}
                    <span className="text-teal-700 dark:text-teal-300 font-semibold">{theme}</span>
                  </div>

                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      2. Sentiment:
                    </span>{' '}
                    <span className={sentimentColor}>{sentiment}</span>
                  </div>

                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      3. Reasoning:
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                      {reasoning}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      4. Operational Issue:
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                      {operationalIssue}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      5. Risk or Bias Concern:
                    </span>
                    <p className="text-amber-700 dark:text-amber-400 mt-0.5 leading-relaxed font-medium">
                      {riskOrBiasConcern}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      6. Recommended Action:
                    </span>
                    <p className="text-slate-700 dark:text-slate-200 mt-0.5 leading-relaxed font-semibold">
                      {recommendedAction}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span>Encounter: {c.encounterDate}</span>
                <span className="text-teal-600 dark:text-teal-400 font-medium hover:underline">
                  Full 4-Agent Profile →
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
