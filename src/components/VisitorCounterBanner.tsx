import React from "react";
import { VisitorStats } from "../types";
import { Users, Leaf, Globe, Sparkles, TrendingUp } from "lucide-react";

interface VisitorCounterBannerProps {
  stats: VisitorStats;
}

export const VisitorCounterBanner: React.FC<VisitorCounterBannerProps> = ({ stats }) => {
  return (
    <section className="py-10 bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white relative overflow-hidden">
      {/* Decorative organic shapes */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center text-center">
          {/* Main Visitor Counter */}
          <div className="md:col-span-2 p-6 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/15 shadow-inner flex flex-col items-center justify-center space-y-2">
            <div className="inline-flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <Users className="w-4 h-4" />
              <span>عداد زوار المنصة المباشر</span>
            </div>

            <div className="text-4xl sm:text-6xl font-black tracking-tight text-white font-mono">
              {stats.totalVisits.toLocaleString("ar-EG")}
            </div>

            <p className="text-xs text-emerald-200/90 font-medium">
              طالب وباحث وزائر يشاركون في بناء مجتمع كلية الفنون التطبيقية الأخضر 🌍
            </p>
          </div>

          {/* Metric 2: Waste items diverted */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center mx-auto mb-2">
              <Leaf className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              {stats.wasteDivertedKg.toLocaleString("ar-EG")} كجم
            </div>
            <span className="text-xs text-stone-300 block font-medium">
              خامات تم إنقاذها وإعادة تدويرها
            </span>
          </div>

          {/* Metric 3: Active ambassadors */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center mx-auto mb-2">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              {stats.activeAmbassadors.toLocaleString("ar-EG")} سفيرًا
            </div>
            <span className="text-xs text-stone-300 block font-medium">
              طالب مسجل في مبادرة سفراء الاستدامة
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
