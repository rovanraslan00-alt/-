import React from "react";

interface FacultyLogoProps {
  className?: string;
  showSubtitle?: boolean;
  size?: "sm" | "md" | "lg";
}

export const FacultyLogo: React.FC<FacultyLogoProps> = ({
  className = "",
  showSubtitle = true,
  size = "md",
}) => {
  const iconSizes = {
    sm: "w-9 h-9",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Visual Emblem matching Benha University Faculty of Applied Arts */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center shrink-0 rounded-2xl bg-gradient-to-br from-amber-50 to-emerald-50 border border-emerald-300/60 shadow-sm p-1`}
        title="شعار كلية الفنون التطبيقية - جامعة بنها"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Triangular Outer Frame */}
          <polygon
            points="50,6 94,88 6,88"
            fill="#FEF3C7"
            stroke="#D97706"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Internal Sky & Nature Gradient */}
          <polygon
            points="50,14 86,84 14,84"
            fill="#D1FAE5"
            stroke="#059669"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Benha Clock Tower / Qanater Pillar in Orange-Brown */}
          <rect x="44" y="24" width="12" height="34" fill="#D97706" rx="1.5" />
          <rect x="47" y="28" width="6" height="6" fill="#FEF3C7" rx="1" />
          <rect x="47" y="38" width="6" height="8" fill="#FEF3C7" rx="1" />
          {/* Historic Bridge Arches */}
          <path
            d="M34 58 Q42 50 50 58 Q58 50 66 58"
            stroke="#EA580C"
            strokeWidth="3.5"
            fill="none"
          />
          {/* Nile River Waves */}
          <path
            d="M26 64 Q38 60 50 64 Q62 68 74 64"
            stroke="#0284C7"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M28 70 Q40 66 50 70 Q60 74 72 70"
            stroke="#0284C7"
            strokeWidth="2"
            fill="none"
          />
          {/* Open Book of Knowledge */}
          <path
            d="M34 78 Q50 72 50 78 Q50 72 66 78 L64 82 Q50 76 50 82 Q50 76 36 82 Z"
            fill="#1E293B"
          />
          {/* Sustainability Green Sprout emerging on top */}
          <circle cx="50" cy="8" r="4" fill="#10B981" />
          <path d="M50 4 C46 1 43 4 47 7 C48 8 50 8 50 8" fill="#10B981" />
          <path d="M50 4 C54 1 57 4 53 7 C52 8 50 8 50 8" fill="#34D399" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-1.5 font-extrabold text-stone-900 tracking-tight">
          <span className="text-emerald-800 text-base md:text-lg">كن سفيرًا للاستدامة</span>
          <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            🌱
          </span>
        </div>
        {showSubtitle && (
          <span className="text-xs text-stone-600 font-medium">
            كلية الفنون التطبيقية — جامعة بنها
          </span>
        )}
      </div>
    </div>
  );
};
