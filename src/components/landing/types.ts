export interface LandingProduct {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: "residential" | "corporate" | "premium";
  subCategory?: string;
  price?: number;
  mrp?: number;
  discountPercentage?: number;
  slug?: string;
}
