import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!ai && process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return ai;
}

// In-memory data store with realistic initial seeds
interface VisitorStats {
  totalVisits: number;
  uniqueVisitors: number;
  todayVisits: number;
  monthVisits: number;
  wasteDivertedKg: number;
  activeAmbassadors: number;
  dailyHistory: { date: string; count: number }[];
}

const stats: VisitorStats = {
  totalVisits: 12458,
  uniqueVisitors: 4890,
  todayVisits: 342,
  monthVisits: 3120,
  wasteDivertedKg: 1840,
  activeAmbassadors: 642,
  dailyHistory: [
    { date: "السبت", count: 280 },
    { date: "الأحد", count: 410 },
    { date: "الإثنين", count: 460 },
    { date: "الثلاثاء", count: 390 },
    { date: "الأربعاء", count: 430 },
    { date: "الخميس", count: 350 },
    { date: "الجمعة", count: 220 },
  ],
};

const registeredVisitors = new Set<string>();

export interface WasteRequest {
  id: string;
  studentName: string;
  studentId: string;
  department: string;
  type: "خشب" | "قماش" | "ورق" | "بلاستيك" | "معدن" | "خامات أخرى";
  quantity: string;
  description: string;
  deliveryMethod: string;
  contactInfo: string;
  imageUrl?: string;
  status: "قيد المراجعة" | "تم الاستلام في الكلية" | "تم الفرز وإعادة التدوير";
  createdAt: string;
  coinsAwarded: number;
}

let wasteRequests: WasteRequest[] = [
  {
    id: "w-1",
    studentName: "سارة أحمد محمود",
    studentId: "20220415",
    department: "التصميم الداخلي والأثاث",
    type: "خشب",
    quantity: "5 ألواح MDF وقطع زان صغيرة",
    description: "بقايا ماكيت مشروع تصميم أثاث، خشب صالح للاستخدام في أعمال النحت أو ماكيتات السنة الأولى.",
    deliveryMethod: "تسليم في دولاب الاستدامة - ورشة النجارة بالكلية",
    contactInfo: "01023456789",
    imageUrl: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=500&auto=format&fit=crop&q=60",
    status: "تم الاستلام في الكلية",
    createdAt: "2026-09-18",
    coinsAwarded: 50,
  },
  {
    id: "w-2",
    studentName: "عمر خالد الشافعي",
    studentId: "20210892",
    department: "طباعة المنسوجات والصباغة والتجهيز",
    type: "قماش",
    quantity: "8 كجم قصاصات قطن وحرير صناعي",
    description: "قصاصات ملونة نظيفة من تجارب طباعة الشابلونات، تصلح للترقيع (Patchwork) أو أعمال الإكسسوار.",
    deliveryMethod: "تسليم مباشر في معرض مشاريع الاستدامة",
    contactInfo: "01149876543",
    imageUrl: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=500&auto=format&fit=crop&q=60",
    status: "قيد المراجعة",
    createdAt: "2026-09-20",
    coinsAwarded: 50,
  },
  {
    id: "w-3",
    studentName: "مريم إبراهيم",
    studentId: "20231104",
    department: "الإعلان والطباعة والنشر",
    type: "ورق",
    quantity: "15 لوحة كانسون ودوبلكس مسودة",
    description: "ورق مقوى سليم من الخلف، يمكن استخدامه في تجارب الاسكتش الأولي أو قواعد الماكيتات.",
    deliveryMethod: "تسليم في مكتبة الكلية - ركن إعادة التدوير",
    contactInfo: "01234567890",
    imageUrl: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500&auto=format&fit=crop&q=60",
    status: "تم الفرز وإعادة التدوير",
    createdAt: "2026-09-19",
    coinsAwarded: 50,
  },
];

export interface Challenge {
  id: string;
  title: string;
  departmentFocus: string;
  description: string;
  duration: string;
  points: number;
  coinsReward: number;
  difficulty?: string;
  daysLeft?: number;
  participantsCount: number;
  badgeName: string;
  category: string;
  isWeeklyHero?: boolean;
}

let challenges: Challenge[] = [
  {
    id: "c-1",
    title: "ورشة بلا هدر (Zero-Waste Studio)",
    departmentFocus: "جميع الأقسام",
    description: "قم بإنهاء مشروعك الأسبوعي أو ماكيتك بالاعتماد بنسبة 40% على الأقل من بقايا الخامات السابقة دون شراء مواد جديدة.",
    duration: "أسبوع واحد",
    points: 60,
    coinsReward: 60,
    difficulty: "متوسط",
    daysLeft: 5,
    participantsCount: 84,
    badgeName: "صانع بلا هدر",
    category: "إعادة تدوير",
    isWeeklyHero: true,
  },
  {
    id: "c-2",
    title: "تصميم التفكيك (Design for Disassembly)",
    departmentFocus: "التصميم الصناعي والمنتجات",
    description: "صمم نموذج منتج يتم تجميعه بالتعشيق والمفاصل الذكية بدون استخدام الغراء أو مسامير تمنع إعادة تدوير أجزائه.",
    duration: "10 أيام",
    points: 75,
    coinsReward: 75,
    difficulty: "متقدم",
    daysLeft: 8,
    participantsCount: 52,
    badgeName: "مهندس الديمومة",
    category: "تصميم مستدام",
  },
  {
    id: "c-3",
    title: "حقيبة الكلية الخضراء",
    departmentFocus: "طباعة المنسوجات والملابس",
    description: "استبدل الأكياس البلاستيكية وأغلفة اللوحات بأكياس قماشية وتوت باغ معاد تدويرها طوال أيام الأسبوع.",
    duration: "5 أيام",
    points: 40,
    coinsReward: 40,
    difficulty: "سهل",
    daysLeft: 3,
    participantsCount: 128,
    badgeName: "أناقة خضراء",
    category: "سلوك يومي",
  },
  {
    id: "c-4",
    title: "العرض الرقمي الذكي",
    departmentFocus: "الإعلان والتصميم الداخلي",
    description: "اعتمد في جلسة النقد الأسبوعية (Critique) على العرض الرقمي التفاعلي والشاشات بدلاً من طباعة مسودات البوسترات الكبيرة.",
    duration: "3 أيام",
    points: 35,
    coinsReward: 35,
    difficulty: "سهل",
    daysLeft: 4,
    participantsCount: 96,
    badgeName: "حارس الأشجار",
    category: "تقليل استهلاك",
  },
];

export interface Reward {
  id: string;
  title: string;
  coinsRequired: number;
  category: "أدوات ومكتبة" | "شهادات وورش" | "خدمات جامعية";
  description: string;
  availableCount: number;
  claimedCount: number;
  partnerName: string;
}

let rewards: Reward[] = [
  {
    id: "r-1",
    title: "قسيمة خصم 30% على خامات الرسم وماكيتات الأخشاب",
    coinsRequired: 120,
    category: "أدوات ومكتبة",
    description: "صالحة للاستخدام في مكتبة الكلية ومتاجر الفنون المعتمدة لشراء ألوان مائية، ورق كانسون، أو خشب بالسا صديق للبيئة.",
    availableCount: 45,
    claimedCount: 23,
    partnerName: "مكتبة الكلية المركزية",
  },
  {
    id: "r-2",
    title: "شهادة «سفير الاستدامة المعتمد» موقعة من عمادة الكلية",
    coinsRequired: 250,
    category: "شهادات وورش",
    description: "شهادة رسمية تقديرية تدعم السيرة الذاتية وملف أعمال الطالب (Portfolio) تشهد بإسهامه في الممارسات الخضراء.",
    availableCount: 100,
    claimedCount: 41,
    partnerName: "عمادة كلية الفنون التطبيقية",
  },
  {
    id: "r-3",
    title: "أولوية حجز واستخدام ماكينات القطع بالليزر والطابعات ثلاثية الأبعاد",
    coinsRequired: 180,
    category: "خدمات جامعية",
    description: "ساعتان مجانيتان من وقت التشغيل في فاب لاب الكلية (FabLab) لمشاريع المواد الحيوية والقابلة للتحلل.",
    availableCount: 20,
    claimedCount: 14,
    partnerName: "معمل النمذجة الرقمية",
  },
  {
    id: "r-4",
    title: "ورشة عمل تخصصية متقدمة في «التصميم البيئي الدائري» (Circular Eco-Design)",
    coinsRequired: 150,
    category: "شهادات وورش",
    description: "تدريب عملي مكثف مع خبراء دوليين في استبدال البلاستيك بالبوليمرات الحيوية والميسليوم الفطري.",
    availableCount: 30,
    claimedCount: 19,
    partnerName: "وحدة التنمية المستدامة بالجامعة",
  },
  {
    id: "r-5",
    title: "حقيبة السفير الخضراء (توت باغ قماشية + زجاجة مياه حافظة للحرارة + دفتر ورق معاد تدويره)",
    coinsRequired: 200,
    category: "أدوات ومكتبة",
    description: "مجموعة أنيقة صُنعت خصيصًا لسفراء الاستدامة بشعار الكلية ومواد صديقة للبيئة 100%.",
    availableCount: 50,
    claimedCount: 32,
    partnerName: "نادي حماة البيئة الجامعي",
  },
];

let siteConfig = {
  collegeName: "كلية الفنون التطبيقية - جامعة بنها",
  collegeLocation: "شارع كورنيش النيل، بنها، محافظة القليوبية، جمهورية مصر العربية",
  mapsUrl: "https://maps.google.com/?q=Faculty+of+Applied+Arts+Benha+University",
  contactEmail: "sustainability@fapa.bu.edu.eg",
  contactPhone: "+20 13 322 5410",
  socialLinks: {
    facebook: "https://facebook.com/appliedarts.benha",
    instagram: "https://instagram.com/appliedarts_benha",
    tiktok: "https://tiktok.com/@fapa_sustainability",
    youtube: "https://youtube.com/@fapabenha",
    linkedin: "https://linkedin.com/school/faculty-of-applied-arts-benha-university",
    whatsapp: "https://wa.me/20133225410",
  },
  emissionFactors: {
    metroPerKm: 0.035, // kg CO2e / km
    busPerKm: 0.082,
    carPerKm: 0.192,
    taxiPerKm: 0.170,
    bikeWalkPerKm: 0.000,
    electricityPerKwh: 0.485,
    cansonSheet: 0.210, // kg CO2 per large sheet
    foamBoard: 1.450,
    disposableCup: 0.075,
  },
};

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  inquiryType: string;
  message: string;
  date: string;
  read: boolean;
}

let contactMessages: ContactMessage[] = [
  {
    id: "m-1",
    name: "م. نورهان السيد",
    email: "nourhan.sayed@gmail.com",
    inquiryType: "اقتراح مشروع مستدام",
    message: "أود التعاون مع فريق سفراء الاستدامة لتنظيم معرض طلابي لإعادة تدوير بقايا أخشاب ماكيتات قسم الأثاث.",
    date: "2026-09-19",
    read: false,
  },
];

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Visitor Tracker
app.get("/api/stats", (req, res) => {
  res.json(stats);
});

app.post("/api/stats/visit", (req, res) => {
  const visitorId = (req.body?.visitorId as string) || req.ip || "guest";
  stats.totalVisits += 1;
  stats.todayVisits += 1;
  stats.monthVisits += 1;

  if (!registeredVisitors.has(visitorId)) {
    registeredVisitors.add(visitorId);
    stats.uniqueVisitors += 1;
  }
  res.json(stats);
});

// Waste Requests
app.get("/api/waste", (req, res) => {
  res.json(wasteRequests);
});

app.post("/api/waste", (req, res) => {
  const { studentName, studentId, department, type, quantity, description, deliveryMethod, contactInfo, imageUrl } = req.body;
  if (!studentName || !type || !quantity || !description) {
    return res.status(400).json({ error: "يرجى تعبئة كافة الحقول الأساسية" });
  }

  const newRequest: WasteRequest = {
    id: `w-${Date.now()}`,
    studentName: studentName || "طالب بالفنون التطبيقية",
    studentId: studentId || "20240001",
    department: department || "الفنون التطبيقية",
    type,
    quantity,
    description,
    deliveryMethod: deliveryMethod || "دولاب الاستدامة بالكلية",
    contactInfo: contactInfo || "",
    imageUrl: imageUrl || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&auto=format&fit=crop&q=60",
    status: "قيد المراجعة",
    createdAt: new Date().toISOString().split("T")[0],
    coinsAwarded: 50,
  };

  wasteRequests.unshift(newRequest);
  res.status(201).json({ success: true, request: newRequest, coins: 50 });
});

app.patch("/api/waste/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const item = wasteRequests.find((w) => w.id === id);
  if (!item) return res.status(404).json({ error: "الطلب غير موجود" });

  item.status = status;
  res.json({ success: true, item });
});

// Challenges
app.get("/api/challenges", (req, res) => {
  res.json(challenges);
});

app.post("/api/challenges/:id/join", (req, res) => {
  const { id } = req.params;
  const challenge = challenges.find((c) => c.id === id);
  if (!challenge) return res.status(404).json({ error: "التحدي غير موجود" });

  challenge.participantsCount += 1;
  res.json({ success: true, challenge, pointsAwarded: challenge.points });
});

// Rewards
app.get("/api/rewards", (req, res) => {
  res.json(rewards);
});

app.post("/api/rewards/redeem", (req, res) => {
  const { rewardId, studentName } = req.body;
  const reward = rewards.find((r) => r.id === rewardId);
  if (!reward) return res.status(404).json({ error: "المكافأة غير موجودة" });

  if (reward.availableCount <= 0) {
    return res.status(400).json({ error: "عذرًا، نفدت هذه المكافأة حاليًا" });
  }

  reward.availableCount -= 1;
  reward.claimedCount += 1;
  const couponCode = `FAPA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  res.json({ success: true, reward, couponCode });
});

app.post("/api/rewards/:id/redeem", (req, res) => {
  const { id } = req.params;
  const reward = rewards.find((r) => r.id === id);
  if (!reward) return res.status(404).json({ error: "المكافأة غير موجودة" });

  if (reward.availableCount <= 0) {
    return res.status(400).json({ error: "عذرًا، نفدت هذه المكافأة حاليًا" });
  }

  reward.availableCount -= 1;
  reward.claimedCount += 1;
  const couponCode = `FAPA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  res.json({ success: true, reward, couponCode });
});

// Contact Messages
app.get("/api/contact", (req, res) => {
  res.json(contactMessages);
});

app.post("/api/contact", (req, res) => {
  const { name, email, department, phone, inquiryType, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "يرجى تعبئة الحقول المطلوبة" });
  }

  const newMsg = {
    id: `m-${Date.now()}`,
    name,
    email,
    department: department || "الفنون التطبيقية",
    phone: phone || "",
    inquiryType: inquiryType || "مشاركة استدامة",
    message,
    createdAt: new Date().toISOString().split("T")[0],
    date: new Date().toISOString().split("T")[0],
    read: false,
  };

  contactMessages.unshift(newMsg as any);
  res.status(201).json(newMsg);
});

// Config Settings
app.get("/api/config", (req, res) => {
  res.json(siteConfig);
});

app.put("/api/config", (req, res) => {
  siteConfig = { ...siteConfig, ...req.body };
  res.json({ success: true, config: siteConfig });
});

// Chatbot «سفير 🤖»
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: "رسالة فارغة" });
  }

  const systemInstruction = `
أنت «سفير 🤖»، المساعد الذكي التفاعلي الرسمي والملهم لمبادرة «كن سفيرًا للاستدامة» بكلية الفنون التطبيقية - جامعة بنها (Faculty of Applied Arts - Benha University).
جمهورك هم طلاب كلية الفنون التطبيقية بجميع أقسامها:
(التصميم الصناعي والمنتجات، التصميم الداخلي والأثاث، طباعة المنسوجات والصباغة والتجهيز، الغزل والنسيج والتريكو، الإعلان والطباعة والنشر، الزجاج والخزف، النحت والتشكيل المعماري، المنتجات المعدنية والحديد، والملابس الجاهزة).

أهدافك:
1. الإجابة بدقة وحماس وبشكل فني ملهم على أي سؤال يخص الاستدامة (Sustainability).
2. ربط مفاهيم الاستدامة مباشرة بتخصص الفنون التطبيقية، مثل:
   - اختيار الخامات البديلة والصديقة للبيئة (Bioplastics, Mycelium, Recycled MDF, Eco-textiles, Non-toxic Dyes).
   - تقليل هدر الورش والماكيتات (Studio Waste Reduction & Zero-waste patterns).
   - التصميم لإعادة التفكيك والتدوير (Design for Disassembly / Circular Design).
   - إطالة عمر المنتج (Design for Longevity).
   - البصمة الكربونية (Carbon Footprint) وكيف يقللها فنان التصميم.
3. شرح أهداف التنمية المستدامة (SDGs الـ17) وخاصة الأهداف المرتبطة بالفنون التطبيقية مثل الهدف 12 (الاستهلاك والإنتاج المسؤولان)، الهدف 9 (الصناعة والابتكار)، الهدف 11 (مدن ومجتمعات محلية مستدامة)، الهدف 13 (العمل المناخي).
4. تشجيع الطالب على المشاركة في مبادرة "لديّ مخلفات" وتسليم بقايا الورش، خوض تحدي الأسبوع، وكسب "عملات الاستدامة" لاستبدالها بمكافآت كلية الفنون التطبيقية.
5. أسلوبك: ودود، مشجع، أكاديمي وعملي فنان، باللغة العربية الفصحى السلسة، مع استخدام رموز تعبيرية نباتية وفنية منسجمة (🌱 🎨 ♻️ 📐 🌿). اختصر الأفكار في نقاط واضحة وعملية.
`;

  try {
    const client = getGeminiClient();
    if (client) {
      // Build conversation contents
      const conversationContents: any[] = [];
      if (Array.isArray(history)) {
        for (const h of history.slice(-6)) {
          conversationContents.push({
            role: h.role === "user" ? "user" : "model",
            parts: [{ text: h.text }],
          });
        }
      }
      conversationContents.push({
        role: "user",
        parts: [{ text: message }],
      });

      const response = await client.models.generateContent({
        model: "gemini-3.8-flash",
        contents: conversationContents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "أهلاً بك يا فنان الاستدامة! كيف يمكنني مساعدتك في مشروعك اليوم؟ 🌱";
      return res.json({ reply: replyText });
    }
  } catch (error) {
    console.error("Gemini API error, using tailored fallback:", error);
  }

  // Smart fallback when Gemini key is not configured or in offline mode
  const lower = message.toLowerCase();
  let fallbackReply = "";

  if (lower.includes("بصمة") || lower.includes("كربون") || lower.includes("احسب")) {
    fallbackReply = "البصمة الكربونية 🌍 هي إجمالي انبعاثات غازات الاحتباس الحراري الناتجة عن أنشطتك اليومية (المواصلات، الكهرباء، الورق، الخامات). يمكنك تجربة حاسبتنا التفاعلية في الموقع لمعرفة بصمتك بالكيلوجرام والطن سنوياً، والحصول على 30 عملة استدامة فوراً! 🌱";
  } else if (lower.includes("مخلف") || lower.includes("خشب") || lower.includes("قماش") || lower.includes("ورش")) {
    fallbackReply = "في كلية الفنون التطبيقية، مخلفات ورش التصميم والماكيتات ليست نفايات، بل كنز لخامات جديدة! ♻️ توجه لقسم «لديّ مخلفات» وسجل ما لديك (خشب زان أو MDF، قصاصات قماش، كانسون، بلاستيك، خامات معدنية) لتحصل على 50 عملة استدامة وتتيح لزملائك الاستفادة منها في مشاريعهم.";
  } else if (lower.includes("نقاط") || lower.includes("عملات") || lower.includes("مكافآت") || lower.includes("هدية")) {
    fallbackReply = "نظام «عملات الاستدامة 🌱» يكافئ نشاطك الأخضر في الكلية:\n- 50 عملة عند تسجيل مخلفات ورش\n- 40 إلى 60 عملة للمشاركة في تحديات الأسبوع\n- 30 عملة عند حساب بصمتك الكربونية\nيمكنك استبدال عملاتك بقسائم خصم للمكتبات، شهادة سفير معتمدة، أو ساعات مجانية بمعمل الليزر!";
  } else if (lower.includes("خام") || lower.includes("بديل") || lower.includes("بلاستيك")) {
    fallbackReply = "خيارات الخامات الصديقة للبيئة لطلاب الفنون التطبيقية مبهرة! 🎨 يمكنك استخدام:\n1. البوليمرات الحيوية القابلة للتحلل من النشا والجيلاتين النباتي.\n2. الميسليوم الفطري (Mycelium) كبديل متين للفوم والبلاستيك.\n3. أخشاب الـ MDF المعاد تصنيعها من مخلفات قش الأرز أو النخيل.\n4. الصبغات الطبيعية المستخلصة من قشور البصل والكركم والشاي لأقمشة المنسوجات.";
  } else if (lower.includes("أهداف") || lower.includes("تنمية") || lower.includes("sdg")) {
    fallbackReply = "أهداف التنمية المستدامة الـ17 هي خارطة طريق كوكبنا حتى 2030. أكثر الأهداف ارتباطاً بطلاب الفنون التطبيقية:\n- الهدف 12: الاستهلاك والإنتاج المسؤولان (جوهر التصميم الإيكولوجي)\n- الهدف 9: الصناعة والابتكار والهياكل الأساسية\n- الهدف 11: مدن ومجتمعات محلية مستدامة\n- الهدف 13: العمل المناخي. تصفح بطاقات الأهداف في الموقع لمعرفة دور تخصصك بدقة!";
  } else {
    fallbackReply = `مرحبًا بك يا فنان المستقبل في كلية الفنون التطبيقية! 🌱 أنا «سفير 🤖»، رفيقك نحو التصميم الأخضر.\n\nيسعدني جداً مساعدتك في:\n• أفكار مبتكرة لإعادة استخدام خامات مشاريعك الدراسية.\n• تقليل هدر ورش النجارة، المعادن، النسيج والطباعة.\n• فهم أهداف التنمية المستدامة وبصمتك الكربونية.\n• كسب واستبدال عملات الاستدامة.\n\nما الذي تعمل على تصميمه حالياً وتريد جعله أكثر استدامة؟ 🎨`;
  }

  return res.json({ reply: fallbackReply });
});

// Vite middleware for dev or static serving for prod
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
