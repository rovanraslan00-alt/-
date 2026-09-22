import React, { useState } from "react";
import {
  VisitorStats,
  WasteRequest,
  Challenge,
  Reward,
  ContactMessage,
} from "../types";
import {
  ShieldCheck,
  X,
  Users,
  Recycle,
  Trophy,
  Gift,
  Mail,
  Sliders,
  CheckCircle,
  Clock,
  Trash2,
  Lock,
  Eye,
  Plus,
} from "lucide-react";

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  stats: VisitorStats;
  wasteRequests: WasteRequest[];
  challenges: Challenge[];
  rewards: Reward[];
  contactMessages: ContactMessage[];
  onUpdateWasteStatus: (id: string, newStatus: "قيد المراجعة" | "مقبول" | "تم الاستلام") => void;
  onAddChallenge: (c: Partial<Challenge>) => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  stats,
  wasteRequests,
  challenges,
  rewards,
  contactMessages,
  onUpdateWasteStatus,
  onAddChallenge,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<"stats" | "waste" | "challenges" | "rewards" | "messages">("stats");

  // New challenge form state
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newCoins, setNewCoins] = useState(50);
  const [showAddForm, setShowAddForm] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === "fapa2025" || passcode.trim() === "admin" || passcode.trim() === "سفير") {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleCreateChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc) return;
    onAddChallenge({
      title: newTitle,
      description: newDesc,
      coinsReward: Number(newCoins),
      difficulty: "متوسط",
      daysLeft: 7,
      participantsCount: 1,
    });
    setNewTitle("");
    setNewDesc("");
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div
        className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto border border-stone-200 shadow-2xl p-6 sm:p-8 space-y-6 text-right relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-stone-900 text-white flex items-center justify-center shadow-xs">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-stone-900">
              لوحة تحكم إدارة منصة «كن سفيرًا للاستدامة»
            </h3>
            <span className="text-xs text-stone-500">
              كلية الفنون التطبيقية — وحدة الجودة والاستدامة البيئية
            </span>
          </div>
        </div>

        {/* Auth Barrier if not logged in */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto py-10 space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-stone-900">تسجيل دخول مسؤولي الكلية</h4>
            <p className="text-xs text-stone-600">
              أدخل كلمة المرور الإدارية للمتابعة (كلمة المرور الافتراضية للتجربة:{" "}
              <code className="bg-stone-100 px-2 py-0.5 rounded font-mono font-bold text-emerald-800">
                fapa2025
              </code>{" "}
              أو{" "}
              <code className="bg-stone-100 px-2 py-0.5 rounded font-mono font-bold text-emerald-800">
                admin
              </code>
              )
            </p>

            <form onSubmit={handleLogin} className="space-y-3 pt-2">
              <input
                type="password"
                placeholder="كلمة المرور..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-center text-sm focus:outline-none focus:border-emerald-700"
              />
              {authError && (
                <span className="text-xs text-rose-600 block">
                  كلمة المرور غير صحيحة، جرب fapa2025
                </span>
              )}
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm cursor-pointer shadow-xs"
              >
                دخول لوحة التحكم
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard Content */
          <div className="space-y-6">
            {/* Tabs Bar */}
            <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-3">
              {[
                { id: "stats", label: "📊 الإحصائيات العامة", icon: Users },
                { id: "waste", label: `♻️ طلبات المخلفات (${wasteRequests.length})`, icon: Recycle },
                { id: "challenges", label: `🏆 إدارة التحديات (${challenges.length})`, icon: Trophy },
                { id: "rewards", label: `🎁 المكافآت (${rewards.length})`, icon: Gift },
                { id: "messages", label: `📬 رسائل الطلاب (${contactMessages.length})`, icon: Mail },
              ].map((tab) => {
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                      isSelected
                        ? "bg-stone-900 text-white border-stone-900 shadow-xs"
                        : "bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* TAB 1: STATS */}
            {activeTab === "stats" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-right">
                    <span className="text-xs font-bold text-emerald-800">إجمالي زيارات المنصة</span>
                    <div className="text-3xl font-black text-emerald-950 mt-1">
                      {stats.totalVisits.toLocaleString("ar-EG")}
                    </div>
                    <span className="text-[11px] text-emerald-700">زائر مهتم بالاستدامة</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-right">
                    <span className="text-xs font-bold text-amber-800">طلبات خامات الورش</span>
                    <div className="text-3xl font-black text-amber-950 mt-1">
                      {wasteRequests.length}
                    </div>
                    <span className="text-[11px] text-amber-700">شحنة خامات تم إنقاذها</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-teal-50 border border-teal-200 text-right">
                    <span className="text-xs font-bold text-teal-800">التحديات النشطة</span>
                    <div className="text-3xl font-black text-teal-950 mt-1">
                      {challenges.length}
                    </div>
                    <span className="text-[11px] text-teal-700">تحديات بيئية في الاستوديوهات</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 text-right">
                    <span className="text-xs font-bold text-purple-800">رسائل التواصل المفتوحة</span>
                    <div className="text-3xl font-black text-purple-950 mt-1">
                      {contactMessages.length}
                    </div>
                    <span className="text-[11px] text-purple-700">استفسارات ومقترحات مشاريع</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 text-xs text-stone-600 leading-relaxed">
                  📌 <strong>بيان إدارة الكلية:</strong> يتم تحديث هذه الإحصائيات مباشرة عبر الخادم.
                  تسهم هذه البيانات في تقرير الاستدامة السنوي لكلية الفنون التطبيقية — جامعة بنها
                  وتصنيف الجامعة الأخضر عالميًا (UI GreenMetric).
                </div>
              </div>
            )}

            {/* TAB 2: WASTE REQUESTS REVIEW */}
            {activeTab === "waste" && (
              <div className="space-y-4">
                <h4 className="font-extrabold text-stone-900 text-base">
                  طلبات الخامات والمخلفات الواردة من الطلاب:
                </h4>

                <div className="space-y-3">
                  {wasteRequests.map((req) => (
                    <div
                      key={req.id}
                      className="p-4 rounded-2xl border border-stone-200 bg-[#FAF8F5] flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900">
                            {req.type}
                          </span>
                          <h5 className="font-bold text-stone-900 text-sm">{req.quantity}</h5>
                          <span className="text-[11px] text-stone-400">({req.createdAt})</span>
                        </div>
                        <p className="text-xs text-stone-600">{req.description}</p>
                        <div className="text-[11px] text-stone-500 flex gap-4">
                          <span>الطالب: <strong>{req.studentName}</strong></span>
                          <span>القسم: <strong>{req.department}</strong></span>
                          <span>الموقع: <strong>{req.deliveryMethod}</strong></span>
                        </div>
                      </div>

                      {/* Status changer buttons */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        {(["قيد المراجعة", "مقبول", "تم الاستلام"] as const).map((st) => (
                          <button
                            key={st}
                            onClick={() => onUpdateWasteStatus(req.id, st)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                              req.status === st
                                ? "bg-emerald-800 text-white border-emerald-900 shadow-xs"
                                : "bg-white hover:bg-stone-100 text-stone-600 border-stone-200"
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: CHALLENGES MANAGEMENT */}
            {activeTab === "challenges" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-stone-900 text-base">قائمة التحديات المتاحة:</h4>
                  <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-800 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة تحدٍ جديد</span>
                  </button>
                </div>

                {showAddForm && (
                  <form
                    onSubmit={handleCreateChallenge}
                    className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">
                          عنوان التحدي:
                        </label>
                        <input
                          type="text"
                          required
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          placeholder="مثال: تحدي استبدال البلاستيك بالخيزران"
                          className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">
                          مكافأة العملات:
                        </label>
                        <input
                          type="number"
                          required
                          value={newCoins}
                          onChange={(e) => setNewCoins(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        الوصف وشروط الإنجاز:
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}
                        placeholder="اكتب تعليمات التحدي لطلاب الكلية..."
                        className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold cursor-pointer"
                    >
                      حفظ ونشر التحدي
                    </button>
                  </form>
                )}

                <div className="space-y-2">
                  {challenges.map((c) => (
                    <div
                      key={c.id}
                      className="p-3.5 rounded-2xl border border-stone-200 bg-white flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-stone-900 block">{c.title}</span>
                        <span className="text-stone-500">{c.description}</span>
                      </div>
                      <span className="font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0">
                        +{c.coinsReward} عملة
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: REWARDS */}
            {activeTab === "rewards" && (
              <div className="space-y-3">
                <h4 className="font-extrabold text-stone-900 text-base">المكافآت والشركاء:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {rewards.map((r) => (
                    <div
                      key={r.id}
                      className="p-4 rounded-2xl border border-stone-200 bg-white space-y-1.5 text-xs"
                    >
                      <div className="flex justify-between font-bold">
                        <span className="text-stone-900">{r.title}</span>
                        <span className="text-amber-800">{r.coinsRequired} عملة</span>
                      </div>
                      <p className="text-stone-500">{r.description}</p>
                      <span className="text-[11px] text-stone-400 block">
                        الجهة: {r.partnerName} | متبقي: {r.availableCount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: MESSAGES */}
            {activeTab === "messages" && (
              <div className="space-y-3">
                <h4 className="font-extrabold text-stone-900 text-base">
                  رسائل ومقترحات الطلاب وأعضاء هيئة التدريس:
                </h4>
                {contactMessages.length === 0 ? (
                  <p className="text-xs text-stone-500">لا توجد رسائل جديدة.</p>
                ) : (
                  <div className="space-y-3">
                    {contactMessages.map((m) => (
                      <div
                        key={m.id}
                        className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-1.5 text-xs text-right"
                      >
                        <div className="flex justify-between font-bold">
                          <span className="text-stone-900">
                            {m.name} ({m.department})
                          </span>
                          <span className="text-stone-400">{m.createdAt}</span>
                        </div>
                        <div className="text-stone-500">
                          البريد: {m.email} | الهاتف: {m.phone || "غير مسجل"}
                        </div>
                        <p className="text-stone-800 pt-1 font-medium">{m.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
