import React from 'react';
import { OrganicHero } from '../components/home/OrganicHero';
import { CategoryShowcase } from '../components/home/CategoryShowcase';
import { StorySection } from '../components/home/StorySection';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { TraditionalProcess } from '../components/home/TraditionalProcess';
import { LifestyleImmersion } from '../components/home/LifestyleImmersion';
import { TestimonialSection } from '../components/home/TestimonialSection';
import { NewsletterSection } from '../components/home/NewsletterSection';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col bg-[#F7F1E4] text-[#282619] selection:bg-[#C6A16A] selection:text-white">
      {/* 1. Large Immersive Editorial Split Hero */}
      <OrganicHero />

      {/* 2. Three Editorial Product Category Cards (Ghee, Oils, Honey) */}
      <CategoryShowcase />

      {/* 3. Our Story Editorial Section with Countryside Farm Photo & Organic Mask */}
      <StorySection />

      {/* 4. Why Choose Us Section with Asymmetrical Benefit Cards on Soft Sage & Ivory */}
      <WhyChooseUs />

      {/* 5. Featured Products Collection Grid ("Nature's Finest Selection") */}
      <FeaturedProducts />

      {/* 6. Traditional Preparation Process Section ("Tradition in Every Drop") */}
      <TraditionalProcess />

      {/* 7. Full-width Countryside Photography Immersion Banner */}
      <LifestyleImmersion />

      {/* 8. Verified Customer Testimonials */}
      <TestimonialSection />

      {/* 9. Newsletter and WhatsApp CTA */}
      <NewsletterSection />
    </div>
  );
};

export default HomePage;
