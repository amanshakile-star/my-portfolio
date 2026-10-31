import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { SkillsPage } from './pages/SkillsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ResumePage } from './pages/ResumePage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-dark-bg dark:text-slate-100 transition-colors duration-200">
          <Navbar />
          <main className="flex-grow">
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/skills" element={<SkillsPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:slug" element={<ProjectDetailPage />} />
                <Route path="/resume" element={<ResumePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </ErrorBoundary>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
