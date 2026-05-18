import Header             from '@/components/Header'
import HeroSection         from '@/components/sections/HeroSection'
import StatementSection    from '@/components/sections/StatementSection'
import FeaturesSection     from '@/components/sections/FeaturesSection'
import ImageGridSection    from '@/components/sections/ImageGridSection'
import ParaQuienSection    from '@/components/sections/ParaQuienSection'
import ServicesSection     from '@/components/sections/ServicesSection'
import ProcesoSection      from '@/components/sections/ProcesoSection'
import PreciosSection      from '@/components/sections/PreciosSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import StatsSection        from '@/components/sections/StatsSection'
import ProyectosSection    from '@/components/sections/ProyectosSection'
import ContactSection      from '@/components/sections/ContactSection'
import Footer              from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <StatementSection />
        <FeaturesSection />
        <ImageGridSection />
        <ParaQuienSection />
        <ServicesSection />
        <ProcesoSection />
        <PreciosSection />
        <TestimonialsSection />
        <StatsSection />
        <ProyectosSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
