import { useState } from "react";
import OrionHeader from "@/components/OrionHeader";
import OrionStats from "@/components/OrionStats";
import FilterControls from "@/components/FilterControls";
import ReleaseCard from "@/components/ReleaseCard";

const mockReleases = [
  {
    version: "4.0",
    date: "2025-08-01",
    deploymentMonth: "Aug 2025",
    sections: {
      "New Features": [
        "<strong>BI Section</strong> — A new analytics space showing how your business is performing and growing, with insights that make customer invoicing easier."
      ],
      "Enhancements": [
        "<strong>AP → XP (Flex Plan)</strong> — The Airtime Plan is evolving into the Flex Plan. A PDF with full details will be attached here.",
        "<strong>Faster Invoicing</strong> — We now invoice based on <em>CDR Close Time</em> instead of <em>Open Time</em>, so billing can run as soon as the next month starts.",
        "<strong>Simpler Product Change Rules</strong> — Product change rules are greatly simplified. Detailed rule list to follow."
      ],
      "Front End Changes": [
        "<strong>Better Section Organization</strong> — Navigation and grouping have been improved so things are easier to find.",
        "<strong>Usage Speed‑ups</strong> — We now load SIMs <em>after</em> filtering, so you only see the SIMs you need and the page loads much faster."
      ],
      "Bug Fixes": [
        "<strong>Autorenewal</strong> — Fixed an issue where Autorenewal wasn't working properly."
      ]
    },
    attachments: {
      "New Features": ["BI dashboard screenshot"],
      "Enhancements": ["Flex Plan PDF", "Plan XP Announcement"]
    }
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVersion, setSelectedVersion] = useState("4.0");
  const [selectedCategories, setSelectedCategories] = useState([
    "New Features", "Enhancements", "Front End Changes", "Bug Fixes"
  ]);

  const filteredReleases = mockReleases.filter(release => 
    selectedVersion === "all" || release.version === selectedVersion
  );

  return (
    <div className="min-h-screen">
      <OrionHeader />
      
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center py-8">
          <div>
            <h1 className="text-5xl font-bold leading-tight mb-4 text-[hsl(var(--text-primary))]">
              Orion Releases (v4.0+)
            </h1>
            <p className="text-[hsl(var(--text-secondary))] text-lg mb-6">
              Central place for all Orion deployments and updates. Each release shows the version, deployment date, and what changed across <strong>New Features</strong>, <strong>Enhancements</strong>, <strong>Front‑End Changes</strong>, and <strong>Bug Fixes</strong>. Images/PDFs can be attached inside each section.
            </p>
            
            <FilterControls
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedVersion={selectedVersion}
              setSelectedVersion={setSelectedVersion}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
          
          <div className="orion-surface p-6">
            <h3 className="font-semibold mb-4 text-[hsl(var(--text-primary))]">How to add a new release:</h3>
            <ol className="space-y-2 text-sm text-[hsl(var(--text-secondary))]">
              <li>1. Duplicate the <em>Release Card</em> markup below.</li>
              <li>2. Update <code className="bg-black/20 px-1 rounded">data-version</code>, <code className="bg-black/20 px-1 rounded">data-date</code>, and content under each category.</li>
              <li>3. Attach thumbnails/images inside <em>Attachments</em>.</li>
              <li>4. Add the version to the <em>Version</em> select box at the top.</li>
            </ol>
            <p className="text-[hsl(var(--text-secondary))] text-sm mt-4 mb-0">
              <strong>Tip:</strong> Keep big PDFs (e.g., Flex Plan details) as links hosted in Lovable and reference them inside Enhancements.
            </p>
          </div>
        </section>

        {/* Releases Grid */}
        <section className="space-y-6">
          {filteredReleases.map((release) => (
            <ReleaseCard
              key={release.version}
              release={release}
              searchQuery={searchQuery}
              selectedCategories={selectedCategories}
            />
          ))}
          
          {filteredReleases.length === 0 && (
            <div className="orion-surface p-12 text-center">
              <p className="text-[hsl(var(--text-secondary))]">
                No releases found matching your filters.
              </p>
            </div>
          )}
        </section>

        {/* Stats Section */}
        <OrionStats />

        <footer className="text-[hsl(var(--text-secondary))] text-sm py-8 mt-12">
          <div>© Moabits. Internal release information for Orion customers. Please do not share externally.</div>
        </footer>
      </main>
    </div>
  );
};

export default Index;