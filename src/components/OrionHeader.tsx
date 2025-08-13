import { Dot } from "lucide-react";

const OrionHeader = () => {
  return (
    <header className="sticky top-0 z-20 orion-glass border-b">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 font-bold text-[hsl(var(--text-primary))]">
            <img 
              src="/lovable-uploads/bceeacf1-7eef-4084-9c77-a9309cd41753.png" 
              alt="Orion Logo" 
              className="w-8 h-8"
            />
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