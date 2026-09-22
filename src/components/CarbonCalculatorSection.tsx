import React, { useState, useMemo } from "react";
import {
  Calculator,
  Car,
  Bus,
  Train,
  Bike,
  Zap,
  FileText,
  Coffee,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  RotateCcw,
  Share2,
} from "lucide-react";
import { triggerCelebration } from "../utils/confetti";

interface CarbonCalculatorProps {
  onSaveScore: (kgScore: number, coinsEarned: number) => void;
  studentCurrentScore: number;
}

export const CarbonCalculatorSection: React.FC<CarbonCalculatorProps> = ({
  onSaveScore,
  studentCurrentScore,
}) => {
  // Inputs
  const [transportMode, setTransportMode] = useState<"metro" | "bus" | "car" | "taxi" | "bike">("metro");
  const [dailyDistanceKm, setDailyDistanceKm] = useState<number>(25);
  const [deviceHoursPerDay, setDeviceHoursPerDay] = useState<number>(6);
  const [cansonSheetsPerWeek, setCansonSheetsPerWeek] = useState<number>(3);
  const [foamMaquettesPerMonth, setFoamMaquettesPerMonth] = useState<number>(2);
  const [dailyCoffeeCups, setDailyCoffeeCups] = useState<number>(2);

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Calculation Emission Factors (customizable via Admin)
  const factors = {
    transport: {
      metro: 0.035, // kg CO2e / km
      bus: 0.082,
      car: 0.192,
      taxi: 0.170,
      bike: 0.000,
    },
    devicePerHour: 0.05, // laptop / studio workstation
    cansonPerSheet: 0.21, // 100x70 large sheet
    foamMaquette: 1.45, // petroleum foam sheet/block
    coffeeCup: 0.075, // disposable paper/plastic cup
  };

  // Calculations
  const results = useMemo(() => {
    // Monthly calculation (30 days, 4 weeks)
    const transportMonthly = dailyDistanceKm * 22 * factors.transport[transportMode]; // ~22 study days
    const electricityMonthly = deviceHoursPerDay * 30 * factors.devicePerHour;
    const paperMonthly = cansonSheetsPerWeek * 4 * factors.cansonPerSheet;
    const maquettesMonthly = foamMaquettesPerMonth * factors.foamMaquette;
    const consumptionMonthly = dailyCoffeeCups * 22 * factors.coffeeCup;

    const totalMonthlyKg = transportMonthly + electricityMonthly + paperMonthly + maquettesMonthly + consumptionMonthly;
    const totalAnnualTons = (totalMonthlyKg * 12) / 1000;

    const breakdown = [
      { name: "المواصلات والتنقل", kg: transportMonthly, percent: Math.round((transportMonthly / totalMonthlyKg) * 100) || 0, color: "bg-blue-500" },
      { name: "الأجهزة والكهرباء", kg: electricityMonthly, percent: Math.round((electricityMonthly / totalMonthlyKg) * 100) || 0, color: "bg-amber-500" },
      { name: "أوراق الرسم والمطبوعات", kg: paperMonthly, percent: Math.round((paperMonthly / totalMonthlyKg) * 100) || 0, color: "bg-emerald-500" },
      { name: "خامات الماكيتات والفوم", kg: maquettesMonthly, percent: Math.round((maquettesMonthly / totalMonthlyKg) * 100) || 0, color: "bg-purple-500" },
      { name: "الأكواب والاستهلاك اليومي", kg: consumptionMonthly, percent: Math.round((consumptionMonthly / totalMonthlyKg) * 100) || 0, color: "bg-rose-500" },
    ].sort((a, b) => b.kg - a.kg);

    // Personalized tips
    const tips: string[] = [];
    if (transportMode === "car" || transportMode === "taxi") {
      tips.push("استبدال السيارة بالمترو أو حافلات الجامعة يوفر حتى 60 كجم من CO₂ شهرياً.");
    } else if (transportMode === "metro" || transportMode === "bus") {
      tips.push("رائع! اختيارك للنقل العام يوفر انبعاثات ضخمة مقارنة بالسيارات الخاصة.");
    }

    if (foamMaquettesPerMonth > 1) {
      tips.push("استبدال ألواح الفوم البترولية بالكرتون المعاد تدويره وعجينة الورق يوفر خامات ويقلل بصمتك للماكيتات بنسبة 70%.");
    }

    if (cansonSheetsPerWeek >= 4) {
      tips.push("اعتمد على الاسكتش الرقمي للمسودات الأولى واطبع النسخة النهائية فقط لحماية الغابات.");
    }

    if (dailyCoffeeCups >= 2) {
      tips.push("استخدم مج السفير الحراري (Thermal Tumbler) وتجنب الأكواب ذات الاستخدام الواحد في كافيتيريا الكلية.");
    }

    return {
      totalMonthlyKg: Math.round(totalMonthlyKg * 10) / 10,
      totalAnnualTons: Math.round(totalAnnualTons * 100) / 100,
      breakdown,
      highestContributor: breakdown[0],
      tips,
    };
  }, [
    transportMode,
    dailyDistanceKm,
    deviceHoursPerDay,
    cansonSheetsPerWeek,
    foamMaquettesPerMonth,
    dailyCoffeeCups,
  ]);

  const handleSaveToProfile = () => {
    onSaveScore(results.totalMonthlyKg, 30);
    triggerCelebration();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <section id="calculator" className="py-16 md:py-24 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <Calculator className="w-3.5 h-3.5" />
            <span>أداة قياس الأثر البيئي لطالب الفنون</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            احسب بصمتك الكربونية 🌍
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            البصمة الكربونية هي إجمالي غازات الاحتباس الحراري الناتجة عن أنشطتك واستخدامك للخامات.
            أدخل بياناتك التقريبية لمعرفة بصمتك بالكيلوجرام والطن سنويًا واحصل على نصائح تخفيض مخصصة.
          </p>
        </div>

        {/* Calculator Grid: Inputs (Left/RTL right) + Results (Right/RTL left) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-sm space-y-6 text-right">
            <h3 className="font-extrabold text-stone-900 text-lg border-b border-stone-100 pb-3 flex items-center justify-between">
              <span>بيانات أنشطتك الجامعية واليومية:</span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                خطوة بخطوة
              </span>
            </h3>

            {/* 1. وسيلة المواصلات */}
            <div className="space-y-2.5">
              <label className="text-xs sm:text-sm font-bold text-stone-800 flex items-center gap-1.5">
                <span>1. وسيلة المواصلات الأساسية للوصول للكلية:</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: "metro", label: "مترو / قطار", icon: Train },
                  { id: "bus", label: "باص / ميكروباص", icon: Bus },
                  { id: "car", label: "سيارة خاصة", icon: Car },
                  { id: "taxi", label: "تاكسي / أوبر", icon: Car },
                  { id: "bike", label: "دراجة / مشي", icon: Bike },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = transportMode === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTransportMode(item.id as any)}
                      className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 border text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-emerald-800 text-white border-emerald-900 shadow-xs"
                          : "bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. المسافة اليومية */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-stone-800">
                <span>2. المسافة الإجمالية ذهابًا وإيابًا يوميًا:</span>
                <span className="text-emerald-800 font-extrabold text-base bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                  {dailyDistanceKm} كم
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="120"
                step="2"
                value={dailyDistanceKm}
                onChange={(e) => setDailyDistanceKm(Number(e.target.value))}
                className="w-full accent-emerald-700 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-600">
                <span>قريب (2 كم)</span>
                <span>متوسط (40 كم)</span>
                <span>سفر يومي (120 كم)</span>
              </div>
            </div>

            {/* 3. استهلاك الأجهزة */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-stone-800">
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-amber-600" />
                  <span>3. ساعات استخدام لابتوب التصميم وبرامج الريندر يوميًا:</span>
                </span>
                <span className="text-emerald-800 font-extrabold text-base bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                  {deviceHoursPerDay} ساعات
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="16"
                step="1"
                value={deviceHoursPerDay}
                onChange={(e) => setDeviceHoursPerDay(Number(e.target.value))}
                className="w-full accent-emerald-700 cursor-pointer"
              />
            </div>

            {/* 4. استخدام الورق والكانسون */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-stone-800">
                <span className="flex items-center gap-1">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>4. عدد لوحات الكانسون والدوبلكس الكبيرة أسبوعيًا:</span>
                </span>
                <span className="text-emerald-800 font-extrabold text-base bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                  {cansonSheetsPerWeek} لوحات
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                step="1"
                value={cansonSheetsPerWeek}
                onChange={(e) => setCansonSheetsPerWeek(Number(e.target.value))}
                className="w-full accent-emerald-700 cursor-pointer"
              />
            </div>

            {/* 5. ماكيتات الفوم والبلاستيك */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-stone-800">
                <span>5. عدد ماكيتات الفوم أو مجسمات البلاستيك شهريًا:</span>
                <span className="text-emerald-800 font-extrabold text-base bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                  {foamMaquettesPerMonth} مجسمات
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="8"
                step="1"
                value={foamMaquettesPerMonth}
                onChange={(e) => setFoamMaquettesPerMonth(Number(e.target.value))}
                className="w-full accent-emerald-700 cursor-pointer"
              />
            </div>

            {/* 6. استهلاك الأكواب والوجبات */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-stone-800">
                <span className="flex items-center gap-1">
                  <Coffee className="w-4 h-4 text-rose-600" />
                  <span>6. أكواب القهوة والمشروبات ذات الاستخدام الواحد يوميًا:</span>
                </span>
                <span className="text-emerald-800 font-extrabold text-base bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                  {dailyCoffeeCups} أكواب
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="6"
                step="1"
                value={dailyCoffeeCups}
                onChange={(e) => setDailyCoffeeCups(Number(e.target.value))}
                className="w-full accent-emerald-700 cursor-pointer"
              />
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-white border border-stone-200/90 p-6 sm:p-8 shadow-sm space-y-6 text-right">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  نتيجتك التقديرية المباشرة
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  حساب فوري
                </span>
              </div>

              {/* Big Score Display */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-800 to-teal-900 text-white text-center space-y-2 shadow-sm">
                <span className="text-xs text-emerald-200 font-semibold block">
                  بصمتك الكربونية التقديرية شهريًا
                </span>
                <div className="text-4xl sm:text-5xl font-black tracking-tight">
                  {results.totalMonthlyKg}{" "}
                  <span className="text-lg font-bold text-emerald-200">kg CO₂e</span>
                </div>
                <div className="text-xs text-emerald-100 font-medium pt-1 border-t border-emerald-700/60">
                  ما يعادل تقريبًا: <strong>{results.totalAnnualTons} طن CO₂e سنويًا</strong>
                </div>
              </div>

              {/* Highest Contributor Alert */}
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">أكبر مصدر مساهم في بصمتك: </span>
                  <strong>{results.highestContributor.name}</strong> بنسبة{" "}
                  <strong>{results.highestContributor.percent}%</strong> من إجمالي انبعاثاتك.
                </div>
              </div>

              {/* Simple Visual Breakdown Bar */}
              <div className="space-y-2 pt-1">
                <span className="text-xs font-bold text-stone-700 block">
                  توزيع مصادر الانبعاثات:
                </span>
                <div className="w-full h-4 rounded-full overflow-hidden flex bg-stone-100 border border-stone-200">
                  {results.breakdown.map((item, i) => (
                    <div
                      key={i}
                      style={{ width: `${item.percent}%` }}
                      className={`${item.color} h-full transition-all duration-500`}
                      title={`${item.name}: ${item.percent}%`}
                    />
                  ))}
                </div>

                {/* Legend */}
                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-stone-600">
                  {results.breakdown.map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-sm ${item.color} shrink-0`} />
                      <span className="truncate">{item.name}</span>
                      <span className="font-bold text-stone-800">({item.percent}%)</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actionable Tips */}
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>نصائح مخصصة لتقليل بصمتك:</span>
                </div>
                <div className="space-y-1.5">
                  {results.tips.map((tip, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 text-xs text-stone-700 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save & Earn Coins Button */}
              <div className="pt-2">
                <button
                  id="calc-btn-save-score"
                  onClick={handleSaveToProfile}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>احفظ نتيجتك واكسب +30 عملة استدامة 🌱</span>
                </button>

                {savedSuccess && (
                  <div className="mt-2 text-center text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 p-2 rounded-lg animate-fadeIn">
                    ✓ تم حفظ النتيجة وإضافة 30 عملة استدامة إلى رصيدك بنجاح!
                  </div>
                )}
              </div>
            </div>

            {/* Scientific Note */}
            <div className="p-4 rounded-2xl bg-white/70 border border-stone-200/80 text-xs text-stone-500 leading-relaxed text-right">
              ⚠️ <strong>ملاحظة هامة:</strong> هذا الحساب <em>تقديري</em> ويعتمد على معاملات
              الانبعاثات الصادرة عن تقارير GHG Protocol ووزارة البيئة المصرية. يمكن لإدارة المنصة
              تعديل معاملات الانبعاث من لوحة التحكم لتطابق دراسات الأثر البيئي الحديثة.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
