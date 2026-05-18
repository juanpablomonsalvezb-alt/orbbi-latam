'use client'
import { motion } from 'framer-motion'

/* Harvey statement section — exact:
   - bg: #FAFAF9
   - padding: 180px top, 180px bottom
   - H3: 36px, lh 39.6px, ls -0.36px, weight 500
   - First part: dark #0F0E0D (bold statement)
   - Second part: muted #8F8B85 (continuation)
   - Below: dark rounded product card
*/

export default function StatementSection() {
  return (
    <section className="sec-light sec-pad">
      <div className="page-wrap">
        <motion.div
          initial={{ opacity:0, y:24 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:'-80px' }}
          transition={{ duration:.8, ease:[0.16,1,0.3,1] }}
        >
          {/* Harvey exact text pattern: bold dark + muted continuation on same line */}
          <h2 style={{ fontSize:36, lineHeight:'39.6px', letterSpacing:'-0.36px', fontWeight:500, fontFamily:'"sans",system-ui,sans-serif', maxWidth:760 }}>
            <span style={{ color:'#0F0E0D' }}>
              Orbbi es mentoría 1:1 en inteligencia artificial, 100% online.{' '}
            </span>
            <span style={{ color:'#8F8B85' }}>
              No un curso. No una plataforma. Un mentor real que te acompaña a aprender y aplicar IA exactamente a tu vida y tu profesión.
            </span>
          </h2>
        </motion.div>

        {/* Product dark card — Harvey shows their interface screenshot */}
        <motion.div
          initial={{ opacity:0, y:32 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:'-60px' }}
          transition={{ duration:.9, delay:.15, ease:[0.16,1,0.3,1] }}
          style={{
            marginTop:60,
            borderRadius:16,
            background:'#1A1916',
            minHeight:400,
            display:'flex', alignItems:'center', justifyContent:'center',
            position:'relative', overflow:'hidden',
          }}
        >
          {/* Harvey "H" logomark — we use "O" for Orbbi */}
          <span style={{
            fontFamily:'"disp",Georgia,serif',
            fontSize:'clamp(120px,18vw,200px)',
            color:'rgba(250,250,249,0.08)',
            lineHeight:1, userSelect:'none', letterSpacing:'-4px',
          }}>
            O
          </span>
          {/* Subtle grid pattern like Harvey's interface preview */}
          <div style={{
            position:'absolute', inset:0,
            backgroundImage:'linear-gradient(rgba(250,250,249,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(250,250,249,0.02) 1px, transparent 1px)',
            backgroundSize:'80px 80px',
          }} />
          {/* Corner fade */}
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, transparent 30%, rgba(26,25,22,0.6) 100%)' }} />
        </motion.div>
      </div>
    </section>
  )
}
