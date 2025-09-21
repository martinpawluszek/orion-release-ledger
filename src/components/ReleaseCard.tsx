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
                    <div className="text-[hsl(var(--text-secondary))] leading-relaxed">
                      {bulletPoint.description.includes('|') && bulletPoint.description.includes('Si la SIM está') ? (
                        <div className="my-4">
                          <table className="w-full border-collapse rounded-lg overflow-hidden">
                            <thead>
                              <tr className="bg-blue-500">
                                <th className="text-white font-semibold p-3 text-left">Si la SIM está...</th>
                                <th className="text-white font-semibold p-3 text-left">Y su plan está...</th>
                                <th className="text-white font-semibold p-3 text-left">El cambio será...</th>
                                <th className="text-white font-semibold p-3 text-left">Y se activará...</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="bg-gray-50">
                                <td className="p-3 font-semibold">Lista</td>
                                <td className="p-3">(Cualquiera)</td>
                                <td className="p-3 text-green-600 font-semibold">Inmediato</td>
                                <td className="p-3">Con el primer uso</td>
                              </tr>
                              <tr className="bg-white">
                                <td className="p-3 font-semibold">Suspendida</td>
                                <td className="p-3">Expirado</td>
                                <td className="p-3 text-green-600 font-semibold">Inmediato</td>
                                <td className="p-3">Tras activación manual</td>
                              </tr>
                              <tr className="bg-gray-50">
                                <td className="p-3 font-semibold">Activa</td>
                                <td className="p-3">Activo</td>
                                <td className="p-3 text-orange-500 font-semibold">Programado (en cola)</td>
                                <td className="p-3">Automáticamente</td>
                              </tr>
                              <tr className="bg-white">
                                <td className="p-3 font-semibold">Suspendida (por usuario)</td>
                                <td className="p-3">Activo</td>
                                <td className="p-3 text-orange-500 font-semibold">Programado (en cola)</td>
                                <td className="p-3">Tras activación manual</td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="mt-4 whitespace-pre-line">
                            {bulletPoint.description.split('\n\n').find(part => part.includes('Reglas para Mover'))?.split('\n').slice(1).join('\n')}
                          </div>
                        </div>
                      ) : (
                        <p className="whitespace-pre-line">{bulletPoint.description}</p>
                      )}
                    </div>
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