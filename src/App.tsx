/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HeaderNav, NavTab } from './components/HeaderNav';
import { TopAlertBanner } from './components/TopAlertBanner';
import { BottomExecutiveActions } from './components/BottomExecutiveActions';
import { CanvasExecutiveView } from './components/CanvasExecutiveView';
import { Agent1FeedbackView } from './components/Agent1FeedbackView';
import { Agent2MonitoringView } from './components/Agent2MonitoringView';
import { Agent3TriageView } from './components/Agent3TriageView';
import { Agent4DecisionView } from './components/Agent4DecisionView';
import { CaseDetailModal } from './components/CaseDetailModal';
import { LiveAnalyzerModal } from './components/LiveAnalyzerModal';
import { ProjectorPresentationView } from './components/ProjectorPresentationView';
import { PatientCase } from './types/healthcare';
import { INITIAL_PATIENT_CASES } from './data/mockCases';

export default function App() {
  const [cases, setCases] = useState<PatientCase[]>(INITIAL_PATIENT_CASES);
  const [activeTab, setActiveTab] = useState<NavTab>('canvas');
  const [isProjectorMode, setIsProjectorMode] = useState(false);
  const [selectedCase, setSelectedCase] = useState<PatientCase | null>(null);
  const [isAnalyzerOpen, setIsAnalyzerOpen] = useState(false);

  // Status updates on cases
  const handleUpdateStatus = (caseId: string, newStatus: PatientCase['status']) => {
    setCases((prev) =>
      prev.map((c) => (c.id === caseId ? { ...c, status: newStatus } : c))
    );
    if (selectedCase && selectedCase.id === caseId) {
      setSelectedCase((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  // Add new case dynamically from the AI analyzer
  const handleSaveNewCase = (newCase: PatientCase) => {
    setCases((prev) => [newCase, ...prev]);
    setSelectedCase(newCase);
  };

  const handleToggleProjector = () => {
    const next = !isProjectorMode;
    setIsProjectorMode(next);
    if (next && activeTab !== 'projector') {
      setActiveTab('projector');
    } else if (!next && activeTab === 'projector') {
      setActiveTab('canvas');
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors flex flex-col justify-between ${
        isProjectorMode
          ? 'bg-slate-950 text-white dark'
          : 'bg-slate-50 text-slate-900'
      }`}
    >
      <div>
        {/* Strict 3-zone Header Nav */}
        <HeaderNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onOpenAnalyzer={() => setIsAnalyzerOpen(true)}
          isProjectorMode={isProjectorMode}
          onToggleProjector={handleToggleProjector}
        />

        {/* Top Management Alert Banner */}
        <TopAlertBanner
          cases={cases}
          isProjectorMode={isProjectorMode}
          onFilterCritical={() => {
            setActiveTab('canvas');
          }}
          onSelectCase={(c) => setSelectedCase(c)}
        />

        {/* Main Content Viewport */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {activeTab === 'canvas' && (
            <CanvasExecutiveView
              cases={cases}
              isProjectorMode={isProjectorMode}
              onSelectCase={(c) => setSelectedCase(c)}
              onOpenAnalyzer={() => setIsAnalyzerOpen(true)}
            />
          )}

          {activeTab === 'agent1-feedback' && (
            <Agent1FeedbackView
              cases={cases}
              isProjectorMode={isProjectorMode}
              onSelectCase={(c) => setSelectedCase(c)}
              onOpenAnalyzer={() => setIsAnalyzerOpen(true)}
            />
          )}

          {activeTab === 'agent2-monitoring' && (
            <Agent2MonitoringView
              cases={cases}
              isProjectorMode={isProjectorMode}
              onSelectCase={(c) => setSelectedCase(c)}
              onOpenAnalyzer={() => setIsAnalyzerOpen(true)}
            />
          )}

          {activeTab === 'agent3-triage' && (
            <Agent3TriageView
              cases={cases}
              isProjectorMode={isProjectorMode}
              onSelectCase={(c) => setSelectedCase(c)}
              onOpenAnalyzer={() => setIsAnalyzerOpen(true)}
            />
          )}

          {activeTab === 'agent4-decision' && (
            <Agent4DecisionView
              cases={cases}
              isProjectorMode={isProjectorMode}
              onSelectCase={(c) => setSelectedCase(c)}
              onOpenAnalyzer={() => setIsAnalyzerOpen(true)}
            />
          )}

          {activeTab === 'projector' && (
            <ProjectorPresentationView
              cases={cases}
              onSelectCase={(c) => setSelectedCase(c)}
              onExitProjector={() => {
                setIsProjectorMode(false);
                setActiveTab('canvas');
              }}
            />
          )}
        </main>
      </div>

      {/* Bottom Recommended Management Actions */}
      <BottomExecutiveActions
        cases={cases}
        isProjectorMode={isProjectorMode}
      />

      {/* Case Detail Drilldown Modal */}
      {selectedCase && (
        <CaseDetailModal
          patientCase={selectedCase}
          onClose={() => setSelectedCase(null)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}

      {/* Live AI Analyzer Modal */}
      <LiveAnalyzerModal
        isOpen={isAnalyzerOpen}
        onClose={() => setIsAnalyzerOpen(false)}
        onSaveCase={handleSaveNewCase}
      />
    </div>
  );
}
