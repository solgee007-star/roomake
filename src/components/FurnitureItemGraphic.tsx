import React from 'react';
import { FurnitureDefinition } from '../types/room';

interface Props {
  itemDef: FurnitureDefinition;
  colorVariantIndex?: number;
  isFlipped?: boolean;
}

export const FurnitureItemGraphic: React.FC<Props> = ({
  itemDef,
  colorVariantIndex = 0,
  isFlipped = false,
}) => {
  const chosenColor = itemDef.colorOptions?.[colorVariantIndex]?.hex || itemDef.defaultColor || '#C49A6C';
  const secondaryColor = itemDef.colorOptions?.[colorVariantIndex]?.secondaryHex || '#F5EBE1';

  const flipTransform = isFlipped ? 'scale(-1, 1)' : 'none';
  const transformOrigin = 'center center';

  // Render SVG based on ID
  const renderContent = () => {
    switch (itemDef.id) {
      case 'bed-cozy-single':
        return (
          <g>
            {/* Bed base shadow & wooden frame */}
            <rect x="10" y="20" width="120" height="85" rx="10" fill="#784B29" opacity="0.3" filter="blur(2px)" />
            <rect x="8" y="15" width="124" height="85" rx="8" fill="#B38054" stroke="#7A4E2B" strokeWidth="2.5" />
            {/* Wooden Headboard */}
            <rect x="8" y="6" width="124" height="22" rx="5" fill="#915B32" stroke="#683F20" strokeWidth="2" />
            <line x1="28" y1="9" x2="28" y2="24" stroke="#683F20" strokeWidth="2" strokeLinecap="round" />
            <line x1="70" y1="9" x2="70" y2="24" stroke="#683F20" strokeWidth="2" strokeLinecap="round" />
            <line x1="112" y1="9" x2="112" y2="24" stroke="#683F20" strokeWidth="2" strokeLinecap="round" />
            {/* Mattress Sheet */}
            <rect x="14" y="22" width="112" height="74" rx="6" fill="#FFFDF8" stroke="#E5DEC9" strokeWidth="1.5" />
            {/* Fluffy Pillow */}
            <rect x="25" y="25" width="90" height="24" rx="10" fill="#FFFFFF" stroke="#D8D0BE" strokeWidth="2" />
            <path d="M 32 37 Q 70 33 108 37" stroke="#E8E1CE" strokeWidth="1.5" fill="none" />
            {/* Quilt / Duvet */}
            <rect x="14" y="44" width="112" height="52" rx="6" fill={chosenColor} stroke="#6E3E26" strokeWidth="1.5" />
            {/* Folded blanket accent strip */}
            <rect x="14" y="44" width="112" height="14" rx="4" fill={secondaryColor} opacity="0.9" stroke="#5E3821" strokeWidth="1" />
            {/* Quilt Stitching Details */}
            <line x1="18" y1="72" x2="122" y2="72" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.6" />
            <line x1="50" y1="58" x2="50" y2="92" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.4" />
            <line x1="90" y1="58" x2="90" y2="92" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.4" />
          </g>
        );

      case 'bed-double-canopy':
        return (
          <g>
            {/* Bed shadow */}
            <rect x="12" y="24" width="156" height="110" rx="12" fill="#000000" opacity="0.15" />
            {/* Bed Wooden Base */}
            <rect x="10" y="20" width="160" height="114" rx="10" fill="#99633B" stroke="#6B3F1E" strokeWidth="2.5" />
            {/* Padded Headboard */}
            <rect x="10" y="8" width="160" height="28" rx="8" fill="#5E3A1D" stroke="#42250F" strokeWidth="2.5" />
            {/* Headboard Tufting Buttons */}
            <circle cx="35" cy="20" r="3" fill="#D3A579" />
            <circle cx="70" cy="20" r="3" fill="#D3A579" />
            <circle cx="110" cy="20" r="3" fill="#D3A579" />
            <circle cx="145" cy="20" r="3" fill="#D3A579" />
            {/* Mattress */}
            <rect x="16" y="28" width="148" height="102" rx="8" fill="#FFFCF5" stroke="#E6DDC8" strokeWidth="2" />
            {/* Double Pillows */}
            <rect x="25" y="32" width="58" height="26" rx="8" fill="#FFFFFF" stroke="#DDD2BD" strokeWidth="2" />
            <rect x="97" y="32" width="58" height="26" rx="8" fill="#FFFFFF" stroke="#DDD2BD" strokeWidth="2" />
            {/* Fluffy Comforter Duvet */}
            <rect x="16" y="55" width="148" height="75" rx="8" fill={chosenColor} stroke="#4D3522" strokeWidth="2" />
            {/* Folded Top Bed Runner */}
            <rect x="16" y="55" width="148" height="18" rx="5" fill={secondaryColor} opacity="0.85" />
            <path d="M 22 92 C 55 86, 125 86, 158 92" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="6,4" fill="none" opacity="0.5" />
          </g>
        );

      case 'sofa-fabric-cozy':
        return (
          <g>
            {/* Shadow */}
            <ellipse cx="75" cy="78" rx="70" ry="8" fill="#000000" opacity="0.12" />
            {/* Wooden Legs */}
            <line x1="20" y1="72" x2="16" y2="82" stroke="#8A5A36" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="130" y1="72" x2="134" y2="82" stroke="#8A5A36" strokeWidth="4.5" strokeLinecap="round" />
            {/* Sofa Backrest */}
            <rect x="14" y="10" width="122" height="40" rx="14" fill={chosenColor} stroke="#445533" strokeWidth="2" />
            {/* Armrests */}
            <rect x="6" y="22" width="22" height="50" rx="11" fill={chosenColor} stroke="#445533" strokeWidth="2" />
            <rect x="122" y="22" width="22" height="50" rx="11" fill={chosenColor} stroke="#445533" strokeWidth="2" />
            {/* Main Seating Cushion */}
            <rect x="22" y="38" width="106" height="34" rx="12" fill={chosenColor} stroke="#445533" strokeWidth="2" />
            <line x1="75" y1="38" x2="75" y2="72" stroke="#334422" strokeWidth="2" strokeDasharray="2,2" opacity="0.4" />
            {/* Pillows / Throw Cushions */}
            <rect x="24" y="28" width="28" height="24" rx="6" transform="rotate(-8 38 40)" fill={secondaryColor} stroke="#7D6B55" strokeWidth="1.5" />
            <rect x="98" y="28" width="28" height="24" rx="6" transform="rotate(8 112 40)" fill="#FAF0D7" stroke="#9A8264" strokeWidth="1.5" />
          </g>
        );

      case 'beanbag-fluffy':
        return (
          <g>
            <ellipse cx="37" cy="58" rx="34" ry="7" fill="#000000" opacity="0.15" />
            {/* Beanbag shape */}
            <path
              d="M 37 6 C 55 6, 70 24, 71 45 C 72 60, 58 64, 37 64 C 16 64, 2 60, 3 45 C 4 24, 19 6, 37 6 Z"
              fill={chosenColor}
              stroke="#6B4B38"
              strokeWidth="2.5"
            />
            {/* Fabric Seams */}
            <path d="M 37 8 Q 37 38 37 63" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.45" fill="none" />
            <path d="M 37 10 Q 56 30 68 46" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.35" fill="none" />
            <path d="M 37 10 Q 18 30 6 46" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.35" fill="none" />
            {/* Top Loop Handle */}
            <path d="M 32 8 C 32 1, 42 1, 42 8" stroke="#6B4B38" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        );

      case 'chair-armchair-retro':
        return (
          <g>
            <ellipse cx="38" cy="70" rx="32" ry="6" fill="#000000" opacity="0.12" />
            {/* Legs */}
            <line x1="16" y1="58" x2="11" y2="72" stroke="#7A4E2B" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="60" y1="58" x2="65" y2="72" stroke="#7A4E2B" strokeWidth="3.5" strokeLinecap="round" />
            {/* Backrest */}
            <rect x="14" y="8" width="48" height="42" rx="12" fill={chosenColor} stroke="#542E16" strokeWidth="2.5" />
            {/* Seating Cushion */}
            <rect x="10" y="38" width="56" height="22" rx="9" fill={chosenColor} stroke="#542E16" strokeWidth="2.5" />
            {/* Wooden Armrests */}
            <path d="M 8 26 L 14 42" stroke="#8E5E3A" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 68 26 L 62 42" stroke="#8E5E3A" strokeWidth="4.5" strokeLinecap="round" />
            {/* Cozy cushion buttons */}
            <circle cx="28" cy="22" r="2.5" fill="#3D1D09" opacity="0.4" />
            <circle cx="48" cy="22" r="2.5" fill="#3D1D09" opacity="0.4" />
          </g>
        );

      case 'desk-study-wood':
        return (
          <g>
            {/* Desk Shadow */}
            <rect x="14" y="78" width="112" height="12" rx="6" fill="#000000" opacity="0.12" />
            {/* Desk Back Leg */}
            <line x1="20" y1="36" x2="20" y2="82" stroke="#8A633F" strokeWidth="5" strokeLinecap="round" />
            <line x1="120" y1="36" x2="120" y2="82" stroke="#8A633F" strokeWidth="5" strokeLinecap="round" />
            {/* Drawer side box */}
            <rect x="90" y="36" width="34" height="42" rx="4" fill="#A87A4F" stroke="#684728" strokeWidth="2" />
            <rect x="94" y="42" width="26" height="14" rx="2" fill="#BA8959" stroke="#684728" strokeWidth="1.5" />
            <circle cx="107" cy="49" r="2" fill="#E8D196" />
            <rect x="94" y="60" width="26" height="14" rx="2" fill="#BA8959" stroke="#684728" strokeWidth="1.5" />
            <circle cx="107" cy="67" r="2" fill="#E8D196" />
            {/* Desk Tabletop */}
            <rect x="8" y="24" width="124" height="14" rx="4" fill={chosenColor} stroke="#684728" strokeWidth="2.5" />
            {/* Left Legs */}
            <line x1="20" y1="36" x2="20" y2="85" stroke="#684728" strokeWidth="5" strokeLinecap="round" />
            {/* Desk Accessories */}
            {/* Desk Lamp */}
            <path d="M 30 24 L 30 8 L 44 14" stroke="#4A6572" strokeWidth="3" fill="none" strokeLinecap="round" />
            <polygon points="40,10 52,14 44,22" fill="#F9AA33" stroke="#232F34" strokeWidth="1.5" />
            {/* Desk organizer / books */}
            <rect x="58" y="16" width="6" height="10" fill="#E74C3C" />
            <rect x="64" y="14" width="6" height="12" fill="#3498DB" />
            <rect x="70" y="17" width="5" height="9" fill="#2ECC71" />
          </g>
        );

      case 'table-coffee-round':
        return (
          <g>
            <ellipse cx="40" cy="62" rx="34" ry="7" fill="#000000" opacity="0.14" />
            {/* Tripod legs */}
            <line x1="40" y1="30" x2="22" y2="62" stroke="#66462C" strokeWidth="4" strokeLinecap="round" />
            <line x1="40" y1="30" x2="58" y2="62" stroke="#66462C" strokeWidth="4" strokeLinecap="round" />
            <line x1="40" y1="30" x2="40" y2="65" stroke="#523620" strokeWidth="4" strokeLinecap="round" />
            {/* Round Table Top (Perspective Oval) */}
            <ellipse cx="40" cy="26" rx="36" ry="16" fill={chosenColor} stroke="#543A23" strokeWidth="2.5" />
            {/* Table Rim Highlight */}
            <ellipse cx="40" cy="24" rx="34" ry="14" fill="#FFFFFF" opacity="0.2" />
            {/* Cute Coffee Mug */}
            <rect x="34" y="14" width="10" height="9" rx="2" fill="#FAF5EE" stroke="#A85A32" strokeWidth="1.5" />
            <path d="M 44 16 C 47 16, 47 21, 44 21" stroke="#A85A32" strokeWidth="1.5" fill="none" />
            {/* Steam */}
            <path d="M 37 11 Q 39 8 38 5" stroke="#CCCCCC" strokeWidth="1.5" fill="none" opacity="0.7" />
          </g>
        );

      case 'bookshelf-tall':
        return (
          <g>
            {/* Shadow */}
            <rect x="12" y="130" width="86" height="8" rx="4" fill="#000000" opacity="0.15" />
            {/* Bookshelf Outer Cabinet */}
            <rect x="10" y="8" width="90" height="126" rx="6" fill={chosenColor} stroke="#4A301D" strokeWidth="3" />
            {/* Top Crown */}
            <rect x="7" y="4" width="96" height="8" rx="3" fill="#8C5C38" stroke="#4A301D" strokeWidth="2" />
            {/* Shelves */}
            <line x1="12" y1="46" x2="98" y2="46" stroke="#4A301D" strokeWidth="3" />
            <line x1="12" y1="84" x2="98" y2="84" stroke="#4A301D" strokeWidth="3" />
            <line x1="12" y1="116" x2="98" y2="116" stroke="#4A301D" strokeWidth="3" />
            {/* Shelf 1 Items: Books and Mini Plant */}
            <rect x="18" y="20" width="8" height="24" rx="1" fill="#E67E22" />
            <rect x="27" y="24" width="7" height="20" rx="1" fill="#3498DB" />
            <rect x="35" y="18" width="9" height="26" rx="1" fill="#9B59B6" />
            <rect x="45" y="22" width="8" height="22" rx="1" fill="#1ABC9C" />
            {/* Little Potted Cactus on shelf */}
            <ellipse cx="80" cy="40" rx="6" ry="4" fill="#D35400" />
            <ellipse cx="80" cy="32" rx="5" ry="7" fill="#2ECC71" />
            {/* Shelf 2 Items: Slanted Books & Globe */}
            <rect x="18" y="60" width="8" height="22" rx="1" fill="#E74C3C" />
            <rect x="27" y="62" width="8" height="20" rx="1" transform="rotate(12 27 62)" fill="#F1C40F" />
            <circle cx="75" cy="68" r="10" fill="#85C1E9" stroke="#2980B9" strokeWidth="1.5" />
            <path d="M 68 76 C 75 79, 82 79, 82 76" stroke="#A07248" strokeWidth="2" fill="none" />
            {/* Shelf 3 Items: Storage Boxes */}
            <rect x="18" y="92" width="32" height="22" rx="3" fill="#E8D5B5" stroke="#7A6046" strokeWidth="1.5" />
            <rect x="56" y="92" width="36" height="22" rx="3" fill="#C9D6DF" stroke="#52616B" strokeWidth="1.5" />
          </g>
        );

      case 'storage-chest-drawers':
        return (
          <g>
            <rect x="10" y="76" width="80" height="8" rx="4" fill="#000000" opacity="0.12" />
            {/* Legs */}
            <line x1="16" y1="70" x2="16" y2="82" stroke="#5B3C23" strokeWidth="4" strokeLinecap="round" />
            <line x1="84" y1="70" x2="84" y2="82" stroke="#5B3C23" strokeWidth="4" strokeLinecap="round" />
            {/* Chest Box */}
            <rect x="8" y="8" width="84" height="68" rx="6" fill={chosenColor} stroke="#5B3C23" strokeWidth="2.5" />
            {/* Top Surface */}
            <rect x="6" y="4" width="88" height="8" rx="3" fill="#B3865B" stroke="#5B3C23" strokeWidth="1.5" />
            {/* 3 Drawer Fronts */}
            <rect x="14" y="16" width="72" height="15" rx="3" fill="#FFFBF5" stroke="#8C6E52" strokeWidth="1.5" />
            <circle cx="50" cy="23" r="2.5" fill="#D4AF37" stroke="#8C6E52" strokeWidth="1" />
            <rect x="14" y="34" width="72" height="15" rx="3" fill="#FFFBF5" stroke="#8C6E52" strokeWidth="1.5" />
            <circle cx="50" cy="41" r="2.5" fill="#D4AF37" stroke="#8C6E52" strokeWidth="1" />
            <rect x="14" y="52" width="72" height="15" rx="3" fill="#FFFBF5" stroke="#8C6E52" strokeWidth="1.5" />
            <circle cx="50" cy="59" r="2.5" fill="#D4AF37" stroke="#8C6E52" strokeWidth="1" />
          </g>
        );

      case 'clothes-rack':
        return (
          <g>
            <ellipse cx="37" cy="114" rx="26" ry="5" fill="#000000" opacity="0.12" />
            {/* Base legs */}
            <line x1="12" y1="112" x2="62" y2="112" stroke="#68472B" strokeWidth="4" strokeLinecap="round" />
            {/* Vertical Pole */}
            <line x1="22" y1="18" x2="22" y2="112" stroke="#68472B" strokeWidth="4" />
            <line x1="52" y1="18" x2="52" y2="112" stroke="#68472B" strokeWidth="4" />
            {/* Top Hanging Bar */}
            <line x1="16" y1="18" x2="58" y2="18" stroke="#8C5C36" strokeWidth="5" strokeLinecap="round" />
            {/* Hanger 1 & Cozy Sweater */}
            <path d="M 28 20 L 34 26 L 22 26 Z" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
            <rect x="22" y="27" width="14" height="28" rx="4" fill="#D35400" />
            {/* Hanger 2 & Pastel Cardigan */}
            <path d="M 40 20 L 46 26 L 34 26 Z" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
            <rect x="34" y="27" width="16" height="34" rx="4" fill="#A2D2FF" />
            {/* Bottom shelf for shoes */}
            <rect x="16" y="96" width="42" height="6" rx="2" fill="#A57A50" />
            <ellipse cx="28" cy="94" rx="6" ry="3" fill="#FFFFFF" stroke="#CCCCCC" />
            <ellipse cx="44" cy="94" rx="6" ry="3" fill="#D35400" stroke="#962D00" />
          </g>
        );

      case 'window-sunny-curtain':
        return (
          <g>
            {/* Window Frame */}
            <rect x="12" y="10" width="86" height="108" rx="16" fill="#F4EFE6" stroke="#7A6046" strokeWidth="3" />
            {/* Outdoor Sky Gradient/View */}
            <rect x="18" y="16" width="74" height="96" rx="10" fill="#75C2F6" />
            {/* Warm Sun */}
            <circle cx="34" cy="34" r="14" fill="#FEE715" opacity="0.9" />
            <circle cx="34" cy="34" r="18" fill="#FEE715" opacity="0.3" />
            {/* Fluffy Clouds */}
            <ellipse cx="64" cy="46" rx="16" ry="8" fill="#FFFFFF" opacity="0.9" />
            <ellipse cx="74" cy="42" rx="10" ry="10" fill="#FFFFFF" opacity="0.9" />
            {/* Window Panes Grid */}
            <line x1="55" y1="16" x2="55" y2="112" stroke="#FFFFFF" strokeWidth="3" opacity="0.8" />
            <line x1="18" y1="64" x2="92" y2="64" stroke="#FFFFFF" strokeWidth="3" opacity="0.8" />
            {/* Curtain Rod */}
            <line x1="6" y1="8" x2="104" y2="8" stroke="#4A3423" strokeWidth="4" strokeLinecap="round" />
            <circle cx="6" cy="8" r="3.5" fill="#D4AF37" />
            <circle cx="104" cy="8" r="3.5" fill="#D4AF37" />
            {/* Left Curtains */}
            <path d="M 8 10 Q 24 60 14 116 L 28 116 Q 30 60 22 10 Z" fill={chosenColor} opacity="0.9" stroke="#B8A78F" strokeWidth="1" />
            {/* Right Curtains */}
            <path d="M 102 10 Q 86 60 96 116 L 82 116 Q 80 60 88 10 Z" fill={chosenColor} opacity="0.9" stroke="#B8A78F" strokeWidth="1" />
          </g>
        );

      case 'lamp-floor-stand':
        return (
          <g>
            <ellipse cx="27" cy="134" rx="20" ry="5" fill="#000000" opacity="0.15" />
            {/* Base */}
            <ellipse cx="27" cy="132" rx="16" ry="4" fill="#333333" stroke="#111111" strokeWidth="1.5" />
            {/* Curved Stem */}
            <path d="M 27 132 L 27 45 Q 27 15 45 15 L 48 24" stroke="#333333" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            {/* Lamp Shade */}
            <polygon points="40,24 56,24 62,44 34,44" fill={chosenColor} stroke="#A37C34" strokeWidth="1.5" />
            {/* Warm Light Glow */}
            <polygon points="34,44 62,44 78,110 18,110" fill="#FFEAA7" opacity="0.25" />
            {/* Cozy Bulb */}
            <circle cx="48" cy="42" r="4" fill="#FFFFFF" />
          </g>
        );

      case 'fairy-lights-garland':
        return (
          <g>
            {/* Hanging String Curve */}
            <path d="M 8 12 Q 40 32 75 14 Q 110 32 142 12" stroke="#5E4E38" strokeWidth="1.8" fill="none" />
            {/* Fairy Light Bulbs with warm glows */}
            {[18, 38, 58, 75, 92, 112, 132].map((x, i) => {
              const y = i === 3 ? 14 : i % 2 === 0 ? 18 : 26;
              return (
                <g key={i}>
                  <circle cx={x} cy={y + 6} r="8" fill="#FEEAA7" opacity="0.3" />
                  <rect x={x - 2} y={y - 1} width="4" height="4" fill="#7A6046" />
                  <ellipse cx={x} cy={y + 6} rx="4" ry="5" fill="#FFF7CC" stroke="#F6C90E" strokeWidth="1" />
                </g>
              );
            })}
          </g>
        );

      case 'candle-aroma-tray':
        return (
          <g>
            <ellipse cx="22" cy="30" rx="20" ry="4" fill="#000000" opacity="0.12" />
            {/* Wood Tray */}
            <ellipse cx="22" cy="27" rx="19" ry="5" fill="#B08359" stroke="#684728" strokeWidth="1.5" />
            {/* Candle 1 (Tall) */}
            <rect x="10" y="12" width="10" height="14" rx="2" fill="#FAF5EE" stroke="#E3D7C5" strokeWidth="1" />
            <line x1="15" y1="12" x2="15" y2="9" stroke="#333333" strokeWidth="1" />
            <path d="M 15 9 Q 17 6 15 4 Q 13 6 15 9 Z" fill="#FFA502" />
            <circle cx="15" cy="6" r="3" fill="#FFF275" opacity="0.5" />
            {/* Candle 2 (Medium) */}
            <rect x="23" y="16" width="10" height="10" rx="2" fill="#F7D8BA" stroke="#DDB889" strokeWidth="1" />
            <line x1="28" y1="16" x2="28" y2="13" stroke="#333333" strokeWidth="1" />
            <path d="M 28 13 Q 30 10 28 8 Q 26 10 28 13 Z" fill="#FFA502" />
            <circle cx="28" cy="10" r="3" fill="#FFF275" opacity="0.5" />
          </g>
        );

      case 'plant-monstera-pot':
        return (
          <g>
            <ellipse cx="37" cy="102" rx="22" ry="6" fill="#000000" opacity="0.15" />
            {/* Terracotta Pot */}
            <polygon points="24,70 50,70 46,100 28,100" fill="#D35400" stroke="#8E3900" strokeWidth="2" />
            <rect x="22" y="66" width="30" height="6" rx="2" fill="#E67E22" stroke="#8E3900" strokeWidth="1.5" />
            {/* Monstera Leaves */}
            {/* Stem Left */}
            <path d="M 37 70 Q 24 45 14 36" stroke="#2D6A4F" strokeWidth="2.5" fill="none" />
            {/* Big Leaf Left */}
            <path d="M 14 36 C 4 28, 6 12, 22 18 C 28 22, 24 38, 14 36 Z" fill="#40916C" stroke="#1B4332" strokeWidth="1.5" />
            {/* Slits */}
            <line x1="16" y1="26" x2="8" y2="22" stroke="#2D6A4F" strokeWidth="1.5" />
            <line x1="18" y1="30" x2="10" y2="30" stroke="#2D6A4F" strokeWidth="1.5" />
            {/* Stem Right */}
            <path d="M 37 70 Q 50 42 62 30" stroke="#2D6A4F" strokeWidth="2.5" fill="none" />
            {/* Big Leaf Right */}
            <path d="M 62 30 C 72 20, 68 6, 52 14 C 46 20, 50 34, 62 30 Z" fill="#52B788" stroke="#1B4332" strokeWidth="1.5" />
            <line x1="60" y1="22" x2="68" y2="18" stroke="#2D6A4F" strokeWidth="1.5" />
            {/* Center Main Leaf */}
            <path d="M 37 70 Q 37 32 37 16" stroke="#2D6A4F" strokeWidth="2.5" fill="none" />
            <path d="M 37 16 C 24 4, 50 4, 37 16 Z" fill="#74C69D" stroke="#1B4332" strokeWidth="1.5" />
          </g>
        );

      case 'plant-hanging-ivy':
        return (
          <g>
            {/* Ceiling Rope */}
            <line x1="27" y1="2" x2="27" y2="28" stroke="#8C6E52" strokeWidth="2" />
            <line x1="27" y1="28" x2="18" y2="38" stroke="#8C6E52" strokeWidth="1.5" />
            <line x1="27" y1="28" x2="36" y2="38" stroke="#8C6E52" strokeWidth="1.5" />
            {/* Hanging Ceramic Bowl */}
            <ellipse cx="27" cy="40" rx="14" ry="7" fill="#FAF5EE" stroke="#A89F91" strokeWidth="1.5" />
            {/* Cascading Ivy Vines & Leaves */}
            <path d="M 22 42 Q 14 60 16 82" stroke="#40916C" strokeWidth="2" fill="none" />
            <circle cx="16" cy="52" r="3.5" fill="#52B788" />
            <circle cx="13" cy="64" r="4" fill="#2D6A4F" />
            <circle cx="17" cy="76" r="3.5" fill="#74C69D" />
            <path d="M 32 42 Q 38 65 32 86" stroke="#40916C" strokeWidth="2" fill="none" />
            <circle cx="36" cy="54" r="4" fill="#52B788" />
            <circle cx="34" cy="68" r="4" fill="#2D6A4F" />
            <circle cx="30" cy="80" r="3.5" fill="#74C69D" />
          </g>
        );

      case 'plant-succulent-trio':
        return (
          <g>
            <ellipse cx="30" cy="40" rx="26" ry="4" fill="#000000" opacity="0.12" />
            {/* Pot 1 */}
            <rect x="8" y="24" width="12" height="14" rx="2" fill="#E07A5F" stroke="#9E4731" strokeWidth="1.2" />
            <circle cx="14" cy="18" r="6" fill="#81B29A" stroke="#436F5A" strokeWidth="1" />
            {/* Pot 2 (Middle) */}
            <rect x="23" y="22" width="14" height="16" rx="2" fill="#F4F1DE" stroke="#A8A284" strokeWidth="1.2" />
            <path d="M 30 10 L 33 22 L 27 22 Z" fill="#3D5A80" />
            <circle cx="30" cy="16" r="5" fill="#6DAE75" />
            {/* Pot 3 */}
            <rect x="40" y="25" width="12" height="13" rx="2" fill="#DDB892" stroke="#8C6845" strokeWidth="1.2" />
            <circle cx="46" cy="20" r="5" fill="#A7C957" stroke="#5E7824" strokeWidth="1" />
          </g>
        );

      case 'plant-tulip-vase':
        return (
          <g>
            <ellipse cx="22" cy="54" rx="14" ry="4" fill="#000000" opacity="0.12" />
            {/* Glass Vase */}
            <path d="M 16 30 Q 12 46 16 52 L 28 52 Q 32 46 28 30 Z" fill="#D4E6F1" opacity="0.85" stroke="#85929E" strokeWidth="1.5" />
            {/* Stems */}
            <path d="M 22 36 L 16 16" stroke="#27AE60" strokeWidth="2" />
            <path d="M 22 36 L 24 12" stroke="#27AE60" strokeWidth="2" />
            <path d="M 22 36 L 29 18" stroke="#27AE60" strokeWidth="2" />
            {/* Yellow Tulips */}
            <path d="M 13 14 C 11 8, 20 8, 18 14 Z" fill={chosenColor} stroke="#E67E22" strokeWidth="1" />
            <path d="M 21 10 C 19 4, 28 4, 26 10 Z" fill={chosenColor} stroke="#E67E22" strokeWidth="1" />
            <path d="M 27 16 C 25 10, 33 10, 31 16 Z" fill={chosenColor} stroke="#E67E22" strokeWidth="1" />
          </g>
        );

      case 'tech-turntable-vinyl':
        return (
          <g>
            <rect x="6" y="10" width="58" height="34" rx="4" fill={chosenColor} stroke="#542E16" strokeWidth="2" />
            {/* Turntable Platter */}
            <circle cx="28" cy="27" r="16" fill="#1C1C1C" stroke="#444444" strokeWidth="1.5" />
            <circle cx="28" cy="27" r="6" fill="#E74C3C" />
            <circle cx="28" cy="27" r="1.5" fill="#FFFFFF" />
            {/* Tonearm */}
            <line x1="50" y1="16" x2="38" y2="28" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
            <circle cx="50" cy="16" r="3" fill="#D4AF37" />
            {/* Control Knobs */}
            <circle cx="54" cy="34" r="2.5" fill="#FFFFFF" stroke="#888888" strokeWidth="1" />
          </g>
        );

      case 'hobby-guitar-stand':
        return (
          <g>
            <ellipse cx="27" cy="114" rx="20" ry="5" fill="#000000" opacity="0.15" />
            {/* Metal Stand */}
            <line x1="14" y1="112" x2="27" y2="80" stroke="#333333" strokeWidth="3" />
            <line x1="40" y1="112" x2="27" y2="80" stroke="#333333" strokeWidth="3" />
            <line x1="27" y1="80" x2="27" y2="40" stroke="#333333" strokeWidth="3" />
            {/* Guitar Body (Hourglass) */}
            <path
              d="M 27 100 C 12 100, 10 78, 20 70 C 14 62, 16 52, 27 52 C 38 52, 40 62, 34 70 C 44 78, 42 100, 27 100 Z"
              fill={chosenColor}
              stroke="#683F1C"
              strokeWidth="2.5"
            />
            {/* Soundhole */}
            <circle cx="27" cy="68" r="5" fill="#2E1C0C" />
            {/* Bridge */}
            <rect x="22" y="86" width="10" height="3" fill="#2E1C0C" />
            {/* Neck */}
            <rect x="25" y="16" width="4" height="38" fill="#8C5C36" stroke="#4A2F17" strokeWidth="1" />
            {/* Headstock */}
            <polygon points="24,16 30,16 31,6 23,6" fill="#683F1C" />
            {/* Strings */}
            <line x1="27" y1="10" x2="27" y2="86" stroke="#FFFFFF" strokeWidth="1" opacity="0.8" />
          </g>
        );

      case 'tech-computer-desksetup':
        return (
          <g>
            <rect x="4" y="60" width="86" height="6" rx="3" fill="#000000" opacity="0.12" />
            {/* Monitor 1 (Main) */}
            <rect x="14" y="10" width="42" height="28" rx="3" fill="#1E272E" stroke="#485460" strokeWidth="2" />
            <rect x="17" y="13" width="36" height="22" rx="1" fill="#4BCFFA" />
            <polygon points="26,24 35,28 30,18" fill="#FFFFFF" opacity="0.8" />
            <rect x="32" y="38" width="6" height="12" fill="#485460" />
            <rect x="24" y="50" width="22" height="3" rx="1" fill="#1E272E" />
            {/* Monitor 2 (Vertical) */}
            <rect x="60" y="8" width="18" height="34" rx="2" fill="#1E272E" stroke="#485460" strokeWidth="1.5" />
            <rect x="62" y="11" width="14" height="28" rx="1" fill="#05C46B" />
            {/* Keyboard & Mousepad */}
            <rect x="18" y="54" width="34" height="10" rx="2" fill="#111111" stroke="#333333" strokeWidth="1" />
            <line x1="18" y1="56" x2="52" y2="56" stroke="#FF5E57" strokeWidth="1" />
            <rect x="56" y="56" width="6" height="8" rx="2" fill="#FFFFFF" stroke="#888888" strokeWidth="1" />
          </g>
        );

      case 'tech-retro-tv':
        return (
          <g>
            <rect x="10" y="58" width="50" height="6" rx="3" fill="#000000" opacity="0.15" />
            {/* TV Body */}
            <rect x="6" y="16" width="58" height="42" rx="8" fill={chosenColor} stroke="#6E3506" strokeWidth="2.5" />
            {/* Screen */}
            <rect x="12" y="22" width="36" height="30" rx="6" fill="#34495E" stroke="#1A252F" strokeWidth="2" />
            <ellipse cx="24" cy="32" rx="10" ry="6" fill="#5D6D7E" opacity="0.4" />
            {/* Knobs */}
            <circle cx="54" cy="28" r="3" fill="#F4D03F" stroke="#6E3506" strokeWidth="1" />
            <circle cx="54" cy="40" r="3" fill="#F4D03F" stroke="#6E3506" strokeWidth="1" />
            {/* Speaker slats */}
            <line x1="51" y1="48" x2="57" y2="48" stroke="#6E3506" strokeWidth="1.5" />
            <line x1="51" y1="52" x2="57" y2="52" stroke="#6E3506" strokeWidth="1.5" />
            {/* Rabbit ear antenna */}
            <line x1="30" y1="16" x2="16" y2="4" stroke="#95A5A6" strokeWidth="2" strokeLinecap="round" />
            <line x1="34" y1="16" x2="48" y2="4" stroke="#95A5A6" strokeWidth="2" strokeLinecap="round" />
          </g>
        );

      case 'hobby-easel-canvas':
        return (
          <g>
            <ellipse cx="37" cy="120" rx="26" ry="5" fill="#000000" opacity="0.12" />
            {/* Easel Legs */}
            <line x1="14" y1="118" x2="37" y2="10" stroke="#A07248" strokeWidth="4" strokeLinecap="round" />
            <line x1="60" y1="118" x2="37" y2="10" stroke="#A07248" strokeWidth="4" strokeLinecap="round" />
            <line x1="37" y1="118" x2="37" y2="10" stroke="#8A5A36" strokeWidth="3.5" />
            {/* Shelf Peg */}
            <line x1="12" y1="80" x2="62" y2="80" stroke="#6D4323" strokeWidth="4.5" strokeLinecap="round" />
            {/* Stretched Canvas */}
            <rect x="15" y="24" width="45" height="56" rx="3" fill="#FFFDF8" stroke="#C9B8A3" strokeWidth="2" />
            {/* Painting artwork inside */}
            <circle cx="37" cy="40" r="8" fill="#F39C12" />
            <polygon points="18,65 34,48 56,68" fill="#27AE60" />
            <polygon points="32,68 44,54 58,68" fill="#2ECC71" />
            <rect x="15" y="65" width="45" height="15" fill="#3498DB" opacity="0.4" />
          </g>
        );

      case 'rug-round-fluffy':
        return (
          <g>
            {/* Floor Rug Oval in isometric projection */}
            <ellipse cx="70" cy="45" rx="66" ry="40" fill={chosenColor} stroke="#A89F91" strokeWidth="2" />
            <ellipse cx="70" cy="45" rx="58" ry="34" fill="#FFFFFF" opacity="0.25" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="4,4" />
            <ellipse cx="70" cy="45" rx="44" ry="24" fill={chosenColor} opacity="0.8" />
          </g>
        );

      case 'rug-vintage-pattern':
        return (
          <g>
            <ellipse cx="80" cy="50" rx="76" ry="46" fill="#000000" opacity="0.08" />
            <rect x="10" y="8" width="140" height="84" rx="8" fill={chosenColor} stroke="#68342C" strokeWidth="2" />
            {/* Boho border & fringe */}
            <rect x="18" y="14" width="124" height="72" rx="4" fill="none" stroke="#F1E3D3" strokeWidth="2" strokeDasharray="6,4" />
            {/* Central Diamond medallion */}
            <polygon points="80,24 105,50 80,76 55,50" fill="#F1E3D3" opacity="0.9" stroke="#68342C" strokeWidth="1.5" />
            <polygon points="80,34 94,50 80,66 66,50" fill={chosenColor} />
            {/* Corner flourishes */}
            <circle cx="28" cy="24" r="4" fill="#F1E3D3" />
            <circle cx="132" cy="24" r="4" fill="#F1E3D3" />
            <circle cx="28" cy="76" r="4" fill="#F1E3D3" />
            <circle cx="132" cy="76" r="4" fill="#F1E3D3" />
          </g>
        );

      case 'decor-wall-gallery-art':
        return (
          <g>
            {/* Frame 1: Abstract circle */}
            <rect x="6" y="10" width="32" height="42" rx="3" fill="#FFFFFF" stroke="#3E2723" strokeWidth="2.5" />
            <circle cx="22" cy="28" r="9" fill="#E76F51" />
            <path d="M 12 44 Q 22 36 32 44" stroke="#264653" strokeWidth="2" fill="none" />
            {/* Frame 2: Botanical */}
            <rect x="44" y="6" width="38" height="48" rx="3" fill="#FFFFFF" stroke="#3E2723" strokeWidth="2.5" />
            <path d="M 63 46 L 63 18" stroke="#2A9D8F" strokeWidth="2" />
            <circle cx="57" cy="26" r="4" fill="#E9C46A" />
            <circle cx="69" cy="34" r="4" fill="#2A9D8F" />
          </g>
        );

      case 'decor-wall-clock':
        return (
          <g>
            <circle cx="22" cy="22" r="19" fill="#FDFBF7" stroke="#7A5230" strokeWidth="3" />
            <circle cx="22" cy="22" r="2.5" fill="#333333" />
            {/* Hour markers */}
            <line x1="22" y1="6" x2="22" y2="9" stroke="#555555" strokeWidth="1.5" />
            <line x1="22" y1="35" x2="22" y2="38" stroke="#555555" strokeWidth="1.5" />
            <line x1="6" y1="22" x2="9" y2="22" stroke="#555555" strokeWidth="1.5" />
            <line x1="35" y1="22" x2="38" y2="22" stroke="#555555" strokeWidth="1.5" />
            {/* Clock Hands */}
            <line x1="22" y1="22" x2="22" y2="12" stroke="#111111" strokeWidth="2" strokeLinecap="round" />
            <line x1="22" y1="22" x2="30" y2="22" stroke="#E74C3C" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        );

      case 'decor-full-mirror':
        return (
          <g>
            <ellipse cx="25" cy="126" rx="16" ry="4" fill="#000000" opacity="0.12" />
            {/* Arched Gold Frame */}
            <path d="M 8 124 L 8 36 C 8 14, 42 14, 42 36 L 42 124 Z" fill="#F4EAE1" stroke="#D4AF37" strokeWidth="3.5" />
            {/* Mirror Glass Reflection */}
            <path d="M 12 120 L 12 36 C 12 18, 38 18, 38 36 L 38 120 Z" fill="#EBF5FB" stroke="#AED6F1" strokeWidth="1.5" />
            {/* Light streak */}
            <line x1="16" y1="45" x2="32" y2="80" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            <line x1="18" y1="85" x2="26" y2="105" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          </g>
        );

      case 'decor-teddy-bear':
        return (
          <g>
            <ellipse cx="22" cy="46" rx="16" ry="4" fill="#000000" opacity="0.15" />
            {/* Ears */}
            <circle cx="12" cy="16" r="6" fill={chosenColor} stroke="#543A23" strokeWidth="1.5" />
            <circle cx="12" cy="16" r="3" fill="#F5D0A9" />
            <circle cx="32" cy="16" r="6" fill={chosenColor} stroke="#543A23" strokeWidth="1.5" />
            <circle cx="32" cy="16" r="3" fill="#F5D0A9" />
            {/* Head */}
            <circle cx="22" cy="24" r="14" fill={chosenColor} stroke="#543A23" strokeWidth="1.8" />
            {/* Snout */}
            <ellipse cx="22" cy="27" rx="6" ry="4.5" fill="#F5D0A9" />
            <ellipse cx="22" cy="26" rx="2.5" ry="1.8" fill="#3E2723" />
            {/* Eyes */}
            <circle cx="17" cy="22" r="1.8" fill="#222222" />
            <circle cx="27" cy="22" r="1.8" fill="#222222" />
            {/* Body */}
            <ellipse cx="22" cy="38" rx="12" ry="10" fill={chosenColor} stroke="#543A23" strokeWidth="1.8" />
            {/* Red Bow Tie */}
            <polygon points="18,31 22,33 26,31 22,35" fill="#E74C3C" />
          </g>
        );

      case 'decor-fireplace-mini':
        return (
          <g>
            <rect x="10" y="96" width="100" height="8" rx="4" fill="#000000" opacity="0.15" />
            {/* Fireplace Mantle */}
            <rect x="12" y="16" width="96" height="84" rx="4" fill={chosenColor} stroke="#68472B" strokeWidth="2.5" />
            {/* Top Shelf */}
            <rect x="6" y="8" width="108" height="10" rx="3" fill="#BA8959" stroke="#5E381A" strokeWidth="2" />
            {/* Firebox Chamber */}
            <rect x="28" y="38" width="64" height="54" rx="8" fill="#2C2723" stroke="#1A1715" strokeWidth="2" />
            {/* Logs */}
            <ellipse cx="50" cy="84" rx="16" ry="4" fill="#5D4037" />
            <ellipse cx="70" cy="84" rx="14" ry="4" fill="#4E342E" />
            {/* Animated Fire Flame Graphic */}
            <path d="M 60 84 Q 50 64 60 54 Q 70 64 60 84 Z" fill="#FF5722" />
            <path d="M 60 84 Q 54 70 60 62 Q 66 70 60 84 Z" fill="#FFEB3B" />
            {/* Candle/Decor on mantle */}
            <rect x="20" y="2" width="6" height="7" fill="#FAF5EE" />
            <circle cx="23" cy="1" r="1.5" fill="#FFA000" />
            <ellipse cx="94" cy="5" rx="4" ry="3" fill="#2ECC71" />
          </g>
        );

      case 'pet-sleeping-cat':
        return (
          <g>
            <ellipse cx="27" cy="36" rx="22" ry="5" fill="#000000" opacity="0.15" />
            {/* Cat Body curled into a sphere */}
            <ellipse cx="28" cy="24" rx="18" ry="13" fill={chosenColor} stroke="#683917" strokeWidth="1.8" />
            {/* Tabby Stripes */}
            <path d="M 22 15 Q 26 21 24 28" stroke="#8A4A1C" strokeWidth="2" fill="none" opacity="0.6" />
            <path d="M 29 13 Q 32 20 31 29" stroke="#8A4A1C" strokeWidth="2" fill="none" opacity="0.6" />
            {/* Cat Head */}
            <circle cx="16" cy="23" r="9" fill={chosenColor} stroke="#683917" strokeWidth="1.8" />
            {/* Ears */}
            <polygon points="10,16 14,10 16,16" fill={chosenColor} stroke="#683917" strokeWidth="1.5" />
            <polygon points="12,15 14,12 15,15" fill="#FFB6B9" />
            {/* Sleeping Eyes (curved lines ^_^) */}
            <path d="M 12 24 Q 14 26 16 24" stroke="#44220E" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* Nose and Whisker */}
            <circle cx="10" cy="26" r="1" fill="#FFB6B9" />
            <line x1="8" y1="26" x2="4" y2="24" stroke="#44220E" strokeWidth="1" strokeLinecap="round" />
            {/* Tail wrapping around */}
            <path d="M 44 26 C 48 34, 38 36, 32 36" stroke={chosenColor} strokeWidth="5" fill="none" strokeLinecap="round" />
            {/* Sleeping Zzz */}
            <text x="36" y="10" fill="#E67E22" fontSize="9" fontWeight="bold" fontFamily="sans-serif">z</text>
            <text x="42" y="6" fill="#E67E22" fontSize="7" fontWeight="bold" fontFamily="sans-serif">z</text>
          </g>
        );

      case 'pet-fluffy-puppy':
        return (
          <g>
            <ellipse cx="27" cy="46" rx="20" ry="5" fill="#000000" opacity="0.15" />
            {/* Fluffy Body */}
            <ellipse cx="27" cy="30" rx="16" ry="13" fill={chosenColor} stroke="#8C6E52" strokeWidth="2" />
            {/* Fluffy Head */}
            <circle cx="27" cy="18" r="12" fill={chosenColor} stroke="#8C6E52" strokeWidth="2" />
            {/* Ears */}
            <polygon points="17,10 20,4 23,10" fill={chosenColor} stroke="#8C6E52" strokeWidth="1.5" />
            <polygon points="31,10 34,4 37,10" fill={chosenColor} stroke="#8C6E52" strokeWidth="1.5" />
            {/* Cute Face */}
            <circle cx="22" cy="16" r="2" fill="#222222" />
            <circle cx="32" cy="16" r="2" fill="#222222" />
            <ellipse cx="27" cy="20" rx="2" ry="1.5" fill="#222222" />
            {/* Happy Little Tongue */}
            <path d="M 26 23 C 26 25, 28 25, 28 23 Z" fill="#FF6B6B" />
            {/* Pink Cheeks */}
            <circle cx="18" cy="20" r="2" fill="#FFB6B9" opacity="0.8" />
            <circle cx="36" cy="20" r="2" fill="#FFB6B9" opacity="0.8" />
            {/* Wagging Tail */}
            <path d="M 40 28 Q 48 20 44 14" stroke={chosenColor} strokeWidth="5" fill="none" strokeLinecap="round" />
            {/* Paws */}
            <circle cx="20" cy="40" r="4" fill={chosenColor} stroke="#8C6E52" strokeWidth="1.5" />
            <circle cx="34" cy="40" r="4" fill={chosenColor} stroke="#8C6E52" strokeWidth="1.5" />
          </g>
        );

      // ==========================================
      // MODERN COLLECTION GRAPHICS
      // ==========================================
      case 'bed-modern-platform':
        return (
          <g>
            <rect x="8" y="24" width="154" height="92" rx="6" fill="#000000" opacity="0.15" />
            {/* Low Platform Wood / Steel Frame */}
            <rect x="6" y="20" width="158" height="94" rx="4" fill="#1C2833" stroke="#111111" strokeWidth="2" />
            {/* Minimalist Headboard */}
            <rect x="6" y="6" width="158" height="24" rx="3" fill="#2C3E50" stroke="#1C2833" strokeWidth="2" />
            {/* Headboard Horizontal Accent Inlay */}
            <line x1="16" y1="18" x2="154" y2="18" stroke="#D4AF37" strokeWidth="1.5" opacity="0.8" />
            {/* Crisp Flat Mattress */}
            <rect x="14" y="26" width="142" height="84" rx="3" fill="#F8F9F9" stroke="#BDC3C7" strokeWidth="1.5" />
            {/* Modern Dual Pillows */}
            <rect x="22" y="30" width="52" height="22" rx="4" fill="#FFFFFF" stroke="#BDC3C7" strokeWidth="1.5" />
            <rect x="96" y="30" width="52" height="22" rx="4" fill="#FFFFFF" stroke="#BDC3C7" strokeWidth="1.5" />
            {/* Modern Duvet */}
            <rect x="14" y="50" width="142" height="60" rx="3" fill={chosenColor} stroke="#1C2833" strokeWidth="1.5" />
            {/* Folded Top Bed Runner */}
            <rect x="14" y="50" width="142" height="14" rx="2" fill={secondaryColor} opacity="0.9" />
          </g>
        );

      case 'desk-modern-steel':
        return (
          <g>
            <rect x="10" y="74" width="115" height="8" rx="4" fill="#000000" opacity="0.12" />
            {/* Black Steel Legs Frame */}
            <line x1="16" y1="28" x2="16" y2="80" stroke="#17202A" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="118" y1="28" x2="118" y2="80" stroke="#17202A" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="16" y1="56" x2="118" y2="56" stroke="#17202A" strokeWidth="2.5" opacity="0.7" />
            {/* Desktop Surface */}
            <rect x="8" y="20" width="118" height="12" rx="3" fill={chosenColor} stroke="#17202A" strokeWidth="2" />
            {/* Slim Laptop */}
            <rect x="44" y="16" width="34" height="6" rx="1.5" fill="#BDC3C7" stroke="#7F8C8D" strokeWidth="1" />
            <polygon points="46,16 52,4 70,4 76,16" fill="#D5D8DC" stroke="#7F8C8D" strokeWidth="1" />
            <rect x="54" y="6" width="14" height="8" fill="#3498DB" />
            {/* Pen Tray */}
            <rect x="94" y="18" width="18" height="3" rx="1" fill="#D4AF37" />
          </g>
        );

      case 'chair-modern-lounge':
        return (
          <g>
            {/* Shadow */}
            <ellipse cx="44" cy="74" rx="34" ry="6" fill="#000000" opacity="0.15" />
            <ellipse cx="88" cy="74" rx="18" ry="4" fill="#000000" opacity="0.12" />
            {/* Ottoman Footstool */}
            <rect x="74" y="52" width="28" height="16" rx="5" fill={chosenColor} stroke="#111111" strokeWidth="2" />
            <line x1="80" y1="68" x2="76" y2="76" stroke="#95A5A6" strokeWidth="3" strokeLinecap="round" />
            <line x1="96" y1="68" x2="100" y2="76" stroke="#95A5A6" strokeWidth="3" strokeLinecap="round" />
            {/* Lounge Chair Wood Shell */}
            <path d="M 12 18 C 12 8, 48 8, 48 18 L 48 50 C 48 64, 12 64, 12 50 Z" fill="#5D4037" stroke="#3E2723" strokeWidth="2" />
            {/* Tufted Leather Cushions */}
            <rect x="16" y="14" width="28" height="26" rx="8" fill={chosenColor} stroke="#111111" strokeWidth="1.5" />
            <circle cx="24" cy="22" r="1.5" fill="#555555" />
            <circle cx="36" cy="22" r="1.5" fill="#555555" />
            <rect x="14" y="42" width="34" height="20" rx="7" fill={chosenColor} stroke="#111111" strokeWidth="1.5" />
            <circle cx="24" cy="50" r="1.5" fill="#555555" />
            <circle cx="38" cy="50" r="1.5" fill="#555555" />
            {/* Aluminum 4-Star Base */}
            <line x1="30" y1="62" x2="30" y2="72" stroke="#7F8C8D" strokeWidth="4" />
            <line x1="16" y1="74" x2="44" y2="74" stroke="#BDC3C7" strokeWidth="3.5" strokeLinecap="round" />
          </g>
        );

      case 'lamp-modern-linear':
        return (
          <g>
            <ellipse cx="22" cy="134" rx="16" ry="4" fill="#000000" opacity="0.15" />
            {/* Round Base */}
            <ellipse cx="22" cy="132" rx="14" ry="4" fill="#1C2833" stroke="#111111" strokeWidth="1.5" />
            {/* Vertical Matte Black Stem */}
            <rect x="20" y="14" width="4" height="118" fill="#1C2833" />
            {/* Glowing LED Strip on one side */}
            <rect x="23" y="16" width="3" height="114" rx="1" fill="#FFF4D0" />
            {/* Warm Indirect Glow */}
            <rect x="24" y="14" width="20" height="118" rx="8" fill="#FFEAA7" opacity="0.25" />
          </g>
        );

      case 'decor-modern-sculpture':
        return (
          <g>
            <rect x="12" y="58" width="26" height="5" rx="2" fill="#000000" opacity="0.15" />
            {/* Pedestal */}
            <rect x="14" y="38" width="22" height="22" rx="2" fill="#17202A" stroke="#000000" strokeWidth="1.5" />
            {/* Gold Ribbon / Geometric Loops */}
            <ellipse cx="25" cy="22" rx="16" ry="12" fill="none" stroke={chosenColor} strokeWidth="4.5" transform="rotate(-25 25 22)" />
            <circle cx="25" cy="22" r="6" fill={chosenColor} />
          </g>
        );

      case 'storage-modern-floating':
        return (
          <g>
            <rect x="10" y="48" width="120" height="8" rx="4" fill="#000000" opacity="0.15" />
            {/* Main Console Box */}
            <rect x="8" y="12" width="124" height="38" rx="4" fill={chosenColor} stroke="#17202A" strokeWidth="2" />
            {/* Fluted Slat Doors Details */}
            <rect x="12" y="16" width="36" height="30" rx="2" fill="#1C2833" />
            <line x1="20" y1="18" x2="20" y2="44" stroke="#485460" strokeWidth="1.5" />
            <line x1="28" y1="18" x2="28" y2="44" stroke="#485460" strokeWidth="1.5" />
            <line x1="36" y1="18" x2="36" y2="44" stroke="#485460" strokeWidth="1.5" />
            {/* Center Open Niche */}
            <rect x="52" y="16" width="36" height="30" rx="2" fill="#111827" />
            <rect x="56" y="32" width="28" height="6" fill="#374151" rx="1" />
            {/* Right Door */}
            <rect x="92" y="16" width="36" height="30" rx="2" fill="#1C2833" />
            <line x1="100" y1="18" x2="100" y2="44" stroke="#485460" strokeWidth="1.5" />
            <line x1="108" y1="18" x2="108" y2="44" stroke="#485460" strokeWidth="1.5" />
            <line x1="116" y1="18" x2="116" y2="44" stroke="#485460" strokeWidth="1.5" />
          </g>
        );

      // ==========================================
      // CLASSIC COLLECTION GRAPHICS
      // ==========================================
      case 'bed-classic-victorian':
        return (
          <g>
            <rect x="12" y="26" width="156" height="110" rx="12" fill="#000000" opacity="0.18" />
            {/* Bed Frame */}
            <rect x="8" y="22" width="164" height="114" rx="8" fill="#3E1F1F" stroke="#251010" strokeWidth="2.5" />
            {/* Victorian Ornate Gilded Headboard */}
            <path
              d="M 12 36 L 12 18 Q 40 4 90 4 Q 140 4 168 18 L 168 36 Z"
              fill={chosenColor}
              stroke="#D4AF37"
              strokeWidth="3.5"
            />
            {/* Gold Filigree Crest / Crown */}
            <circle cx="90" cy="8" r="6" fill="#D4AF37" stroke="#A67C1E" strokeWidth="1.5" />
            <polygon points="84,8 90,0 96,8" fill="#F1C40F" />
            {/* Corner Finials */}
            <circle cx="12" cy="16" r="5" fill="#D4AF37" />
            <circle cx="168" cy="16" r="5" fill="#D4AF37" />
            {/* Headboard Button Tufting */}
            <circle cx="50" cy="22" r="3" fill="#D4AF37" />
            <circle cx="90" cy="20" r="3" fill="#D4AF37" />
            <circle cx="130" cy="22" r="3" fill="#D4AF37" />
            {/* Mattress Sheet */}
            <rect x="16" y="34" width="148" height="96" rx="6" fill="#FBF8F1" stroke="#D3C7AB" strokeWidth="2" />
            {/* Silk Double Pillows */}
            <rect x="24" y="38" width="58" height="26" rx="6" fill="#FFFFFF" stroke="#C9B037" strokeWidth="2" />
            <rect x="98" y="38" width="58" height="26" rx="6" fill="#FFFFFF" stroke="#C9B037" strokeWidth="2" />
            {/* Royal Velvet Quilt with Gold Trim */}
            <rect x="16" y="62" width="148" height="68" rx="6" fill={chosenColor} stroke="#D4AF37" strokeWidth="2.5" />
            <line x1="16" y1="80" x2="164" y2="80" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4,4" />
          </g>
        );

      case 'desk-classic-mahogany':
        return (
          <g>
            <rect x="10" y="78" width="125" height="10" rx="4" fill="#000000" opacity="0.15" />
            {/* Pedestal Bases */}
            <rect x="14" y="30" width="34" height="52" rx="4" fill="#3D1212" stroke="#250909" strokeWidth="2" />
            <rect x="97" y="30" width="34" height="52" rx="4" fill="#3D1212" stroke="#250909" strokeWidth="2" />
            {/* Drawers with Brass Pull Rings */}
            <rect x="18" y="36" width="26" height="12" fill="#501A1A" rx="2" stroke="#250909" strokeWidth="1" />
            <circle cx="31" cy="42" r="2.5" fill="#D4AF37" />
            <rect x="18" y="52" width="26" height="12" fill="#501A1A" rx="2" stroke="#250909" strokeWidth="1" />
            <circle cx="31" cy="58" r="2.5" fill="#D4AF37" />
            <rect x="101" y="36" width="26" height="12" fill="#501A1A" rx="2" stroke="#250909" strokeWidth="1" />
            <circle cx="114" cy="42" r="2.5" fill="#D4AF37" />
            <rect x="101" y="52" width="26" height="12" fill="#501A1A" rx="2" stroke="#250909" strokeWidth="1" />
            <circle cx="114" cy="58" r="2.5" fill="#D4AF37" />
            {/* Top Thick Molded Desktop */}
            <rect x="8" y="18" width="129" height="16" rx="4" fill={chosenColor} stroke="#250909" strokeWidth="2.5" />
            {/* Green Leather Inset Writing Blotter */}
            <rect x="36" y="20" width="72" height="12" rx="2" fill="#1C382A" stroke="#D4AF37" strokeWidth="1" />
          </g>
        );

      case 'chair-classic-chesterfield':
        return (
          <g>
            <ellipse cx="42" cy="78" rx="36" ry="6" fill="#000000" opacity="0.15" />
            {/* Turned Wood Legs */}
            <line x1="18" y1="68" x2="14" y2="80" stroke="#2B1010" strokeWidth="5" strokeLinecap="round" />
            <line x1="66" y1="68" x2="70" y2="80" stroke="#2B1010" strokeWidth="5" strokeLinecap="round" />
            {/* Rolled Back & Wings */}
            <path
              d="M 12 18 C 12 8, 72 8, 72 18 C 76 28, 74 48, 70 54 L 14 54 C 10 48, 8 28, 12 18 Z"
              fill={chosenColor}
              stroke="#2B1010"
              strokeWidth="2.5"
            />
            {/* Deep Button Tufts */}
            <circle cx="28" cy="24" r="2" fill="#1A0A0A" />
            <circle cx="42" cy="24" r="2" fill="#1A0A0A" />
            <circle cx="56" cy="24" r="2" fill="#1A0A0A" />
            <circle cx="35" cy="34" r="2" fill="#1A0A0A" />
            <circle cx="49" cy="34" r="2" fill="#1A0A0A" />
            {/* Rolled Armrests */}
            <ellipse cx="14" cy="42" rx="8" ry="14" fill={chosenColor} stroke="#2B1010" strokeWidth="2" />
            <ellipse cx="70" cy="42" rx="8" ry="14" fill={chosenColor} stroke="#2B1010" strokeWidth="2" />
            {/* Plump Seat Cushion */}
            <rect x="18" y="44" width="48" height="24" rx="8" fill={chosenColor} stroke="#2B1010" strokeWidth="2" />
          </g>
        );

      case 'lamp-classic-chandelier':
        return (
          <g>
            {/* Brass Chain */}
            <line x1="45" y1="4" x2="45" y2="28" stroke="#D4AF37" strokeWidth="2.5" strokeDasharray="3,3" />
            {/* Center Tier */}
            <circle cx="45" cy="34" r="6" fill="#D4AF37" stroke="#A07818" strokeWidth="1.5" />
            {/* Curved Arms */}
            <path d="M 45 36 Q 22 44 18 56" stroke="#D4AF37" strokeWidth="3" fill="none" />
            <path d="M 45 36 Q 68 44 72 56" stroke="#D4AF37" strokeWidth="3" fill="none" />
            <path d="M 45 36 Q 34 50 32 64" stroke="#D4AF37" strokeWidth="3" fill="none" />
            <path d="M 45 36 Q 56 50 58 64" stroke="#D4AF37" strokeWidth="3" fill="none" />
            {/* Candle Lights with Flames */}
            {[18, 32, 58, 72].map((cx, i) => {
              const cy = i === 0 || i === 3 ? 54 : 62;
              return (
                <g key={i}>
                  <rect x={cx - 3} y={cy - 12} width="6" height="12" fill="#FAF5EE" stroke="#D4AF37" strokeWidth="1" />
                  <path d={`M ${cx} ${cy - 12} Q ${cx + 3} ${cy - 18} ${cx} ${cy - 22} Q ${cx - 3} ${cy - 18} ${cx} ${cy - 12} Z`} fill="#FF9F1C" />
                  {/* Hanging Crystals */}
                  <polygon points={`${cx},${cy + 2} ${cx + 3},${cy + 8} ${cx},${cy + 14} ${cx - 3},${cy + 8}`} fill="#E0F7FA" stroke="#80DEEA" strokeWidth="0.8" />
                </g>
              );
            })}
          </g>
        );

      case 'decor-classic-gramophone':
        return (
          <g>
            <ellipse cx="32" cy="78" rx="26" ry="6" fill="#000000" opacity="0.15" />
            {/* Wooden Base Box */}
            <rect x="12" y="50" width="40" height="26" rx="4" fill="#5D2E16" stroke="#361708" strokeWidth="2" />
            {/* Corner Brass Inlay */}
            <circle cx="16" cy="54" r="1.5" fill="#D4AF37" />
            <circle cx="48" cy="54" r="1.5" fill="#D4AF37" />
            {/* Turntable Platter */}
            <ellipse cx="32" cy="48" rx="16" ry="4" fill="#1C1C1C" stroke="#D4AF37" strokeWidth="1.5" />
            {/* Brass Horn Support Pole */}
            <path d="M 38 48 Q 48 38 42 28" stroke="#D4AF37" strokeWidth="3" fill="none" />
            {/* Big Flared Golden Brass Horn */}
            <path
              d="M 42 28 Q 30 18 20 8 Q 38 0 54 8 Q 60 22 42 28 Z"
              fill="url(#brassHornGrad)"
              stroke="#B38600"
              strokeWidth="2"
            />
            <defs>
              <linearGradient id="brassHornGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF275" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#997300" />
              </linearGradient>
            </defs>
          </g>
        );

      case 'decor-classic-oilpainting':
        return (
          <g>
            {/* Heavy Gold Ornate Frame */}
            <rect x="6" y="6" width="68" height="53" rx="4" fill="#D4AF37" stroke="#8C6B13" strokeWidth="3" />
            <rect x="10" y="10" width="60" height="45" fill="#997300" />
            <rect x="12" y="12" width="56" height="41" fill="#F8EFD4" stroke="#D4AF37" strokeWidth="1.5" />
            {/* Landscape Painting Scene */}
            <rect x="14" y="14" width="52" height="37" fill="#4B77BE" />
            <path d="M 14 38 Q 26 26 40 34 Q 52 28 66 38 L 66 51 L 14 51 Z" fill="#2E7D32" />
            <path d="M 28 34 Q 42 22 56 34 L 66 42 L 28 42 Z" fill="#388E3C" opacity="0.8" />
            <circle cx="54" cy="22" r="5" fill="#F4D03F" />
          </g>
        );

      // ==========================================
      // MINIMALIST & NORDIC COLLECTION GRAPHICS
      // ==========================================
      case 'bed-minimal-tatami-wood':
        return (
          <g>
            <rect x="10" y="22" width="140" height="74" rx="4" fill="#000000" opacity="0.12" />
            {/* Low Flat Birch Frame */}
            <rect x="8" y="18" width="144" height="78" rx="2" fill={chosenColor} stroke="#BAA591" strokeWidth="1.8" />
            {/* Flat Minimal Headboard */}
            <rect x="8" y="8" width="144" height="14" rx="1" fill={chosenColor} stroke="#BAA591" strokeWidth="1.5" />
            {/* Crisp Clean White Mattress */}
            <rect x="14" y="20" width="132" height="72" rx="2" fill="#FFFFFF" stroke="#E0DCD5" strokeWidth="1.2" />
            {/* Dual Flat Linen Pillows */}
            <rect x="22" y="24" width="48" height="18" rx="3" fill="#FFFFFF" stroke="#D5D0C8" strokeWidth="1.5" />
            <rect x="90" y="24" width="48" height="18" rx="3" fill="#FFFFFF" stroke="#D5D0C8" strokeWidth="1.5" />
            {/* Linen Duvet */}
            <rect x="14" y="44" width="132" height="48" rx="2" fill={secondaryColor} stroke="#BAA591" strokeWidth="1.2" />
          </g>
        );

      case 'desk-minimal-birch':
        return (
          <g>
            <rect x="10" y="68" width="100" height="8" rx="4" fill="#000000" opacity="0.1" />
            {/* Tapered Legs */}
            <line x1="18" y1="28" x2="14" y2="74" stroke="#A8927F" strokeWidth="4" strokeLinecap="round" />
            <line x1="102" y1="28" x2="106" y2="74" stroke="#A8927F" strokeWidth="4" strokeLinecap="round" />
            {/* Rounded Pill-Shaped Desktop */}
            <rect x="8" y="18" width="104" height="12" rx="6" fill={chosenColor} stroke="#A8927F" strokeWidth="2" />
            {/* Minimal Ceramic Mug */}
            <rect x="24" y="12" width="8" height="8" rx="2" fill="#FAF5EE" stroke="#A8927F" strokeWidth="1" />
          </g>
        );

      case 'chair-minimal-bentwood':
        return (
          <g>
            <ellipse cx="30" cy="70" rx="22" ry="5" fill="#000000" opacity="0.12" />
            {/* Legs */}
            <line x1="14" y1="44" x2="11" y2="72" stroke="#8C7764" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="46" y1="44" x2="49" y2="72" stroke="#8C7764" strokeWidth="3.5" strokeLinecap="round" />
            {/* Curved Wishbone Backrest */}
            <path d="M 10 32 C 10 10, 50 10, 50 32" stroke="#8C7764" strokeWidth="4" fill="none" strokeLinecap="round" />
            <line x1="30" y1="12" x2="30" y2="44" stroke="#8C7764" strokeWidth="3" />
            {/* Woven Paper Cord Seat */}
            <rect x="12" y="38" width="36" height="14" rx="4" fill={chosenColor} stroke="#8C7764" strokeWidth="2" />
          </g>
        );

      case 'lamp-minimal-pendant':
        return (
          <g>
            {/* Cord */}
            <line x1="35" y1="2" x2="35" y2="24" stroke="#333333" strokeWidth="2" />
            {/* Ribbed Oval Paper Lantern */}
            <ellipse cx="35" cy="52" rx="30" ry="24" fill={chosenColor} stroke="#BAA797" strokeWidth="1.8" />
            {/* Subtle Rib Lines */}
            <path d="M 15 52 C 22 36, 48 36, 55 52" stroke="#BAA797" strokeWidth="1" fill="none" opacity="0.6" />
            <path d="M 15 52 C 22 68, 48 68, 55 52" stroke="#BAA797" strokeWidth="1" fill="none" opacity="0.6" />
            {/* Warm Inner Glow */}
            <circle cx="35" cy="52" r="16" fill="#FFF275" opacity="0.45" />
          </g>
        );

      case 'decor-minimal-vase':
        return (
          <g>
            <ellipse cx="22" cy="52" rx="16" ry="4" fill="#000000" opacity="0.12" />
            {/* Arch Ceramic Vase */}
            <path d="M 12 50 L 12 28 C 12 18, 32 18, 32 28 L 32 50 Z" fill={chosenColor} stroke="#9E9284" strokeWidth="2" />
            {/* Dried Botanical Branch */}
            <line x1="22" y1="24" x2="22" y2="6" stroke="#7A6858" strokeWidth="2" strokeLinecap="round" />
            <circle cx="18" cy="12" r="2.5" fill="#B59A7A" />
            <circle cx="26" cy="16" r="2.5" fill="#B59A7A" />
            <circle cx="22" cy="6" r="3" fill="#B59A7A" />
          </g>
        );

      case 'rug-minimal-grid':
        return (
          <g>
            <ellipse cx="75" cy="48" rx="72" ry="44" fill="#000000" opacity="0.08" />
            {/* Rug Base */}
            <rect x="8" y="8" width="134" height="80" rx="6" fill={chosenColor} stroke="#D5D0C8" strokeWidth="1.8" />
            {/* Fine Grid Lines */}
            <line x1="8" y1="32" x2="142" y2="32" stroke="#4A4A4A" strokeWidth="1.2" opacity="0.35" />
            <line x1="8" y1="60" x2="142" y2="60" stroke="#4A4A4A" strokeWidth="1.2" opacity="0.35" />
            <line x1="48" y1="8" x2="48" y2="88" stroke="#4A4A4A" strokeWidth="1.2" opacity="0.35" />
            <line x1="100" y1="8" x2="100" y2="88" stroke="#4A4A4A" strokeWidth="1.2" opacity="0.35" />
          </g>
        );

      // ==========================================
      // CUTE PASTEL COLLECTION GRAPHICS
      // ==========================================
      case 'bed-pastel-cloud':
        return (
          <g>
            <rect x="10" y="24" width="145" height="86" rx="10" fill="#000000" opacity="0.12" />
            {/* Cute White Wooden Frame */}
            <rect x="8" y="20" width="149" height="90" rx="8" fill="#FFF9FA" stroke="#FFB6C1" strokeWidth="2.5" />
            {/* Scalloped Cloud Headboard */}
            <path
              d="M 12 28 C 12 10, 36 6, 48 16 C 60 4, 105 4, 118 16 C 130 6, 154 10, 154 28 Z"
              fill="#FFFFFF"
              stroke="#FFB6C1"
              strokeWidth="2.5"
            />
            {/* Mattress */}
            <rect x="14" y="28" width="137" height="78" rx="6" fill="#FFFBF5" stroke="#FFE4E8" strokeWidth="1.5" />
            {/* Star Shaped Pillows */}
            <polygon points="42,30 46,38 54,39 48,45 50,53 42,48 34,53 36,45 30,39 38,38" fill="#FFF3B0" stroke="#F1C40F" strokeWidth="1" />
            <rect x="94" y="32" width="46" height="20" rx="8" fill="#E2D4F0" stroke="#C3A9DD" strokeWidth="1.5" />
            {/* Strawberry Milk Quilt */}
            <rect x="14" y="52" width="137" height="54" rx="6" fill={chosenColor} stroke="#FF9AA2" strokeWidth="2" />
            {/* Polka Dots or Soft Hearts on Quilt */}
            <circle cx="36" cy="72" r="3" fill="#FFFFFF" opacity="0.8" />
            <circle cx="70" cy="66" r="3" fill="#FFFFFF" opacity="0.8" />
            <circle cx="106" cy="72" r="3" fill="#FFFFFF" opacity="0.8" />
            <circle cx="52" cy="88" r="3" fill="#FFFFFF" opacity="0.8" />
            <circle cx="88" cy="88" r="3" fill="#FFFFFF" opacity="0.8" />
            <circle cx="124" cy="86" r="3" fill="#FFFFFF" opacity="0.8" />
          </g>
        );

      case 'desk-pastel-vanity':
        return (
          <g>
            <rect x="12" y="90" width="86" height="8" rx="4" fill="#000000" opacity="0.12" />
            {/* Cute Gold Slender Legs */}
            <line x1="20" y1="58" x2="16" y2="94" stroke="#D4AF37" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="90" y1="58" x2="94" y2="94" stroke="#D4AF37" strokeWidth="3.5" strokeLinecap="round" />
            {/* Heart Shaped Mirror */}
            <path
              d="M 55 42 C 40 42, 30 28, 38 18 C 45 8, 55 18, 55 24 C 55 18, 65 8, 72 18 C 80 28, 70 42, 55 42 Z"
              fill="#EBF5FB"
              stroke="#FF8FAB"
              strokeWidth="3.5"
            />
            {/* Mirror Reflection */}
            <line x1="44" y1="20" x2="52" y2="34" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            {/* Vanity Tabletop */}
            <rect x="10" y="44" width="90" height="18" rx="5" fill={chosenColor} stroke="#FF8FAB" strokeWidth="2" />
            {/* Ribbon Knobs */}
            <circle cx="35" cy="53" r="2.5" fill="#D4AF37" />
            <circle cx="75" cy="53" r="2.5" fill="#D4AF37" />
          </g>
        );

      case 'chair-pastel-shell':
        return (
          <g>
            <ellipse cx="35" cy="70" rx="28" ry="5" fill="#000000" opacity="0.12" />
            {/* Gold Tapered Legs */}
            <line x1="18" y1="54" x2="14" y2="72" stroke="#D4AF37" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="52" y1="54" x2="56" y2="72" stroke="#D4AF37" strokeWidth="3.5" strokeLinecap="round" />
            {/* Shell Scalloped Backrest */}
            <path
              d="M 12 36 C 12 12, 24 6, 35 6 C 46 6, 58 12, 58 36 Z"
              fill={chosenColor}
              stroke="#D883C4"
              strokeWidth="2.5"
            />
            {/* Scallop Flute Lines */}
            <line x1="35" y1="6" x2="35" y2="44" stroke="#FFFFFF" strokeWidth="1.8" opacity="0.6" />
            <line x1="35" y1="6" x2="22" y2="44" stroke="#FFFFFF" strokeWidth="1.8" opacity="0.6" />
            <line x1="35" y1="6" x2="48" y2="44" stroke="#FFFFFF" strokeWidth="1.8" opacity="0.6" />
            {/* Round Plush Cushion */}
            <ellipse cx="35" cy="46" rx="22" ry="12" fill={chosenColor} stroke="#D883C4" strokeWidth="2" />
          </g>
        );

      case 'lamp-pastel-tulip':
        return (
          <g>
            <ellipse cx="22" cy="56" rx="14" ry="4" fill="#000000" opacity="0.12" />
            {/* Ceramic Round Base */}
            <ellipse cx="22" cy="54" rx="12" ry="3.5" fill="#FAF5EE" stroke="#E2D4F0" strokeWidth="1.5" />
            {/* Curved Green Stem & Leaf */}
            <path d="M 22 54 L 22 30" stroke="#74C69D" strokeWidth="3" strokeLinecap="round" />
            <path d="M 22 44 Q 30 40 32 32" stroke="#74C69D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Blooming Pastel Tulip Flower Lamp */}
            <path
              d="M 14 30 C 14 14, 22 10, 22 18 C 22 10, 30 14, 30 30 Z"
              fill={chosenColor}
              stroke="#FF477E"
              strokeWidth="2"
            />
            {/* Warm Blossom Glow */}
            <circle cx="22" cy="22" r="10" fill="#FFF275" opacity="0.35" />
          </g>
        );

      case 'decor-pastel-bear':
        return (
          <g>
            <ellipse cx="30" cy="60" rx="24" ry="5" fill="#000000" opacity="0.14" />
            {/* Big Round Ears */}
            <circle cx="16" cy="18" r="8" fill={chosenColor} stroke="#FFB6C1" strokeWidth="2" />
            <circle cx="16" cy="18" r="4" fill="#FFCCD5" />
            <circle cx="44" cy="18" r="8" fill={chosenColor} stroke="#FFB6C1" strokeWidth="2" />
            <circle cx="44" cy="18" r="4" fill="#FFCCD5" />
            {/* Head */}
            <circle cx="30" cy="28" r="18" fill={chosenColor} stroke="#FFB6C1" strokeWidth="2.5" />
            {/* Cute Snout & Face */}
            <ellipse cx="30" cy="32" rx="8" ry="6" fill="#FFFFFF" />
            <circle cx="30" cy="30" r="3" fill="#4A3425" />
            <circle cx="23" cy="26" r="2" fill="#2C3E50" />
            <circle cx="37" cy="26" r="2" fill="#2C3E50" />
            {/* Blushing Cheeks */}
            <circle cx="19" cy="30" r="3" fill="#FF8FAB" opacity="0.7" />
            <circle cx="41" cy="30" r="3" fill="#FF8FAB" opacity="0.7" />
            {/* Big Satin Ribbon Bow */}
            <polygon points="20,40 30,44 40,40 30,48" fill="#FF477E" stroke="#C9184A" strokeWidth="1.5" />
            <circle cx="30" cy="44" r="3" fill="#FF758F" />
            {/* Plump Body */}
            <ellipse cx="30" cy="48" rx="16" ry="14" fill={chosenColor} stroke="#FFB6C1" strokeWidth="2" />
          </g>
        );

        return (
          <rect
            x="4"
            y="4"
            width={itemDef.width - 8}
            height={itemDef.height - 8}
            rx="8"
            fill={chosenColor}
            stroke="#555555"
            strokeWidth="2"
          />
        );
    }
  };

  return (
    <svg
      width={itemDef.width}
      height={itemDef.height}
      viewBox={`0 0 ${itemDef.width} ${itemDef.height}`}
      style={{
        transform: flipTransform,
        transformOrigin,
        overflow: 'visible',
      }}
    >
      {renderContent()}
    </svg>
  );
};
