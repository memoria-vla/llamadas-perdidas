// Llamadas perdidas - arma la página de una estación a partir de datos.js.
// Cada estacion-N.html define window.ESTACION = N y carga este archivo.
(function(){
  const D = window.DISPOSITIVO;
  const N = window.ESTACION;
  const E = D.estaciones.find(e => e.numero === N);
  const raiz = document.getElementById("app");

  // ---------- utilidades ----------
  function el(tag, attrs, ...hijos){
    const n = document.createElement(tag);
    for (const [k,v] of Object.entries(attrs || {})){
      if (k === "class") n.className = v;
      else if (k === "html") n.innerHTML = v;      // solo para íconos fijos
      else if (v !== null && v !== undefined && v !== false) n.setAttribute(k, v);
    }
    for (const h of hijos.flat()){
      if (h === null || h === undefined || h === false) continue;
      n.append(h instanceof Node ? h : document.createTextNode(h));
    }
    return n;
  }
  const marcaPendiente = t => /^PENDIENTE/.test(t || "");
  const ICONO_TEL = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z"/></svg>';
  const ICONO_CORTAR = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1a1 1 0 0 1-.56.9 11.5 11.5 0 0 0-2.66 1.85 1 1 0 0 1-1.4 0L.29 13.08a1 1 0 0 1 0-1.41C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67a1 1 0 0 1 0 1.41l-2.48 2.49a1 1 0 0 1-1.4 0 11.3 11.3 0 0 0-2.67-1.85 1 1 0 0 1-.56-.9v-3.1A15 15 0 0 0 12 9z"/></svg>';

  document.title = `Estación ${N} · ${D.titulo}`;

  // ---------- recorrido ----------
  const recorrido = el("nav", {class:"recorrido", "aria-label":`Recorrido: estación ${N} de ${D.estaciones.length}`},
    el("ol", null, D.estaciones.map(e =>
      el("li", {class: e.numero === N ? "on" : ""},
        el("a", {href:`estacion-${e.numero}.html`, "aria-label":`Estación ${e.numero}`}, String(e.numero))))),
    el("span", null, `Estación ${N} · ${E.concepto}`)
  );

  const col = el("div", {class:"col"},
    el("span", {class:"borrador"}, "Borrador · contenido en armado"),
    recorrido
  );

  // ---------- estación sin llamada (repositorio) ----------
  if (!E.audio && !E.quien){
    col.append(
      el("section", null,
        el("h1", {class:"pregunta"}, E.concepto),
        el("p", {class:"consejo"}, E.intro || "Lo que Delfina encontró existe fuera de la ficción. Acá está.")
      ),
      seccionDocumentos(),
      seccionFuentes(),
      el("section", null, el("p", {class:"pregunta"}, E.pregunta)),
      el("p", {class:"aviso"}, D.aviso)
    );
    raiz.append(col);
    return;
  }

  // ---------- teléfono ----------
  const estado = el("div", {class:"estado", id:"estado"}, "Llamada perdida");
  const reloj = el("div", {class:"reloj"});
  const ondas = el("div", {class:"ondas", hidden:true, "aria-hidden":"true"}, el("i"),el("i"),el("i"),el("i"),el("i"));
  const sub = el("p", {class:"subtitulo"}, E.gancho);
  const llamar = el("button", {class:"btn-tel btn-verde", "aria-label":"Devolver la llamada", html:ICONO_TEL});
  const cortar = el("button", {class:"btn-tel btn-rojo", "aria-label":"Cortar", hidden:true, html:ICONO_CORTAR});
  const etq = el("span", {class:"etq"}, "Devolver llamada");
  const desde = el("p", {class:"desde"}, E.desde);
  const leer = el("button", {class:"leer", type:"button", "aria-expanded":"false"}, "Prefiero leerlo");
  const tel = el("section", {class:"tel", "aria-live":"polite"},
    estado,
    el("div", {class:"avatar", "aria-hidden":"true"}, E.inicial),
    el("h1", {class:"quien"}, E.quien),
    desde,
    reloj, ondas, sub,
    el("div", {class:"botones"}, llamar, cortar),
    etq,
    el("p", {class:"consejo"}, "Mejor con auriculares."),
    leer
  );
  const relato = el("section", {class:"relato", hidden:true, "aria-label":"El relato en texto"});
  const audio = el("audio", {preload:"none", src:E.audio || null});
  col.append(tel, relato);

  // ---------- después de la llamada ----------
  const despues = el("div", {class:"despues", hidden:true},
    el("p", {class:"lema"}, D.lema[0] + " ", el("em", null, D.lema[1])),
    seccionDocumentos(),
    seccionFuentes(),
    el("section", null, el("p", {class:"pregunta"}, E.pregunta)),
    D.estaciones.some(e => e.numero === N + 1) ? el("section", {class:"siguiente"},
      el("div", {class:"estado"}, "Otra llamada perdida"),
      el("p", null, D.pistaGeneral)
    ) : null
  );
  col.append(despues);
  raiz.append(col);

  function seccionDocumentos(){
    if (!E.documentos.length) return null;
    return el("section", null,
      el("h2", null, E.tituloDocs || "Lo que encontró"),
      el("p", {class:"consejo", style:"margin:-4px 0 12px"}, "Tocá una imagen para verla en grande."),
      el("div", {class:"docs"}, E.documentos.map(d =>
        el("figure", {class:"doc", style:"margin:0"},
          imagen(d),
          d.titulo ? el("figcaption", {class:"pie"},
            el("span", {class:`sello ${d.tipo}`}, ({real:"Documento real", ficcion:"Ficción"})[d.tipo] || "Sin rotular: ¿real o ficción?"),
            el("strong", null, d.titulo),
            d.nota ? el("span", {class:"nota"}, d.nota) : null
          ) : null
        )))
    );
  }
  function imagen(d){
    if (d.sonido){
      const caja = el("div", {class:"marco marco-audio"});
      const a = el("audio", {controls:true, preload:"none", src:d.sonido});
      a.addEventListener("error", () => caja.replaceChildren("Audio pendiente"));
      caja.append(a);
      return caja;
    }
    const vacio = () => el("div", {class:"marco"}, "Imagen pendiente");
    if (!d.archivo) return vacio();
    const img = el("img", {src:d.archivo, alt:d.titulo || "Documento", loading:"lazy"});
    const a = el("a", {href:d.archivo, target:"_blank", rel:"noopener", "aria-label":"Ver en grande"}, img);
    img.addEventListener("error", () => a.replaceWith(vacio()));
    return a;
  }
  function seccionFuentes(){
    if (!E.fuentes.length) return null;
    return el("section", null,
      el("h2", null, E.quien ? "En qué hechos se basa" : "Enlaces para seguir buscando"),
      el("ul", {class:"fuentes"}, E.fuentes.map(f =>
        el("li", {class: marcaPendiente(f.texto) ? "pendiente" : ""},
          f.texto,
          f.origen ? el("span", null, f.origen) : null,
          f.url ? el("a", {href:f.url, target:"_blank", rel:"noopener"}, "Ver fuente") : null
        )))
    );
  }
  // ---------- relato en texto ----------
  let textoRelato = null, textoCargado = false;
  async function cargarRelato(){
    if (textoCargado) return textoRelato;
    textoCargado = true;
    try{
      const r = await fetch(E.relato);
      if (!r.ok) throw new Error();
      const t = (await r.text()).trim();
      if (!t || marcaPendiente(t)) throw new Error();
      textoRelato = t;
      t.split(/\n\s*\n/).forEach(p => relato.append(el("p", null, p.trim())));
    }catch(e){
      relato.append(el("p", {class:"pendiente"}, "El texto de esta estación todavía no está cargado."));
    }
    return textoRelato;
  }
  if (E.relato) cargarRelato();   // se precarga para que la voz arranque sin demora
  leer.addEventListener("click", async () => {
    await cargarRelato();
    const abrir = relato.hidden;
    relato.hidden = !abrir;
    leer.setAttribute("aria-expanded", String(abrir));
    leer.textContent = abrir ? "Ocultar el texto" : "Prefiero leerlo";
    if (abrir) despues.hidden = false;
  });

  // ---------- voz sintética (provisoria, mientras no haya grabación) ----------
  const hayVoz = "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
  let frases = [], iFrase = 0, vozElegida = null;
  function elegirVoz(){
    if (!hayVoz) return null;
    const v = speechSynthesis.getVoices();
    return v.find(x => /es[-_]AR/i.test(x.lang)) || v.find(x => /es[-_](US|419|MX)/i.test(x.lang))
        || v.find(x => /^es/i.test(x.lang)) || null;
  }
  if (hayVoz){
    vozElegida = elegirVoz();
    try{ speechSynthesis.addEventListener("voiceschanged", () => { vozElegida = elegirVoz(); }); }catch(e){}
  }
  function prepararFrases(t){
    return t.split(/\n\s*\n/)
      .flatMap(p => p.replace(/\s+/g, " ").trim().split(/(?<=[.!?…])\s+(?=[—¡¿"A-ZÁÉÍÓÚÑ])/))
      .map(f => f.trim()).filter(Boolean);
  }
  function hablarFrase(){
    if (!enLlamada) return;
    if (iFrase >= frases.length){ terminar(true); return; }
    const f = frases[iFrase];
    sub.textContent = f;
    const u = new SpeechSynthesisUtterance(f.replace(/[—"]/g, " "));
    u.lang = (vozElegida && vozElegida.lang) || "es-AR";
    if (vozElegida) u.voice = vozElegida;
    u.rate = 0.95; u.pitch = 1.05;
    let hecho = false;
    const sig = () => { if (hecho) return; hecho = true; clearTimeout(guardia); iFrase++; setTimeout(hablarFrase, 250); };
    // si el navegador no avisa que terminó la frase, se sigue igual
    const guardia = setTimeout(sig, 2500 + f.length * 110);
    u.onend = sig;   // si falla la voz, la frase queda en pantalla el tiempo de lectura (guardia)
    speechSynthesis.speak(u);
  }
  function vozSintetica(){
    frases = prepararFrases(textoRelato); iFrase = 0;
    desde.textContent = "Voz sintética provisoria";
    hablarFrase();
  }

  // ---------- la llamada ----------
  let ctx = null, timer = null, inicio = 0, activo = false, enLlamada = false;
  function tono(t0, dur, freq){
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.value = freq; o.connect(g); g.connect(ctx.destination);
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.12, t0 + 0.03);
    g.gain.setValueAtTime(0.12, t0 + dur - 0.05); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.start(t0); o.stop(t0 + dur + 0.02);
  }
  const fmt = s => String(Math.floor(s/60)).padStart(2,"0") + ":" + String(Math.floor(s%60)).padStart(2,"0");

  function sinAudio(){
    estado.textContent = "No se pudo conectar"; estado.classList.remove("vivo");
    sub.textContent = "La voz de esta estación todavía no está grabada. Podés leer lo que cuenta.";
    terminar(false);
    cargarRelato(); relato.hidden = false;
    leer.textContent = "Ocultar el texto"; leer.setAttribute("aria-expanded","true");
  }

  llamar.addEventListener("click", () => {
    activo = true; llamar.hidden = true; cortar.hidden = false; etq.textContent = "Cortar";
    estado.textContent = "Llamando..."; estado.classList.remove("vivo"); sub.textContent = ""; reloj.textContent = "";
    // el audio se "desbloquea" dentro del toque: los celulares no dejan reproducir sin un gesto
    try{
      audio.muted = true;
      const u = audio.play();
      if (u && u.then) u.then(() => { audio.pause(); audio.currentTime = 0; audio.muted = false; })
                       .catch(() => { audio.muted = false; });
    }catch(e){ audio.muted = false; }
    // la voz sintética también se habilita dentro del toque
    try{ if (hayVoz){ speechSynthesis.cancel(); const z = new SpeechSynthesisUtterance(" "); z.volume = 0; speechSynthesis.speak(z); } }catch(e){}
    // vibración de llamada entrante: funciona en Android (Chrome, Samsung Internet), no en iPhone
    try{ if (navigator.vibrate) navigator.vibrate([900, 600, 900, 600, 900]); }catch(e){}
    try{
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      const t = ctx.currentTime + 0.1;
      [0, 3].forEach(k => tono(t + k, 1.0, 425));
    }catch(e){}
    setTimeout(() => { if (activo) atender(); }, 5200);
  });

  async function atender(){
    const conGrabacion = E.audio && !audio.error;
    if (!conGrabacion){
      await cargarRelato();
      if (!(hayVoz && textoRelato)){ sinAudio(); return; }
    }
    if (!activo) return;
    enLlamada = true;
    estado.textContent = "En llamada"; estado.classList.add("vivo");
    tel.classList.add("hablando"); ondas.hidden = false;
    sub.textContent = "";
    inicio = Date.now(); reloj.textContent = "00:00";
    timer = setInterval(() => { reloj.textContent = fmt((Date.now() - inicio) / 1000); }, 500);
    if (conGrabacion){
      const p = audio.play();
      if (p && p.catch) p.catch(pasarAVoz);
    } else {
      vozSintetica();
    }
  }
  function pasarAVoz(){
    if (hayVoz && textoRelato){ try{ audio.pause(); }catch(e){} vozSintetica(); }
    else sinAudio();
  }
  audio.addEventListener("error", () => { if (enLlamada) pasarAVoz(); });
  audio.addEventListener("ended", () => terminar(true));
  cortar.addEventListener("click", () => terminar(true));

  function terminar(conTono){
    activo = false; enLlamada = false; clearInterval(timer);
    try{ if (navigator.vibrate) navigator.vibrate(0); }catch(e){}
    try{ audio.pause(); }catch(e){}
    try{ if (hayVoz) speechSynthesis.cancel(); }catch(e){}
    if (conTono){
      try{ if (ctx){ tono(ctx.currentTime + .05, .25, 620); tono(ctx.currentTime + .4, .25, 620); } }catch(e){}
      estado.textContent = "Llamada finalizada"; estado.classList.remove("vivo");
      sub.textContent = "Bajá para ver lo que dejó.";
    }
    tel.classList.remove("hablando"); ondas.hidden = true;
    cortar.hidden = true; llamar.hidden = false; etq.textContent = "Volver a llamar";
    despues.hidden = false;
    const suave = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (conTono) setTimeout(() => despues.scrollIntoView({behavior: suave ? "smooth" : "auto", block:"start"}), 400);
  }
})();
