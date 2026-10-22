import React from 'react';
import { Presentation, PlusCircle } from 'lucide-react';

export type NavTab =
  | 'canvas'
  | 'agent1-feedback'
  | 'agent2-monitoring'
  | 'agent3-triage'
  | 'agent4-decision'
  | 'projector';

interface HeaderNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenAnalyzer: () => void;
  isProjectorMode: boolean;
  onToggleProjector: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeTab,
  onTabChange,
  onOpenAnalyzer,
  isProjectorMode,
  onToggleProjector,
}) => {
  return (
    <header
      className={`w-full border-b transition-colors ${
        isProjectorMode
          ? 'bg-slate-950 border-slate-800 text-white'
          : 'bg-white border-slate-200 text-slate-900'
      } px-6 py-3.5 sticky top-0 z-40 backdrop-blur-md bg-opacity-95`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onTabChange('canvas')}
          className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 flex items-center gap-2 hover:opacity-85 text-left"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-teal-500 inline-block"></span>
          <span>CareInsight Intelligence</span>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-6 text-sm font-medium"
        >
          <button
            onClick={() => onTabChange('canvas')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b-2 ${
              activeTab === 'canvas'
                ? 'border-teal-600 text-teal-700 dark:text-teal-400 font-semibold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => onTabChange('agent1-feedback')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b-2 ${
              activeTab === 'agent1-feedback'
                ? 'border-teal-600 text-teal-700 dark:text-teal-400 font-semibold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Feedback
          </button>

          <button
            onClick={() => onTabChange('agent2-monitoring')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b-2 ${
              activeTab === 'agent2-monitoring'
                ? 'border-teal-600 text-teal-700 dark:text-teal-400 font-semibold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Experience
          </button>

          <button
            onClick={() => onTabChange('agent3-triage')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b-2 ${
              activeTab === 'agent3-triage'
                ? 'border-teal-600 text-teal-700 dark:text-teal-400 font-semibold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Triage
          </button>

          <button
            onClick={() => onTabChange('agent4-decision')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b-2 ${
              activeTab === 'agent4-decision'
                ? 'border-teal-600 text-teal-700 dark:text-teal-400 font-semibold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Decisions
          </button>
        </nav>

        {/* Zone 3: 1 primary action + Projector mode toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleProjector}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
              isProjectorMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
            }`}
            title="Toggle Classroom Projector / High Contrast Presentation Mode"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Projector View</span>
          </button>

          <button
            onClick={onOpenAnalyzer}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-teal-600 dark:hover:bg-teal-500 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Analyze Feedback</span>
          </button>
        </div>
      </div>
    </header>
  );
};
