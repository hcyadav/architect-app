export interface LandingProduct {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: "product" | "premium" | "corporate";
  subCategory?: string;
  price?: string;
}
