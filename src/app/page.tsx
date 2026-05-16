import Header        from '@/components/Header'
import CustomCursor  from '@/components/CustomCursor'
import HeroSection   from '@/components/sections/HeroSection'
import TickerSection from '@/components/sections/TickerSection'
import ParaQuienSection    from '@/components/sections/ParaQuienSection'
import StatsSection  from '@/components/sections/StatsSection'
import ServicesSection     from '@/components/sections/ServicesSection'
import ProcesoSection      from '@/components/sections/ProcesoSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ContactSection      from '@/components/sections/ContactSection'
import Footer        from '@/components/Footer'

export default function Home() {
  return (
    <>
      {/* CSS aurora — zero loading time */}
      <div className="aurora" aria-hidden />

      <CustomCursor />
      <Header />

      <main style={{ position:'relative', zIndex:1 }}>
        <HeroSection />
        <TickerSection />
        <ParaQuienSection />
        <StatsSection />
        <ServicesSection />
        <ProcesoSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  )
}
