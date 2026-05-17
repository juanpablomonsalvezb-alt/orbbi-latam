import Header             from '@/components/Header'
import CustomCursor        from '@/components/CustomCursor'
import Grain               from '@/components/Grain'
import Spotlight           from '@/components/Spotlight'
import HeroSection         from '@/components/sections/HeroSection'
import StatementSection    from '@/components/sections/StatementSection'
import FeaturesSection     from '@/components/sections/FeaturesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import StatsSection        from '@/components/sections/StatsSection'
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
        {/* 1. DARK — split hero: text left, photo right */}
        <HeroSection />
        {/* 2. PAPER — statement + product dark card */}
        <StatementSection />
        {/* 3. PAPER — features list scroll-pinned */}
        <FeaturesSection />
        {/* 4. PAPER — testimonials 50/50 */}
        <TestimonialsSection />
        {/* 5. DARK — metrics two-column rows */}
        <StatsSection />
        {/* 6. DARK — contact */}
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
