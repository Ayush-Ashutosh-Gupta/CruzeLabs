export interface AITool {
  id: string;
  name: string;
  description: string;
  categories: string[]; // Changed from single category to array
  url: string;
  icon: string;
  rating: number; // e.g., 4.8
  details: {
    canDo?: string[];
    cannotDo?: string[];
    freeTier?: string[];
    paidTier?: string[];
    authReq: string;
    credits: string;
    specializedInfo?: { label: string; value: string }[];
  };
}

export interface CategoryInfo {
  name: string;
  icon: string;
}

export type Category = string;
