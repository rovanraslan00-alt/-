import React, { useState } from "react";
import { StudentProfile } from "../types";
import {
  User,
  Sparkles,
  Award,
  Trophy,
  CheckCircle2,
  Calendar,
  Download,
  X,
  Shield,
  Leaf,
  Printer,
  History,
} from "lucide-react";
import { triggerCelebration } from "../utils/confetti";
import { FacultyLogo } from "./FacultyLogo";

interface StudentDashboardProps {
  student: StudentProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const StudentDashboardModal: React.FC<StudentDashboardProps> = ({
  student,
  isOpen,
  onClose,
}) => {
  const [showCertificate, setShowCertificate] = useState(false);

  if (!isOpen) return null;

  const nextLevelRequirement = 500;
  const progressPercent = Math.min(100, Math.round((student.coins / nextLevelRequirement) * 100));

  const handlePrintCertificate = () => {
    triggerCelebration();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-stone-200 shadow-2xl relative p-6 sm:p-8 space-y-6 text-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Student Bio & Level */}
        <div className="flex flex-col sm:flex-row items-center gap-5 border-b border-stone-100 pb-6">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-700 to-teal-900 text-white flex items-center justify-center text-3xl font-black shadow-md shrink-0">
            {student.name.charAt(0)}
          </div>

          <div className="flex-1 space-y-1 text-center sm:text-right">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h3 className="text-2xl font-black text-stone-900">{student.name}</h3>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                🌱 {student.level}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600">
              الرقم الجامعي: <strong>{student.studentId}</strong> | الكلية: <strong>{student.college}</strong>
            </p>
            <p className="text-xs text-stone-500">
              القسم الأكاديمي: <strong>{student.department}</strong>
            </p>
          </div>

          {/* Big Coins pill */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center shrink-0 min-w-[130px]">
            <span className="text-xs font-bold text-amber-800 block">رصيد العملات</span>
            <div className="text-2xl font-black text-amber-950 flex items-center justify-center gap-1">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>{student.coins}</span>
            </div>
            <span className="text-[10px] text-amber-700">عملة استدامة 🌱</span>
          </div>
        </div>

        {/* Level Progression Progress Bar */}
        <div className="space-y-2 p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/80">
          <div className="flex justify-between text-xs font-bold text-stone-700">
            <span>التقدم نحو الرتبة التالية (سفير ذهبي للاستدامة 🥇):</span>
            <span>{student.coins} / {nextLevelRequirement} عملة ({progressPercent}%)</span>
          </div>
          <div className="w-full h-3 rounded-full bg-stone-200 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Stats Grid: Carbon score + Badges count */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1">
            <span className="text-xs font-bold text-stone-500">آخر بصمة كربونية مسجلة:</span>
            <div className="text-xl font-black text-emerald-800">
              {student.carbonScoreKg ? `${student.carbonScoreKg} kg CO₂e / شهر` : "لم يتم القياس بعد"}
            </div>
            <p className="text-[11px] text-stone-400">
              تم التقييم بناءً على استهلاك الاستوديو والمواصلات
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1">
            <span className="text-xs font-bold text-stone-500">الأوسمة المكتسبة:</span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {student.badges.map((b, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-1"
                >
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{b}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Activity History */}
        <div className="space-y-3">
          <h4 className="font-extrabold text-stone-900 text-base flex items-center gap-1.5">
            <History className="w-4 h-4 text-emerald-700" />
            <span>سجل الأنشطة والمساهمات الأخيرة:</span>
          </h4>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {student.activities.map((act) => (
              <div
                key={act.id}
                className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between text-xs text-stone-700"
              >
                <div className="space-y-0.5">
                  <span className="font-bold text-stone-900 block">{act.title}</span>
                  <span className="text-[11px] text-stone-400">{act.date}</span>
                </div>
                <span
                  className={`font-black px-2 py-0.5 rounded-md text-xs ${
                    act.coinsEarned > 0
                      ? "bg-emerald-100 text-emerald-900"
                      : "bg-rose-100 text-rose-900"
                  }`}
                >
                  {act.coinsEarned > 0 ? `+${act.coinsEarned}` : act.coinsEarned} عملة
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate Section Button */}
        <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => setShowCertificate(!showCertificate)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs sm:text-sm shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <Trophy className="w-4 h-4" />
            <span>
              {showCertificate ? "إخفاء الشهادة" : "عرض شهادة «سفير الاستدامة» الرسمية 📜"}
            </span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs cursor-pointer"
          >
            إغلاق
          </button>
        </div>

        {/* Formal University Certificate Preview */}
        {showCertificate && (
          <div className="mt-4 p-8 rounded-3xl bg-gradient-to-b from-[#FFFDF9] to-[#FBF8F1] border-4 border-amber-600/30 text-center space-y-6 shadow-xl relative animate-fadeIn">
            <div className="flex items-center justify-between border-b border-amber-200/70 pb-4">
              <FacultyLogo size="sm" showSubtitle={false} />
              <div className="text-center">
                <span className="text-xs font-bold text-emerald-900 block">جامعة بنها</span>
                <span className="text-xs font-semibold text-stone-700">كلية الفنون التطبيقية</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xl">
                🌱
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs tracking-widest text-amber-800 uppercase font-black">
                شهادة تقدير واعتماد
              </span>
              <h4 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">
                شهادة سفير الاستدامة التطبيقية
              </h4>
              <p className="text-xs text-stone-500">
                Sustainability Ambassador Certificate — Benha University
              </p>
            </div>

            <p className="text-sm sm:text-base text-stone-800 leading-relaxed max-w-lg mx-auto">
              تشهد إدارة مبادرة الاستدامة بكلية الفنون التطبيقية بأن الطالب/ـة:
              <br />
              <strong className="text-xl font-black text-emerald-900 inline-block my-1 border-b-2 border-emerald-600 pb-0.5">
                {student.name}
              </strong>
              <br />
              بالفرقة الثالثة — قسم <strong>{student.department}</strong>
              <br />
              قد استوفى متطلبات الوعي البيئي وشارك بفاعلية في تقليل هدر خامات الورش ونشر ثقافة
              التصميم المستدام، ومُنح بموجب ذلك رتبة <strong>«{student.level}»</strong>.
            </p>

            <div className="grid grid-cols-2 pt-6 border-t border-amber-200 text-xs text-stone-600">
              <div>
                <span className="block font-bold text-stone-900">عميد الكلية</span>
                <span className="text-[11px] text-stone-500">أ.د / عميد كلية الفنون التطبيقية</span>
              </div>
              <div>
                <span className="block font-bold text-stone-900">منسق مبادرة الاستدامة</span>
                <span className="text-[11px] text-stone-500">وحدة التنمية المستدامة</span>
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <button
                onClick={handlePrintCertificate}
                className="px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة أو حفظ الشهادة (PDF)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
