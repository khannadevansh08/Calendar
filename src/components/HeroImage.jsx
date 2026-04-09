import React from 'react';
import { format } from 'date-fns';

// Using curated, reliable Unsplash Image IDs for each month
const monthImageIds = [
  'photo-1491002052546-bf38f186af56', // Jan - Snow mountain
  'photo-1522748906645-95d8adfd52c7', // Feb - Cherry blossom
  'photo-1440657371333-230553fed482', // Mar - Misty forest
  'photo-1490750967868-58a33da92846', // Apr - Spring field
  'photo-1470770841072-f978cf4d019e', // May - Flower garden
  'photo-1507525428034-b723cf961d3e', // Jun - Summer coast
  'photo-1519046904884-53103b34b206', // Jul - Tropical beach
  'photo-1495195129352-aec3297a9865', // Aug - Golden sunset
  'photo-1506744038136-46273834b3fb', // Sep - Autumn leaves
  'photo-1518005020250-675f0f3848fc', // Oct - Moody architecture
  'photo-1501785888041-af3ef285b470', // Nov - Foggy lake
  'photo-1482933221570-6ecd7044e991'  // Dec - Winter waterfall
];

const HeroImage = ({ date }) => {
  const monthIndex = date.getMonth();
  const imageId = monthImageIds[monthIndex];
  
  // Using the robust Unsplash Image URL format
  const imageUrl = `https://images.unsplash.com/${imageId}?auto=format&fit=crop&q=80&w=1000&h=600`;

  return (
    <img 
      key={monthIndex}
      src={imageUrl} 
      alt={`Hero image for ${format(date, 'MMMM')}`} 
      className="hero-image"
      loading="lazy"
      onError={(e) => {
        // Fallback to a generic nature image if the specific ID fails
        e.target.src = 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1000&h=600';
      }}
    />
  );
};

export default HeroImage;
