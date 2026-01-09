import React, { useState, useEffect } from "react";
import { locations } from "./data";
import { InteractiveMap } from "./InteractiveMap";
import { Sidebar } from "./Sidebar";
import { motion, AnimatePresence } from "motion/react";

const MapSection: React.FC = () => {
  const [hoveredLocationId, setHoveredLocationId] = useState<string | null>(null);

  const handleHoverLocation = (id: string | null, e?: React.MouseEvent) => {
    setHoveredLocationId(id);
  };

  return (
    <section className="w-full max-w-[1440px] mx-auto px-5 py-[60px] flex flex-col items-center relative font-montserrat">
      {/* Header */}
      <div className="text-center max-w-[800px] mb-10">
        <h2 className="text-[#034983] font-bold text-[40px] mb-4">
          Education Centers
        </h2>
        <p className="text-black text-[18px] leading-relaxed whitespace-nowrap overflow-visible">
          Our education centers are at the forefront of helping disadvantaged students across the United States and Puerto Rico.
        </p>
      </div>

      {/* Content Container */}
      <div className="w-full flex flex-col lg:flex-row items-start justify-center gap-[30px]">
        {/* Map Column */}
        <div className="w-full lg:w-[70%] relative">
          <InteractiveMap
            locations={locations}
            hoveredLocationId={hoveredLocationId}
            onHoverLocation={handleHoverLocation}
          />
        </div>

        {/* Sidebar Column */}
        <div className="w-full lg:w-auto flex justify-center lg:block">
          <Sidebar
            locations={locations}
            hoveredLocationId={hoveredLocationId}
            onHoverLocation={(id) => handleHoverLocation(id)} // Sidebar doesn't give mouse coords for tooltip usually, or we don't show tooltip on sidebar hover? 
            // Prompt says: "Sidebar item highlights... Corresponding map pin scales". 
            // It doesn't explicitly say tooltip appears on sidebar hover, but implied "Hover State" section describes tooltip on pin hover. 
            // I will only show tooltip when hovering the PIN itself, as sidebar hover shows the pin scaling.
          />
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap');
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
      `}</style>
    </section>
  );
};

export default MapSection;