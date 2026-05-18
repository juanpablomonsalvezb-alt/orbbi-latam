import Header             from '@/components/Header'
import Grain               from '@/components/Grain'
import HeroSection         from '@/components/sections/HeroSection'
import StatementSection    from '@/components/sections/StatementSection'
import FeaturesSection     from '@/components/sections/FeaturesSection'
import ParaQuienSection    from '@/components/sections/ParaQuienSection'
import ServicesSection     from '@/components/sections/ServicesSection'
import ProcesoSection      from '@/components/sections/ProcesoSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import StatsSection        from '@/components/sections/StatsSection'
import ContactSection      from '@/components/sections/ContactSection'
import Footer              from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Grain />
      <Header />
      <main>
        <HeroSection />
        <StatementSection />
        <FeaturesSection />
        <ParaQuienSection />
        <ServicesSection />
        <ProcesoSection />
        <TestimonialsSection />
        <StatsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
