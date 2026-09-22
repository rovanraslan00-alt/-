import React, { useState } from "react";
import { SDGS_LIST } from "../data/sdgs";
import { SDGGoal } from "../types";
import {
  Sparkles,
  X,
  CheckCircle2,
  ExternalLink,
  Target,
  Palette,
  Lightbulb,
  Info,
} from "lucide-react";

export const SDGsSection: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "applied" | "climate">("applied");
  const [selectedGoal, setSelectedGoal] = useState<SDGGoal | null>(null);

  const filteredGoals = SDGS_LIST.filter((goal) => {
    if (filter === "applied") return goal.isAppliedArtsFocus;
    if (filter === "climate")
      return [6, 7, 11, 12, 13, 14, 15].includes(goal.number);
    return true;
  });

  return (
    <section id="sdgs" className="py-16 md:py-24 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <Target className="w-3.5 h-3.5" />
            <span>خارطة طريق كوكبنا حتى 2030</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            أهداف التنمية المستدامة الـ17
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            أقرتها الأمم المتحدة لتحقيق مستقبل أفضل وأكثر استدامة. تصفح أهداف التنمية واكتشف دورك
            المحوري كطالب فنون تطبيقية في كل هدف منها.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setFilter("applied")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              filter === "applied"
                ? "bg-emerald-800 text-white shadow-sm"
                : "bg-white hover:bg-stone-100 text-stone-700 border border-stone-200"
            }`}
          >
            🎨 الأهداف الأكثر ارتباطًا بالفنون التطبيقية ({SDGS_LIST.filter(g => g.isAppliedArtsFocus).length})
          </button>
          <button
            onClick={() => setFilter("climate")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              filter === "climate"
                ? "bg-emerald-800 text-white shadow-sm"
                : "bg-white hover:bg-stone-100 text-stone-700 border border-stone-200"
            }`}
          >
            🌍 البيئة والعمل المناخي
          </button>
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              filter === "all"
                ? "bg-emerald-800 text-white shadow-sm"
                : "bg-white hover:bg-stone-100 text-stone-700 border border-stone-200"
            }`}
          >
            جميع الأهداف الـ17
          </button>
        </div>

        {/* SDGs Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredGoals.map((goal) => {
            return (
              <div
                key={goal.id}
                onClick={() => setSelectedGoal(goal)}
                className="group relative rounded-2xl bg-white border border-stone-200/80 p-5 shadow-xs hover:shadow-md hover:border-emerald-500/50 transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                {/* Top SDG Color Accent Bar */}
                <div
                  className="absolute top-0 right-0 left-0 h-2"
                  style={{ backgroundColor: goal.color }}
                />

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-white font-black text-sm shadow-xs"
                      style={{ backgroundColor: goal.color }}
                    >
                      {goal.number}
                    </span>
                    {goal.isAppliedArtsFocus && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        تركيز فنون تطبيقية 🎨
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-stone-900 text-base group-hover:text-emerald-800 transition-colors">
                      {goal.titleAr}
                    </h3>
                    <span className="text-[11px] text-stone-600 block">
                      {goal.subtitleAr}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {goal.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:translate-x-[-2px] transition-transform">
                  <span>عرض دور الطالب والتطبيق 👈</span>
                  <Info className="w-4 h-4 text-stone-400 group-hover:text-emerald-700" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Modal for Goal Details */}
        {selectedGoal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
            <div
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 shadow-2xl relative p-6 sm:p-8 space-y-6 text-right"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedGoal(null)}
                className="absolute top-5 left-5 p-2 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition cursor-pointer"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Goal Title Header with Color */}
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-md shrink-0"
                  style={{ backgroundColor: selectedGoal.color }}
                >
                  {selectedGoal.number}
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-600 uppercase">
                    الهدف رقم {selectedGoal.number} — {selectedGoal.subtitleAr}
                  </span>
                  <h3 className="text-2xl font-black text-stone-900">
                    {selectedGoal.titleAr}
                  </h3>
                </div>
              </div>

              {/* General Definition */}
              <div className="space-y-1.5 p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
                <span className="text-xs font-bold text-stone-500 block">التعريف العام للهدف:</span>
                <p className="text-stone-800 text-sm sm:text-base leading-relaxed">
                  {selectedGoal.description}
                </p>
              </div>

              {/* Relation to Student & Applied Arts */}
              <div className="space-y-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                <div className="flex items-center gap-2 font-extrabold text-sm sm:text-base text-emerald-900">
                  <Palette className="w-5 h-5 text-emerald-700" />
                  <span>علاقة الهدف بطالب كلية الفنون التطبيقية:</span>
                </div>
                <p className="text-stone-800 text-sm sm:text-base leading-relaxed">
                  {selectedGoal.studentRelation}
                </p>
              </div>

              {/* Practical Applied Example */}
              <div className="space-y-2 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950">
                <div className="flex items-center gap-2 font-extrabold text-sm sm:text-base text-amber-900">
                  <Lightbulb className="w-5 h-5 text-amber-700" />
                  <span>مثال عملي يمكن للطالب تطبيقه فورًا:</span>
                </div>
                <p className="text-stone-800 text-sm sm:text-base leading-relaxed">
                  {selectedGoal.practicalExample}
                </p>
              </div>

              {/* Department tags */}
              {selectedGoal.departmentFocus.length > 0 && (
                <div className="pt-2">
                  <span className="text-xs font-bold text-stone-500 block mb-2">
                    الأقسام المعنية مباشرة:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedGoal.departmentFocus.map((dept, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 text-xs font-medium border border-stone-200"
                      >
                        {dept}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal footer action */}
              <div className="pt-4 border-t border-stone-100 flex justify-end">
                <button
                  onClick={() => setSelectedGoal(null)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm cursor-pointer"
                >
                  فهمت دوري في هذا الهدف ✓
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
