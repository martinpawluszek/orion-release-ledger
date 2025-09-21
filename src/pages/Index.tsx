import { useState } from "react";
import OrionHeader from "@/components/OrionHeader";
import OrionStats from "@/components/OrionStats";
import FilterControls from "@/components/FilterControls";
import ReleaseCard from "@/components/ReleaseCard";

const mockReleases = [
  {
    version: "4.0",
    date: "2025-08-01",
    deploymentMonth: "Sep, 21 de 2025",
    sections: {
      "Nuevas Funcionalidades": [
        {
          title: "Sección BI",
          description: "Un nuevo espacio de análisis que muestra cómo está funcionando y creciendo tu negocio, con insights que facilitan la facturación de clientes."
        }
      ],
      "Mejoras": [
        {
          title: "AP → XP (Plan Flex)",
          description: "El Plan Airtime está evolucionando hacia el Plan Flex."
        },
        {
          title: "Cambio en el Cálculo de Facturación",
          description: "Ahora facturamos basándose en el Tiempo de Cierre CDR en lugar del Tiempo de Apertura, para que la facturación pueda ejecutarse tan pronto como inicie el próximo mes."
        },
        {
          title: "Reglas de Cambio de Producto Simplificadas",
          description: "Reglas de cambio de producto:\n• Cambio INMEDIATO: Para SIMs nuevas (\"Lista\") o con plan expirado (\"Suspendida\")\n         • Nota: Los planes Pay As You Go (PAYG) cambian inmediatamente, en cualquier caso\n\n • Cambio PROGRAMADO (En Cola): Para SIMs con un plan activo. El nuevo plan se aplicará al finalizar el ciclo del actual\n\nReglas para Mover SIMs entre Clientes:\n• Movimiento con Plan Activo: Una SIM con plan activo puede moverse libremente entre clientes \"hijos\". El cargo del plan se asignará al cliente propietario al final del período de facturación\n     • Nota Importante: Al hacer el cambio entre clientes, es importante seleccionar el mismo plan que la SIM card posee para poder completar el movimiento. Si se elige un plan diferente, el mismo entrará en cola y el movimiento se realizará recién en el próximo período, una vez que el plan actual finalice\n\n• Movimiento con Plan Expirado: Se requiere una activación manual para iniciar el nuevo ciclo para el nuevo cliente"
        }
      ],
      "Cambios de Front End": [
        {
          title: "Mejor Organización de Secciones",
          description: "La navegación y agrupación han sido mejoradas para que las cosas sean más fáciles de encontrar."
        },
        {
          title: "Remodelación de la funcionalidad de Uso",
          description: "El uso ahora necesita parametro de filtrado para mostrar información de manera más eficiente, si el filtro selecciona trae mas de 100 filas o 4 segundos de carga, se descarga automaticamente el reporte con la información en un archivo xlsx en el icono de la campana"
        }
      ],
      "Correcciones de Errores": [
        {
          title: "Autorenovación",
          description: "Se corrigió un problema donde la Autorenovación no funcionaba correctamente."
        },
        {
          title: "Cambio de Producto",
          description: "Mejoras y simplificaciones en las lógicas cuando un producto se cambia por otro en una SIM activa."
        }
      ]
    }
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVersion, setSelectedVersion] = useState("4.0");
  const [selectedCategories, setSelectedCategories] = useState([
    "Nuevas Funcionalidades", "Mejoras", "Cambios de Front End", "Correcciones de Errores"
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
              Versiones de Orion (v4.0+)
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
              Lugar central para todos los despliegues y actualizaciones de Orion. 
              Cada versión muestra la versión, fecha de despliegue, y qué cambió en Nuevas Funcionalidades, Mejoras, Cambios de Front‑End y Correcciones de Errores. Se pueden adjuntar imágenes/PDFs dentro de cada sección.
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
                No se encontraron versiones que coincidan con tus filtros.
              </p>
            </div>
          )}
        </section>

        {/* Stats Section */}
        <OrionStats />

        <footer className="text-[hsl(var(--text-secondary))] text-sm py-8 mt-12">
          <div>© Orion. Información interna de versiones para clientes de Orion. Por favor no compartir externamente.</div>
        </footer>
      </main>
    </div>
  );
};

export default Index;