import Header              from '@/components/Header'
import CustomCursor         from '@/components/CustomCursor'
import Grain                from '@/components/Grain'
import Spotlight            from '@/components/Spotlight'
import HeroSection          from '@/components/sections/HeroSection'
import StatementSection     from '@/components/sections/StatementSection'
import FeaturesSection      from '@/components/sections/FeaturesSection'
import TestimonialsSection  from '@/components/sections/TestimonialsSection'
import StatsSection         from '@/components/sections/StatsSection'
import ContactSection       from '@/components/sections/ContactSection'
import Footer               from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Grain />
      <Spotlight />
      <CustomCursor />
      <Header />
      <main>
        {/* DARK — hero full bleed image */}
        <HeroSection />
        {/* LIGHT — statement serif */}
        <StatementSection />
        {/* DARK — features rotating */}
        <FeaturesSection />
        {/* LIGHT — testimonials 50/50 with photo */}
        <TestimonialsSection />
        {/* DARK — metrics huge numbers */}
        <StatsSection />
        {/* DARK — contact */}
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
