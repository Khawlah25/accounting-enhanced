export interface Scenario {
  id: string;
  name: string;
  description: string;
  companyType: string;
  capital: number;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'revenue' | 'expense' | 'asset' | 'liability';
  accountCode: string;
  accountName: string;
}

export const SCENARIOS: Scenario[] = [
  {
    id: 'trading-company',
    name: 'شركة تجارة الملابس',
    description: 'متجر لبيع الملابس والأقمشة',
    companyType: 'Trading',
    capital: 500000,
    transactions: [
      {
        id: 't1',
        date: '2024-01-01',
        description: 'شراء بضاعة من المورد',
        amount: 50000,
        type: 'asset',
        accountCode: '1100',
        accountName: 'المخزون',
      },
      {
        id: 't2',
        date: '2024-01-02',
        description: 'بيع بضاعة للعميل',
        amount: 30000,
        type: 'revenue',
        accountCode: '4100',
        accountName: 'المبيعات',
      },
      {
        id: 't3',
        date: '2024-01-03',
        description: 'دفع إيجار المحل',
        amount: 5000,
        type: 'expense',
        accountCode: '6200',
        accountName: 'الإيجار',
      },
      {
        id: 't4',
        date: '2024-01-04',
        description: 'رواتب الموظفين',
        amount: 8000,
        type: 'expense',
        accountCode: '6100',
        accountName: 'الرواتب',
      },
    ],
  },
  {
    id: 'service-company',
    name: 'شركة استشارات',
    description: 'مكتب للاستشارات المالية والإدارية',
    companyType: 'Service',
    capital: 300000,
    transactions: [
      {
        id: 't1',
        date: '2024-02-01',
        description: 'تقديم خدمات استشارية',
        amount: 25000,
        type: 'revenue',
        accountCode: '4200',
        accountName: 'إيرادات الخدمات',
      },
      {
        id: 't2',
        date: '2024-02-02',
        description: 'شراء معدات مكتبية',
        amount: 10000,
        type: 'asset',
        accountCode: '1500',
        accountName: 'المعدات',
      },
      {
        id: 't3',
        date: '2024-02-03',
        description: 'دفع فاتورة الكهرباء',
        amount: 2000,
        type: 'expense',
        accountCode: '6300',
        accountName: 'المرافق',
      },
      {
        id: 't4',
        date: '2024-02-04',
        description: 'دفع رسوم الترخيص',
        amount: 1500,
        type: 'expense',
        accountCode: '6400',
        accountName: 'الرسوم والتراخيص',
      },
    ],
  },
  {
    id: 'manufacturing',
    name: 'شركة صناعية',
    description: 'مصنع إنتاج المنتجات الغذائية',
    companyType: 'Manufacturing',
    capital: 1000000,
    transactions: [
      {
        id: 't1',
        date: '2024-03-01',
        description: 'شراء مواد خام',
        amount: 100000,
        type: 'asset',
        accountCode: '1400',
        accountName: 'المواد الخام',
      },
      {
        id: 't2',
        date: '2024-03-02',
        description: 'بيع منتجات مصنعة',
        amount: 150000,
        type: 'revenue',
        accountCode: '4100',
        accountName: 'المبيعات',
      },
      {
        id: 't3',
        date: '2024-03-03',
        description: 'دفع تكاليف الإنتاج',
        amount: 40000,
        type: 'expense',
        accountCode: '6500',
        accountName: 'تكاليف الإنتاج',
      },
      {
        id: 't4',
        date: '2024-03-04',
        description: 'صيانة المعدات',
        amount: 5000,
        type: 'expense',
        accountCode: '6600',
        accountName: 'الصيانة',
      },
    ],
  },
];

export const getRandomScenario = (): Scenario => {
  return SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
};

export const getScenarioById = (id: string): Scenario | undefined => {
  return SCENARIOS.find(s => s.id === id);
};
