import React, { useState, useEffect } from "react";
import {
  StudentProfile,
  VisitorStats,
  WasteRequest,
  Challenge,
  Reward,
  ContactMessage,
} from "./types";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { WhatIsSustainabilitySection } from "./components/WhatIsSustainabilitySection";
import { SDGsSection } from "./components/SDGsSection";
import { AppliedArtsSustainabilitySection } from "./components/AppliedArtsSustainabilitySection";
import { CarbonCalculatorSection } from "./components/CarbonCalculatorSection";
import { WasteReportingSection } from "./components/WasteReportingSection";
import { SustainabilityChallengesSection } from "./components/SustainabilityChallengesSection";
import { SustainabilityCoinsSection } from "./components/SustainabilityCoinsSection";
import { VisitorCounterBanner } from "./components/VisitorCounterBanner";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { StudentDashboardModal } from "./components/StudentDashboardModal";
import { ChatbotModal } from "./components/ChatbotModal";
import { AdminDashboardModal } from "./components/AdminDashboardModal";
import { Bot, Sparkles, MessageCircle } from "lucide-react";

const INITIAL_STUDENT: StudentProfile = {
  name: "نور الهدى إبراهيم",
  studentId: "20230814",
  college: "كلية الفنون التطبيقية — جامعة بنها",
  department: "التصميم الصناعي والمنتجات",
  coins: 280,
  level: "سفير نشط 🌱",
  carbonScoreKg: 42.5,
  badges: ["صديق البيئة 🌿", "بطل تدوير الأخشاب 🪵", "مبتكر مستدام 💡"],
  activities: [
    {
      id: "act-1",
      title: "تسليم ألواح خشبية متبقية من ورشة الأثاث",
      coinsEarned: 50,
      date: "منذ يومين",
    },
    {
      id: "act-2",
      title: "إنجاز تحدي أسبوع التصميم الخالي من البلاستيك",
      coinsEarned: 60,
      date: "منذ 4 أيام",
    },
    {
      id: "act-3",
      title: "حساب البصمة الكربونية للاستوديو",
      coinsEarned: 30,
      date: "منذ أسبوع",
    },
  ],
};

export default function App() {
  // Student Profile state with localStorage sync
  const [student, setStudent] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem("safir_student_profile");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_STUDENT;
  });

  useEffect(() => {
    try {
      localStorage.setItem("safir_student_profile", JSON.stringify(student));
    } catch (e) {
      console.error(e);
    }
  }, [student]);

  // General App State
  const [stats, setStats] = useState<VisitorStats>({
    totalVisits: 12458,
    wasteDivertedKg: 1840,
    activeAmbassadors: 642,
  });

  const [wasteRequests, setWasteRequests] = useState<WasteRequest[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);

  // Modals state
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Fetch initial data from Express backend
  useEffect(() => {
    // 1. Fetch & increment stats
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.totalVisits) setStats(data);
      })
      .catch((err) => console.error("Error fetching stats:", err));

    // 2. Fetch waste requests
    fetch("/api/waste")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setWasteRequests(data);
      })
      .catch((err) => console.error("Error fetching waste:", err));

    // 3. Fetch challenges
    fetch("/api/challenges")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setChallenges(data);
      })
      .catch((err) => console.error("Error fetching challenges:", err));

    // 4. Fetch rewards
    fetch("/api/rewards")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setRewards(data);
      })
      .catch((err) => console.error("Error fetching rewards:", err));

    // 5. Fetch contact messages
    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setContactMessages(data);
      })
      .catch((err) => console.error("Error fetching contact messages:", err));
  }, []);

  // Section Observer for active navbar pill
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "sustainability",
        "sdgs",
        "applied-arts",
        "calculator",
        "waste",
        "challenges",
        "rewards",
        "contact",
      ];
      const scrollPos = window.scrollY + 200;

      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handler: Save Carbon Score
  const handleSaveCarbonScore = (kgScore: number, coinsAwarded: number) => {
    setStudent((prev) => ({
      ...prev,
      carbonScoreKg: kgScore,
      coins: prev.coins + coinsAwarded,
      activities: [
        {
          id: Date.now().toString(),
          title: `حساب البصمة الكربونية (${kgScore} kg CO₂e)`,
          coinsEarned: coinsAwarded,
          date: "اليوم",
        },
        ...prev.activities,
      ],
    }));
  };

  // Handler: Submit Waste Request
  const handleSubmitWaste = async (
    data: Omit<WasteRequest, "id" | "createdAt" | "status" | "coinsAwarded">
  ) => {
    try {
      const res = await fetch("/api/waste", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const newRequest = await res.json();

      setWasteRequests((prev) => [newRequest, ...prev]);

      // Award 50 coins to student
      setStudent((prev) => ({
        ...prev,
        coins: prev.coins + 50,
        activities: [
          {
            id: Date.now().toString(),
            title: `تسليم خامات: ${data.type} (${data.quantity})`,
            coinsEarned: 50,
            date: "اليوم",
          },
          ...prev.activities,
        ],
      }));

      // Update waste diverted stat
      setStats((prev) => ({
        ...prev,
        wasteDivertedKg: prev.wasteDivertedKg + 15,
      }));
    } catch (e) {
      console.error("Error submitting waste:", e);
    }
  };

  // Handler: Join Challenge
  const handleJoinChallenge = (challengeId: string) => {
    setChallenges((prev) =>
      prev.map((c) =>
        c.id === challengeId
          ? { ...c, isJoined: true, participantsCount: c.participantsCount + 1 }
          : c
      )
    );
  };

  // Handler: Complete Challenge
  const handleCompleteChallenge = (challengeId: string, proof: string) => {
    const matched = challenges.find((c) => c.id === challengeId);
    const coins = matched ? matched.coinsReward : 50;

    setChallenges((prev) =>
      prev.map((c) =>
        c.id === challengeId ? { ...c, isCompleted: true } : c
      )
    );

    setStudent((prev) => ({
      ...prev,
      coins: prev.coins + coins,
      activities: [
        {
          id: Date.now().toString(),
          title: `إكمال تحدي: ${matched?.title || "تحدي الاستدامة"}`,
          coinsEarned: coins,
          date: "اليوم",
        },
        ...prev.activities,
      ],
    }));
  };

  // Handler: Redeem Reward
  const handleRedeemReward = async (reward: Reward) => {
    try {
      const res = await fetch("/api/rewards/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rewardId: reward.id,
          studentName: student.name,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStudent((prev) => ({
          ...prev,
          coins: prev.coins - reward.coinsRequired,
          activities: [
            {
              id: Date.now().toString(),
              title: `استبدال مكافأة: ${reward.title}`,
              coinsEarned: -reward.coinsRequired,
              date: "اليوم",
            },
            ...prev.activities,
          ],
        }));

        setRewards((prev) =>
          prev.map((r) =>
            r.id === reward.id
              ? { ...r, availableCount: Math.max(0, r.availableCount - 1) }
              : r
          )
        );

        return { success: true, couponCode: data.couponCode };
      } else {
        return { success: false, error: data.error };
      }
    } catch (e) {
      console.error(e);
      return { success: false, error: "تعذر الاتصال بالخادم." };
    }
  };

  // Handler: Contact Message
  const handleSendMessage = async (
    msg: Omit<ContactMessage, "id" | "createdAt">
  ): Promise<boolean> => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(msg),
      });
      const saved = await res.json();
      setContactMessages((prev) => [saved, ...prev]);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  // Admin Handler: Update Waste Status
  const handleUpdateWasteStatus = async (
    id: string,
    newStatus: "قيد المراجعة" | "مقبول" | "تم الاستلام"
  ) => {
    try {
      await fetch(`/api/waste/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setWasteRequests((prev) =>
        prev.map((w) => (w.id === id ? { ...w, status: newStatus } : w))
      );
    } catch (e) {
      console.error(e);
    }
  };

  // Admin Handler: Add Challenge
  const handleAddChallenge = (c: Partial<Challenge>) => {
    const newCh: Challenge = {
      id: `c-${Date.now()}`,
      title: c.title || "تحدي جديد",
      description: c.description || "",
      coinsReward: c.coinsReward || 50,
      difficulty: c.difficulty || "متوسط",
      daysLeft: c.daysLeft || 7,
      participantsCount: 1,
      isJoined: false,
      isCompleted: false,
    };
    setChallenges((prev) => [newCh, ...prev]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 font-sans selection:bg-emerald-200 selection:text-emerald-900 antialiased">
      {/* 1. Master Navbar */}
      <Navbar
        student={student}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        activeSection={activeSection}
      />

      <main>
        {/* 2. Hero Section */}
        <HeroSection
          stats={stats}
          onOpenCalculator={() => scrollToSection("calculator")}
          onOpenWaste={() => scrollToSection("waste")}
          onOpenChat={() => setIsChatOpen(true)}
          onScrollToSection={scrollToSection}
        />

        {/* 3. What is Sustainability Section */}
        <WhatIsSustainabilitySection />

        {/* 4. SDGs 17 Goals Section */}
        <SDGsSection />

        {/* 5. Sustainability x Applied Arts Section */}
        <AppliedArtsSustainabilitySection />

        {/* 6. Carbon Footprint Calculator Section */}
        <CarbonCalculatorSection
          onSaveScore={handleSaveCarbonScore}
          studentCurrentScore={student.carbonScoreKg}
        />

        {/* 7. Waste Reporting & Material Exchange Hub Section */}
        <WasteReportingSection
          wasteRequests={wasteRequests}
          onSubmitWaste={handleSubmitWaste}
        />

        {/* 8. Weekly Challenges Section */}
        <SustainabilityChallengesSection
          challenges={challenges}
          onJoinChallenge={handleJoinChallenge}
          onCompleteChallenge={handleCompleteChallenge}
        />

        {/* 9. Sustainability Coins & Rewards Marketplace Section */}
        <SustainabilityCoinsSection
          student={student}
          rewards={rewards}
          onRedeemReward={handleRedeemReward}
        />

        {/* 10. Live Campus Visitor Counter Banner */}
        <VisitorCounterBanner stats={stats} />

        {/* 11. Contact & University Location Section */}
        <ContactSection onSendMessage={handleSendMessage} />
      </main>

      {/* 12. University Footer */}
      <Footer />

      {/* Floating Action Button: Ask Safir 🤖 */}
      <button
        id="floating-btn-safir"
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 left-6 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-700 to-teal-800 text-white font-bold text-sm shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2.5 cursor-pointer border border-white/20"
        title="تحدث مع المساعد الذكي سفير"
      >
        <div className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
        <Bot className="w-5 h-5 text-emerald-200" />
        <span>اسأل سفير 🤖</span>
      </button>

      {/* Floating Action Button: Student Coins Badge */}
      <button
        id="floating-btn-wallet"
        onClick={() => setIsProfileOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-3.5 py-2.5 rounded-full bg-amber-50/95 hover:bg-amber-100 text-amber-950 font-bold text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer border border-amber-300/80 backdrop-blur-xs"
        title="افتح حساب الطالب ورصيد العملات"
      >
        <Sparkles className="w-4 h-4 text-amber-600" />
        <span>{student.coins} عملة 🌱</span>
      </button>

      {/* Modals */}
      <StudentDashboardModal
        student={student}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      <ChatbotModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        stats={stats}
        wasteRequests={wasteRequests}
        challenges={challenges}
        rewards={rewards}
        contactMessages={contactMessages}
        onUpdateWasteStatus={handleUpdateWasteStatus}
        onAddChallenge={handleAddChallenge}
      />
    </div>
  );
}
