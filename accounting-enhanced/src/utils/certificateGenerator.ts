export interface CertificateData {
  userName: string;
  completionDate: Date;
  successRate: number;
  stagesCompleted: number;
  certificateId: string;
}

export const generateCertificateSVG = (data: CertificateData): string => {
  const dateStr = data.completionDate.toLocaleDateString('ar-SA');
  const monthAr = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  const monthName = monthAr[data.completionDate.getMonth()];
  const day = data.completionDate.getDate();
  const year = data.completionDate.getFullYear();

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
      <!-- Background Gradient -->
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="1200" height="800" fill="url(#bgGradient)"/>

      <!-- Border -->
      <rect x="40" y="40" width="1120" height="720" fill="none" stroke="url(#borderGradient)" stroke-width="3"/>
      <rect x="50" y="50" width="1100" height="700" fill="none" stroke="#3b82f6" stroke-width="1" opacity="0.5"/>

      <!-- Decorative corners -->
      <circle cx="60" cy="60" r="8" fill="#3b82f6" opacity="0.6"/>
      <circle cx="1140" cy="60" r="8" fill="#3b82f6" opacity="0.6"/>
      <circle cx="60" cy="740" r="8" fill="#3b82f6" opacity="0.6"/>
      <circle cx="1140" cy="740" r="8" fill="#3b82f6" opacity="0.6"/>

      <!-- Header Badge -->
      <circle cx="600" cy="120" r="50" fill="#3b82f6" opacity="0.1"/>
      <text x="600" y="130" font-size="50" font-weight="bold" text-anchor="middle" fill="#3b82f6">🎓</text>

      <!-- Title -->
      <text x="600" y="220" font-size="48" font-weight="bold" text-anchor="middle" fill="#1e3a8a" font-family="Arial">
        شهادة إتمام
      </text>

      <!-- Subtitle -->
      <text x="600" y="270" font-size="24" text-anchor="middle" fill="#475569" font-family="Arial">
        برنامج المحاكاة المحاسبية
      </text>

      <!-- Separator line -->
      <line x1="200" y1="310" x2="1000" y2="310" stroke="#3b82f6" stroke-width="2" opacity="0.3"/>

      <!-- Certificate body -->
      <text x="600" y="380" font-size="18" text-anchor="middle" fill="#475569" font-family="Arial">
        تمنح هذه الشهادة إلى
      </text>

      <!-- Student Name -->
      <text x="600" y="460" font-size="44" font-weight="bold" text-anchor="middle" fill="#1e40af" font-family="Arial">
        ${data.userName}
      </text>

      <!-- Separator line -->
      <line x1="200" y1="500" x2="1000" y2="500" stroke="#3b82f6" stroke-width="2" opacity="0.3"/>

      <!-- Achievement text -->
      <text x="600" y="570" font-size="18" text-anchor="middle" fill="#475569" font-family="Arial">
        لإتمامه برنامج المحاكاة المحاسبية بنجاح
      </text>

      <!-- Stats -->
      <text x="600" y="620" font-size="16" text-anchor="middle" fill="#64748b" font-family="Arial">
        معدل النجاح: ${data.successRate.toFixed(1)}% | المراحل المكتملة: ${data.stagesCompleted}/8
      </text>

      <!-- Date -->
      <text x="600" y="670" font-size="16" text-anchor="middle" fill="#64748b" font-family="Arial">
        الصادرة بتاريخ: ${day} ${monthName} ${year}
      </text>

      <!-- Certificate ID -->
      <text x="600" y="720" font-size="12" text-anchor="middle" fill="#94a3b8" font-family="Arial">
        شهادة رقم: ${data.certificateId}
      </text>

      <!-- Seal/Badge -->
      <circle cx="1050" cy="680" r="45" fill="#3b82f6" opacity="0.15"/>
      <circle cx="1050" cy="680" r="40" fill="none" stroke="#3b82f6" stroke-width="2" opacity="0.3"/>
      <text x="1050" y="695" font-size="32" text-anchor="middle" fill="#3b82f6">✓</text>
    </svg>
  `;
};

export const downloadCertificate = (data: CertificateData, format: 'png' | 'pdf' = 'png') => {
  const svg = generateCertificateSVG(data);
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `شهادة-${data.userName}-${new Date().getTime()}.svg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const generateCertificateId = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `CERT-${timestamp}-${random}`;
};
