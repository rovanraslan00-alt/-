import confetti from "canvas-confetti";

export const triggerCelebration = () => {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#10B981", "#059669", "#D97706", "#FBBF24", "#0284C7"],
    });
  } catch (err) {
    console.error("Confetti trigger error:", err);
  }
};
