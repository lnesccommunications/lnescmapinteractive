 LNESC Interactive Map

An interactive map component displaying the National Office and 16 education centers of LNESC (LULAC National Educational Service Services. across the United States and Puerto Rico.

## Features

- **Interactive US Map** with custom teardrop pins for all 17 locations
- **Puerto Rico Inset Map** positioned on the right side
- **Hover Effects** on both map pins and sidebar items with synchronized highlighting
- **Custom SVG Icons**: White graduation cap for education centers, white star for National Office
- **Tooltip System** that appears above pins on hover with location details
- **Animated Sidebar** with expandable contact information
- **Responsive Design** that adapts to different screen sizes
- **Smooth Animations** including pin drop-in effect, map glow, and emblem shine
- **LNESC Emblem** with glowing hover effect and animated shine

## Technologies Used

### React Version
- React with TypeScript
- Motion (formerly Framer Motion) for animations
- react-simple-maps for map rendering
- D3.js for geographic projections
- Tailwind CSS v4
- Montserrat font family

### Standalone HTML Version
- Vanilla JavaScript
- D3.js v7 for map rendering and interactions
- TopoJSON for geographic data
- Pure CSS animations and transitions

## File Structure

```
/
├── App.tsx                           # Main app entry point
├── components/
│   └── lnesc/
│       ├── MapSection.tsx           # Main map section component
│       ├── InteractiveMap.tsx       # Map rendering with pins
│       ├── Sidebar.tsx              # Sidebar with location list
│       ├── MapTooltip.tsx           # Tooltip component
│       ├── data.ts                  # Location data and configuration
│       └── types.ts                 # TypeScript interfaces
├── lnesc-map-standalone.html        # Standalone HTML version
└── README.md                        # This file
```

## React Version Usage

### Installation

The React version uses the following dependencies:
```json
{
  "react": "latest",
  "motion": "latest",
  "react-simple-maps": "latest",
  "d3-geo": "latest"
}
```

### Implementation

Import the MapSection component in your app:

```tsx
import MapSection from './components/lnesc/MapSection';

export default function App() {
  return (
    <div className="min-h-screen bg-white w-full">
      <MapSection />
    </div>
  );
}
```

## Standalone HTML Usage

The `lnesc-map-standalone.html` file is a complete, self-contained HTML file that can be:

1. **Dropped into any HTML page** - Copy the entire `<section>` block
2. **Used as-is** - Open the file directly in a browser
3. **Embedded in a CMS** - Works with WordPress, Drupal, etc.

### Embedding in Your Website

```html
<!-- Copy everything from the <section class="lnesc-map-section"> tag -->
<!-- Include the required external libraries -->
<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="https://d3js.org/topojson.v3.min.js"></script>
```

All styles are scoped under `.lnesc-map-section` to avoid conflicts with existing CSS.

## Customization

### Adding/Editing Locations

Edit the location data in `/components/lnesc/data.ts` (React) or in the `locations` array in the HTML file:

```typescript
{
  id: "unique_id",
  name: "Location Name",
  address: ["Line 1", "Line 2", "City, State ZIP"],
  phone: "(123) 456-7890",
  lat: 12.3456,        // GPS latitude
  lng: -98.7654,       // GPS longitude
  isHQ: false,         // true for National Office only
  stateCode: "TX",     // State abbreviation
  url: "https://www.lnesc.org/centers/location/"
}
```

### Adjusting Pin Positions

If pins overlap or need better positioning, adjust the `lat` and `lng` values in the location data. The current positions have been manually fine-tuned to prevent overlapping.

### Customizing Colors

Update the color palette in the code:

**React Version** (`InteractiveMap.tsx`):
```typescript
const COLORS = {
  navy: "#0B4F87",
  lighterBlue: "#2769B9",
  orange: "#F7931D",
  white: "#FFFFFF"
};
```

**HTML Version** (in the `<script>` section):
```javascript
const COLORS = {
  navy: "#0B4F87",
  lighterBlue: "#2769B9",
  orange: "#F7931D",
  white: "#FFFFFF"
};
```

### Sidebar Color

The sidebar uses:
- Background: `#c67521` (Orange)
- Hover: `#022A4F` (Dark Navy)
- Border: `#2769B9` (Blue)

## Design Specifications

### Map Colors
- **Deep Navy** (`#0B4F87`) - Inactive states
- **Lighter Blue** (`#2769B9`) - Active states (where centers exist)
- **Orange** (`#F7931D`) - Pin teardrops
- **White** (`#FFFFFF`) - Icons, borders, and glows

### Typography
- **Font Family**: Montserrat (400, 500, 700 weights)
- **Heading**: 40px, bold, color #034983
- **Body**: 18px, regular
- **Sidebar Items**: 16px, medium weight

### Animations
- **Pin Drop**: 0.8s cubic-bezier bounce effect, staggered by 0.08s
- **Map Glow**: 3s ease-in-out pulse on scroll into view
- **Emblem Shine**: 6s infinite glint animation
- **Sidebar Expand**: 0.3s smooth height transition
- **Tooltip**: 0.25s fade and scale effect

## Interactive Features

### Hover States
- **Map Pins**: Scale from 0.78 to 1.0, show tooltip above
- **Sidebar Items**: Change background to dark blue (#022A4F), swap arrow for grad cap icon, reveal contact details
- **Emblem**: Orange glow effect on hover

### Synchronized Interactions
- Hovering a sidebar item scales the corresponding map pin
- Hovering a map pin highlights the corresponding sidebar item
- Both display the same location information

### Click Actions
- All pins and sidebar items link to their respective location pages on lnesc.org
- Links open in the same tab (can be changed to `target="_blank"` if needed)

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design adapts

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation supported
- Screen reader friendly tooltips
- High contrast color scheme

## Performance

- SVG-based map for crisp rendering at any resolution
- CSS animations use GPU acceleration
- Lazy loading of map data via CDN
- Minimal JavaScript footprint
- No external image dependencies (except emblem placeholder)

## License

This map component is built for LNESC. All rights reserved.

## Support

For questions or issues with the map component, please contact the LNESC web development team: htokhi@lnesc.org

---

**Version**: 1.0  
**Last Updated**: January 2025  
**Maintained by**: LNESC Web Team
