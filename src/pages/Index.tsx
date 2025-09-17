import { useState } from "react";
import OrionHeader from "@/components/OrionHeader";
import OrionStats from "@/components/OrionStats";
import FilterControls from "@/components/FilterControls";
import ReleaseCard from "@/components/ReleaseCard";

const mockReleases = [
  {
    version: "4.0",
    date: "2025-08-01",
    deploymentMonth: "Sep, 21st 2025",
    sections: {
      "New Features": [
        {
          title: "BI Section",
          description: "A new analytics space showing how your business is performing and growing, with insights that make customer invoicing easier."
        }
      ],
      "Enhancements": [
        {
          title: "AP → XP (Flex Plan)",
          description: "The Airtime Plan is evolving into the Flex Plan."
        },
        {
          title: "Faster Invoicing",
          description: "We now invoice based on CDR Close Time instead of Open Time, so billing can run as soon as the next month starts."
        },
        {
          title: "Simpler Product Change Rules",
          description: "Product change rules are greatly simplified."
        }
      ],
      "Front End Changes": [
        {
          title: "Better Section Organization",
          description: "Navigation and grouping have been improved so things are easier to find."
        },
        {
          title: "Usage Speed‑ups",
          description: "We now load SIMs after filtering, so you only see the SIMs you need and the page loads much faster."
        }
      ],
      "Bug Fixes": [
        {
          title: "Autorenewal",
          description: "Fixed an issue where Autorenewal wasn't working properly."
        }
      ]
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
            
            <FilterControls
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedVersion={selectedVersion}
              setSelectedVersion={setSelectedVersion}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
          
          <div className="orion-surface p-6 self-end">
            <p className="text-[hsl(var(--text-secondary))] text-lg mb-6">
              Central place for all Orion deployments and updates. 
              Each release shows the version, deployment date, and what changed across New Features, Enhancements, Front‑End Changes, and Bug Fixes. Images/PDFs can be attached inside each section.
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
          <div>© Orion. Internal release information for Orion customers. Please do not share externally.</div>
        </footer>
      </main>
    </div>
  );
};

export default Index;