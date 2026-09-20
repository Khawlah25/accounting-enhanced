import { useState } from 'react';
import { Download, Share2 } from 'lucide-react';
import { useAchievements } from '../contexts/AchievementsContext';
import { generateCertificateId, downloadCertificate, generateCertificateSVG } from '../utils/certificateGenerator';
import { Scenario } from '../data/scenarios';

interface Props {
  scenario: Scenario;
}

export default function CompletionCertificate({ scenario }: Props) {
  const { progress } = useAchievements();
  const [userName, setUserName] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateId] = useState(generateCertificateId());

  const handleDownload = () => {
    if (!userName.trim()) return;
    
    downloadCertificate({
      userName: userName.trim(),
      completionDate: new Date(),
      successRate: progress.successRate,
      stagesCompleted: progress.completedStages,
      certificateId,
    });
  };

  const handleShare = () => {
    if (!navigator.share) {
      alert('ميزة المشاركة غير متوفرة في متصفحك');
      return;
    }

    navigator.share({
      title: 'شهادة إتمام - المحاكاة المحاسبية',
      text: `لقد أكملت برنامج المحاكاة المحاسبية بمعدل نجاح ${progress.successRate.toFixed(1)}%!`,
      url: window.location.href,
    });
  };

  if (!showCertificate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="card p-8 text-center space-y-6">
            <div className="text-6xl animate-bounce">🎉</div>
            
            <h1 className="text-4xl font-bold text-green-600 dark:text-green-400">
              تهانينا! لقد أكملت البرنامج
            </h1>

            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p className="text-lg">
                أنت الآن متخصص في محاكاة الدورة المحاسبية
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-slate-800 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">معدل النجاح</p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {progress.successRate.toFixed(1)}%
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-slate-800 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">الإنجازات</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {progress.achievements.length}
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-slate-800 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
                <p className="text-sm font-medium">
                  السيناريو: <span className="font-bold">{scenario.name}</span>
                </p>
              </div>
            </div>

            {/* User Name Input */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  أدخل اسمك لإنشاء الشهادة
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="أدخل اسمك الكامل"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <button
                onClick={() => setShowCertificate(true)}
                disabled={!userName.trim()}
                className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all"
              >
                عرض الشهادة
              </button>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              بعد عرض الشهادة، يمكنك تحميلها أو مشاركتها
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            شهادتك الاحترافية
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            معرف الشهادة: {certificateId}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Certificate Preview */}
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-2xl mb-6 overflow-hidden">
            <div
              dangerouslySetInnerHTML={{
                __html: generateCertificateSVG({
                  userName,
                  completionDate: new Date(),
                  successRate: progress.successRate,
                  stagesCompleted: progress.completedStages,
                  certificateId,
                })
              }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all"
            >
              <Download size={20} />
              تحميل الشهادة
            </button>

            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 font-bold rounded-lg transition-colors"
            >
              <Share2 size={20} />
              مشاركة الشهادة
            </button>

            <button
              onClick={() => window.location.href = '/'}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-gray-200 dark:bg-slate-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-700 font-bold rounded-lg transition-colors"
            >
              العودة للرئيسية
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="card p-6 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-2">معدل النجاح</p>
              <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                {progress.successRate.toFixed(1)}%
              </p>
            </div>
            <div className="card p-6 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-2">المراحل المكتملة</p>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                {progress.completedStages}/8
              </p>
            </div>
            <div className="card p-6 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-2">الإنجازات</p>
              <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                {progress.achievements.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
