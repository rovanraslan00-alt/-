import React, { useState } from "react";
import { Reward, StudentProfile } from "../types";
import {
  Sparkles,
  Gift,
  Award,
  CheckCircle2,
  AlertCircle,
  Tag,
  Building,
  Check,
  QrCode,
  Coins,
} from "lucide-react";
import { triggerCelebration } from "../utils/confetti";

interface SustainabilityCoinsProps {
  student: StudentProfile;
  rewards: Reward[];
  onRedeemReward: (reward: Reward) => Promise<{ success: boolean; couponCode?: string; error?: string }>;
}

export const SustainabilityCoinsSection: React.FC<SustainabilityCoinsProps> = ({
  student,
  rewards,
  onRedeemReward,
}) => {
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [redeemingId, setRedeemingId] = useState<string | null>(null);
  const [redeemedCoupon, setRedeemedCoupon] = useState<{ rewardTitle: string; code: string } | null>(null);
  const [redeemError, setRedeemError] = useState<string | null>(null);

  const earnWays = [
    { activity: "تسليم خامات ومخلفات ورش قابلة لإعادة التدوير", coins: "+50 عملة", icon: "♻️" },
    { activity: "إكمال تحديات الاستدامة الأسبوعية", coins: "+40 إلى +75 عملة", icon: "🌿" },
    { activity: "حساب البصمة الكربونية الشخصية", coins: "+30 عملة", icon: "🌍" },
    { activity: "المشاركة في ورش ومعارض التصميم البيئي", coins: "+40 عملة", icon: "🎨" },
  ];

  const handleRedeem = async (reward: Reward) => {
    setRedeemError(null);
    if (student.coins < reward.coinsRequired) {
      setRedeemError(`رصيدك الحالي (${student.coins} عملة) لا يكفي لاستبدال هذه المكافأة (${reward.coinsRequired} عملة). شارك في المزيد من الأنشطة لكسب عملات إضافية! 🌱`);
      return;
    }

    setRedeemingId(reward.id);
    const result = await onRedeemReward(reward);
    setRedeemingId(null);

    if (result.success && result.couponCode) {
      triggerCelebration();
      setRedeemedCoupon({ rewardTitle: reward.title, code: result.couponCode });
    } else {
      setRedeemError(result.error || "حدث خطأ أثناء استبدال المكافأة.");
    }
  };

  return (
    <section id="rewards" className="py-16 md:py-24 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <Coins className="w-3.5 h-3.5" />
            <span>نظام النقاط والمكافآت الجامعية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            عملات الاستدامة 🌱 وسوق المكافآت
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            كل خطوة خضراء تقوم بها في الكلية تتحول إلى «عملات استدامة» حقيقية يمكنك استبدالها
            بخصومات مكتبية، شهادات معتمدة، وأولوية في معامل التصنيع الرقمي.
          </p>
        </div>

        {/* Student Wallet Status Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-900 to-stone-900 text-white p-6 sm:p-8 shadow-md mb-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-right">
            <div className="w-16 h-16 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center font-black text-2xl shadow-lg shrink-0">
              🌱
            </div>
            <div>
              <span className="text-xs text-emerald-200 font-bold block">
                محفظتك الحالية — {student.name}
              </span>
              <div className="text-3xl sm:text-4xl font-black tracking-tight">
                {student.coins}{" "}
                <span className="text-base font-normal text-emerald-200">عملة استدامة</span>
              </div>
              <span className="text-xs text-stone-300">
                مستواك الحالي: <strong>{student.level}</strong>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="#waste"
              className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm border border-white/20 transition cursor-pointer"
            >
              +50 عملة (تسليم مخلفات)
            </a>
            <a
              href="#challenges"
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs sm:text-sm transition shadow-sm cursor-pointer"
            >
              تحدي الأسبوع (اكسب حتى 75 عملة)
            </a>
          </div>
        </div>

        {/* Ways to Earn Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {earnWays.map((way, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center gap-3 text-right"
            >
              <div className="text-2xl shrink-0 p-2 rounded-xl bg-stone-50 border border-stone-100">
                {way.icon}
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 inline-block mb-1">
                  {way.coins}
                </span>
                <p className="text-xs text-stone-700 font-semibold leading-snug">
                  {way.activity}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Redeem Coupon Success Banner */}
        {redeemedCoupon && (
          <div className="mb-8 p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-500 text-emerald-950 text-center space-y-3 animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-black">تهانينا! تم استبدال المكافأة بنجاح</h4>
            <p className="text-sm">
              مكافأتك: <strong>{redeemedCoupon.rewardTitle}</strong>
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-emerald-300 font-mono text-lg font-black text-emerald-900 shadow-inner">
              <QrCode className="w-5 h-5 text-emerald-700" />
              <span>{redeemedCoupon.code}</span>
            </div>
            <p className="text-xs text-stone-600">
              أظهر هذا الكود لمسؤول الكلية أو المكتبة المعتمدة لاستلام ميزتك فورًا.
            </p>
            <button
              onClick={() => setRedeemedCoupon(null)}
              className="px-4 py-1.5 rounded-lg bg-emerald-800 text-white text-xs font-bold cursor-pointer"
            >
              إغلاق الإشعار
            </button>
          </div>
        )}

        {/* Redeem Error message */}
        {redeemError && (
          <div className="mb-8 p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 text-xs sm:text-sm font-semibold flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{redeemError}</span>
          </div>
        )}

        {/* Rewards Cards Grid */}
        <div className="space-y-4">
          <h3 className="font-extrabold text-stone-900 text-xl text-right flex items-center gap-2">
            <Gift className="w-5 h-5 text-emerald-700" />
            <span>المكافآت المتاحة للاستبدال:</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward) => {
              const canAfford = student.coins >= reward.coinsRequired;
              const isRedeeming = redeemingId === reward.id;

              return (
                <div
                  key={reward.id}
                  className="rounded-3xl bg-white border border-stone-200/90 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between text-right"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                        {reward.category}
                      </span>
                      <div className="inline-flex items-center gap-1 font-black text-amber-900 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200 text-sm">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>{reward.coinsRequired} عملة</span>
                      </div>
                    </div>

                    <h4 className="font-extrabold text-stone-900 text-base leading-snug">
                      {reward.title}
                    </h4>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {reward.description}
                    </p>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                      <span className="flex items-center gap-1">
                        <Building className="w-3.5 h-3.5 text-stone-400" />
                        <span>الجهة: {reward.partnerName}</span>
                      </span>
                      <span>المتبقي: {reward.availableCount}</span>
                    </div>
                  </div>

                  <div className="pt-5 mt-4 border-t border-stone-100">
                    <button
                      onClick={() => handleRedeem(reward)}
                      disabled={isRedeeming}
                      className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer ${
                        canAfford
                          ? "bg-emerald-800 hover:bg-emerald-900 text-white shadow-xs"
                          : "bg-stone-100 hover:bg-stone-200 text-stone-500 cursor-not-allowed"
                      }`}
                    >
                      <Gift className="w-4 h-4" />
                      <span>
                        {isRedeeming
                          ? "جاري الاستبدال..."
                          : canAfford
                          ? "استبدال المكافأة الآن"
                          : `ينقصك ${reward.coinsRequired - student.coins} عملة`}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
