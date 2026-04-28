import Header from '@/components/Header'
import BrandPortal from '@/components/sections/BrandPortal'
import HeroSection from '@/components/sections/HeroSection'
import HighlightSection from '@/components/sections/HighlightSection'
import StatsSection from '@/components/sections/StatsSection'
import NewsroomSection from '@/components/sections/NewsroomSection'
import ServicesSection from '@/components/sections/ServicesSection'
import NebbulerSection from '@/components/sections/NebbulerSection'
import MetodoSection from '@/components/sections/MetodoSection'
import ContactSection from '@/components/sections/ContactSection'
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <BrandPortal />
        <div className="pt-[6rem]">
        <HeroSection />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <section id="para-quien"><HighlightSection /></section>
          <section id="numeros"><StatsSection /></section>
          <section id="publicaciones"><NewsroomSection /></section>
          <section id="servicios"><ServicesSection /></section>
          <NebbulerSection />
          <MetodoSection />
          <section id="contacto"><ContactSection /></section>
          <section id="testimonios"><TestimonialsCarousel /></section>
          <Footer />
        </div>
        </div>
      </main>
    </>
  )
}
