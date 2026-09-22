import React from "react";
import { FacultyLogo } from "./FacultyLogo";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Globe,
  Heart,
  Leaf,
  ArrowUp,
} from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Col 1: Faculty Brand & Mission */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white/10 p-2.5 rounded-2xl inline-block">
              <FacultyLogo size="md" />
            </div>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-md font-normal">
              مبادرة رسمية أطلقتها <strong>كلية الفنون التطبيقية — جامعة بنها</strong> لتمكين
              طلاب التصميم والفنون من قيادة الممارسات الإيكولوجية المستدامة، تقليل هدر خامات
              الورش، وإحياء الاقتصاد الدائري في المشروعات الأكاديمية.
            </p>
            <div className="pt-2 text-xs text-emerald-400 font-bold flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>«معًا نحو حرم جامعي وفنون تطبيقية خضراء ومستدامة 🌿»</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-white font-extrabold text-sm">أقسام المنصة:</h4>
            <ul className="grid grid-cols-2 gap-2 text-xs text-stone-400">
              <li>
                <a href="#home" className="hover:text-emerald-400 transition">الرئيسية</a>
              </li>
              <li>
                <a href="#sustainability" className="hover:text-emerald-400 transition">ما هي الاستدامة؟</a>
              </li>
              <li>
                <a href="#sdgs" className="hover:text-emerald-400 transition">أهداف التنمية الـ17</a>
              </li>
              <li>
                <a href="#applied-arts" className="hover:text-emerald-400 transition">الاستدامة × الفنون</a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-emerald-400 transition">حاسبة البصمة الكربونية</a>
              </li>
              <li>
                <a href="#waste" className="hover:text-emerald-400 transition">لديّ مخلفات ♻️</a>
              </li>
              <li>
                <a href="#challenges" className="hover:text-emerald-400 transition">تحديات الاستدامة</a>
              </li>
              <li>
                <a href="#rewards" className="hover:text-emerald-400 transition">سوق المكافآت</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-emerald-400 transition">تواصل معنا</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Social Links & Back to Top */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-extrabold text-sm">تابعنا على المنصات الرسمية:</h4>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-emerald-600 text-stone-300 hover:text-white flex items-center justify-center transition"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-emerald-600 text-stone-300 hover:text-white flex items-center justify-center transition"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-emerald-600 text-stone-300 hover:text-white flex items-center justify-center transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-emerald-600 text-stone-300 hover:text-white flex items-center justify-center transition"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition cursor-pointer"
              >
                <ArrowUp className="w-4 h-4" />
                <span>العودة إلى الأعلى</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>
            جميع الحقوق محفوظة © {new Date().getFullYear()} — مبادرة «كن سفيرًا للاستدامة» |
            كلية الفنون التطبيقية — جامعة بنها
          </p>
          <div className="flex items-center gap-1 text-stone-400">
            <span>صُمم برؤية خضراء لخدمة طلاب الفنون التطبيقية</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
