import React, { useState } from "react";
import { ContactMessage } from "../types";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  School,
} from "lucide-react";
import { triggerCelebration } from "../utils/confetti";

interface ContactSectionProps {
  onSendMessage: (msg: Omit<ContactMessage, "id" | "createdAt">) => Promise<boolean>;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onSendMessage }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("التصميم الصناعي والمنتجات");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    const success = await onSendMessage({
      name,
      email,
      department,
      phone,
      message,
    });
    setIsSubmitting(false);

    if (success) {
      triggerCelebration();
      setIsSent(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white border-t border-stone-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <Mail className="w-3.5 h-3.5" />
            <span>وحدة الاستدامة والتواصل الطلابي</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            تواصل معنا وشاركنا مقترحاتك
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            لديك فكرة لمشروع تخرج مستدام؟ مقترح لتحسين ورش الكلية؟ أو ترغب في إقامة ورشة عمل خضراء؟
            فريق مبادرة «كن سفيرًا للاستدامة» يسعد بسماع صوتك.
          </p>
        </div>

        {/* Contact Grid: Form (RTL Right) + College Coordinates (RTL Left) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-7 bg-[#FAF8F5] rounded-3xl border border-stone-200/90 p-6 sm:p-8 text-right shadow-xs">
            {isSent ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
                <h4 className="text-2xl font-black text-emerald-900">
                  تم إرسال رسالتك بنجاح! 🌿
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto">
                  شكرًا لمشاركتك الإيجابية. سيقوم منسق مبادرة الاستدامة بالكلية بالرد عليك في أقرب وقت.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="px-5 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 cursor-pointer"
                >
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      الاسم بالكامل:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="اسم الطالب أو عضو هيئة التدريس"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      البريد الإلكتروني الجامعي أو الشخصي:
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="student@fapa.bu.edu.eg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-emerald-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      القسم الأكاديمي:
                    </label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-emerald-700 cursor-pointer"
                    >
                      <option>التصميم الصناعي والمنتجات</option>
                      <option>التصميم الداخلي والأثاث</option>
                      <option>طباعة المنسوجات والصباغة والتجهيز</option>
                      <option>الغزل والنسيج والتريكو</option>
                      <option>الإعلان والطباعة والنشر</option>
                      <option>الخزف</option>
                      <option>الزجاج</option>
                      <option>النحت والتشكيل المعماري</option>
                      <option>المنتجات المعدنية والحلي</option>
                      <option>الملابس الجاهزة</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      رقم الهاتف / واتساب:
                    </label>
                    <input
                      type="tel"
                      placeholder="01xxxxxxxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-emerald-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    رسالتك أو مقترحك:
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="شاركنا فكرتك أو استفسارك بالتفصيل..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-emerald-700 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "جاري الإرسال..." : "إرسال الرسالة"}</span>
                </button>
              </form>
            )}
          </div>

          {/* College Coordinates & Contact Details */}
          <div className="lg:col-span-5 space-y-4 text-right">
            <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-4">
              <h3 className="font-extrabold text-stone-900 text-lg flex items-center gap-2">
                <School className="w-5 h-5 text-emerald-700" />
                <span>مقر الكلية ووحدة الاستدامة</span>
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-stone-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900">كلية الفنون التطبيقية — جامعة بنها</strong>
                    <span className="text-stone-500">شارع كفر سعد، بنها، محافظة القليوبية، مصر</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900">البريد الإلكتروني الرسمي:</strong>
                    <span className="text-stone-500 font-mono">sustainability@fapa.bu.edu.eg</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900">ساعات الاستقبال بالورش:</strong>
                    <span className="text-stone-500">الأحد إلى الخميس — 9:00 ص إلى 2:00 م</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Card */}
            <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
              🌱 «مبادرة كن سفيرًا للاستدامة هي مساحة مفتوحة لكل طالب وفنان في جامعة بنها. صوتك
              وأفكارك هي البذرة التي نصنع بها كليتنا الخضراء.»
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
