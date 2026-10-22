import React, { useState } from 'react';
import {
  Presentation,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Printer,
  Users,
  CheckCircle2,
  Lightbulb,
} from 'lucide-react';
import { PatientCase } from '../types/healthcare';

interface ProjectorPresentationViewProps {
  cases: PatientCase[];
  onSelectCase: (c: PatientCase) => void;
  onExitProjector: () => void;
}

export const ProjectorPresentationView: React.FC<ProjectorPresentationViewProps> = ({
  cases,
  onSelectCase,
  onExitProjector,
}) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const criticalCases = cases.filter((c) => c.agent3.severityLevel === 'LEVEL 4 – Critical');
  const equityCases = cases.filter(
    (c) =>
      c.agent2.equityAndAccessibilityReview.toLowerCase().includes('critical') ||
      c.agent2.equityAndAccessibilityReview.toLowerCase().includes('lep') ||
      c.agent2.equityAndAccessibilityReview.toLowerCase().includes('disability') ||
      c.agent2.riskAssessment.equity === 'High'
  );
  const avgSat = (
    cases.reduce((sum, c) => sum + c.satisfactionScore, 0) / (cases.length || 1)
  ).toFixed(1);

  const slides = [
    { id: 0, title: 'Executive Overview & Primary Finding' },
    { id: 1, title: 'Critical Grievance Triage & Risk Log' },
    { id: 2, title: 'Healthcare Equity & Structural Bottlenecks' },
    { id: 3, title: 'Systemic Management Action Recommendations' },
  ];

  return (
    <div className="bg-slate-950 text-white min-h-[85vh] rounded-2xl p-6 sm:p-10 border-2 border-slate-700 shadow-2xl flex flex-col justify-between">
      {/* Top Projector Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
            <span>Classroom Presentation Mode</span>
            <span aria-hidden="true">·</span>
            <span>High-Contrast Projector View</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-white">
            {slides[slideIndex].title}
          </h2>
        </div>

        {/* Slide controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-lg p-1 text-xs font-mono">
            <button
              onClick={() => setSlideIndex(Math.max(0, slideIndex - 1))}
              disabled={slideIndex === 0}
              className="p-1.5 rounded hover:bg-slate-800 disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-bold">
              {slideIndex + 1} / {slides.length}
            </span>
            <button
              onClick={() => setSlideIndex(Math.min(slides.length - 1, slideIndex + 1))}
              disabled={slideIndex === slides.length - 1}
              className="p-1.5 rounded hover:bg-slate-800 disabled:opacity-30 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => window.print()}
            className="p-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-xs text-slate-300 transition-colors"
            title="Print Presentation Sheet"
          >
            <Printer className="w-4 h-4" />
          </button>

          <button
            onClick={onExitProjector}
            className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-semibold text-white transition-colors"
          >
            Exit Projector Mode
          </button>
        </div>
      </div>

      {/* Main Slide Content Canvas */}
      <div className="py-8 flex-1 flex flex-col justify-center">
        {/* SLIDE 0: Executive Overview & Primary Alert */}
        {slideIndex === 0 && (
          <div className="space-y-8">
            {/* Massive Alert Callout at top */}
            <div className="p-6 rounded-xl bg-red-950/60 border-2 border-red-500/80">
              <div className="text-xs font-bold uppercase tracking-widest text-red-400 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-400" />
                <span>Primary Executive Finding</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-2 leading-snug">
                Language Barrier Caused Acute Cardiac Discharge Medication Dosing Failure; Concurrent Inpatient Psychiatric PHI Breach Disclosed to Estranged Party.
              </h3>
              <p className="text-sm text-slate-300 mt-2">
                Immediate intervention underway across Cardiology 4W and Health IT Privacy Compliance.
              </p>
            </div>

            {/* Giant KPI Grid for Projector */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <div className="text-xs uppercase text-slate-400 font-bold tracking-wider">
                  Total Patients Triaged
                </div>
                <div className="text-4xl sm:text-5xl font-black font-mono tabular-nums text-white mt-2">
                  {cases.length}
                </div>
                <div className="text-xs text-teal-400 mt-1">Multi-Agent Audited</div>
              </div>

              <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <div className="text-xs uppercase text-slate-400 font-bold tracking-wider">
                  Mean Satisfaction
                </div>
                <div className="text-4xl sm:text-5xl font-black font-mono tabular-nums text-teal-400 mt-2">
                  {avgSat}
                </div>
                <div className="text-xs text-slate-400 mt-1">Scale 1–10</div>
              </div>

              <div className="p-6 rounded-xl bg-slate-900 border-2 border-red-900/60 text-center">
                <div className="text-xs uppercase text-red-400 font-bold tracking-wider">
                  Level 4 Critical
                </div>
                <div className="text-4xl sm:text-5xl font-black font-mono tabular-nums text-red-400 mt-2">
                  {criticalCases.length}
                </div>
                <div className="text-xs text-red-300 mt-1">Emergency Escalation</div>
              </div>

              <div className="p-6 rounded-xl bg-slate-900 border border-amber-900/60 text-center">
                <div className="text-xs uppercase text-amber-400 font-bold tracking-wider">
                  Equity & LEP Alerts
                </div>
                <div className="text-4xl sm:text-5xl font-black font-mono tabular-nums text-amber-400 mt-2">
                  {equityCases.length}
                </div>
                <div className="text-xs text-amber-300 mt-1">Civil Rights & Access</div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 1: Critical Grievance Triage */}
        {slideIndex === 1 && (
          <div className="space-y-6">
            <div className="text-sm text-slate-300 mb-2">
              Showing Level 3 and Level 4 grievances triaged by Agent 3 with immediate organizational risk:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cases
                .filter(
                  (c) =>
                    c.agent3.severityLevel === 'LEVEL 4 – Critical' ||
                    c.agent3.severityLevel === 'LEVEL 3 – High'
                )
                .slice(0, 4)
                .map((c) => (
                  <div
                    key={c.id}
                    onClick={() => onSelectCase(c)}
                    className="p-5 rounded-xl bg-slate-900 border-2 border-slate-800 hover:border-teal-500 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="font-mono font-bold text-amber-400">{c.id}</span>
                      <span className="font-bold text-red-400">{c.agent3.severityLevel}</span>
                    </div>
                    <h4 className="text-base font-bold text-white mb-2 leading-snug">
                      {c.agent4.mainProblem}
                    </h4>
                    <p className="text-xs text-slate-300 italic line-clamp-2">
                      "{c.patientComment}"
                    </p>
                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Route: <strong className="text-teal-400">{c.agent3.escalationRoute}</strong></span>
                      <span className="text-amber-400 font-mono">SLA: {c.agent3.slaTarget}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* SLIDE 2: Healthcare Equity & Access Bottlenecks */}
        {slideIndex === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                01. Language & LEP Access
              </div>
              <h4 className="text-lg font-bold text-white mb-2">
                Title VI & Discharge Safety
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ad hoc translation by family members in cardiology led to conflicting diuretic instructions and acute edema. Medical interpreter EHR hard-stop is critical.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                02. Rural Broadband Divide
              </div>
              <h4 className="text-lg font-bold text-white mb-2">
                Telehealth & Portal MFA Barriers
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Rural senior oncology and COPD patients locked out of portal labs or penalized with $50 no-show fees when video drops over high-latency cellular dead zones.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                03. Disability Physical Access
              </div>
              <h4 className="text-lg font-bold text-white mb-2">
                ADA Title III Ingress Compliance
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Renovation debris blocked wheelchair ramp at outpatient physical therapy, leading to delayed rehabilitation. Daily barrier-free route inspection required.
              </p>
            </div>
          </div>
        )}

        {/* SLIDE 3: Systemic Management Actions */}
        {slideIndex === 3 && (
          <div className="space-y-6">
            <div className="text-sm text-slate-300">
              Final executive recommendations synthesizing findings from all 4 healthcare agents:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-slate-900 border-2 border-teal-500/60">
                <div className="text-xs font-bold font-mono text-teal-400 mb-1">RECOMMENDATION 01</div>
                <h4 className="text-lg font-bold text-white mb-2">
                  Enforce Bedside Medical Interpreter Sign-Off
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Establish an EHR hard-stop requiring certified interpreter verification of discharge medication instructions for all LEP patients before bed turnover.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-slate-900 border-2 border-teal-500/60">
                <div className="text-xs font-bold font-mono text-teal-400 mb-1">RECOMMENDATION 02</div>
                <h4 className="text-lg font-bold text-white mb-2">
                  Implement Phone Fallback & Void Rural No-Show Fees
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Mandate telephone audio backup for dropped virtual visits and eliminate punitive charges for connectivity failures affecting rural patients.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-slate-900 border-2 border-teal-500/60">
                <div className="text-xs font-bold font-mono text-teal-400 mb-1">RECOMMENDATION 03</div>
                <h4 className="text-lg font-bold text-white mb-2">
                  Automate Protective Order Audits on Portal Proxies
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Institute real-time verification of hospital restraining order flags against patient portal proxy delegations upon admission to prevent HIPAA and safety breaches.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Slide Navigation Footnote */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setSlideIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                slideIndex === idx ? 'w-8 bg-amber-400' : 'w-2 bg-slate-700 hover:bg-slate-600'
              }`}
            />
          ))}
        </div>
        <span>Use arrow keys or buttons above to advance classroom slides</span>
      </div>
    </div>
  );
};
