import React, { useState } from "react";
import { Challenge } from "../types";
import {
  Trophy,
  Users,
  Flame,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowLeft,
  Upload,
  Check,
  Zap,
} from "lucide-react";
import { triggerCelebration } from "../utils/confetti";

interface ChallengesSectionProps {
  challenges: Challenge[];
  onJoinChallenge: (challengeId: string) => void;
  onCompleteChallenge: (challengeId: string, proof: string) => void;
}

export const SustainabilityChallengesSection: React.FC<ChallengesSectionProps> = ({
  challenges,
  onJoinChallenge,
  onCompleteChallenge,
}) => {
  const [activeModalChallenge, setActiveModalChallenge] = useState<Challenge | null>(null);
  const [proofText, setProofText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleJoin = (c: Challenge) => {
    onJoinChallenge(c.id);
    triggerCelebration();
  };

  const handleCompleteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalChallenge || !proofText) return;

    setSubmitting(true);
    onCompleteChallenge(activeModalChallenge.id, proofText);
    triggerCelebration();

    setTimeout(() => {
      setSubmitting(false);
      setActiveModalChallenge(null);
      setProofText("");
    }, 1000);
  };

  return (
    <section id="challenges" className="py-16 md:py-24 bg-white border-y border-stone-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <Trophy className="w-3.5 h-3.5" />
            <span>المنافسة البيئية الإيجابية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            تحديات الاستدامة الأسبوعية 🏆
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            انضم لزملائك في كلية الفنون التطبيقية وحوّل الممارسات الصديقة للبيئة إلى أسلوب حياة
            واستوديو عمل مستمر. حقق التحديات، واكسب عملات إضافية وأوسمة فخرية!
          </p>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challenges.map((challenge) => {
            const isCompleted = challenge.isCompleted;
            const isJoined = challenge.isJoined;

            return (
              <div
                key={challenge.id}
                className="rounded-3xl bg-[#FAF8F5] border border-stone-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between text-right relative overflow-hidden"
              >
                {/* Completed Stamp */}
                {isCompleted && (
                  <div className="absolute top-4 left-4 bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Check className="w-3.5 h-3.5" />
                    <span>أكملت التحدي! ✓</span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Top Bar: Difficulty & Reward */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white border border-stone-200 text-stone-700">
                      مستوى التحدي: {challenge.difficulty}
                    </span>
                    <div className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-xl text-xs sm:text-sm">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>+{challenge.coinsReward} عملة استدامة</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="font-extrabold text-stone-900 text-lg sm:text-xl">
                      {challenge.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-2">
                      {challenge.description}
                    </p>
                  </div>

                  {/* Participants & Days Left */}
                  <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-600 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-emerald-700" />
                      <span>{challenge.participantsCount} طالبًا مشاركًا</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-stone-500">
                      <Calendar className="w-4 h-4" />
                      <span>متبقي {challenge.daysLeft} أيام</span>
                    </span>
                  </div>
                </div>

                {/* Bottom Action Controls */}
                <div className="pt-5 mt-4 border-t border-stone-200/80">
                  {isCompleted ? (
                    <div className="text-center py-2 text-xs font-bold text-emerald-800 bg-emerald-100/60 rounded-xl">
                      تهانينا! حصلت على عملات هذا التحدي 🌱
                    </div>
                  ) : isJoined ? (
                    <button
                      onClick={() => setActiveModalChallenge(challenge)}
                      className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      <span>تأكيد إكمال التحدي ورفع الإنجاز (+{challenge.coinsReward} عملة)</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleJoin(challenge)}
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Zap className="w-4 h-4 text-amber-300" />
                      <span>انضم للتحدي الآن</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Challenge Completion Proof Modal */}
        {activeModalChallenge && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
            <div
              className="bg-white rounded-3xl max-w-lg w-full border border-stone-200 shadow-2xl p-6 sm:p-8 space-y-5 text-right relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h4 className="text-lg font-black text-stone-900">
                  تأكيد إنجاز: {activeModalChallenge.title}
                </h4>
                <button
                  onClick={() => setActiveModalChallenge(null)}
                  className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                صف بإيجاز ما قمت به لتطبيق التحدي في استوديو أو مشروع كليتك (مثل: أسماء الخامات
                المعاد استخدامها، أو صورة للماكيت، أو ترشيد الورق):
              </p>

              <form onSubmit={handleCompleteSubmit} className="space-y-4">
                <textarea
                  required
                  rows={4}
                  value={proofText}
                  onChange={(e) => setProofText(e.target.value)}
                  placeholder="مثال: قمت بإعادة تدوير 4 قطع أخشاب MDF متبقية من ورشة الأثاث واستخدمتها كقاعدة لمشروع التصميم الصناعي دون شراء ألواح جديدة..."
                  className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-xs sm:text-sm focus:outline-none focus:border-emerald-600 resize-none"
                />

                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>
                    ستحصل فور تأكيد الإنجاز على +{activeModalChallenge.coinsReward} عملة استدامة 🌱
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveModalChallenge(null)}
                    className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-bold cursor-pointer"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-xs cursor-pointer"
                  >
                    {submitting ? "جاري التأكيد..." : "تأكيد واستلام العملات ✓"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
