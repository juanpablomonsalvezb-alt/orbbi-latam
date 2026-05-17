import Header             from '@/components/Header'
import Grain               from '@/components/Grain'
import HeroSection         from '@/components/sections/HeroSection'
import StatementSection    from '@/components/sections/StatementSection'
import FeaturesSection     from '@/components/sections/FeaturesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import StatsSection        from '@/components/sections/StatsSection'
import ContactSection      from '@/components/sections/ContactSection'
import Footer              from '@/components/Footer'

/* Harvey.ai structure — exact order:
   1. Dark hero (video/image bg)
   2. Light statement + product card
   3. Light features scroll-pinned
   4. Warm-light testimonials (#F2F1F0)
   5. Dark client impact (omitted, no video assets)
   6. Dark metrics (label | 80px number rows)
   7. Dark contact
   8. Footer (dark, giant logomark)
*/

export default function Home() {
  return (
    <>
      <Grain />
      <Header />
      <main>
        <HeroSection />
        <StatementSection />
        <FeaturesSection />
        <TestimonialsSection />
        <StatsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
