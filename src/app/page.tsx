import Header from '@/components/Header'
import HeroSection from '@/components/sections/HeroSection'
import HighlightSection from '@/components/sections/HighlightSection'
import StatsSection from '@/components/sections/StatsSection'
import NewsroomSection from '@/components/sections/NewsroomSection'
import ServicesSection from '@/components/sections/ServicesSection'
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel'
import ClientStoriesCarousel from '@/components/sections/ClientStoriesCarousel'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-[6rem]">
        <HeroSection />
        {/* All sections + footer need z-index:2 to cover the fixed hero layer (z:1) */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <HighlightSection />
          <StatsSection />
          <NewsroomSection />
          <ServicesSection />
          <TestimonialsCarousel />
          <ClientStoriesCarousel />
          <Footer />
        </div>
      </main>
    </>
  )
}
