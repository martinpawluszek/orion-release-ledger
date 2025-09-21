import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface BulletPoint {
  title: string;
  description: string;
}

interface ReleaseData {
  version: string;
  date: string;
  deploymentMonth: string;
  sections: {
    "Nuevas Funcionalidades": BulletPoint[];
    "Mejoras": BulletPoint[];
    "Cambios de Front End": BulletPoint[];
    "Correcciones de Errores": BulletPoint[];
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
          <span title="Fecha de despliegue">
            Desplegado: <strong>{release.deploymentMonth}</strong>
          </span>
          <span>•</span>
          <span>Notas de Versión</span>
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
                {bulletPoints.map((bulletPoint, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-semibold text-[hsl(var(--text-primary))]">
                      {bulletPoint.title}
                    </h4>
                    <div className="text-[hsl(var(--text-secondary))] leading-relaxed whitespace-pre-line"
                         dangerouslySetInnerHTML={{ __html: bulletPoint.description }} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default ReleaseCard;