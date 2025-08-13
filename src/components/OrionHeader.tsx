import { Dot } from "lucide-react";

const OrionHeader = () => {
  return (
    <header className="sticky top-0 z-20 orion-glass border-b">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 font-bold">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[hsl(var(--brand-accent))] to-[hsl(var(--brand-accent-secondary))]" />
            <span>Moabits • Orion Release Notes</span>
          </div>
          <div className="orion-pill">
            Private area (login coming soon)
          </div>
        </div>
      </div>
    </header>
  );
};

export default OrionHeader;