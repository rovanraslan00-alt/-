import React, { useState } from "react";
import { FacultyLogo } from "./FacultyLogo";
import { StudentProfile } from "../types";
import {
  Menu,
  X,
  Bot,
  Sparkles,
  ShieldCheck,
  User,
  ChevronDown,
  Award,
} from "lucide-react";

interface NavbarProps {
  student: StudentProfile;
  onOpenProfile: () => void;
  onOpenChat: () => void;
  onOpenAdmin: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  student,
  onOpenProfile,
  onOpenChat,
  onOpenAdmin,
  activeSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: "home", label: "الرئيسية" },
    { id: "sustainability", label: "الاستدامة" },
    { id: "sdgs", label: "أهداف التنمية" },
    { id: "applied-arts", label: "الفنون التطبيقية" },
    { id: "calculator", label: "البصمة الكربونية" },
    { id: "waste", label: "لديّ مخلفات ♻️" },
    { id: "challenges", label: "التحديات" },
    { id: "rewards", label: "المكافآت" },
    { id: "contact", label: "تواصل معنا" },
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      id="main-navbar"
      className="sticky top-0 z-40 w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/80 transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("home");
          }}
          className="flex items-center gap-2 cursor-pointer focus:outline-none"
        >
          <FacultyLogo size="md" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1.5 text-[14px] font-semibold text-stone-700">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "text-emerald-800 bg-emerald-100/70 font-bold"
                    : "hover:text-emerald-700 hover:bg-emerald-50/50"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Ask Safir AI Chat Trigger */}
          <button
            id="nav-btn-ask-safir"
            onClick={onOpenChat}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow hover:from-emerald-700 hover:to-teal-800 transition cursor-pointer"
          >
            <Bot className="w-4 h-4" />
            <span>اسأل سفير</span>
          </button>

          {/* Student Coins & Level Pill */}
          <button
            id="nav-btn-student-profile"
            onClick={onOpenProfile}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200/80 text-amber-900 transition text-xs sm:text-sm font-bold shadow-xs cursor-pointer"
            title="الملف الشخصي ورصيد عملات الاستدامة"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>{student.coins} عملة</span>
            <span className="hidden md:inline-block px-1.5 py-0.5 rounded text-[11px] bg-emerald-700 text-white font-medium">
              {student.level}
            </span>
          </button>

          {/* Admin Dashboard Trigger */}
          <button
            id="nav-btn-admin-panel"
            onClick={onOpenAdmin}
            className="p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 transition cursor-pointer"
            title="لوحة تحكم الإدارة"
          >
            <ShieldCheck className="w-5 h-5 text-stone-600" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="nav-btn-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-200/60 transition cursor-pointer"
            aria-label="القائمة"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FAF8F5] border-b border-stone-200 px-4 pt-2 pb-6 space-y-1 shadow-lg animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="w-full text-right px-3 py-2.5 rounded-lg text-stone-800 font-semibold hover:bg-emerald-50 hover:text-emerald-800 transition"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChat();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 text-white font-bold flex items-center justify-center gap-2"
            >
              <Bot className="w-5 h-5" />
              <span>محادثة المساعد الذكي «سفير 🤖»</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProfile();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-100 text-amber-900 font-bold flex items-center justify-center gap-2"
            >
              <User className="w-5 h-5 text-amber-700" />
              <span>حساب الطالب ({student.name})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
