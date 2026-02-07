
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import SlideEditor from './components/SlideEditor';
import AICoach from './components/AICoach';
import PresentationWizard from './components/PresentationWizard';
import { Presentation, Tone, PresentationTheme } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'editor' | 'coach'>('dashboard');
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [selectedPresentation, setSelectedPresentation] = useState<Presentation | null>(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  useEffect(() => {
    // Fix: Updated mock presentation to include mandatory x, y, w, h properties and correct content types
    const mockPresentation: Presentation = {
      id: 'demo-1',
      title: 'Il Futuro del Design con IA',
      topic: 'IA Generativa',
      description: 'Esplorazione dei flussi di lavoro creativi moderni.',
      tone: 'ispiratore',
      theme: 'dark-modern',
      slideCount: 2,
      createdAt: Date.now() - 86400000,
      slides: [
        {
          id: 's1',
          layout: 'titolo',
          background: 'inherit',
          elements: [
            { id: 'e1', type: 'title', title: 'Il Futuro del Design con IA', fontSize: 64, x: 10, y: 35, w: 80, h: 20 },
            { id: 'e2', type: 'text', body: 'Ridefinire UX\nWorkflow Generativi', fontSize: 24, x: 10, y: 55, w: 80, h: 30 }
          ]
        },
        {
          id: 's2',
          layout: 'contenuto',
          background: 'inherit',
          elements: [
            { id: 'e3', type: 'title', title: 'Flussi Generativi', fontSize: 48, x: 8, y: 10, w: 84, h: 12 },
            { id: 'e4', type: 'text', body: 'Automazione asset\nIterazione real-time', fontSize: 24, x: 8, y: 25, w: 84, h: 65 }
          ]
        }
      ]
    };
    setPresentations([mockPresentation]);
  }, []);

  const handleCreateComplete = (data: any) => {
    const newP: Presentation = {
      id: `p-${Date.now()}`,
      title: data.title,
      topic: data.topic,
      description: data.description,
      tone: data.tone,
      theme: data.theme,
      slideCount: data.slideCount,
      createdAt: Date.now(),
      slides: data.slides
    };
    setPresentations([newP, ...presentations]);
    setSelectedPresentation(newP);
    setActiveView('editor');
    setIsWizardOpen(false);
  };

  const updatePresentation = (updated: Presentation) => {
    setPresentations(presentations.map(p => p.id === updated.id ? updated : p));
    setSelectedPresentation(updated);
  };

  return (
    <div className="flex bg-gray-950 min-h-screen">
      <Sidebar onNavigate={setActiveView} activeView={activeView} />
      
      <main className="flex-1 ml-20 md:ml-64">
        {activeView === 'dashboard' && (
          <Dashboard 
            presentations={presentations} 
            onCreateNew={() => setIsWizardOpen(true)} 
            onSelectPresentation={(p) => {
                setSelectedPresentation(p);
                setActiveView('editor');
            }}
          />
        )}
        
        {activeView === 'editor' && selectedPresentation && (
          <SlideEditor 
            presentation={selectedPresentation} 
            onUpdate={updatePresentation}
          />
        )}
        
        {activeView === 'coach' && (
          <AICoach />
        )}
      </main>

      {isWizardOpen && (
        <PresentationWizard 
          onCancel={() => setIsWizardOpen(false)} 
          onComplete={handleCreateComplete}
        />
      )}
    </div>
  );
};

export default App;
