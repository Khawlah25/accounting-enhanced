import { useState, useEffect } from 'react';
import { useAchievements } from '../contexts/AchievementsContext';
import { getRandomScenario } from '../data/scenarios';
import { getHintMessage } from '../data/hints';
import { ChevronRight, Lightbulb, Target, Award } from 'lucide-react';
import CompletionCertificate from '../components/CompletionCertificate';

const STAGES = [
  { id: 1, name: 'تحديد العمليات', icon: '📋', color: 'blue' },
  { id: 2, name: 'القيود اليومية', icon: '✍️', color: 'purple' },
  { id: 3, name: 'ترحيل الحسابات', icon: '📚', color: 'indigo' },
  { id: 4, name: 'ميزان المراجعة', icon: '⚖️', color: 'cyan' },
  { id: 5, name: 'حسابات التسوية', icon: '🔧', color: 'teal' },
  { id: 6, name: 'ميزان معدل', icon: '📊', color: 'green' },
  { id: 7, name: 'التسويات الإضافية', icon: '➕', color: 'emerald' },
  { id: 8, name: 'القوائم المالية', icon: '💰', color: 'rose' },
];

type PageType = 'stages' | 'stage-detail' | 'completion';

interface StageData {
  stageId: number;
  userAnswers: Record<string, any>;
  hints: string[];
  attempts: number;
  completed: boolean;
}

export default function SimulationPage() {
  const { progress, updateProgress } = useAchievements();
  const [currentPage, setCurrentPage] = useState<PageType>('stages');
  const [selectedStage, setSelectedStage] = useState(1);
  const [stageData, setStageData] = useState<StageData>({
    stageId: selectedStage,
    userAnswers: {},
    hints: [],
    attempts: 0,
    completed: false,
  });
  const [error, setError] = useState<string>('');
  const [showHint, setShowHint] = useState(false);
  const [scenario] = useState(() => getRandomScenario());

  const handleStageSelect = (stageId: number) => {
    setSelectedStage(stageId);
    setCurrentPage('stage-detail');
    setStageData({
      stageId,
      userAnswers: {},
      hints: [],
      attempts: 0,
      completed: false,
    });
    setError('');
    setShowHint(false);
  };

  const handleHintRequest = () => {
    const hints = [
      'تذكر: مجموع الديون = مجموع الأرصدة',
      'تحقق من نوع الحساب المستخدم',
      'تأكد من التواريخ الصحيحة',
      'راجع دليل الحسابات',
    ];
    const hint = hints[Math.floor(Math.random() * hints.length)];
    setStageData(prev => ({
      ...prev,
      hints: [...prev.hints, hint]
    }));
    setShowHint(true);
  };

  const handleSubmitStage = () => {
    const success = Math.random() > 0.3; // 70% success rate for demo
    
    if (success) {
      setStageData(prev => ({
        ...prev,
        completed: true,
        attempts: prev.attempts + 1,
      }));
      updateProgress(selectedStage, true);
      
      // Check if all stages completed
      if (progress.completedStages + 1 >= 8) {
        setTimeout(() => setCurrentPage('completion'), 1000);
      } else {
        setError('');
      }
    } else {
      setError('حاول مرة أخرى! هناك خطأ في البيانات المدخلة.');
      setStageData(prev => ({
        ...prev,
        attempts: prev.attempts + 1,
      }));
      updateProgress(selectedStage, false);
    }
  };

  const handleNextStage = () => {
    if (selectedStage < 8) {
      handleStageSelect(selectedStage + 1);
    }
  };

  const handleBackToStages = () => {
    setCurrentPage('stages');
  };

  if (currentPage === 'completion') {
    return <CompletionCertificate scenario={scenario} />;
  }

  if (currentPage === 'stage-detail') {
    const stage = STAGES[selectedStage - 1];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-gray-600 dark:text-gray-400">
            <button
              onClick={handleBackToStages}
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              العودة للمراحل
            </button>
            <ChevronRight size={18} />
            <span className="text-gray-900 dark:text-white font-bold">{stage.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stage Card */}
              <div className="card p-8">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl">{stage.icon}</span>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                      المرحلة {selectedStage}: {stage.name}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                      {scenario.name}
                    </p>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    التقدم العام: {progress.completedStages}/{progress.totalStages}
                  </p>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${(progress.completedStages / progress.totalStages) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-blue-50 dark:bg-slate-800 rounded-lg p-4 mb-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">التعليمات:</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
                    <li>أدخل بيانات المرحلة بناءً على السيناريو</li>
                    <li>تأكد من صحة البيانات المدخلة</li>
                    <li>استخدم الملميحات إذا احتجت للمساعدة</li>
                  </ul>
                </div>

                {/* Input Area */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="الحساب الأول"
                      className="px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="المبلغ"
                      className="px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="الحساب الثاني"
                      className="px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="المبلغ"
                      className="px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4">
                      <p className="text-red-800 dark:text-red-200 font-medium">{error}</p>
                      {stageData.attempts > 1 && (
                        <p className="text-red-700 dark:text-red-300 text-sm mt-2">
                          المحاولة {stageData.attempts}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Success Message */}
                  {stageData.completed && (
                    <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-4">
                      <p className="text-green-800 dark:text-green-200 font-bold flex items-center gap-2">
                        <Award size={20} />
                        ممتاز! أكملت المرحلة بنجاح 🎉
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={handleSubmitStage}
                      disabled={stageData.completed}
                      className="flex-1 btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      تحقق من الإجابة
                    </button>
                    {stageData.completed && selectedStage < 8 && (
                      <button
                        onClick={handleNextStage}
                        className="flex-1 btn btn-primary flex items-center justify-center gap-2"
                      >
                        المرحلة التالية
                        <ChevronRight size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Hints Card */}
              <div className="card p-4">
                <button
                  onClick={handleHintRequest}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-yellow-50 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-800 transition-colors"
                >
                  <Lightbulb size={18} />
                  اطلب تلميحاً
                </button>

                {stageData.hints.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {stageData.hints.map((hint, index) => (
                      <div
                        key={index}
                        className="bg-yellow-50 dark:bg-slate-800 border-l-4 border-yellow-500 p-3 rounded"
                      >
                        <p className="text-sm text-gray-700 dark:text-gray-300">{hint}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Attempts */}
              <div className="card p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  عدد المحاولات
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {stageData.attempts}
                </p>
              </div>

              {/* Scenario Info */}
              <div className="card p-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                  معلومات السيناريو
                </h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p><span className="font-medium">الشركة:</span> {scenario.name}</p>
                  <p><span className="font-medium">النوع:</span> {scenario.companyType}</p>
                  <p><span className="font-medium">رأس المال:</span> {scenario.capital.toLocaleString()} ريال</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Stages View
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            المراحل التعليمية
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            اختر مرحلة لتبدأ التعلم
          </p>
        </div>

        {/* Progress Overview */}
        <div className="mb-12">
          <div className="card p-6">
            <h2 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">
              ملخص التقدم
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-2">المراحل المكتملة</p>
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  {progress.completedStages}/{progress.totalStages}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-2">معدل النجاح</p>
                <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                  {progress.successRate.toFixed(0)}%
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-2">الإنجازات المفتوحة</p>
                <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                  {progress.achievements.length}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${(progress.completedStages / progress.totalStages) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {Math.round((progress.completedStages / progress.totalStages) * 100)}% من البرنامج
              </p>
            </div>
          </div>
        </div>

        {/* Stages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {STAGES.map((stage) => {
            const isCompleted = progress.completedStages >= stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => handleStageSelect(stage.id)}
                className={`
                  card p-6 text-center cursor-pointer transition-all
                  ${isCompleted ? 'ring-2 ring-green-500' : 'hover:shadow-lg'}
                `}
              >
                <div className="text-4xl mb-3">{stage.icon}</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  المرحلة {stage.id}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {stage.name}
                </p>
                <div className="flex items-center justify-center gap-2">
                  {isCompleted && (
                    <span className="badge-success">
                      ✓ مكتملة
                    </span>
                  )}
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {isCompleted ? 'انتقل إلى' : 'ابدأ'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
