import React, { useState } from "react";
import { APPLIED_ARTS_PILLARS, DEPARTMENTS_GUIDE } from "../data/appliedArtsPillars";
import {
  Compass,
  Sparkles,
  Scissors,
  Wrench,
  Leaf,
  ShieldCheck,
  CheckCircle,
  Lightbulb,
  Palette,
  Boxes,
  Layers,
  Armchair,
  Megaphone,
  Wine,
  Flame,
  Shirt,
  ArrowRight,
} from "lucide-react";

export const AppliedArtsSustainabilitySection: React.FC = () => {
  const [selectedDeptIndex, setSelectedDeptIndex] = useState(0);

  const iconMap: Record<string, any> = {
    Compass,
    Sparkles,
    Scissors,
    Wrench,
    Leaf,
    ShieldCheck,
    Boxes,
    Layers,
    Armchair,
    Palette,
    Megaphone,
    Wine,
    Flame,
    Shirt,
  };

  const currentDept = DEPARTMENTS_GUIDE[selectedDeptIndex];
  const DeptIcon = iconMap[currentDept.icon] || Palette;

  return (
    <section
      id="applied-arts"
      className="py-16 md:py-24 bg-white border-y border-stone-200/80 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <Palette className="w-3.5 h-3.5" />
            <span>رؤية كلية الفنون التطبيقية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            الاستدامة × طالب الفنون التطبيقية
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            «أنت لست مجرد طالب يرسم ويصنع؛ أنت مهندس التغيير البصري والصناعي.»
            تعرف على الركائز الست التي تحول مشاريعك الدراسية إلى نماذج ملهمة للاقتصاد الدائري.
          </p>
        </div>

        {/* 6 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {APPLIED_ARTS_PILLARS.map((pillar) => {
            const Icon = iconMap[pillar.iconName] || Leaf;
            return (
              <div
                key={pillar.id}
                className="rounded-3xl bg-[#FAF8F5] border border-stone-200/90 p-6 flex flex-col justify-between hover:border-emerald-500/60 hover:shadow-md transition-all group"
              >
                <div className="space-y-4">
                  {/* Tag and Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-white border border-stone-200 text-stone-600">
                      {pillar.tag}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="font-extrabold text-stone-900 text-lg sm:text-xl group-hover:text-emerald-800 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                      {pillar.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {pillar.description}
                  </p>

                  {/* Benefits */}
                  <div className="space-y-1.5 pt-2">
                    {pillar.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Studio Tip */}
                <div className="mt-5 pt-3 border-t border-stone-200/70 bg-white/70 rounded-xl p-3 text-xs text-stone-700">
                  <div className="flex items-center gap-1 font-bold text-amber-800 mb-1">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                    <span>نصيحة الاستوديو:</span>
                  </div>
                  <p className="leading-normal">{pillar.studioTip}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Faculty Department Guide Section */}
        <div className="rounded-3xl bg-gradient-to-br from-emerald-900 to-teal-950 text-white p-6 sm:p-10 shadow-lg relative overflow-hidden">
          {/* Subtle background circles */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800/80 pb-6">
              <div>
                <span className="text-emerald-400 text-xs font-bold tracking-wider">
                  دليل الأقسام الأكاديمية
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  كيف تطبق الاستدامة في قسمك التخصصي؟
                </h3>
              </div>
              <span className="text-xs text-emerald-300/80 bg-emerald-800/50 px-3 py-1.5 rounded-xl border border-emerald-700/50">
                اختر قسمك لعرض التطبيقات العملية
              </span>
            </div>

            {/* Department Selection Pills */}
            <div className="flex flex-wrap gap-2">
              {DEPARTMENTS_GUIDE.map((dept, index) => {
                const isSelected = selectedDeptIndex === index;
                return (
                  <button
                    key={dept.name}
                    onClick={() => setSelectedDeptIndex(index)}
                    className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                      isSelected
                        ? "bg-emerald-500 text-stone-950 border-emerald-400 shadow-md font-black"
                        : "bg-emerald-950/60 hover:bg-emerald-900 text-emerald-100 border-emerald-800/80"
                    }`}
                  >
                    {dept.name}
                  </button>
                );
              })}
            </div>

            {/* Department Showcase Card */}
            <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-4 flex flex-col items-center sm:items-start gap-3 text-center sm:text-right">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-stone-950 flex items-center justify-center shadow-lg">
                  <DeptIcon className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-black text-white">
                    {currentDept.name}
                  </h4>
                  <p className="text-emerald-300 text-xs sm:text-sm mt-1 font-medium">
                    مجال التركيز: {currentDept.focusArea}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-3">
                <span className="text-xs font-bold text-emerald-300 block">
                  أفكار تطبيقية ومشاريع خضراء يمكنك تنفيذها في الكلية:
                </span>
                <div className="space-y-2.5">
                  {currentDept.actionableIdeas.map((idea, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-black/20 border border-white/10 flex items-start gap-3 text-xs sm:text-sm text-stone-100 leading-relaxed"
                    >
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                        {i + 1}
                      </span>
                      <span>{idea}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
