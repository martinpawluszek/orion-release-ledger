import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface BulletPoint {
  text: string;
  attachments?: string[];
}

interface ReleaseData {
  version: string;
  date: string;
  deploymentMonth: string;
  sections: {
    "New Features": BulletPoint[];
    "Enhancements": BulletPoint[];
    "Front End Changes": BulletPoint[];
    "Bug Fixes": BulletPoint[];
  };
}

interface ReleaseCardProps {
  release: ReleaseData;
  searchQuery: string;
  selectedCategories: string[];
}

const ReleaseCard = ({ release, searchQuery, selectedCategories }: ReleaseCardProps) => {
  const [openAttachments, setOpenAttachments] = useState<{ [key: string]: boolean }>({});

  const toggleAttachments = (bulletIndex: string) => {
    setOpenAttachments(prev => ({
      ...prev,
      [bulletIndex]: !prev[bulletIndex]
    }));
  };

  const getBulletPoints = (section: keyof ReleaseData["sections"]) => {
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
          const bulletPoints = getBulletPoints(category as keyof ReleaseData["sections"]);
          if (bulletPoints.length === 0) return null;

          return (
            <div key={category} className="border-t border-dashed border-[hsl(var(--border-subtle))] pt-6 first:border-t-0 first:pt-0">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[hsl(var(--text-secondary))] mb-3">
                {category}
              </h3>
              <div className="space-y-4">
                {bulletPoints.map((bulletPoint, index) => {
                  const bulletKey = `${category}-${index}`;
                  return (
                    <div key={index}>
                      <div className="text-[hsl(var(--text-primary))] mb-2" dangerouslySetInnerHTML={{ __html: bulletPoint.text }} />
                      
                      {bulletPoint.attachments && bulletPoint.attachments.length > 0 && (
                        <Collapsible 
                          open={openAttachments[bulletKey]} 
                          onOpenChange={() => toggleAttachments(bulletKey)}
                        >
                          <CollapsibleTrigger className="orion-surface p-3 w-full flex items-center justify-between text-sm font-semibold cursor-pointer hover:bg-[hsl(var(--surface-overlay))] transition-colors">
                            <span>Attachments (optional)</span>
                            {openAttachments[bulletKey] ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </CollapsibleTrigger>
                          <CollapsibleContent className="mt-2">
                            <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3">
                              {bulletPoint.attachments.map((attachment, attachmentIndex) => (
                                <div
                                  key={attachmentIndex}
                                  className="aspect-video bg-black/20 border border-dashed border-[hsl(var(--border-subtle))] rounded-lg flex items-center justify-center text-xs text-[hsl(var(--text-secondary))] p-3 text-center overflow-hidden"
                                >
                                  {attachment === "Plan XP Announcement" ? (
                                    <img 
                                      src="/lovable-uploads/0a1665d5-fd90-4453-aa00-869322f77534.png" 
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
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default ReleaseCard;