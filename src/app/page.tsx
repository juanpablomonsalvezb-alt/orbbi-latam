import Header             from '@/components/Header'
import CustomCursor        from '@/components/CustomCursor'
import Grain               from '@/components/Grain'
import Spotlight           from '@/components/Spotlight'
import HeroSection         from '@/components/sections/HeroSection'
import TickerSection       from '@/components/sections/TickerSection'
import BentoSection        from '@/components/sections/BentoSection'
import StatsSection        from '@/components/sections/StatsSection'
import ProcesoSection      from '@/components/sections/ProcesoSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ContactSection      from '@/components/sections/ContactSection'
import Footer              from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Grain />
      <Spotlight />
      <CustomCursor />
      <Header />
      <main>
        <HeroSection />
        <TickerSection />
        <BentoSection />
        <StatsSection />
        <ProcesoSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
