import Header from '@/components/Header'
import CustomCursor from '@/components/CustomCursor'
import VantaBg from '@/components/VantaBg'
import HeroSection from '@/components/sections/HeroSection'
import TickerSection from '@/components/sections/TickerSection'
import ParaQuienSection from '@/components/sections/ParaQuienSection'
import StatsSection from '@/components/sections/StatsSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ProcesoSection from '@/components/sections/ProcesoSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <CustomCursor />
      <VantaBg />
      <Header />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <div className="pt-[6rem]">
          <HeroSection />
          <div style={{ position: 'relative', zIndex: 2 }}>
            <TickerSection />
            <ParaQuienSection />
            <StatsSection />
            <ServicesSection />
            <ProcesoSection />
            <TestimonialsSection />
            <ContactSection />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
