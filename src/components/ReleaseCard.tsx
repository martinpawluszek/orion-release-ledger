import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface ReleaseData {
  version: string;
  date: string;
  deploymentMonth: string;
  sections: {
    "New Features": string[];
    "Enhancements": string[];
    "Front End Changes": string[];
    "Bug Fixes": string[];
  };
  attachments?: {
    [key: string]: string[];
  };
}

interface ReleaseCardProps {
  release: ReleaseData;
  searchQuery: string;
  selectedCategories: string[];
}

const ReleaseCard = ({ release, searchQuery, selectedCategories }: ReleaseCardProps) => {
  const [openAttachments, setOpenAttachments] = useState<{ [key: string]: boolean }>({});

  const toggleAttachments = (section: string) => {
    setOpenAttachments(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getSectionItems = (section: keyof ReleaseData["sections"]) => {
    if (!selectedCategories.includes(section)) return [];
    return release.sections[section] || [];
  };

  const hasVisibleSections = selectedCategories.some(
    category => release.sections[category as keyof ReleaseData["sections"]]?.length > 0
  );

  if (!hasVisibleSections) return null;

  // Text search filter
  const cardText = JSON.stringify(release).toLowerCase();
  if (searchQuery && !cardText.includes(searchQuery.toLowerCase())) {
    return null;
  }

  return (
    <article className="orion-surface overflow-hidden">
      <div className="flex justify-between items-center p-6 border-b border-[hsl(var(--border-subtle))]">
        <h2 className="text-xl font-semibold">
          Orion <span className="orion-gradient-text">{release.version}</span>
        </h2>
        <div className="flex items-center gap-2 text-sm text-[hsl(var(--text-secondary))]">
          <span title="Deployment date">
            Deployed: <strong>{release.deploymentMonth}</strong>
          </span>
          <span>•</span>
          <span>Release Notes</span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {selectedCategories.map((category) => {
          const items = getSectionItems(category as keyof ReleaseData["sections"]);
          if (items.length === 0) return null;

          return (
            <div key={category} className="border-t border-dashed border-[hsl(var(--border-subtle))] pt-6 first:border-t-0 first:pt-0">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[hsl(var(--text-secondary))] mb-3">
                {category}
              </h3>
              <ul className="space-y-2 pl-5">
                {items.map((item, index) => (
                  <li key={index} className="text-[hsl(var(--text-primary))] list-disc" dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
              
              {release.attachments?.[category] && (
                <Collapsible 
                  open={openAttachments[category]} 
                  onOpenChange={() => toggleAttachments(category)}
                >
                  <CollapsibleTrigger className="orion-surface p-3 mt-4 w-full flex items-center justify-between text-sm font-semibold cursor-pointer hover:bg-[hsl(var(--surface-overlay))] transition-colors">
                    <span>Attachments (optional)</span>
                    {openAttachments[category] ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3">
                      {release.attachments[category].map((attachment, index) => (
                        <div
                          key={index}
                          className="aspect-video bg-black/20 border border-dashed border-[hsl(var(--border-subtle))] rounded-lg flex items-center justify-center text-xs text-[hsl(var(--text-secondary))] p-3 text-center overflow-hidden"
                        >
                          {attachment === "Plan XP Announcement" ? (
                            <img 
                              src="/lovable-uploads/87183805-17f7-46ad-a9d9-d17e2b49da59.png" 
                              alt="Plan XP Announcement" 
                              className="w-full h-full object-cover rounded"
                            />
                          ) : (
                            attachment
                          )}
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default ReleaseCard;