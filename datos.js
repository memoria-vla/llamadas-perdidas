// =====================================================================
// LLAMADAS PERDIDAS - contenido de las estaciones
// Este es el único archivo que hay que editar para cambiar textos,
// documentos y fuentes. El diseño y el funcionamiento están en
// estilo.css y llamada.js.
//
// audio: dejar "" mientras no haya grabación. Sin grabación, la llamada
//        se lee con la voz sintética del celular (provisoria).
// documento con imagen: archivo: "img/..."; documento sonoro: sonido: "audio/..."
// tipo de documento: "ficcion" | "real" | "sin-rotular"
//        ("sin-rotular" marca lo que el grupo todavía no aclaró)
// PENDIENTE / PROPUESTA: falta material del grupo / texto para discutir
// =====================================================================

window.DISPOSITIVO = {
  titulo: "Llamadas perdidas",
  bajada: "Un recorrido de cuatro estaciones por la bicisenda de Villa La Angostura.",
  aviso: "Este recorrido habla de la última dictadura cívico-militar argentina (1976-1983): desapariciones, apropiación de niños y violencia. Recomendado desde los 13 años.",
  lema: ["Esta voz es ficción.", "Lo que cuenta, no."],
  pistaGeneral: "Caminá unos metros más hasta encontrar el próximo QR.",

  estaciones: [
    // -----------------------------------------------------------------
    {
      numero: 1,
      concepto: "Identidad",
      quien: "Delfina",
      inicial: "D",
      desde: "Número desconocido",
      gancho: "Alguien te llamó tres veces esta semana. No dejó mensaje.",
      audio: "",                               // "audio/estacion-1.mp3" cuando esté grabado
      relato: "relatos/estacion-1.txt",
      documentos: [
        { titulo: "Recuerdo del abuelo y sus amigos", tipo: "ficcion", archivo: "img/e1-recuerdo-abuelo.jpg", nota: "Imagen generada para el relato." },
        { titulo: "La casa de Manzano", tipo: "ficcion", archivo: "img/e1-casa.jpg", nota: "Foto intervenida para el relato." }
      ],
      fuentes: [
        { texto: "PENDIENTE: fuente sobre el pewma (el sueño como comunicación con los ancestros), escrita o validada por alguien de la comunidad mapuche.", origen: "", url: "" }
      ],
      pregunta: "¿Se puede recordar algo que nadie te contó?"   // PROPUESTA
    },
    // -----------------------------------------------------------------
    {
      numero: 2,
      concepto: "Dictadura cívico-militar",
      quien: "Delfina",
      inicial: "D",
      desde: "Llamada perdida · 14 de noviembre",
      gancho: "Encontró un acta de 1977 con el nombre de su abuelo. Te quiere contar.",
      audio: "",
      relato: "relatos/estacion-2.txt",
      documentos: [
        { titulo: "Acta de control de tránsito y movimiento de personal, 1977", tipo: "ficcion", archivo: "img/e2-acta-traslado.jpg", nota: "Documento creado para el relato. El Comando de Zona V y la Subzona 52 sí existieron: Neuquén dependía de ellos durante la dictadura cívico-militar (1976-1983)." },
        { titulo: "El truco", tipo: "ficcion", archivo: "img/e2-truco.jpg", nota: "Ilustración generada para el relato." },
        { titulo: "Detención en la vía pública", tipo: "sin-rotular", archivo: "img/e2-detenido.jpg", nota: "PENDIENTE: autor, lugar y fecha de la foto." },
        { titulo: "Plano topográfico y trazado vial, 1977", tipo: "ficcion", archivo: "img/e2-mapa-1977.jpg", nota: "Documento creado para el relato." }
      ],
      fuentes: [
        { texto: "Pilar Calveiro, Poder y desaparición. Los campos de concentración en Argentina (1998).", origen: "Bibliografía de la materia", url: "" }
      ],
      pregunta: "¿Quién firmó ese papel, y quién lo obedeció?"   // PROPUESTA
    },
    // -----------------------------------------------------------------
    {
      numero: 3,
      concepto: "Genocidio",
      quien: "Delfina",
      inicial: "D",
      desde: "Manzano",
      gancho: "Volvió a la casa del abuelo. Adentro había una caja.",
      audio: "",
      relato: "relatos/estacion-3.txt",
      documentos: [
        { titulo: "Constatación de nacimiento falsa de un niño apropiado", tipo: "real", archivo: "img/e3-partida.jpg", nota: "Publicada por Infobae, 30/10/2020." },
        { titulo: "Fichas de personas desaparecidas", tipo: "real", archivo: "img/e3-ficha-1.jpg", nota: "Catálogo del Archivo Provincial de la Memoria de Santa Cruz." },
        { titulo: "", tipo: "real", archivo: "img/e3-ficha-2.jpg", nota: "" },
        { titulo: "", tipo: "real", archivo: "img/e3-ficha-3.jpg", nota: "" },
        { titulo: "", tipo: "real", archivo: "img/e3-ficha-4.jpg", nota: "" },
        { titulo: "Informe de la inteligencia chilena: 22.000 muertos y desaparecidos", tipo: "real", archivo: "img/e3-22mil.jpg", nota: "Transcripción del cable firmado con el alias de Enrique Arancibia Clavel, agente de la DINA en Buenos Aires (1978)." },
        { titulo: "Testimonio: una mujer habla de su esposo, policía durante la dictadura cívico-militar", tipo: "real", sonido: "audio/e3-testimonio-1.mp3", nota: "Testimonio oral recogido por el grupo, con consentimiento. Se omite su nombre." },
        { titulo: "Testimonio: su situación personal en ese contexto", tipo: "real", sonido: "audio/e3-testimonio-2.mp3", nota: "" },
        { titulo: "Testimonio: cómo miraban sus hijos a su padre policía", tipo: "real", sonido: "audio/e3-testimonio-3.mp3", nota: "" }
      ],
      fuentes: [
        { texto: "Un agente de la inteligencia chilena (DINA) en Buenos Aires informó en 1978 que el Batallón 601 computaba 22.000 muertos y desaparecidos entre 1975 y 1978.", origen: "National Security Archive (EE. UU.)", url: "https://nsarchive2.gwu.edu/NSAEBB/NSAEBB185/" },
        { texto: "Sentencia contra Miguel Etchecolatz (2006): primer fallo que habla de crímenes cometidos \"en el marco de un genocidio\".", origen: "Equipo Nizkor", url: "https://derechos.org/nizkor/arg/ley/veredicto.html" },
        { texto: "H.I.J.O.S. y Abuelas de Plaza de Mayo: si tenés dudas sobre tu identidad.", origen: "abuelas.org.ar", url: "https://www.abuelas.org.ar/" }
      ],
      pregunta: "¿Alcanza con saber la verdad, o hace falta que alguien la juzgue?"   // PROPUESTA
    },
    // -----------------------------------------------------------------
    {
      numero: 4,
      concepto: "Repositorio",
      quien: "", inicial: "", desde: "", gancho: "", audio: "", relato: "",
      documentos: [],
      fuentes: [
        { texto: "Abuelas de Plaza de Mayo: si tenés dudas sobre tu identidad.", origen: "abuelas.org.ar", url: "https://www.abuelas.org.ar/" },
        { texto: "PENDIENTE: registro de detenidos desaparecidos del Observatorio de DDHH de Neuquén.", origen: "", url: "" },
        { texto: "PENDIENTE: el resto del repositorio que arman Nadia y Cristian.", origen: "", url: "" }
      ],
      pregunta: "¿Qué recuerda Villa La Angostura, y qué olvida?"   // PROPUESTA
    }
  ]
};
