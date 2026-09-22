import React from "react";
import {
  Compass,
  Calculator,
  Recycle,
  Bot,
  Sparkles,
  ArrowDown,
  Palette,
  Leaf,
  Wind,
  CheckCircle2,
  Users,
} from "lucide-react";
import { VisitorStats } from "../types";

interface HeroSectionProps {
  stats: VisitorStats;
  onOpenCalculator: () => void;
  onOpenWaste: () => void;
  onOpenChat: () => void;
  onScrollToSection: (id: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  stats,
  onOpenCalculator,
  onOpenWaste,
  onOpenChat,
  onScrollToSection,
}) => {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-[#F5F2EB] via-[#FAF8F5] to-[#FAF8F5]"
    >
      {/* Decorative Organic Elements in Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/25 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none -ml-20" />
      <div className="absolute bottom-4 right-1/4 w-72 h-72 bg-teal-200/20 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Tag & College Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-bold shadow-xs">
            <Leaf className="w-4 h-4 text-emerald-700 animate-bounce" />
            <span>مبادرة الاستدامة الرسمية بكلية الفنون التطبيقية — جامعة بنها</span>
          </div>

          {/* Visitor Counter Pill in Hero */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-stone-300/80 text-stone-700 text-xs sm:text-sm font-semibold shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <Users className="w-4 h-4 text-emerald-700" />
            <span>عدد زوار الموقع حتى الآن:</span>
            <strong className="text-emerald-800 font-extrabold text-sm sm:text-base">
              {stats.totalVisits.toLocaleString("ar-EG")} زائرًا 🌍
            </strong>
          </div>
        </div>

        {/* Main Grid: Content + Visual Art */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column (RTL: right side in text direction) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[1.25]">
              كن سفيرًا للاستدامة <span className="text-emerald-700 inline-block">🌱</span>
            </h1>

            {/* Slogans */}
            <div className="space-y-2">
              <p className="text-xl sm:text-2xl font-bold text-emerald-900">
                «ابدأ بخطوة صغيرة... واصنع أثرًا كبيرًا.»
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-sm sm:text-base font-semibold">
                <Palette className="w-4 h-4 text-amber-700 shrink-0" />
                <span>«أنت فنان... وأول لوحة نرسمها هي مستقبل كوكبنا!»</span>
              </div>
            </div>

            {/* Mission paragraph */}
            <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl font-normal">
              منصة جامعية متكاملة موجهة لطلاب <strong>كلية الفنون التطبيقية</strong>،
              تأخذ بيدك من مجرد متلقٍ للمعلومة إلى صانع وسفير حقيقي للتصميم الإيكولوجي المستدام.
              احسب بصمتك الكربونية، تخلص من هدر ورش العمل بتبادل الخامات، شارك في التحديات، واكسب
              عملات استدامة تستبدلها بمكافآت حقيقية.
            </p>

            {/* 4 Action Buttons requested in prompt */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              {/* Button 1: اكتشف الاستدامة */}
              <button
                id="hero-btn-explore"
                onClick={() => onScrollToSection("sustainability")}
                className="px-5 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm sm:text-base shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-5 h-5 text-emerald-200" />
                <span>اكتشف الاستدامة</span>
              </button>

              {/* Button 2: احسب بصمتك الكربونية */}
              <button
                id="hero-btn-calculator"
                onClick={onOpenCalculator}
                className="px-5 py-3 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-bold text-sm sm:text-base shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calculator className="w-5 h-5 text-emerald-200" />
                <span>احسب بصمتك الكربونية</span>
              </button>

              {/* Button 3: لديّ مخلفات */}
              <button
                id="hero-btn-waste"
                onClick={onOpenWaste}
                className="px-5 py-3 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm sm:text-base shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer"
              >
                <Recycle className="w-5 h-5 text-amber-200" />
                <span>لديّ مخلفات ♻️</span>
              </button>

              {/* Button 4: اسأل سفير 🤖 */}
              <button
                id="hero-btn-chatbot"
                onClick={onOpenChat}
                className="px-5 py-3 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-sm sm:text-base shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer"
              >
                <Bot className="w-5 h-5 text-teal-200" />
                <span>اسأل سفير 🤖</span>
              </button>
            </div>

            {/* Quick Benefits / Trust checklist */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-stone-600 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>حاسبة كربون دقيقة للطلاب</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>بنك خامات ورش الكلية</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>عملات ومكافآت معتمدة</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Artwork uniting Nature, Design & Applied Arts */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Card Container */}
              <div className="rounded-3xl p-6 sm:p-8 bg-white/95 border border-stone-200 shadow-xl relative overflow-hidden backdrop-blur-sm">
                {/* Background Architectural Grid Pattern */}
                <div
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(#1B4332 1.5px, transparent 1.5px)`,
                    backgroundSize: "20px 20px",
                  }}
                />

                {/* Badge top */}
                <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold text-stone-500">استوديو الاستدامة التطبيقية</span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Eco-Design Studio
                  </span>
                </div>

                {/* Illustrated Graphic Center */}
                <div className="relative py-4 flex flex-col items-center justify-center text-center">
                  {/* Footprint & Earth Visual */}
                  <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-emerald-100 via-teal-50 to-amber-50 border-4 border-emerald-500/20 flex items-center justify-center relative shadow-inner">
                    <div className="text-center space-y-1">
                      <div className="text-5xl select-none">🌍</div>
                      <div className="text-xs font-extrabold text-emerald-800">
                        CO₂e Neutral
                      </div>
                    </div>

                    {/* Floating mini badges */}
                    <div className="absolute -top-2 -right-2 px-2.5 py-1 rounded-lg bg-emerald-800 text-white text-[11px] font-bold shadow-md flex items-center gap-1">
                      <Leaf className="w-3 h-3" />
                      <span>فن صديق للبيئة</span>
                    </div>

                    <div className="absolute -bottom-2 -left-2 px-2.5 py-1 rounded-lg bg-amber-600 text-white text-[11px] font-bold shadow-md flex items-center gap-1">
                      <Recycle className="w-3 h-3" />
                      <span>صفر هدر ورش</span>
                    </div>
                  </div>

                  {/* Caption underneath */}
                  <div className="mt-5 space-y-1">
                    <h3 className="font-extrabold text-stone-900 text-lg">
                      «أنت فنان... خطوتك اليوم تغيّر الغد»
                    </h3>
                    <p className="text-xs text-stone-500 leading-normal max-w-xs">
                      من ورشة النجارة إلى ستوديو المنسوجات ومعامل الليزر، خياراتك في الخامات تصنع فرقاً حقيقياً.
                    </p>
                  </div>
                </div>

                {/* Studio Material Tags */}
                <div className="pt-4 border-t border-stone-100 grid grid-cols-3 gap-2 text-center text-xs font-bold">
                  <div className="p-2 rounded-xl bg-[#FAF8F5] border border-stone-200/60 text-stone-700">
                    <span className="block text-emerald-700 text-sm">🪵 خشب</span>
                    <span className="text-[10px] text-stone-500">MDF وقطع زان</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#FAF8F5] border border-stone-200/60 text-stone-700">
                    <span className="block text-emerald-700 text-sm">🧵 قماش</span>
                    <span className="text-[10px] text-stone-500">ألياف وقطن</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#FAF8F5] border border-stone-200/60 text-stone-700">
                    <span className="block text-emerald-700 text-sm">📄 ورق</span>
                    <span className="text-[10px] text-stone-500">كانسون ودوبلكس</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
