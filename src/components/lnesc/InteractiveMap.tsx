import React, { useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { Location } from "./data";
import { Star } from "lucide-react";
import { motion, AnimatePresence, useInView } from "motion/react";
// Using the emblem asset provided in the prompt
import emblemImg from "figma:asset/7840a3ec89bb4f8901c056fb1ba7058018ccee9d.png";

// Standard US Atlas TopoJSON
const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// Colors
const COLORS = {
  navy: "#0B4F87",
  mediumBlue: "#034983",
  lighterBlue: "#2769B9",
  orange: "#F7931D",
  sidebar: "#c67521",
  white: "#FFFFFF",
  stroke: "#FFFFFF",
};

interface InteractiveMapProps {
  locations: Location[];
  hoveredLocationId: string | null;
  onHoverLocation: (id: string | null, e?: React.MouseEvent) => void;
}

// Custom SVG Graduation Cap Icon
const GradCapIcon = ({ size = 24, color = "white" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18C5 17.18 8.13 19.18 12 19.18C15.87 19.18 19 17.18 19 17.18V13.18C17.28 14.14 14.76 14.73 12 14.73C9.24 14.73 6.72 14.14 5 13.18Z" />
  </svg>
);

const MapPin = ({
  isHQ,
  isHovered,
  scaleFactor = 1,
  delay = 0,
  hasAnimated = false,
}: {
  isHQ: boolean;
  isHovered: boolean;
  scaleFactor?: number;
  delay?: number;
  hasAnimated?: boolean;
}) => {
  return (
    <motion.g
      initial={hasAnimated ? false : { scale: 0, opacity: 0, y: -50 }}
      animate={{ scale: (isHovered ? 1 : 0.78) * scaleFactor, opacity: 1, y: 0 }}
      transition={hasAnimated ? { duration: 0.3, type: "spring" } : { 
        duration: 0.8, 
        type: "spring",
        bounce: 0.4,
        delay: delay 
      }}
    >
      {isHQ ? (
        <g transform="translate(-25, -50)">
          {/* Same teardrop shape as education centers but with star icon */}
          <path
            d="M25 0C11.2 0 0 11.2 0 25c0 14.5 25 50 25 50s25-35.5 25-50C50 11.2 38.8 0 25 0z"
            fill={COLORS.orange}
            stroke={COLORS.white}
            strokeWidth={2}
            style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))" }}
          />
          {/* White Star Icon - Same size as grad cap */}
          <g transform="translate(13, 12)">
            <Star size={24} fill={COLORS.white} color={COLORS.white} strokeWidth={0} />
          </g>
        </g>
      ) : (
        <g transform="translate(-25, -50)">
           {/* Refined Teardrop Shape */}
          <path
            d="M25 0C11.2 0 0 11.2 0 25c0 14.5 25 50 25 50s25-35.5 25-50C50 11.2 38.8 0 25 0z"
            fill={COLORS.orange}
            stroke={COLORS.white}
            strokeWidth={2}
            style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))" }}
          />
          {/* Graduation Cap Icon - Custom SVG as requested */}
          <g transform="translate(13, 12)">
             <GradCapIcon size={24} color="white" />
          </g>
        </g>
      )}
    </motion.g>
  );
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  locations,
  hoveredLocationId,
  onHoverLocation,
}) => {
  // Filter locations for main map vs PR
  const mainLocations = locations.filter((l) => l.stateCode !== "PR");
  const prLocation = locations.find((l) => l.stateCode === "PR");
  
  // State for emblem hover
  const [isEmblemHovered, setIsEmblemHovered] = useState(false);
  
  // Track mouse position for tooltip
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
  // Track if animations have been triggered
  const [hasAnimated, setHasAnimated] = useState(false);
  const mapRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(mapRef, { once: true, amount: 0.3 });
  
  // Trigger animations when in view
  React.useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  // Find the hovered location
  const hoveredLocation = useMemo(() => {
    return locations.find(loc => loc.id === hoveredLocationId);
  }, [hoveredLocationId, locations]);
  
  // Handle hover with position tracking
  const handleHoverLocation = (id: string | null, e?: React.MouseEvent) => {
    if (e && mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
    onHoverLocation(id, e);
  };

  return (
    <div ref={mapRef} className="relative w-full h-full min-h-[400px] flex flex-col items-center justify-center" style={{ isolation: 'isolate' }}>
      
      {/* US Map Glow Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hasAnimated ? [0, 0.6, 0.3, 0] : 0 }}
        transition={{ duration: 3, times: [0, 0.3, 0.6, 1], ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 45% 50%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.2) 40%, transparent 70%)',
          zIndex: 1,
          mixBlendMode: 'overlay'
        }}
      />
      
      {/* Emblem Overlay - 5% from sidebar, centered horizontally with PR pin */}
      <div 
        className="absolute right-[-2%] bottom-[24%] w-[17.6%] max-w-[160px] pointer-events-auto z-0 opacity-100 cursor-pointer transition-all duration-300"
        style={{ 
          filter: isEmblemHovered 
            ? "drop-shadow(0 0 20px rgba(198, 117, 33, 0.8)) drop-shadow(0 0 40px rgba(198, 117, 33, 0.5)) drop-shadow(0 4px 12px rgba(0,0,0,0.1))"
            : "drop-shadow(0 4px 12px rgba(0,0,0,0.1))",
          transform: 'translateX(1%)' // Move 5% to the left (was 6.5%, now 1%)
        }}
        onMouseEnter={() => setIsEmblemHovered(true)}
        onMouseLeave={() => setIsEmblemHovered(false)}
      >
        <div className="relative w-full h-full overflow-hidden rounded-full">
            <img src={emblemImg} alt="LNESC Emblem" className="w-full h-auto" />
            
            {/* Shine Effect */}
            <div 
              className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 animate-shine" 
              style={{ animation: 'shine 6s infinite' }}
            />
        </div>
      </div>
      <style>{`
        @keyframes shine {
          100% {
            left: 125%;
          }
        }
        .animate-shine {
          animation: shine 3s infinite;
        }
      `}</style>

      <ComposableMap projection="geoAlbersUsa" className="w-full h-auto max-h-[600px]">
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateName = geo.properties.name;
              const activeStateNames = [
                "Washington", "California", "New Mexico", "Colorado", "Texas", 
                "Missouri", "Florida", "Pennsylvania", "District of Columbia"
              ];
              
              // DC can be identified by ID "11" in the TopoJSON data
              const isActive = activeStateNames.includes(stateName) || geo.id === "11";
              
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isActive ? COLORS.lighterBlue : COLORS.navy}
                  stroke={COLORS.white}
                  strokeWidth={1}
                  style={{
                    default: { outline: "none" },
                    hover: {
                      fill: isActive ? COLORS.mediumBlue : COLORS.navy,
                      outline: "none",
                      cursor: isActive ? "pointer" : "default",
                      transition: "all 0.3s ease"
                    },
                    pressed: { outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>

        {mainLocations.map((loc, index) => (
          <Marker
            key={loc.id}
            coordinates={[loc.lng, loc.lat]}
            onMouseEnter={(e) => handleHoverLocation(loc.id, e)}
            onMouseLeave={() => onHoverLocation(null)}
            onClick={() => window.open(loc.url, "_self")} 
          >
             <MapPin
               isHQ={loc.isHQ}
               isHovered={hoveredLocationId === loc.id}
               scaleFactor={1}
               delay={index * 0.08}
               hasAnimated={hasAnimated}
             />
          </Marker>
        ))}
      </ComposableMap>

      {/* Puerto Rico Separate Map Section */}
      <div className="absolute bottom-[2%] right-[-2%] w-[35%] max-w-[240px] aspect-[3/2]">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 14000, 
            center: [-66.4, 18.2] 
          }}
          className="w-full h-full"
        >
             <Geographies geography={GEO_URL}>
              {({ geographies }) => {
                 const prGeo = geographies.find(g => g.id === "72" || g.properties.name === "Puerto Rico");
                 if (!prGeo) return null;
                 return (
                    <Geography 
                      geography={prGeo}
                      fill={COLORS.lighterBlue}
                      stroke={COLORS.white}
                      strokeWidth={1}
                      style={{
                        default: { outline: "none" },
                        hover: { fill: COLORS.mediumBlue, outline: "none" },
                        pressed: { outline: "none" }
                      }}
                    />
                 );
              }}
             </Geographies>
             
             {prLocation && (
                <Marker
                  key={prLocation.id}
                  coordinates={[prLocation.lng, prLocation.lat]}
                  onMouseEnter={(e) => handleHoverLocation(prLocation.id, e)}
                  onMouseLeave={() => onHoverLocation(null)}
                  onClick={() => window.open(prLocation.url, "_self")}
                >
                   <MapPin
                     isHQ={prLocation.isHQ}
                     isHovered={hoveredLocationId === prLocation.id}
                     scaleFactor={3.5}
                     hasAnimated={hasAnimated}
                   />
                </Marker>
             )}
        </ComposableMap>
      </div>

      {/* Tooltip Layer - Rendered OUTSIDE and AFTER the maps to ensure it's always on top */}
      <AnimatePresence>
        {hoveredLocation && (
          <div 
            className="absolute pointer-events-none"
            style={{ 
              zIndex: 99999,
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 5 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-white rounded-lg shadow-xl p-4 border border-gray-100 flex flex-col gap-2 w-[240px] absolute"
              style={{ 
                filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.25))",
                // Position near cursor - adjust these values as needed
                top: `${tooltipPosition.y}px`,
                left: `${tooltipPosition.x}px`,
                transform: 'translate(-50%, calc(-100% - 10px))'
              }}
            >
              <h3 className="text-[#0B4F87] font-bold text-base leading-tight">{hoveredLocation.name}</h3>
              
              <div className="flex flex-col gap-0.5">
                 {hoveredLocation.address && hoveredLocation.address.map((line, i) => (
                   <p key={i} className="text-gray-600 text-xs font-medium leading-snug">{line}</p>
                 ))}
                 {hoveredLocation.phone && (
                    <p className="text-gray-600 text-xs font-medium leading-snug">Phone: {hoveredLocation.phone}</p>
                 )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveMap;