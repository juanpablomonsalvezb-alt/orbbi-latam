import Header              from '@/components/Header'
import HeroSection          from '@/components/sections/HeroSection'
import StatementSection     from '@/components/sections/StatementSection'
import ParaQuienSection     from '@/components/sections/ParaQuienSection'
import ProcesoSection       from '@/components/sections/ProcesoSection'
import PreciosSection       from '@/components/sections/PreciosSection'
import TestimonialsSection  from '@/components/sections/TestimonialsSection'
import ContactSection       from '@/components/sections/ContactSection'
import QuienesSomosSection  from '@/components/sections/QuienesSomosSection'
import FAQSection           from '@/components/sections/FAQSection'
import ComparadorSection    from '@/components/sections/ComparadorSection'
import ActivityToast        from '@/components/ActivityToast'
import FeaturesSection      from '@/components/sections/FeaturesSection'
import ServicesSection      from '@/components/sections/ServicesSection'
import ImageGridSection     from '@/components/sections/ImageGridSection'
import StatsSection         from '@/components/sections/StatsSection'
import ProyectosSection     from '@/components/sections/ProyectosSection'
import Footer               from '@/components/Footer'

export default function Home() {
  return (
    <>
      <ActivityToast />
      <Header />
      <main>
        {/* 1 — Mensaje + claridad */}
        <HeroSection />
        <StatementSection />

        {/* 2 — Identificación y proceso */}
        <ParaQuienSection />
        <ProcesoSection />

        {/* 3 — Comparador + Precio + prueba social → momento de decisión */}
        <ComparadorSection />
        <PreciosSection />
        <TestimonialsSection />

        {/* 4 — Formulario: captura la intención */}
        <ContactSection />

        {/* 5 — Quiénes somos: confianza */}
        <QuienesSomosSection />

        {/* 6 — FAQ: elimina objeciones */}
        <FAQSection />

        {/* 6 — Más detalle para quien aún evalúa */}
        <FeaturesSection />
        <ServicesSection />
        <ImageGridSection />
        <StatsSection />

        {/* 7 — Ecosistema */}
        <ProyectosSection />
      </main>
      <Footer />
    </>
  )
}
