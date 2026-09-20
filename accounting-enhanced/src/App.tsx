import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AchievementsProvider } from './contexts/AchievementsContext';
import { LanguageProvider } from './contexts/LanguageContext';
import HomePage from './pages/HomePage';
import SimulationPage from './pages/SimulationPage';
import AchievementsPage from './pages/AchievementsPage';
import Header from './components/Header';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AchievementsProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/simulation" element={<SimulationPage />} />
                <Route path="/achievements" element={<AchievementsPage />} />
              </Routes>
            </div>
          </BrowserRouter>
        </AchievementsProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
