'use client'
import { motion } from 'framer-motion'

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
          <h2 style={{ fontSize:'clamp(28px,3vw,36px)', lineHeight:'1.2', letterSpacing:'-0.36px', fontWeight:500, fontFamily:'"sans",system-ui,sans-serif', maxWidth:800 }}>
            <span style={{ color:'#0F0E0D' }}>
              Todos los días llega más información sobre IA. Más herramientas, más cambios, más urgencia. Eso genera un ruido que paraliza.{' '}
            </span>
            <span style={{ color:'#8F8B85' }}>
              Orbbi existe para cortar ese ruido. Un mentor real que entiende tu profesión, que te acompaña exactamente desde donde estás, y te lleva a donde necesitas llegar.
            </span>
          </h2>
        </motion.div>

        {/* Tres ideas clave */}
        <motion.div
          initial={{ opacity:0, y:32 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:'-60px' }}
          transition={{ duration:.9, delay:.15, ease:[0.16,1,0.3,1] }}
          style={{
            marginTop:72,
            display:'grid',
            gridTemplateColumns:'repeat(3,1fr)',
            gap:0,
            borderTop:'1px solid rgba(15,14,13,0.1)',
          }}
          className="statement-grid"
        >
          {[
            {
              n:'01',
              title:'No es un curso.',
              body:'No hay videos grabados ni módulos que completar. Cada sesión se construye en tiempo real contigo, aplicada a tu trabajo específico.',
            },
            {
              n:'02',
              title:'No es para expertos.',
              body:'No necesitas saber de tecnología. Necesitas querer mejorar tu trabajo. Desde ahí construimos juntos tu camino con IA.',
            },
            {
              n:'03',
              title:'No es para después.',
              body:'La IA no espera. Pero tampoco tienes que correr solo. Empezamos desde donde estás hoy y avanzamos a tu ritmo.',
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                padding:'48px 40px 48px 0',
                borderRight: i < 2 ? '1px solid rgba(15,14,13,0.1)' : 'none',
                paddingLeft: i > 0 ? 40 : 0,
              }}
            >
              <span style={{
                display:'block',
                fontFamily:'"disp",Georgia,serif',
                fontSize:13, color:'rgba(15,14,13,0.25)',
                marginBottom:20, letterSpacing:'0.05em',
              }}>{item.n}</span>
              <h3 style={{
                fontFamily:'"disp",Georgia,serif',
                fontSize:'clamp(22px,2.2vw,28px)',
                lineHeight:1.1, letterSpacing:'-0.02em',
                fontWeight:400, color:'#0F0E0D',
                marginBottom:14,
              }}>{item.title}</h3>
              <p style={{ fontSize:15, lineHeight:'22px', color:'rgba(15,14,13,0.5)' }}>{item.body}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
