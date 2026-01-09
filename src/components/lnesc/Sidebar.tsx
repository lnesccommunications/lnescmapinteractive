import React from "react";
import { Location } from "./data";
import { motion, AnimatePresence } from "motion/react";

interface SidebarProps {
  locations: Location[];
  hoveredLocationId: string | null;
  onHoverLocation: (id: string | null) => void;
}

// Custom SVG Graduation Cap Icon for Sidebar
const GradCapIcon = ({ size = 20, color = "white" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18C5 17.18 8.13 19.18 12 19.18C15.87 19.18 19 17.18 19 17.18V13.18C17.28 14.14 14.76 14.73 12 14.73C9.24 14.73 6.72 14.14 5 13.18Z" />
  </svg>
);

export const Sidebar: React.FC<SidebarProps> = ({
  locations,
  hoveredLocationId,
  onHoverLocation,
}) => {
  // Sort locations: HQ first, then alphabetical
  const sortedLocations = [...locations].sort((a, b) => {
    if (a.isHQ) return -1;
    if (b.isHQ) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="w-full max-w-[400px] lg:w-[280px] flex-shrink-0 bg-[#c67521] border-2 border-[#2769B9] rounded-[5px] p-5 pb-2 lg:pb-5 flex flex-col h-auto">
      <ul className="flex flex-col flex-1 justify-between space-y-0">
        {sortedLocations.map((loc) => {
          const isHovered = hoveredLocationId === loc.id;
          return (
            <li key={loc.id}>
              <a
                href={loc.url}
                className={`group block w-full py-[5px] px-2 -mx-2 rounded cursor-pointer text-white transition-all duration-300 ${
                  isHovered ? "bg-[#022A4F]" : "hover:bg-[#022A4F]"
                }`}
                onMouseEnter={() => onHoverLocation(loc.id)}
                onMouseLeave={() => onHoverLocation(null)}
                aria-label={`Visit ${loc.name} center page`}
              >
                <div className="flex items-center justify-between w-full">
                  <motion.div 
                    className="flex items-center"
                    animate={{ x: isHovered ? 3 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span
                      className={`font-montserrat font-medium text-[16px] transition-colors duration-200 text-white`}
                    >
                      {loc.name}
                    </span>
                  </motion.div>
                  
                  <div className="flex items-center justify-center w-[24px]">
                    {isHovered ? (
                      <GradCapIcon size={20} color="white" />
                    ) : (
                      <span className="text-[19px] font-montserrat text-white">
                        »
                      </span>
                    )}
                  </div>
                </div>

                {/* Address Info - Shows up inside the box on hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: 8 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden text-[13px] leading-snug text-white/90 font-light pl-1 border-t border-white/20 pt-2"
                    >
                      {loc.address.map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                      {loc.phone && (
                        <div className="mt-1 font-medium text-orange-300">{loc.phone}</div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};