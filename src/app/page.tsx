import Header              from '@/components/Header'
import CustomCursor         from '@/components/CustomCursor'
import Grain                from '@/components/Grain'
import Spotlight            from '@/components/Spotlight'
import HeroSection          from '@/components/sections/HeroSection'
import TickerSection        from '@/components/sections/TickerSection'
import ParaQuienSection     from '@/components/sections/ParaQuienSection'
import StatsSection         from '@/components/sections/StatsSection'
import ServicesSection      from '@/components/sections/ServicesSection'
import ProcesoSection       from '@/components/sections/ProcesoSection'
import TestimonialsSection  from '@/components/sections/TestimonialsSection'
import ContactSection       from '@/components/sections/ContactSection'
import Footer               from '@/components/Footer'

export default function Home() {
  return (
    <>
      {/* Overlays */}
      <Grain />
      <Spotlight />
      <CustomCursor />

      {/* CSS aurora base — gradient that animates */}
      <div className="aurora" aria-hidden />

      <Header />

      <main style={{ position: 'relative', zIndex: 1 }}>
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
