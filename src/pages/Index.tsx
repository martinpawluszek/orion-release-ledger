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
          description: "Un nuevo espacio de análisis que muestra cómo está funcionando y creciendo tu negocio, con insights que facilitan la facturación de clientes, por ejemplo:\n\n1. Comparación entre producto comprado y producto vendido.\n2. Qué productos tienen mayor uso.\n3. Qué tipo de productos tienen mayor consumo de datos.\n4. Qué sub-cuentas tienen mayor cantidad de SIMs activas.\n5. Qué productos tienen contratados cada cliente.\n6. Cuáles SIMs tienen productos próximos a expirar.\n7. Cuáles SIMs fueron activadas en el mes en curso.\n8. Vigencias de los Productos Flex Plan."
        }
      ],
      "Mejoras": [
        {
          title: "AP → XP (Plan Flex)",
          description: "El Plan Airtime ha evolucionando hacia el Plan Flex, con las siguiente reglas:\n\n1. Lógica Principal: Se basa en una duración total en meses. Cada mes, la SIM recibe un nuevo paquete de datos.\n2. Consumo Excedente: Si en un mes se consume más datos del paquete establecido, el consumo extra se factura por separado.\n3. Renovaciones y Expiración: Si una autorenovación está activada, el plan se renueva por otro ciclo. Si no hay autorenovaciones activas, expira y la SIM se suspende al finalizar el ciclo."
        },
        {
          title: "Cambio en el Cálculo de Facturación",
          description: "Ahora facturamos basándose en el Tiempo de Cierre CDR en lugar del Tiempo de Apertura, para mejorar la precisión de la facturación ya que existe una latencia en la recepción de los CDRs."
        },
        {
          title: "Reglas de Cambio de Producto Simplificadas",
          description: "Reglas de cambio de producto:\n1. Cambio INMEDIATO: Para SIMs nuevas (\"Lista\") o con plan expirado (\"Suspendida\")\n    • Nota: Los planes Pay As You Go (PAYG) cambian inmediatamente, en cualquier caso\n\n2. Cambio PROGRAMADO (En Cola): Para SIMs con un plan activo. El nuevo plan se aplicará al finalizar el ciclo del actual\n\n<div class=\"my-6 overflow-x-auto\"><table class=\"w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm\"><thead><tr class=\"bg-gradient-to-r from-blue-500 to-blue-600 text-white\"><th class=\"px-4 py-3 text-left font-medium text-sm\">Si la SIM está...</th><th class=\"px-4 py-3 text-left font-medium text-sm\">Y su plan está...</th><th class=\"px-4 py-3 text-left font-medium text-sm\">El cambio será...</th><th class=\"px-4 py-3 text-left font-medium text-sm\">Y se activará...</th></tr></thead><tbody><tr class=\"border-b border-gray-100\"><td class=\"px-4 py-3 font-medium text-gray-800\">Lista</td><td class=\"px-4 py-3 text-gray-600\">(Cualquiera)</td><td class=\"px-4 py-3 text-green-600 font-medium\">Inmediato</td><td class=\"px-4 py-3 text-gray-700\">Con el primer uso</td></tr><tr class=\"bg-gray-50 border-b border-gray-100\"><td class=\"px-4 py-3 font-medium text-gray-800\">Suspendida</td><td class=\"px-4 py-3 text-gray-600\">Expirado</td><td class=\"px-4 py-3 text-green-600 font-medium\">Inmediato</td><td class=\"px-4 py-3 text-gray-700\">Tras activación manual</td></tr><tr class=\"border-b border-gray-100\"><td class=\"px-4 py-3 font-medium text-gray-800\">Activa</td><td class=\"px-4 py-3 text-gray-600\">Activo</td><td class=\"px-4 py-3 text-orange-500 font-medium\">Programado (en cola)</td><td class=\"px-4 py-3 text-gray-700\">Automáticamente</td></tr><tr class=\"bg-gray-50\"><td class=\"px-4 py-3 font-medium text-gray-800\">Suspendida (por usuario)</td><td class=\"px-4 py-3 text-gray-600\">Activo</td><td class=\"px-4 py-3 text-orange-500 font-medium\">Programado (en cola)</td><td class=\"px-4 py-3 text-gray-700\">Tras activación manual</td></tr></tbody></table></div>\n\nReglas para Mover SIMs entre Clientes:\n1. Movimiento con Plan Activo: Una SIM con plan activo puede moverse libremente entre clientes \"hijos\". El cargo del plan se asignará al cliente propietario al final del período de facturación\n    • Nota Importante: Al hacer el cambio entre clientes, es importante seleccionar el mismo plan que la SIM card posee para poder completar el movimiento. Si se elige un plan diferente, el mismo entrará en cola y el movimiento se realizará recién en el próximo período, una vez que el plan actual finalice\n\n2. Movimiento con Plan Expirado: Se requiere una activación manual para iniciar el nuevo ciclo para el nuevo cliente"
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
          description: "Se hicieron mejoras en el código para la función de la autorenovación más eficiente y garantizar su correcto funcionamiento para todos nuestros productos de conectividad. Los periodos de autorenovacion van a depender del tipo de producto:\n\n1. Producto con duración mes calendario: Data Pool, Fixed Plan y PAYG, se renuevan mensualmente\n\n2. Producto con duracion variable: Nuevo Flex Plan, se renueva cuando se acaban los meses asignados al plan"
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