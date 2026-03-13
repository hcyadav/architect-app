import CategoryDisplay from "@/components/CategoryDisplay";
import BestProductsCarousel from "@/components/BestProductsCarousel";
import Testimonials from "@/components/Testimonials";
import OurClients from "@/components/OurClients";
import ContactSection from "@/components/ContactSection";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="space-y-16">
      <BestProductsCarousel />
      {/* <hr className="border-gray-100 max-w-7xl mx-auto" /> */}
      <div className="border border-t-2 border-gray-100 border-l-0 border-r-0 border-b-0 pt-4">
        <CategoryDisplay category="product" />
      </div>
      <OurClients />
      <Testimonials />
      <ContactSection />
    </div>
  );
}
