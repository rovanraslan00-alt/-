import React, { useState } from "react";
import { WasteCategory, WasteRequest } from "../types";
import {
  Recycle,
  UploadCloud,
  CheckCircle2,
  Sparkles,
  Package,
  MapPin,
  Phone,
  Layers,
  Image as ImageIcon,
  Tag,
  Clock,
  Send,
} from "lucide-react";
import { triggerCelebration } from "../utils/confetti";

interface WasteReportingProps {
  wasteRequests: WasteRequest[];
  onSubmitWaste: (data: Omit<WasteRequest, "id" | "createdAt" | "status" | "coinsAwarded">) => void;
}

export const WasteReportingSection: React.FC<WasteReportingProps> = ({
  wasteRequests,
  onSubmitWaste,
}) => {
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [department, setDepartment] = useState("التصميم الداخلي والأثاث");
  const [type, setType] = useState<WasteCategory>("خشب");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("تسليم في دولاب الاستدامة - ورشة النجارة بالكلية");
  const [contactInfo, setContactInfo] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("الكل");

  const wasteTypes: { type: WasteCategory; label: string; iconText: string; sampleImg: string }[] = [
    { type: "خشب", label: "خشب (MDF، زان، بالسا)", iconText: "🪵", sampleImg: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=500&auto=format&fit=crop&q=60" },
    { type: "قماش", label: "قماش وقصاصات منسوجات", iconText: "🧵", sampleImg: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=500&auto=format&fit=crop&q=60" },
    { type: "ورق", label: "ورق وكرتون وكانسون", iconText: "📄", sampleImg: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500&auto=format&fit=crop&q=60" },
    { type: "بلاستيك", label: "بلاستيك وأكريليك وفوم", iconText: "🧴", sampleImg: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop&q=60" },
    { type: "معدن", label: "معدن وأسلاك ونحاس", iconText: "🔩", sampleImg: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=500&auto=format&fit=crop&q=60" },
    { type: "خامات أخرى", label: "خامات أخرى (جبس، طين، زجاج)", iconText: "🏺", sampleImg: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&auto=format&fit=crop&q=60" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!type || !quantity || !description) return;

    // Pick image or fallback
    const matchedType = wasteTypes.find((w) => w.type === type);
    const finalImage = imageUrl || matchedType?.sampleImg;

    onSubmitWaste({
      studentName: studentName || "طالب بالفنون التطبيقية",
      studentId: studentId || "20240099",
      department,
      type,
      quantity,
      description,
      deliveryMethod,
      contactInfo: contactInfo || "01000000000",
      imageUrl: finalImage,
    });

    triggerCelebration();
    setSubmittedSuccess(true);

    // Reset form fields
    setQuantity("");
    setDescription("");
    setImageUrl("");
  };

  const filteredList = wasteRequests.filter((req) => {
    if (activeFilter === "الكل") return true;
    return req.type === activeFilter;
  });

  return (
    <section id="waste" className="py-16 md:py-24 bg-white border-y border-stone-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
            <Recycle className="w-3.5 h-3.5 text-amber-700" />
            <span>بنك الخامات وإعادة التدوير الطلابي</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            لديّ مخلفات ♻️
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            لا ترمِ بقايا ماكيتاتك أو قصاصات مشاريعك! سجل الخامات الزائدة لديك ليستخدمها زملاؤك
            في الكلية، واكسب <strong>50 عملة استدامة 🌱</strong> تضاف فورًا إلى حسابك.
          </p>
        </div>

        {/* Layout: Form on Right (RTL right) + Live Material Bank Gallery on Left */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Container */}
          <div className="lg:col-span-6 bg-[#FAF8F5] rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs text-right">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-5">
              <h3 className="font-extrabold text-stone-900 text-lg flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-700" />
                <span>نموذج تسجيل خامات ومخلفات الورش</span>
              </h3>
              <span className="text-xs font-bold text-amber-800 bg-amber-100/70 px-2.5 py-0.5 rounded-full border border-amber-300">
                +50 عملة استدامة 🌱
              </span>
            </div>

            {submittedSuccess ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-black text-emerald-900">
                  تم تسجيل طلبك بنجاح! 🌿
                </h4>
                <p className="text-sm text-stone-700 leading-relaxed max-w-sm mx-auto">
                  شكرًا لمساهمتك في تقليل هدر الكلية. تم إرسال الطلب للمراجعة وإيداع
                  <strong> 50 عملة استدامة 🌱</strong> في محفظتك.
                </p>
                <button
                  onClick={() => setSubmittedSuccess(false)}
                  className="px-6 py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs sm:text-sm hover:bg-emerald-900 transition cursor-pointer"
                >
                  تسجيل خامة أخرى
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Student Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      اسم الطالب:
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: ياسمين طارق"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 text-sm focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      الرقم الجامعي / الفرقة:
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: 20230512 - الفرقة الثانية"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 text-sm focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                {/* Department */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    القسم الأكاديمي:
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 text-sm focus:outline-none focus:border-emerald-600 cursor-pointer"
                  >
                    <option>التصميم الداخلي والأثاث</option>
                    <option>التصميم الصناعي والمنتجات</option>
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

                {/* Waste Type Selection */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    نوع المخلفات أو الخامات المتوفرة لديك:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {wasteTypes.map((item) => {
                      const isSelected = type === item.type;
                      return (
                        <button
                          key={item.type}
                          type="button"
                          onClick={() => {
                            setType(item.type);
                            setImageUrl(item.sampleImg);
                          }}
                          className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            isSelected
                              ? "bg-amber-100/90 text-amber-950 border-amber-400 font-extrabold shadow-xs"
                              : "bg-white hover:bg-stone-50 text-stone-700 border-stone-200"
                          }`}
                        >
                          <span className="text-base">{item.iconText}</span>
                          <span className="truncate">{item.type}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    الكمية التقريبية والوحدة:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: 6 قطع خشب زان، 3 كجم قصاصات قماش، 10 لوحات كانسون..."
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    وصف مختصر لحالة الخامة واستخداماتها المقترحة:
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="وضح حالة الخامة: هل هي نظيفة، جديدة، بقايا ماكيتات، أبعادها التقريبية..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 text-sm focus:outline-none focus:border-emerald-600 resize-none"
                  />
                </div>

                {/* Delivery Method & Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      طريقة التسليم المقترحة:
                    </label>
                    <select
                      value={deliveryMethod}
                      onChange={(e) => setDeliveryMethod(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 text-sm focus:outline-none focus:border-emerald-600 cursor-pointer"
                    >
                      <option>دولاب الاستدامة - ورشة النجارة بالكلية</option>
                      <option>ركن التدوير - مكتبة الكلية</option>
                      <option>استوديو التصميم - الدور الثالث</option>
                      <option>تسليم يدوي مباشر لزميل</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      رقم التواصل أو واتساب:
                    </label>
                    <input
                      type="text"
                      placeholder="01xxxxxxxxx"
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 text-sm focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال طلب تسليم المخلفات واكسب +50 عملة 🌱</span>
                </button>
              </form>
            )}
          </div>

          {/* Available Materials Showcase (Live Waste Exchange) */}
          <div className="lg:col-span-6 space-y-4 text-right">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="font-extrabold text-stone-900 text-lg flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-700" />
                <span>بنك الخامات المتاحة بالكلية حاليًا:</span>
              </h3>
              <span className="text-xs text-stone-500 font-medium">
                {wasteRequests.length} خامات معروضة للاستفادة
              </span>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-1.5">
              {["الكل", "خشب", "قماش", "ورق", "بلاستيك", "معدن"].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer border ${
                    activeFilter === f
                      ? "bg-emerald-800 text-white border-emerald-900"
                      : "bg-white text-stone-600 hover:bg-stone-100 border-stone-200"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* List of Material Cards */}
            <div className="space-y-3 max-h-[540px] overflow-y-auto pr-1">
              {filteredList.map((req) => (
                <div
                  key={req.id}
                  className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 hover:border-emerald-400 transition-all shadow-xs flex flex-col sm:flex-row gap-4 items-start"
                >
                  {/* Photo Thumbnail */}
                  {req.imageUrl && (
                    <img
                      src={req.imageUrl}
                      alt={req.type}
                      className="w-full sm:w-28 h-24 object-cover rounded-xl border border-stone-200 shrink-0"
                      loading="lazy"
                    />
                  )}

                  <div className="flex-1 space-y-1.5 w-full">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
                        خامة: {req.type}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {req.status}
                      </span>
                    </div>

                    <h4 className="font-bold text-stone-900 text-sm">
                      {req.quantity}
                    </h4>

                    <p className="text-xs text-stone-600 line-clamp-2">
                      {req.description}
                    </p>

                    <div className="pt-2 border-t border-stone-200/60 flex flex-wrap items-center justify-between text-[11px] text-stone-500 gap-2">
                      <span>بواسطة: {req.studentName} ({req.department})</span>
                      <span className="flex items-center gap-1 text-emerald-700 font-bold">
                        <MapPin className="w-3 h-3" />
                        <span>{req.deliveryMethod}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
