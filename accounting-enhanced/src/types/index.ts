export interface JournalEntry {
  id: string;
  date: string;
  description: string;
  debitAccount: string;
  creditAccount: string;
  amount: number;
  isAdjusting?: boolean;
}

export interface Account {
  code: string;
  name: string;
  type: 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense';
  balance: number;
  normalBalance: 'Debit' | 'Credit';
}

export interface TrialBalance {
  accounts: Account[];
  totalDebits: number;
  totalCredits: number;
  isBalanced: boolean;
}

export interface UserProgress {
  userId: string;
  completedStages: number;
  currentStage: number;
  successRate: number;
  achievements: string[];
}

export interface StageResult {
  stageId: number;
  passed: boolean;
  attempts: number;
  score: number;
}
