export interface Hint {
  errorType: string;
  message: string;
  explanation: string;
  tip: string;
  example: string;
}

export const SMART_HINTS: Hint[] = [
  {
    errorType: 'UNBALANCED_ENTRY',
    message: '❌ القيد غير متوازن',
    explanation: 'مجموع الديون يجب أن يساوي مجموع الأرصدة في كل قيد يومي',
    tip: '💡 تحقق من أن مجموع أرقام الديون = مجموع أرقام الأرصدة',
    example: 'مثال: شراء بضاعة بـ 1000 ريال نقداً\nالديون: البضاعة 1000\nالأرصدة: البنك 1000 ✓',
  },
  {
    errorType: 'WRONG_ACCOUNT_TYPE',
    message: '❌ نوع الحساب خاطئ',
    explanation: 'تأكد من استخدام الحساب الصحيح للعملية',
    tip: '💡 الأصول: حسابات بنك، نقد، بضاعة | الخصوم: قروض، دائنون | رأس المال',
    example: 'شراء بضاعة → استخدم حساب "بضاعة" وليس "نقد"',
  },
  {
    errorType: 'DUPLICATE_ENTRY',
    message: '⚠️ قيد مكرر',
    explanation: 'يبدو أنك أضفت نفس القيد مرتين',
    tip: '💡 تحقق من قائمة القيود السابقة قبل إضافة قيد جديد',
    example: 'إذا أضفت قيد بنفس التاريخ والمبلغ، قد يكون مكرراً',
  },
  {
    errorType: 'ZERO_AMOUNT',
    message: '❌ المبلغ صفر',
    explanation: 'لا يمكن إضافة قيد بدون مبلغ',
    tip: '💡 أدخل مبلغاً أكبر من صفر',
    example: 'بدلاً من 0 ريال، أدخل المبلغ الفعلي',
  },
  {
    errorType: 'INVALID_DATE',
    message: '❌ التاريخ غير صحيح',
    explanation: 'التاريخ يجب أن يكون خلال الفترة المحاسبية',
    tip: '💡 استخدم تواريخ منطقية في نفس الشهر/السنة',
    example: 'إذا كنت تعمل في يناير 2024، استخدم تواريخ من يناير',
  },
  {
    errorType: 'TRIAL_BALANCE_UNMATCHED',
    message: '❌ ميزان المراجعة غير متوازن',
    explanation: 'مجموع الديون يجب أن يساوي مجموع الأرصدة في ميزان المراجعة',
    tip: '💡 تحقق من أن جميع القيود متوازنة بشكل صحيح',
    example: 'إذا كان الفرق صغير، قد يكون هناك خطأ في حساب معين',
  },
  {
    errorType: 'MISSING_ACCOUNT',
    message: '❌ حساب ناقص',
    explanation: 'يجب استخدام حساب موجود في دليل الحسابات',
    tip: '💡 اختر من قائمة الحسابات المتاحة',
    example: 'استخدم "البنك" وليس "حسابي البنكي"',
  },
  {
    errorType: 'DEBIT_CREDIT_REVERSED',
    message: '⚠️ قد تكون قلبت الديون والأرصدة',
    explanation: 'تأكد من أن الديون والأرصدة في الجهة الصحيحة',
    tip: '💡 الأصول والمصروفات: ديون | الخصوم والإيرادات: أرصدة',
    example: 'عند شراء بضاعة: الديون = بضاعة، الأرصدة = بنك',
  },
];

export const getHint = (errorType: string): Hint | undefined => {
  return SMART_HINTS.find(h => h.errorType === errorType);
};

export const getHintMessage = (errorType: string): string => {
  const hint = getHint(errorType);
  if (!hint) return 'تحقق من البيانات المدخلة';
  return `${hint.message}\n\n${hint.explanation}\n\n${hint.tip}`;
};
