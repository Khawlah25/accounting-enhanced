import { Link } from 'react-router-dom';
import { ArrowLeft, Star, Users, BookOpen, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function HomePage() {
  const { t, isRTL } = useLanguage();
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="text-6xl animate-bounce">📊</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            {t('welcome')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('subtitle')}
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 pt-8">
            <Link
              to="/simulation"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-all hover:scale-105 active:scale-95"
            >
              {t('startSimulation')}
              {isRTL ? <ArrowLeft size={20} /> : null}
            </Link>
            <Link
              to="/achievements"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg font-bold transition-colors"
            >
              {isRTL ? null : <Award size={20} />}
              {t('achievements')}
              {isRTL ? <Award size={20} /> : null}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          {t('features')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<Star className="w-8 h-8" />}
            title={t('feature1')}
            description={t('feature1Desc')}
          />
          <FeatureCard
            icon={<Users className="w-8 h-8" />}
            title={t('feature4')}
            description={t('feature4Desc')}
          />
          <FeatureCard
            icon={<BookOpen className="w-8 h-8" />}
            title={t('feature2')}
            description={t('feature2Desc')}
          />
          <FeatureCard
            icon={<Award className="w-8 h-8" />}
            title={t('feature3')}
            description={t('feature3Desc')}
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-slate-900 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <StatCard number="1000+" label="متعلم نشط" />
            <StatCard number="95%" label="معدل النجاح" />
            <StatCard number="8" label="مراحل متقدمة" />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          {t('aboutTitle')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ProcessStep number={1} title={t('feature4')} description={t('aboutText')} />
          <ProcessStep number={2} title={t('simulation')} description={t('feature1Desc')} />
          <ProcessStep number={3} title={t('certificateTitle')} description={t('feature3Desc')} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-900 dark:to-indigo-900 text-white py-16">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-bold">{t('welcome')}</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
          <Link
            to="/simulation"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
          >
            {t('startSimulation')}
          </Link>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="card p-6 text-center hover:shadow-lg">
      <div className="flex justify-center mb-4 text-blue-600 dark:text-blue-400">
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">{number}</div>
      <p className="text-gray-600 dark:text-gray-400 mt-2">{label}</p>
    </div>
  );
}

function ProcessStep({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-4 text-lg font-bold">
        {number}
      </div>
      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}
