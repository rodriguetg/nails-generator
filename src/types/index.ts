export interface NailDesign {
  id: string;
  prompt: string;
  imageUrl: string;
  createdAt: Date;
  style?: string;
  colors?: string[];
  platform?: SocialPlatform;
  dimensions?: ImageDimensions;
}

export interface SocialPlatform {
  id: string;
  name: string;
  icon: string;
  dimensions: ImageDimensions;
  description: string;
}

export interface ImageDimensions {
  width: number;
  height: number;
  ratio: string;
}

export interface GenerationRequest {
  prompt: string;
  style?: string;
  platform?: SocialPlatform;
  steps?: number;
}

export interface ApiResponse {
  success: boolean;
  data?: {
    imageUrl: string;
    id: string;
  };
  error?: string;
}
