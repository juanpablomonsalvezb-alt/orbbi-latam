export type Article = {
  slug: string
  title: string
  excerpt: string
  category: string
  time: string
  color: string
  icon: string
  date: string
  content: Section[]
}

type Section = {
  type: 'paragraph' | 'heading' | 'list' | 'tip' | 'quote'
  text?: string
  items?: string[]
}

export const articles: Article[] = [
  {
    slug: 'que-es-chatgpt',
    title: '¿Qué es ChatGPT y para qué me sirve a mí?',
    excerpt: 'Seguro escuchaste el nombre en las noticias. Acá te explicamos qué es y tres cosas concretas que podés hacerle hoy mismo.',
    category: 'Aprendizaje',
    time: '5 min lectura',
    color: '#C9A96E',
    icon: '🤖',
    date: '18 de abril, 2025',
    content: [
      {
        type: 'paragraph',
        text: 'En los últimos meses, no se habla de otra cosa. En la televisión, en el diario, en la conversación con los nietos: ChatGPT. Pero ¿qué es exactamente? ¿Para qué sirve? ¿Es peligroso? ¿Hay que pagar para usarlo? En este artículo vamos a responder todas esas preguntas de forma clara y sin vueltas.',
      },
      {
        type: 'heading',
        text: 'Empecemos por lo básico: ¿qué es ChatGPT?',
      },
      {
        type: 'paragraph',
        text: 'ChatGPT es un programa de computadora que puede conversar con vos en español, responder preguntas, ayudarte a escribir textos, explicar conceptos difíciles y mucho más. Lo creó una empresa llamada OpenAI, y funciona a través de internet.',
      },
      {
        type: 'paragraph',
        text: 'La forma más fácil de entenderlo es imaginar que tenés un asistente muy paciente que sabe un poco de todo: medicina, cocina, historia, tecnología, trámites. Podés preguntarle lo que quieras, a cualquier hora, sin que se canse ni te juzgue.',
      },
      {
        type: 'tip',
        text: '💡 ChatGPT no reemplaza al médico ni al abogado. Es una herramienta de apoyo, no una autoridad. Usalo para entender mejor, no para tomar decisiones importantes solo.',
      },
      {
        type: 'heading',
        text: 'Tres cosas concretas que podés hacer hoy mismo',
      },
      {
        type: 'list',
        items: [
          'Pedirle que te explique un término médico: "¿Qué significa hipertensión arterial en palabras simples?" — te va a responder como si fuera un médico amable con tiempo.',
          'Que te ayude a redactar un mensaje: "Necesito escribirle un correo a mi banco para pedir una aclaración sobre un cargo que no reconozco" — te escribe el texto completo.',
          'Que te cuente sobre un tema que te interesa: "Explicame la Guerra de Malvinas como si tuviera 10 años" — lo hace con paciencia y sin tecnicismos.',
        ],
      },
      {
        type: 'heading',
        text: '¿Es gratis?',
      },
      {
        type: 'paragraph',
        text: 'Sí, hay una versión gratuita que es más que suficiente para empezar. Podés acceder desde tu celular o tu computadora, en chat.openai.com, y usar el mismo idioma que hablás todos los días: el español.',
      },
      {
        type: 'quote',
        text: '"Lo usé para que me explicara el prospecto de un medicamento que mi médico me recetó. En dos minutos entendí todo lo que el papel no me explicaba."',
      },
      {
        type: 'paragraph',
        text: 'No necesitás saber de tecnología para usarlo. Si podés escribir un mensaje de WhatsApp, podés usar ChatGPT. El único requisito es tener curiosidad.',
      },
    ],
  },
  {
    slug: 'resultados-medicos-con-ia',
    title: 'Cómo pedirle a la IA que te explique un resultado médico',
    excerpt: 'Esos informes llenos de términos raros ya no tienen que asustarte. Con IA podés pedir una explicación en palabras simples.',
    category: 'Salud',
    time: '4 min lectura',
    color: '#4A7C59',
    icon: '🏥',
    date: '10 de abril, 2025',
    content: [
      {
        type: 'paragraph',
        text: 'Recibís un análisis de sangre o un informe médico y la hoja está llena de siglas, números y términos que nadie te explicó. Eso ya no tiene por qué ser un problema. La inteligencia artificial puede ayudarte a entender esos resultados en palabras simples, en segundos.',
      },
      {
        type: 'heading',
        text: '¿Qué tipo de resultados podés consultar?',
      },
      {
        type: 'list',
        items: [
          'Análisis de sangre: hemograma, glucosa, colesterol, triglicéridos',
          'Informes de ecografía o radiografía',
          'Diagnósticos escritos por el médico con términos técnicos',
          'Prospectos de medicamentos recetados',
          'Indicaciones postoperatorias o de tratamiento',
        ],
      },
      {
        type: 'heading',
        text: 'Cómo hacerlo paso a paso',
      },
      {
        type: 'paragraph',
        text: 'Abrí ChatGPT (o cualquier asistente de IA) y escribí algo como: "Tengo un análisis de sangre y hay términos que no entiendo. ¿Me los podés explicar en palabras simples?" Después copiá el texto del informe o escribí los términos que no entendés.',
      },
      {
        type: 'tip',
        text: '💡 Aclaración importante: la IA puede explicarte qué significa cada término, pero no puede darte un diagnóstico médico. Si algo te preocupa, consultá siempre con tu médico.',
      },
      {
        type: 'heading',
        text: 'Un ejemplo real',
      },
      {
        type: 'paragraph',
        text: 'Imaginá que tu análisis dice "Glucemia en ayunas: 105 mg/dL (Valor de referencia: 70-99)". Podés escribirle a la IA: "¿Qué significa glucemia en ayunas de 105? ¿Debo preocuparme?" Y la respuesta que vas a recibir va a ser clara, tranquilizadora y sin alarmismos innecesarios.',
      },
      {
        type: 'quote',
        text: '"Siempre salía del médico con más dudas que respuestas. Ahora llego a la consulta con preguntas concretas porque antes de ir le pregunto a la IA qué significa lo que me dijo la última vez."',
      },
      {
        type: 'paragraph',
        text: 'La IA no reemplaza la consulta médica, pero sí puede hacer que llegués a esa consulta mucho mejor preparado. Y eso marca una diferencia real en tu salud.',
      },
    ],
  },
  {
    slug: 'ia-en-tu-celular',
    title: 'Tu celular ya tiene IA: estas funciones las usás sin saberlo',
    excerpt: 'El corrector automático, el desbloqueo con tu cara, las sugerencias del mapa. Muchas cosas que ya usás son IA.',
    category: 'Aprendizaje',
    time: '6 min lectura',
    color: '#2B5BA8',
    icon: '📱',
    date: '2 de abril, 2025',
    content: [
      {
        type: 'paragraph',
        text: 'Hay una idea muy común que dice que la inteligencia artificial es algo nuevo, complicado, reservado para los jóvenes o para los expertos en tecnología. Pero la verdad es otra: si tenés un celular, ya estás usando IA todos los días. Y probablemente hace años.',
      },
      {
        type: 'heading',
        text: 'Funciones de tu celular que son inteligencia artificial',
      },
      {
        type: 'list',
        items: [
          'El corrector automático: cuando el celular corrige "hbola" por "hola", está usando IA para predecir lo que querías escribir.',
          'El reconocimiento facial: cuando desbloqueás el teléfono con tu cara, una IA analiza miles de puntos de tu rostro en milisegundos.',
          'Las sugerencias de Google Maps: cuando el GPS te dice "hay tráfico, tomá esta ruta", es IA analizando datos de miles de autos en tiempo real.',
          'El filtro de spam en el correo: la IA aprende a distinguir los correos basura de los importantes.',
          'Las fotos que se ordenan solas: en el álbum de tu celular, la IA agrupa las fotos por persona, lugar o fecha.',
          'El teclado predictivo: cuando el celular te sugiere la próxima palabra mientras escribís.',
        ],
      },
      {
        type: 'heading',
        text: '¿Por qué importa saber esto?',
      },
      {
        type: 'paragraph',
        text: 'Porque si ya usás todas esas funciones sin problema, quiere decir que tenés más experiencia con la IA de lo que pensás. El paso siguiente —usar un asistente como ChatGPT o Google Gemini— no es tan distinto. Es solo una forma más de interactuar con tecnología que ya conocés.',
      },
      {
        type: 'tip',
        text: '💡 La próxima vez que el corrector automático te ayude, recordá: eso es inteligencia artificial trabajando para vos.',
      },
      {
        type: 'heading',
        text: 'El asistente de voz: la IA más fácil de usar',
      },
      {
        type: 'paragraph',
        text: 'Si tenés un celular Android podés hablarle a Google. Si tenés un iPhone, podés hablarle a Siri. Decile "¿qué tiempo hace hoy?" o "recordame tomar la pastilla a las 8 de la noche" y el asistente lo hace. Eso también es IA, y funciona perfectamente en español.',
      },
      {
        type: 'quote',
        text: '"Pensaba que la inteligencia artificial era algo para los jóvenes. Después me di cuenta que la usaba todos los días cuando el GPS me decía por dónde ir."',
      },
    ],
  },
  {
    slug: 'detectar-estafas-digitales',
    title: '5 señales de que un mensaje es una estafa (y cómo protegerte)',
    excerpt: 'Los fraudes digitales se volvieron más sofisticados. Aprendé a reconocerlos y las herramientas que hoy existen para protegerte.',
    category: 'Seguridad',
    time: '7 min lectura',
    color: '#C9582B',
    icon: '🛡️',
    date: '25 de marzo, 2025',
    content: [
      {
        type: 'paragraph',
        text: 'Los fraudes por internet y por teléfono se volvieron más frecuentes y más sofisticados. Pero hay buenas noticias: también son detectables si sabés qué buscar. En este artículo te mostramos cinco señales de alerta que nunca fallan.',
      },
      {
        type: 'heading',
        text: '5 señales de que algo es una estafa',
      },
      {
        type: 'list',
        items: [
          '1. Te piden urgencia: "Tenés 24 horas para responder o perdés tu cuenta". Los estafadores quieren que actúes sin pensar. Esa presión artificial es una señal roja.',
          '2. Te piden datos personales: ningún banco, ninguna empresa seria te va a pedir por mensaje tu contraseña, número de tarjeta o código de seguridad.',
          '3. Viene de un número desconocido o extranjero: si el banco te escribe, usa el mismo número de siempre. Un número raro es señal de alerta.',
          '4. Errores de ortografía o redacción extraña: muchas estafas vienen traducidas desde otro idioma. Si el texto suena raro o tiene errores, desconfiá.',
          '5. Promesas demasiado buenas: "Ganaste un premio", "Tu hijo tuvo un accidente, mandá plata urgente", "Tu cuenta fue bloqueada". Son los guiones más comunes.',
        ],
      },
      {
        type: 'tip',
        text: '💡 Regla de oro: ante la duda, no respondas y llamá directamente a la institución usando el número oficial del sitio web o el dorso de tu tarjeta.',
      },
      {
        type: 'heading',
        text: 'Cómo te puede ayudar la IA',
      },
      {
        type: 'paragraph',
        text: 'Si recibís un mensaje que te genera dudas, podés copiarlo en ChatGPT y preguntarle: "¿Esto parece una estafa?" La IA puede analizar el texto y decirte qué señales de fraude detecta. No es infalible, pero es un buen primer filtro.',
      },
      {
        type: 'heading',
        text: '¿Qué hacer si ya caíste en una estafa?',
      },
      {
        type: 'list',
        items: [
          'Llamá inmediatamente a tu banco para bloquear tarjetas o cuentas comprometidas.',
          'Cambiá las contraseñas afectadas desde un dispositivo seguro.',
          'Denunciá el hecho en la comisaría o en el portal de tu país (en Argentina: www.argentina.gob.ar/jefatura/innovacion/seguridad/cibercrimen).',
          'No te sientas avergonzado: estas estafas engañan a personas de todas las edades y niveles de educación.',
        ],
      },
      {
        type: 'quote',
        text: '"Me llegó un mensaje diciendo que mi cuenta del banco estaba bloqueada. Antes de hacer nada le pregunté a ChatGPT y me dijo que era una estafa típica. Le bloqueé el número y listo."',
      },
    ],
  },
  {
    slug: 'videollamadas-familia-exterior',
    title: 'Cómo hablar por videollamada con tu familia en el exterior',
    excerpt: 'Hay herramientas que traducen en tiempo real y agregan subtítulos. Tu vínculo con quienes querés no depende del idioma.',
    category: 'Familia',
    time: '5 min lectura',
    color: '#8B6F8A',
    icon: '👨‍👩‍👧',
    date: '15 de marzo, 2025',
    content: [
      {
        type: 'paragraph',
        text: 'Tener familiares en otro país ya no es la barrera que era antes. Hoy existen herramientas gratuitas que permiten vernos cara a cara, escucharnos y entendernos, incluso cuando no hablamos el mismo idioma. Y lo mejor: funcionan desde el celular que ya tenés.',
      },
      {
        type: 'heading',
        text: 'Las apps más fáciles para videollamar',
      },
      {
        type: 'list',
        items: [
          'WhatsApp: si ya lo usás para mensajes, también tiene videollamadas. Es gratuito y funciona con cualquier celular.',
          'Zoom: ideal para reuniones familiares con muchas personas. Podés ver hasta 100 personas en pantalla al mismo tiempo.',
          'FaceTime: si vos y tu familia tienen iPhone o iPad, es la opción más sencilla de todas.',
          'Google Meet: funciona desde el navegador, sin necesidad de instalar nada.',
        ],
      },
      {
        type: 'heading',
        text: 'La barrera del idioma: ya tiene solución',
      },
      {
        type: 'paragraph',
        text: 'Si tenés nietos o familiares que hablan otro idioma, Google Meet tiene subtítulos en tiempo real. Y si usás Google Translate en el celular, podés activar el "modo conversación" que traduce lo que cada persona dice instantáneamente. La conversación fluye aunque hablen idiomas distintos.',
      },
      {
        type: 'tip',
        text: '💡 Consejo práctico: hacé una videollamada de prueba con alguien de confianza que esté cerca para familiarizarte con la app antes de llamar al exterior.',
      },
      {
        type: 'heading',
        text: 'Cómo mejorar la calidad de la llamada',
      },
      {
        type: 'list',
        items: [
          'Conectate a tu red de WiFi de casa, no uses los datos del celular si podés.',
          'Buscá un lugar iluminado: que la luz venga de frente, no de atrás tuyo.',
          'Poné el celular apoyado en algo: llamar con el celular en la mano se cansa y la imagen tiembla.',
          'Cerrá otras aplicaciones antes de llamar para que el celular funcione mejor.',
        ],
      },
      {
        type: 'quote',
        text: '"Mi nieto vive en España y no sabe mucho español rioplatense. Pero con los subtítulos de Google Meet nos entendemos perfectamente. Lo primero que hicimos fue reírnos de las diferencias."',
      },
      {
        type: 'paragraph',
        text: 'La distancia es real, pero la conexión no tiene por qué perderse. Con las herramientas de hoy, tu familia está a una llamada de distancia, sin importar a cuántos kilómetros esté.',
      },
    ],
  },
  {
    slug: 'asistente-de-voz',
    title: 'Cómo usar el asistente de voz de tu celular para cosas útiles',
    excerpt: 'Siri, Google y Alexa hacen mucho más que poner música. Podés pedirles que te recuerden medicamentos, lean mensajes y más.',
    category: 'Aprendizaje',
    time: '4 min lectura',
    color: '#2B8A6A',
    icon: '🎙️',
    date: '5 de marzo, 2025',
    content: [
      {
        type: 'paragraph',
        text: 'La mayoría de los celulares tienen un asistente de voz incorporado: en los iPhone se llama Siri, en los Android se llama Google. Mucha gente lo conoce pero pocos saben todo lo que puede hacer. Acá van los usos más prácticos para el día a día.',
      },
      {
        type: 'heading',
        text: 'Cómo activar tu asistente',
      },
      {
        type: 'list',
        items: [
          'iPhone (Siri): decí "Oye Siri" o mantenés apretado el botón lateral.',
          'Android (Google): decí "Ok Google" o tocás el ícono del micrófono en el buscador.',
          'Ambos responden en español si el celular está configurado en español.',
        ],
      },
      {
        type: 'heading',
        text: 'Las cosas más útiles que podés pedirle',
      },
      {
        type: 'list',
        items: [
          '"Recordame tomar la pastilla a las 8 de la mañana todos los días" — pone una alarma recurrente.',
          '"¿Qué tiempo va a hacer mañana?" — te da el pronóstico para tu ciudad.',
          '"Llamale a mi hija" — marca el número automáticamente.',
          '"Leeme el último mensaje de WhatsApp" — te lo lee en voz alta, sin que tengas que mirar la pantalla.',
          '"Poné una alarma para las 7 de la mañana" — más rápido que hacerlo a mano.',
          '"Anotá en mi lista de compras: leche, pan y aceite" — guarda la lista sin que tengas que escribir nada.',
          '"¿Cuánto es 350 más 180?" — hace cualquier cálculo en segundos.',
        ],
      },
      {
        type: 'tip',
        text: '💡 Si el asistente no te entiende la primera vez, no te preocupes. Hablale despacio y claro, como si le hablaras a una persona. Cuanto más lo usás, mejor te entiende.',
      },
      {
        type: 'heading',
        text: 'Por qué es especialmente útil para personas mayores',
      },
      {
        type: 'paragraph',
        text: 'Los asistentes de voz son ideales cuando escribir en el celular resulta incómodo, cuando las letras de la pantalla son muy pequeñas, o cuando simplemente es más práctico hablar que tipear. No necesitás ver bien ni tener dedos ágiles: solo hablar.',
      },
      {
        type: 'quote',
        text: '"Le pido a Google que me recuerde tomar los medicamentos tres veces al día. Me cambió la vida porque antes siempre me olvidaba de alguno."',
      },
      {
        type: 'paragraph',
        text: 'El asistente de voz está en tu celular desde hace años, esperando que lo uses. Empezá con una sola función, la que más necesitás, y de a poco vas a descubrir todo lo que puede hacer por vos.',
      },
    ],
  },
]

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}
