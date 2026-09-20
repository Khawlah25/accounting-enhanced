import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

export interface Progress {
  completedStages: number;
  totalStages: number;
  totalAttempts: number;
  successRate: number;
  achievements: Achievement[];
  currentStreak: number;
}

interface AchievementsContextType {
  progress: Progress;
  unlockAchievement: (id: string) => void;
  updateProgress: (stage: number, success: boolean) => void;
  getAchievements: () => Achievement[];
}

const AchievementsContext = createContext<AchievementsContextType | undefined>(undefined);

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-step',
    name: 'خطوتك الأولى',
    description: 'أكملت المرحلة الأولى',
    icon: '🎯',
  },
  {
    id: 'halfway',
    name: 'منتصف الطريق',
    description: 'أكملت 4 مراحل من 8',
    icon: '🚀',
  },
  {
    id: 'complete-all',
    name: 'السيد المحاسب',
    description: 'أكملت جميع المراحل!',
    icon: '👑',
  },
  {
    id: 'perfect-score',
    name: 'بدون أخطاء',
    description: 'أكملت مرحلة بدون أي خطأ',
    icon: '⭐',
  },
  {
    id: 'speed-runner',
    name: 'سريع البديهة',
    description: 'أكملت مرحلة بسرعة',
    icon: '⚡',
  },
];

export const AchievementsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<Progress>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('accountingProgress');
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return {
      completedStages: 0,
      totalStages: 8,
      totalAttempts: 0,
      successRate: 0,
      achievements: [],
      currentStreak: 0,
    };
  });

  const unlockAchievement = useCallback((id: string) => {
    setProgress(prev => {
      const exists = prev.achievements.some(a => a.id === id);
      if (exists) return prev;

      const achievement = DEFAULT_ACHIEVEMENTS.find(a => a.id === id);
      if (!achievement) return prev;

      const updated = {
        ...prev,
        achievements: [
          ...prev.achievements,
          { ...achievement, unlockedAt: new Date() }
        ]
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('accountingProgress', JSON.stringify(updated));
      }

      return updated;
    });
  }, []);

  const updateProgress = useCallback((stage: number, success: boolean) => {
    setProgress(prev => {
      const updated = {
        ...prev,
        totalAttempts: prev.totalAttempts + 1,
        completedStages: success 
          ? Math.max(prev.completedStages, stage) 
          : prev.completedStages,
        successRate: success
          ? ((prev.totalAttempts * prev.successRate + 100) / (prev.totalAttempts + 1))
          : ((prev.totalAttempts * prev.successRate) / (prev.totalAttempts + 1)),
        currentStreak: success ? prev.currentStreak + 1 : 0,
      };

      // Unlock achievements
      if (success && stage === 1 && !prev.achievements.some(a => a.id === 'first-step')) {
        unlockAchievement('first-step');
      }
      if (updated.completedStages >= 4 && !prev.achievements.some(a => a.id === 'halfway')) {
        unlockAchievement('halfway');
      }
      if (updated.completedStages === 8 && !prev.achievements.some(a => a.id === 'complete-all')) {
        unlockAchievement('complete-all');
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('accountingProgress', JSON.stringify(updated));
      }

      return updated;
    });
  }, [unlockAchievement]);

  const getAchievements = useCallback(() => {
    return progress.achievements;
  }, [progress.achievements]);

  return (
    <AchievementsContext.Provider value={{
      progress,
      unlockAchievement,
      updateProgress,
      getAchievements,
    }}>
      {children}
    </AchievementsContext.Provider>
  );
};

export const useAchievements = () => {
  const context = useContext(AchievementsContext);
  if (!context) {
    throw new Error('useAchievements must be used within AchievementsProvider');
  }
  return context;
};
