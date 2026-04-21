import type { GemType } from '@/models';

export interface GemVisualSpec {
  gemType: GemType;
  shapePath: string;
  facetPaths: string[];
  gradientStops: Array<{ offset: number; color: string; opacity?: number }>;
  glowColor: string;
  glowOpacity: number;
  shimmerDurationMs: number;
  sparkleDensity: number;
  hueShift?: {
    enabled: boolean;
    from: string;
    to: string;
    cycleMs: number;
  };
}

const SHAPES = {
  hex: 'M50 8 L84 28 L84 72 L50 92 L16 72 L16 28 Z',
  oval: 'M50 10 C78 10 90 30 90 50 C90 70 78 90 50 90 C22 90 10 70 10 50 C10 30 22 10 50 10 Z',
  oct: 'M30 8 L70 8 L92 30 L92 70 L70 92 L30 92 L8 70 L8 30 Z',
  heart: 'M50 90 L12 50 C8 30 20 10 35 10 C43 10 48 16 50 24 C52 16 57 10 65 10 C80 10 92 30 88 50 Z',
  lozenge: 'M50 8 L86 50 L50 92 L14 50 Z',
  kite: 'M50 8 L80 36 L70 92 L30 92 L20 36 Z',
  coin: 'M50 10 C74 10 90 26 90 50 C90 74 74 90 50 90 C26 90 10 74 10 50 C10 26 26 10 50 10 Z',
  crystal: 'M40 8 L60 8 L84 36 L68 92 L32 92 L16 36 Z',
  cushion: 'M24 10 L76 10 L90 24 L90 76 L76 90 L24 90 L10 76 L10 24 Z'
} as const;

export const GEM_VISUAL_SPECS: Record<GemType, GemVisualSpec> = {
  obsidian: {
    gemType: 'obsidian',
    shapePath: SHAPES.hex,
    facetPaths: ['M50 8 L50 92','M16 28 L84 72','M84 28 L16 72'],
    gradientStops: [{ offset: 0, color: '#0B0D12' },{ offset: 0.45, color: '#1D2430' },{ offset: 1, color: '#050608' }],
    glowColor: '#4E5B75', glowOpacity: 0.2, shimmerDurationMs: 5200, sparkleDensity: 0.2
  },
  agate: {
    gemType: 'agate', shapePath: SHAPES.oval,
    facetPaths: ['M20 42 L80 42','M20 50 L80 50','M20 58 L80 58'],
    gradientStops: [{ offset: 0, color: '#6E4F3A' },{ offset: 0.3, color: '#A47B5B' },{ offset: 0.55, color: '#5E4331' },{ offset: 1, color: '#C8A184' }],
    glowColor: '#C08A5A', glowOpacity: 0.24, shimmerDurationMs: 4800, sparkleDensity: 0.25
  },
  jasper: {
    gemType: 'jasper', shapePath: SHAPES.oval,
    facetPaths: ['M24 28 L76 72','M24 72 L76 28'],
    gradientStops: [{ offset: 0, color: '#7B2D24' },{ offset: 0.55, color: '#A94735' },{ offset: 1, color: '#5C1E18' }],
    glowColor: '#B54A38', glowOpacity: 0.26, shimmerDurationMs: 5000, sparkleDensity: 0.2
  },
  tigers_eye: {
    gemType: 'tigers_eye', shapePath: SHAPES.lozenge,
    facetPaths: ['M30 28 L70 28','M24 40 L76 40','M20 52 L80 52','M24 64 L76 64'],
    gradientStops: [{ offset: 0, color: '#4A2D17' },{ offset: 0.35, color: '#A66A2D' },{ offset: 0.6, color: '#E2B865' },{ offset: 1, color: '#5A371B' }],
    glowColor: '#F2C979', glowOpacity: 0.28, shimmerDurationMs: 3600, sparkleDensity: 0.3
  },
  rose_quartz: {
    gemType: 'rose_quartz', shapePath: SHAPES.heart,
    facetPaths: ['M50 24 L50 90','M50 24 L24 50','M50 24 L76 50'],
    gradientStops: [{ offset: 0, color: '#F9D5DE' },{ offset: 0.45, color: '#F2AFC0' },{ offset: 1, color: '#D983A0' }],
    glowColor: '#FFC4D8', glowOpacity: 0.3, shimmerDurationMs: 4600, sparkleDensity: 0.35
  },
  moonstone: {
    gemType: 'moonstone', shapePath: SHAPES.hex,
    facetPaths: ['M50 8 L50 92','M16 28 L84 72','M84 28 L16 72'],
    gradientStops: [{ offset: 0, color: '#E9F0FF' },{ offset: 0.4, color: '#C8D9FF' },{ offset: 0.7, color: '#F7FBFF' },{ offset: 1, color: '#AFC6F6' }],
    glowColor: '#C9DDFF', glowOpacity: 0.34, shimmerDurationMs: 3200, sparkleDensity: 0.4
  },
  jade: {
    gemType: 'jade', shapePath: SHAPES.oval,
    facetPaths: ['M26 34 L74 66','M26 66 L74 34'],
    gradientStops: [{ offset: 0, color: '#2D8D5F' },{ offset: 0.5, color: '#4DBD80' },{ offset: 1, color: '#1F6D48' }],
    glowColor: '#72E0AA', glowOpacity: 0.32, shimmerDurationMs: 4200, sparkleDensity: 0.28
  },
  turquoise: {
    gemType: 'turquoise', shapePath: SHAPES.kite,
    facetPaths: ['M50 8 L70 92','M50 8 L30 92','M20 36 L80 36'],
    gradientStops: [{ offset: 0, color: '#28B8C8' },{ offset: 0.5, color: '#4ED4DE' },{ offset: 1, color: '#1499AE' }],
    glowColor: '#74F0FF', glowOpacity: 0.36, shimmerDurationMs: 3100, sparkleDensity: 0.5
  },
  amethyst: {
    gemType: 'amethyst', shapePath: SHAPES.oct,
    facetPaths: ['M30 8 L70 92','M70 8 L30 92','M8 30 L92 70'],
    gradientStops: [{ offset: 0, color: '#5A2A93' },{ offset: 0.45, color: '#8A4DD1' },{ offset: 1, color: '#31145D' }],
    glowColor: '#B47CFF', glowOpacity: 0.38, shimmerDurationMs: 3300, sparkleDensity: 0.55
  },
  pearl: {
    gemType: 'pearl', shapePath: SHAPES.coin,
    facetPaths: ['M28 28 C40 20 60 20 72 28','M24 50 C34 62 66 62 76 50'],
    gradientStops: [{ offset: 0, color: '#FFF8EE' },{ offset: 0.4, color: '#F0E2D4' },{ offset: 0.7, color: '#EDEBFF' },{ offset: 1, color: '#D5C8BA' }],
    glowColor: '#FFF5E8', glowOpacity: 0.34, shimmerDurationMs: 3800, sparkleDensity: 0.4
  },
  opal: {
    gemType: 'opal', shapePath: SHAPES.cushion,
    facetPaths: ['M24 10 L76 90','M76 10 L24 90'],
    gradientStops: [{ offset: 0, color: '#D8F2FF' },{ offset: 0.25, color: '#B7FFC9' },{ offset: 0.5, color: '#FFE7F8' },{ offset: 0.75, color: '#BFD9FF' },{ offset: 1, color: '#FFF4C4' }],
    glowColor: '#B7FFC9', glowOpacity: 0.42, shimmerDurationMs: 4500, sparkleDensity: 0.6,
    hueShift: { enabled: true, from: '#D8F2FF', to: '#FFE7F8', cycleMs: 4500 }
  },
  garnet: {
    gemType: 'garnet', shapePath: SHAPES.oct,
    facetPaths: ['M50 8 L50 92','M8 30 L92 70','M92 30 L8 70'],
    gradientStops: [{ offset: 0, color: '#4D0C17' },{ offset: 0.45, color: '#8E1A2B' },{ offset: 1, color: '#2E070E' }],
    glowColor: '#C22B45', glowOpacity: 0.45, shimmerDurationMs: 3000, sparkleDensity: 0.62
  },
  golden_coin: {
    gemType: 'golden_coin', shapePath: SHAPES.coin,
    facetPaths: ['M50 20 L50 80','M20 50 L80 50','M30 30 L70 70','M70 30 L30 70'],
    gradientStops: [{ offset: 0, color: '#8C5A00' },{ offset: 0.35, color: '#D39A1F' },{ offset: 0.6, color: '#FFE083' },{ offset: 1, color: '#9F6A06' }],
    glowColor: '#FFD86A', glowOpacity: 0.5, shimmerDurationMs: 3200, sparkleDensity: 0.65
  },
  topaz: {
    gemType: 'topaz', shapePath: SHAPES.kite,
    facetPaths: ['M50 8 L50 92','M20 36 L80 36','M30 92 L70 92'],
    gradientStops: [{ offset: 0, color: '#8A4A08' },{ offset: 0.45, color: '#D17C17' },{ offset: 1, color: '#F6B349' }],
    glowColor: '#FFBE66', glowOpacity: 0.5, shimmerDurationMs: 3200, sparkleDensity: 0.7
  },
  aquamarine: {
    gemType: 'aquamarine', shapePath: SHAPES.crystal,
    facetPaths: ['M40 8 L32 92','M60 8 L68 92','M16 36 L84 36'],
    gradientStops: [{ offset: 0, color: '#8CE6F5' },{ offset: 0.45, color: '#5FC9E8' },{ offset: 1, color: '#2C9FC5' }],
    glowColor: '#96F0FF', glowOpacity: 0.52, shimmerDurationMs: 3400, sparkleDensity: 0.72
  },
  ruby: {
    gemType: 'ruby', shapePath: SHAPES.oct,
    facetPaths: ['M30 8 L70 92','M70 8 L30 92','M8 30 L92 70','M92 30 L8 70'],
    gradientStops: [{ offset: 0, color: '#6E0014' },{ offset: 0.4, color: '#C10F32' },{ offset: 1, color: '#8A0020' }],
    glowColor: '#FF4D73', glowOpacity: 0.56, shimmerDurationMs: 3000, sparkleDensity: 0.78
  },
  emerald: {
    gemType: 'emerald', shapePath: SHAPES.cushion,
    facetPaths: ['M24 10 L24 90','M76 10 L76 90','M10 24 L90 24','M10 76 L90 76'],
    gradientStops: [{ offset: 0, color: '#04663D' },{ offset: 0.4, color: '#0EA865' },{ offset: 1, color: '#014C2D' }],
    glowColor: '#42D58C', glowOpacity: 0.6, shimmerDurationMs: 2900, sparkleDensity: 0.82
  },
  sapphire: {
    gemType: 'sapphire', shapePath: SHAPES.oval,
    facetPaths: ['M22 30 L78 70','M78 30 L22 70','M50 10 L50 90'],
    gradientStops: [{ offset: 0, color: '#0A2A7A' },{ offset: 0.45, color: '#1F56C9' },{ offset: 1, color: '#061A52' }],
    glowColor: '#5D8CFF', glowOpacity: 0.62, shimmerDurationMs: 2800, sparkleDensity: 0.86
  },
  alexandrite: {
    gemType: 'alexandrite', shapePath: SHAPES.cushion,
    facetPaths: ['M24 10 L76 90','M76 10 L24 90','M10 50 L90 50'],
    gradientStops: [{ offset: 0, color: '#1B8A62' },{ offset: 0.5, color: '#7A3A78' },{ offset: 1, color: '#A13232' }],
    glowColor: '#89B96D', glowOpacity: 0.64, shimmerDurationMs: 3000, sparkleDensity: 0.9,
    hueShift: { enabled: true, from: '#1B8A62', to: '#A13232', cycleMs: 4200 }
  },
  diamond: {
    gemType: 'diamond', shapePath: SHAPES.lozenge,
    facetPaths: ['M50 8 L50 92','M14 50 L86 50','M24 36 L76 64','M76 36 L24 64'],
    gradientStops: [{ offset: 0, color: '#FDFEFF' },{ offset: 0.35, color: '#DDE9FF' },{ offset: 0.6, color: '#FFFFFF' },{ offset: 1, color: '#C7D8F8' }],
    glowColor: '#EAF2FF', glowOpacity: 0.7, shimmerDurationMs: 2600, sparkleDensity: 1
  }
};
