import React from 'react';
import { CheckCircle2, TrendingUp, ShieldCheck, ArrowRight, Lightbulb } from 'lucide-react';
import { PatientCase } from '../types/healthcare';

interface BottomExecutiveActionsProps {
  cases: PatientCase[];
  isProjectorMode: boolean;
  onOpenActionPlan?: () => void;
}

export const BottomExecutiveActions: React.FC<BottomExecutiveActionsProps> = ({
  cases,
  isProjectorMode,
  onOpenActionPlan,
}) => {
  // Aggregate systemic insights from the cases
  const lepCases = cases.filter(
    (c) => c.language.toLowerCase().includes('spanish') || c.language.toLowerCase().includes('lep')
  );
  const portalCases = cases.filter(
    (c) => c.agent1.theme === 'Technology / Patient Portal' || c.portalUsage === 'Authentication Failure'
  );
  const privacyCases = cases.filter(
    (c) => c.agent3.primaryCategory === 'Privacy or Security'
  );
  const waitCases = cases.filter((c) => c.agent1.theme === 'Wait Time');

  const actions = [
    {
      number: '01',
      title: 'Mandate Bedside Certified Medical Interpretation & Bilingual Discharge Reconciliation',
      category: 'Clinical Care & Equity Access',
      impact: 'Eliminate 30-Day Readmission Disparities',
      owner: 'Chief Medical Officer & Nursing Executive Committee',
      timeframe: 'Immediate (Next 7 Days)',
      evidence: `${lepCases.length} active critical cases identified with language barriers causing discharge medication orders discrepancy.`,
      description:
        'Enforce an EHR hard-stop requiring documented certified medical interpreter participation for all LEP discharge medication teachings. Prohibit relying on family members for complex pharmacotherapy.',
    },
    {
      number: '02',
      title: 'Overhaul Patient Portal MFA & Eliminate Rural Telehealth No-Show Penalties',
      category: 'Digital Health & Rural Inclusion',
      impact: 'Restore Diagnostic Access for 100% of Rural Seniors',
      owner: 'VP of Health IT & Revenue Cycle Director',
      timeframe: '14-Day Sprint',
      evidence: `${portalCases.length} cases impacted by cell-dependent MFA lockouts and dropped rural video telehealth visits.`,
      description:
        'Deploy telephone voice OTP and email authenticators; institute an automatic telephone fallback requirement if video drops for >3 minutes; void punitive no-show charges for dropped telehealth connections.',
    },
    {
      number: '03',
      title: 'Automate Legal Protective Order Audit on Inpatient Portal Proxy Accounts',
      category: 'Patient Safety & Regulatory Compliance',
      impact: 'Zero Tolerance for PHI Disclosure & Domestic Safety Breaches',
      owner: 'Chief Privacy Officer & Risk Management',
      timeframe: '48-Hour Hardening',
      evidence: `${privacyCases.length} severe privacy incident identified with unauthorized psychiatric records disclosed to estranged proxy with restraining order.`,
      description:
        'Implement automated cross-referencing between hospital legal restraining order flags and active portal proxy delegations upon every inpatient admission.',
    },
  ];

  return (
    <footer
      aria-label="Executive Management Recommendations"
      className={`w-full mt-12 border-t transition-colors ${
        isProjectorMode
          ? 'bg-slate-900 border-slate-700 text-white'
          : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      } p-6 sm:p-8`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                <span>Executive Decision Support</span>
                <span aria-hidden="true">·</span>
                <span>Synthesized Management Actions</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Prioritized Managerial Actions Based on Aggregate Patient Intelligence
              </h3>
            </div>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 font-mono">
            <span>Data Grounded in {cases.length} Multi-Agent Patient Case Records</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {actions.map((act) => (
            <div
              key={act.number}
              className={`flex flex-col justify-between p-5 rounded-xl border transition-all ${
                isProjectorMode
                  ? 'bg-slate-800/80 border-slate-700 hover:border-slate-500'
                  : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-white hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold font-mono text-teal-600 dark:text-teal-400">
                    ACTION {act.number}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-700 font-medium text-slate-700 dark:text-slate-300">
                    {act.timeframe}
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                  {act.title}
                </h4>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {act.description}
                </p>

                <div className="border-t border-slate-200/60 dark:border-slate-700/60 pt-3 text-xs space-y-1 text-slate-500 dark:text-slate-400">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Owner:</span>
                    <span className="truncate ml-2">{act.owner}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Target Outcome:</span>
                    <span className="text-teal-700 dark:text-teal-300 font-medium truncate ml-2">
                      {act.impact}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs">
                <span className="text-slate-400 dark:text-slate-500 italic text-[11px]">
                  {act.evidence}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};
