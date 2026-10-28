export type Gender = 'female' | 'male' | 'nonbinary' | 'unspecified';

export interface UserProfile {
  name: string;
  gender: Gender;
  roomName: string;
  avatar: {
    skinTone: string;
    hairStyle: string;
    hairColor: string;
    shirtColor: string;
    expression: 'happy' | 'smile' | 'sleepy' | 'wink';
  };
}

export type ItemCategory = 
  | 'bed' 
  | 'seating' 
  | 'table' 
  | 'storage' 
  | 'lighting' 
  | 'plant' 
  | 'tech' 
  | 'decor' 
  | 'pet';

export type FurnitureStyle = 
  | 'modern'       // 모던 (Modern)
  | 'classic'      // 클래식 & 앤틱 (Classic & Antique)
  | 'minimalist'   // 미니멀리스트 & 북유럽 (Minimalist & Nordic)
  | 'cozy'         // 코지 내추럴 (Cozy Natural Wood)
  | 'pastel';      // 큐트 파스텔 (Cute Pastel)

export interface FurnitureDefinition {
  id: string;
  name: string;
  koreanName: string;
  category: ItemCategory;
  style: FurnitureStyle;
  width: number;
  height: number;
  tags: string[];
  description: string;
  price: number;
  defaultColor?: string;
  colorOptions?: { name: string; hex: string; secondaryHex?: string }[];
  isWallItem?: boolean; // Can be placed on wall
  isFloorRug?: boolean; // Lies flat on the floor under other furniture
}

export interface PlacedItem {
  instanceId: string;
  itemId: string;
  x: number; // Percentage coords in room space
  y: number;
  rotation: 0 | 90 | 180 | 270;
  flipped: boolean;
  scale: number; // 0.7 - 1.4
  colorVariantIndex: number;
  zIndex: number;
}

export type TimeOfDay = 'day' | 'sunset' | 'night';
export type WeatherType = 'sunny' | 'rain' | 'petals' | 'stars';

export type WallPattern = 
  | 'solid' 
  | 'vertical-stripes' 
  | 'wainscoting' 
  | 'brick' 
  | 'classic-damask' 
  | 'wood-panels' 
  | 'concrete'
  | 'cute-stars';

export type FloorType = 
  | 'wood-warm' 
  | 'wood-herringbone' 
  | 'wood-dark'
  | 'tatami' 
  | 'checkered' 
  | 'marble' 
  | 'concrete-tile'
  | 'terrazzo'
  | 'carpet-cream';

export interface RoomSettings {
  wallColor: string;
  wallPattern: WallPattern;
  floorType: FloorType;
  timeOfDay: TimeOfDay;
  weather: WeatherType;
  showGrid: boolean;
  gridSnap: boolean;
  musicEnabled: boolean;
  sfxEnabled: boolean;
}

export interface BackgroundThemePreset {
  id: string;
  name: string;
  styleLabel: string;
  description: string;
  wallColor: string;
  wallPattern: WallPattern;
  floorType: FloorType;
  wallPreview: string;
  floorPreview: string;
}
