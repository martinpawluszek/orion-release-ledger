interface StatsCardProps {
  number: string;
  label: string;
  accent?: "teal" | "purple";
}

const StatsCard = ({ number, label, accent = "teal" }: StatsCardProps) => {
  const accentClass = accent === "purple" ? "orion-gradient-text" : "text-[hsl(var(--brand-accent))]";
  
  return (
    <div className="orion-stats-card">
      <div className={`text-3xl font-bold ${accentClass} mb-2`}>
        {number}
      </div>
      <div className="text-[hsl(var(--text-secondary))] text-sm">
        {label}
      </div>
    </div>
  );
};

const OrionStats = () => {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-8">
      <StatsCard number="4.0+" label="Orion Versions" accent="teal" />
      <StatsCard number="500+" label="Features Delivered" accent="purple" />
      <StatsCard number="99.9%" label="Platform Uptime" accent="teal" />
      <StatsCard number="2,000+" label="Active Users" accent="purple" />
    </section>
  );
};

export default OrionStats;