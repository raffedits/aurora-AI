
export type Tone = 'formale' | 'coinvolgente' | 'umoristico' | 'ispiratore' | 'tecnico';
export type VisualStyle = 'cinematico' | 'minimalista' | 'cyberpunk' | 'rendering-3d' | 'schizzo';
export type ChartType = 'barre' | 'linee' | 'torta' | 'dispersione';
export type PresentationTheme = 'dark-modern' | 'glassmorphism' | 'nature-eco' | 'corporate-blue' | 'vibrant-retro';
export type AnimationType = 'none' | 'fade' | 'zoom' | 'slide' | 'pop';
export type ShapeType = 'rect' | 'circle' | 'line' | 'arrow';
export type TransitionType = 'none' | 'fade' | 'push' | 'dissolve';

export interface ChartConfig {
  type: ChartType;
  title: string;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

export interface SlideContent {
  id: string;
  type: 'title' | 'text' | 'image' | 'video' | 'chart' | 'quote' | 'shape';
  shapeType?: ShapeType;
  title?: string;
  body?: string;
  imageUrl?: string;
  videoUrl?: string;
  chartData?: ChartConfig;
  style?: VisualStyle;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  animation?: AnimationType;
  // Posizionamento e dimensioni (%)
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Slide {
  id: string;
  layout: string;
  background: string;
  elements: SlideContent[];
  transition?: TransitionType;
}

export interface Presentation {
  id: string;
  title: string;
  topic: string;
  description: string;
  tone: Tone;
  theme: PresentationTheme;
  slideCount: number;
  slides: Slide[];
  createdAt: number;
}

export interface AIOutlineResponse {
  title: string;
  slides: Array<{
    title: string;
    description: string;
    content: string;
    visualSuggestion: string;
  }>;
}
