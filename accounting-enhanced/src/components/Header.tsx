import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAchievements } from '../contexts/AchievementsContext';
import { Moon, Sun, Trophy, Globe } from 'lucide-react';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const { progress } = useAchievements();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80">
              <span className="text-2xl">📊</span>
              <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {language === 'ar' ? 'المحاكاة المحاسبية' : 'Accounting Simulator'}
              </h1>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {t('home')}
              </Link>
              <Link
                to="/simulation"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {t('simulation')}
              </Link>
              <Link
                to="/achievements"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
              >
                <Trophy size={18} />
                {t('achievements')} ({progress.achievements.length})
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span>{language === 'ar' ? 'التقدم' : 'Progress'}: </span>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {progress.completedStages}/{progress.totalStages}
              </span>
            </div>

            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              title={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
              aria-label="Toggle language"
            >
              <Globe size={20} className="text-gray-600 dark:text-gray-400" />
              <span className="text-xs font-bold">{language.toUpperCase()}</span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={t('darkMode')}
            >
              {theme === 'light' ? (
                <Moon size={20} className="text-gray-600" />
              ) : (
                <Sun size={20} className="text-yellow-500" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
