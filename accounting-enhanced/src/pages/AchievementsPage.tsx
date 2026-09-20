import { useAchievements } from '../contexts/AchievementsContext';
import { Trophy, Star, Zap, Target, Award } from 'lucide-react';

const ALL_ACHIEVEMENTS = [
  {
    id: 'first-step',
    name: 'خطوتك الأولى',
    description: 'أكملت المرحلة الأولى',
    icon: '🎯',
    requirement: 'أكمل المرحلة 1',
  },
  {
    id: 'halfway',
    name: 'منتصف الطريق',
    description: 'أكملت 4 مراحل من 8',
    icon: '🚀',
    requirement: 'أكمل المرحلة 4',
  },
  {
    id: 'complete-all',
    name: 'السيد المحاسب',
    description: 'أكملت جميع المراحل!',
    icon: '👑',
    requirement: 'أكمل المرحلة 8',
  },
  {
    id: 'perfect-score',
    name: 'بدون أخطاء',
    description: 'أكملت مرحلة بدون أي خطأ',
    icon: '⭐',
    requirement: 'أكمل مرحلة من أول محاولة',
  },
  {
    id: 'speed-runner',
    name: 'سريع البديهة',
    description: 'أكملت مرحلة بسرعة',
    icon: '⚡',
    requirement: 'أكمل مرحلة في أقل من 5 دقائق',
  },
];

export default function AchievementsPage() {
  const { progress } = useAchievements();

  const unlockedCount = progress.achievements.length;
  const totalAchievements = ALL_ACHIEVEMENTS.length;
  const completionPercentage = (unlockedCount / totalAchievements) * 100;

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-bounce">🏆</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            الإنجازات والجوائز
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            اجمع الإنجازات وفتح الجوائز خلال رحلتك التعليمية
          </p>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatCard
            label="الإنجازات المفتوحة"
            value={unlockedCount}
            total={totalAchievements}
            icon={<Trophy className="w-6 h-6" />}
            color="yellow"
          />
          <StatCard
            label="المراحل المكتملة"
            value={progress.completedStages}
            total={progress.totalStages}
            icon={<Target className="w-6 h-6" />}
            color="blue"
          />
          <StatCard
            label="معدل النجاح"
            value={Math.round(progress.successRate)}
            total={100}
            icon={<Star className="w-6 h-6" />}
            color="green"
            showPercent
          />
          <StatCard
            label="الشريط الحالي"
            value={progress.currentStreak}
            total={8}
            icon={<Zap className="w-6 h-6" />}
            color="orange"
          />
        </div>

        {/* Overall Progress */}
        <div className="card p-6 mb-12">
          <h2 className="font-bold text-xl text-gray-900 dark:text-white mb-4">
            تقدمك العام
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {Math.round(completionPercentage)}% من الإنجازات مفتوحة
              </p>
            </div>
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
              {unlockedCount}/{totalAchievements}
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_ACHIEVEMENTS.map((achievement) => {
            const isUnlocked = progress.achievements.some(a => a.id === achievement.id);
            const unlockedData = progress.achievements.find(a => a.id === achievement.id);

            return (
              <div
                key={achievement.id}
                className={`card p-6 transition-all ${
                  isUnlocked
                    ? 'ring-2 ring-yellow-500 bg-yellow-50 dark:bg-slate-800'
                    : 'opacity-60 hover:opacity-80'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`text-5xl ${isUnlocked ? 'scale-110' : 'grayscale'}`}>
                    {achievement.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                        {achievement.name}
                      </h3>
                      {isUnlocked && (
                        <span className="text-xs badge-success">
                          ✓ مفتوح
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {achievement.description}
                    </p>

                    <div className="mt-3 p-3 bg-gray-100 dark:bg-slate-700 rounded text-sm text-gray-600 dark:text-gray-400">
                      <p className="font-medium">المتطلب:</p>
                      <p>{achievement.requirement}</p>
                    </div>

                    {isUnlocked && unlockedData?.unlockedAt && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                        تم الفتح: {new Date(unlockedData.unlockedAt).toLocaleDateString('ar-SA')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Encouragement Section */}
        <div className="mt-12 card p-8 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-900">
          <div className="text-center">
            {unlockedCount === totalAchievements ? (
              <>
                <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-2">
                  🎉 أكملت جميع الإنجازات!
                </h2>
                <p className="text-purple-800 dark:text-purple-200">
                  أنت متخصص حقيقي في محاكاة الدورة المحاسبية. تهانينا على هذا الإنجاز الرائع!
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-2">
                  استمر في التقدم! 💪
                </h2>
                <p className="text-purple-800 dark:text-purple-200">
                  لديك {totalAchievements - unlockedCount} إنجاز متبقي. أكمل المزيد من المراحل لفتح جميع الإنجازات!
                </p>
                <div className="mt-4 inline-block px-6 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors cursor-pointer">
                  <a href="/simulation">اذهب للمحاكاة</a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  total,
  icon,
  color,
  showPercent = false,
}: {
  label: string;
  value: number;
  total: number;
  icon: React.ReactNode;
  color: string;
  showPercent?: boolean;
}) {
  const colorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200',
    green: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-200',
    yellow: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-200',
    orange: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-200',
    purple: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-200',
  };

  const bgColor = colorClasses[color as keyof typeof colorClasses];

  return (
    <div className="card p-6">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${bgColor}`}>
        {icon}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">{value}</span>
        {showPercent ? (
          <span className="text-xl text-gray-600 dark:text-gray-400">%</span>
        ) : (
          <span className="text-gray-600 dark:text-gray-400">/ {total}</span>
        )}
      </div>
    </div>
  );
}
