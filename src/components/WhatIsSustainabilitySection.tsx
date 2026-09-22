import React, { useState } from "react";
import { Leaf, Users, Coins, Sparkles, Check, ArrowRight, Lightbulb } from "lucide-react";

export const WhatIsSustainabilitySection: React.FC = () => {
  const [activePillar, setActivePillar] = useState<"env" | "soc" | "eco">("env");

  const pillars = [
    {
      id: "env" as const,
      title: "🌱 البُعد البيئي",
      subtitle: "Environmental Pillar",
      color: "emerald",
      bgClass: "bg-emerald-50 border-emerald-300 text-emerald-950",
      activeTabClass: "bg-emerald-700 text-white shadow-md",
      icon: Leaf,
      shortDesc: "الحفاظ على الموارد الطبيعية، تقليل الانبعاثات الكربونية، وإيقاف استنزاف كوكب الأرض.",
      principles: [
        "اختيار خامات متجددة وقابلة للتحلل الحيوي (Biodegradable).",
        "تقليل النفايات الصلبة واستبدال المواد السامة بأخرى صديقة للبيئة.",
        "ترشيد استهلاك الطاقة والمياه داخل استوديوهات وورش الكلية.",
      ],
      studentScenario: {
        title: "في استوديو ماكيتات الفنون التطبيقية:",
        text: "بدلاً من استخدام ألواح الفوم البترولية التي تستغرق 500 سنة لتتحلل، يستبدلها الطالب بألواح الكرتون المقوى المعاد تدويره أو عجينة الورق والميسليوم، مما يقلل البصمة الكربونية للماكيت بنسبة 75%.",
        quote: "«البيئة ليست مجرد خلفية للوحة، بل هي المادة الخام والمستقبل الذي نصممه.»",
      },
    },
    {
      id: "soc" as const,
      title: "👥 البُعد المجتمعي",
      subtitle: "Social Pillar",
      color: "teal",
      bgClass: "bg-teal-50 border-teal-300 text-teal-950",
      activeTabClass: "bg-teal-700 text-white shadow-md",
      icon: Users,
      shortDesc: "العدالة الاجتماعية، صحة وسلامة الأفراد، التصميم الشامل، وتمكين المجتمعات المحلية والحرفيين.",
      principles: [
        "التصميم الشامل (Universal Design) الذي يخدم ذوي الهمم وكبار السن.",
        "حماية صحة الطلاب والعمال من استنشاق أبخرة اللحام وغبار الصنفرة والمذيبات.",
        "إحياء الحرف التراثية المصرية وتوفير فرص عمل كريمة للحرفيين.",
      ],
      studentScenario: {
        title: "في قسم التصميم الداخلي وطباعة المنسوجات:",
        text: "تصميم أثاث ومفروشات مستوحاة من التراث الشعبي بقرى بنها والقليوبية، وتصنيعها بالتعاون مع ورش النسيج اليدوي المحلية لدعم أسر الحرفيين بدلاً من استيراد المنتجات الجاهزة.",
        quote: "«التصميم الحقيقي هو الذي يحل مشكلات الناس ويرتقي بجودة حياتهم اليومية.»",
      },
    },
    {
      id: "eco" as const,
      title: "💰 البُعد الاقتصادي",
      subtitle: "Economic Pillar",
      color: "amber",
      bgClass: "bg-amber-50 border-amber-300 text-amber-950",
      activeTabClass: "bg-amber-700 text-white shadow-md",
      icon: Coins,
      shortDesc: "الجدوى الاقتصادية، ترشيد تكاليف الإنتاج، وتطبيق الاقتصاد الدائري (Circular Economy).",
      principles: [
        "إطالة عمر المنتج لتقليل تكلفة الاستبدال المتكرر على المستهلك.",
        "تخفيض تكلفة المواد الأولية عبر إعادة تدوير الهدر وبقايا التصنيع.",
        "خلق فرص استثمارية خضراء في ريادة الأعمال الطلابية المستدامة.",
      ],
      studentScenario: {
        title: "في ميزانية مشروع التخرج:",
        text: "الاستفادة من «بنك المخلفات بالكلية» للحصول على بقايا أخشاب وأقمشة ومعادن فائضة مجاناً، يوفر على الطالب أكثر من 60% من تكلفة الخامات، مع تقديم منتج ذي قيمة تسويقية عالية تحت شعار Upcycled Design.",
        quote: "«الاستدامة ليست عبئاً مالياً، بل هي ذكاء في استثمار الموارد المتاحة لتحقيق أقصى قيمة.»",
      },
    },
  ];

  const current = pillars.find((p) => p.id === activePillar)!;

  return (
    <section
      id="sustainability"
      className="py-16 md:py-24 bg-white border-y border-stone-200/80 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>المفهوم والأسس العلمية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            ما هي الاستدامة؟
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            الاستدامة هي تلبية احتياجات الحاضر دون المساس بقدرة أجيال المستقبل على تلبية
            احتياجاتهم الخاصة. وترتكز على توازن متناغم بين <strong>ثلاثة أبعاد رئيسية</strong>.
          </p>
        </div>

        {/* 3 Pillars Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl mx-auto mb-8">
          {pillars.map((pillar) => {
            const isSelected = activePillar === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => setActivePillar(pillar.id)}
                className={`py-3.5 px-4 rounded-2xl font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 cursor-pointer border ${
                  isSelected
                    ? pillar.activeTabClass
                    : "bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200"
                }`}
              >
                <pillar.icon className="w-5 h-5 shrink-0" />
                <span>{pillar.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Pillar Interactive Showcase */}
        <div className="rounded-3xl border border-stone-200 bg-[#FAF8F5] p-6 sm:p-10 shadow-sm transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Col: Core Definition & Principles */}
            <div className="lg:col-span-7 space-y-5 text-right">
              <div>
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  {current.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
                  {current.title} في عالم التصميم
                </h3>
                <p className="text-stone-700 text-base sm:text-lg leading-relaxed mt-2 font-medium">
                  {current.shortDesc}
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <h4 className="font-bold text-stone-900 text-sm">أهم المبادئ الأساسية:</h4>
                <ul className="space-y-2 text-stone-700 text-sm sm:text-base">
                  {current.principles.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Col: Practical Student Applied Scenario */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-white border border-stone-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm">
                  <Lightbulb className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>{current.studentScenario.title}</span>
                </div>

                <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                  {current.studentScenario.text}
                </p>

                <div className="pt-3 border-t border-stone-100 italic text-xs sm:text-sm text-stone-500 font-medium">
                  {current.studentScenario.quote}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Intersection Note */}
        <div className="mt-8 text-center bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 max-w-2xl mx-auto text-xs sm:text-sm text-emerald-900 font-semibold">
          💡 لا يمكن تحقيق الاستدامة الكاملة إلا عندما تتقاطع الأبعاد الثلاثة معًا: أن يكون التصميم
          <strong>صديقًا للبيئة</strong>، و<strong>عادلًا للمجتمع</strong>، و<strong>مُجديًا اقتصاديًا</strong>.
        </div>
      </div>
    </section>
  );
};
