export type DepartmentType =
  | "التصميم الصناعي والمنتجات"
  | "التصميم الداخلي والأثاث"
  | "طباعة المنسوجات والصباغة والتجهيز"
  | "الغزل والنسيج والتريكو"
  | "الإعلان والطباعة والنشر"
  | "الخزف"
  | "الزجاج"
  | "النحت والتشكيل المعماري"
  | "المنتجات المعدنية والحلي"
  | "الملابس الجاهزة"
  | "فنون تطبيقية عام"
  | string;

export type WasteCategory =
  | "خشب"
  | "قماش"
  | "ورق"
  | "بلاستيك"
  | "معدن"
  | "خامات أخرى";

export type AmbassadorLevel =
  | "مبتدئ"
  | "مشارك"
  | "سفير"
  | "سفير نشط 🌱"
  | "خبير استدامة"
  | "سفير متميز"
  | "سفير ذهبي للاستدامة 🥇";

export interface StudentActivity {
  id: string;
  title: string;
  coinsEarned: number;
  date: string;
}

export interface StudentProfile {
  id?: string;
  name: string;
  studentId: string;
  department: DepartmentType;
  college?: string;
  academicYear?: string;
  coins: number;
  level: AmbassadorLevel;
  avatarUrl?: string;
  carbonScoreKg: number;
  completedChallenges?: string[];
  badges: string[];
  activities: StudentActivity[];
  joinedDate?: string;
}

export interface SDGGoal {
  id: number;
  number: number;
  titleAr: string;
  subtitleAr: string;
  color: string;
  iconName: string;
  description: string;
  studentRelation: string;
  practicalExample: string;
  isAppliedArtsFocus: boolean;
  departmentFocus: string[];
}

export interface WasteRequest {
  id: string;
  studentName: string;
  studentId: string;
  department: string;
  type: WasteCategory;
  quantity: string;
  description: string;
  deliveryMethod: string;
  contactInfo: string;
  imageUrl?: string;
  status:
    | "قيد المراجعة"
    | "مقبول"
    | "تم الاستلام"
    | "تم الاستلام في الكلية"
    | "تم الفرز وإعادة التدوير";
  createdAt: string;
  coinsAwarded: number;
}

export interface Challenge {
  id: string;
  title: string;
  departmentFocus?: string;
  description: string;
  duration?: string;
  points?: number;
  coinsReward: number;
  difficulty?: string;
  daysLeft?: number;
  participantsCount: number;
  badgeName?: string;
  category?: string;
  isWeeklyHero?: boolean;
  isJoined?: boolean;
  isCompleted?: boolean;
}

export interface Reward {
  id: string;
  title: string;
  coinsRequired: number;
  category: "أدوات ومكتبة" | "شهادات وورش" | "خدمات جامعية" | string;
  description: string;
  availableCount: number;
  claimedCount: number;
  partnerName: string;
}

export interface VisitorStats {
  totalVisits: number;
  uniqueVisitors?: number;
  todayVisits?: number;
  monthVisits?: number;
  wasteDivertedKg: number;
  activeAmbassadors: number;
  dailyHistory?: { date: string; count: number }[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  department?: string;
  inquiryType?: string;
  phone?: string;
  message: string;
  createdAt?: string;
  date?: string;
  read?: boolean;
}

export interface SiteConfig {
  collegeName: string;
  collegeLocation: string;
  mapsUrl: string;
  contactEmail: string;
  contactPhone: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    tiktok: string;
    youtube: string;
    linkedin: string;
    whatsapp: string;
  };
  emissionFactors: {
    metroPerKm: number;
    busPerKm: number;
    carPerKm: number;
    taxiPerKm: number;
    bikeWalkPerKm: number;
    electricityPerKwh: number;
    cansonSheet: number;
    foamBoard: number;
    disposableCup: number;
  };
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}
