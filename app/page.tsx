"use client";

import { useRef, useState, type FormEvent } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  Fan,
  Lightbulb,
  MapPin,
  Menu,
  MessageCircle,
  ShieldCheck,
  Wrench,
  X,
  Droplets,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const services = [
  {
    id: "mantenimiento",
    number: "01",
    title: "Mantenimiento general",
    description: "Reparaciones, ajustes e instalaciones para conservar tus espacios en buen estado.",
    icon: Wrench,
  },
  {
    id: "electricidad",
    number: "02",
    title: "Servicios eléctricos",
    description: "Revisión de fallas, iluminación, tomas e instalaciones según cada necesidad.",
    icon: Lightbulb,
  },
  {
    id: "plomeria",
    number: "03",
    title: "Plomería",
    description: "Atención de fugas, grifería, sanitarios y redes de agua en hogar o negocio.",
    icon: Droplets,
  },
  {
    id: "climatizacion",
    number: "04",
    title: "Climatización",
    description: "Instalación, diagnóstico y mantenimiento de equipos de aire acondicionado.",
    icon: Fan,
  },
] as const;

const extraServices = ["Pintura y acabados", "Otro servicio"];

function whatsappUrl(message: string) {
  const text = encodeURIComponent(message);
  return siteConfig.whatsappNumber
    ? `https://wa.me/${siteConfig.whatsappNumber}?text=${text}`
    : `https://api.whatsapp.com/send?text=${text}`;
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a className={`brand${light ? " brand-light" : ""}`} href="#inicio" aria-label="NEXO Servicios, volver al inicio">
      <span className="brand-symbol" aria-hidden="true"><span /></span>
      <span className="brand-word">NEXO<small>SERVICIOS</small></span>
    </a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");
  const serviceRef = useRef<HTMLSelectElement>(null);

  function chooseService(value: string) {
    setService(value);
    document.getElementById("cotizar")?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => serviceRef.current?.focus({ preventScroll: true }), 350);
  }

  function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const selected = services.find((item) => item.id === service)?.title ?? service;
    const message = [
      `Hola, quiero solicitar una cotización de ${selected.toLowerCase()}.`,
      `Mi nombre: ${name.trim()}`,
      `Teléfono: ${phone.trim()}`,
      `Ubicación: ${location.trim()}`,
      details.trim() ? `Detalles: ${details.trim()}` : "",
      "¿Podemos revisar el alcance y la disponibilidad?",
    ].filter(Boolean).join("\n");
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <header className="site-header" id="inicio">
        <div className="container header-inner">
          <Brand />
          <nav className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="Navegación principal" id="main-nav">
            <a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a>
            <a href="#nosotros" onClick={() => setMenuOpen(false)}>Nosotros</a>
            <a href="#proceso" onClick={() => setMenuOpen(false)}>Cómo funciona</a>
            <a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a>
          </nav>
          <a className="header-cta" href="#cotizar">Solicitar cotización <ArrowUpRight size={17} aria-hidden="true" /></a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-controls="main-nav" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={23} /> : <Menu size={23} />}</button>
        </div>
      </header>

      <main id="contenido">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-photo" role="img" aria-label="Interior contemporáneo de un hogar con herramientas de mantenimiento" />
          <div className="container hero-inner">
            <div className="hero-copy">
              <span className="eyebrow hero-eyebrow"><span className="eyebrow-line" /> CUIDAMOS LO QUE HACE FUNCIONAR TU ESPACIO</span>
              <h1 id="hero-title">Soluciones para<br /><em>cada espacio.</em></h1>
              <p>Mantenimiento, reparaciones e instalaciones para hogares y negocios. Cuéntanos qué necesitas y recibe una cotización hecha para tu caso.</p>
              <div className="hero-actions"><a className="button button-cream" href="#servicios">Explorar servicios <ArrowDownRight size={19} aria-hidden="true" /></a><span>Un buen trabajo empieza por escuchar.</span></div>
            </div>

            <form className="quote-card" id="cotizar" onSubmit={submitQuote}>
              <div className="quote-card-heading"><span className="small-label">HABLEMOS DE TU PROYECTO</span><h2>Solicita tu<br /><em>cotización.</em></h2><p>Déjanos los datos básicos y prepara tu consulta por WhatsApp.</p></div>
              <div className="form-grid">
                <label>Nombre completo<input type="text" name="name" autoComplete="name" placeholder="Tu nombre" value={name} onChange={(event) => setName(event.target.value)} minLength={2} required /></label>
                <label>Teléfono<input type="tel" name="phone" autoComplete="tel" placeholder="Tu número" value={phone} onChange={(event) => setPhone(event.target.value)} minLength={7} required /></label>
                <label className="form-full">Servicio que necesitas<span className="select-wrap"><select ref={serviceRef} name="service" value={service} onChange={(event) => setService(event.target.value)} required><option value="">Selecciona un servicio</option>{services.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}{extraServices.map((item) => <option key={item} value={item}>{item}</option>)}</select><ChevronDown size={17} aria-hidden="true" /></span></label>
                <label className="form-full">Ciudad o zona<input type="text" name="location" autoComplete="address-level2" placeholder="¿Dónde se requiere el servicio?" value={location} onChange={(event) => setLocation(event.target.value)} required /></label>
                <label className="form-full"><span>Cuéntanos un poco más <span className="optional">(opcional)</span></span><textarea name="details" rows={2} placeholder="Ej. reparar una fuga en la cocina" value={details} onChange={(event) => setDetails(event.target.value)} /></label>
              </div>
              <button className="quote-submit" type="submit">Preparar mensaje <ArrowUpRight size={18} aria-hidden="true" /></button>
              <p className="form-note"><MessageCircle size={15} aria-hidden="true" /> Se abrirá WhatsApp con tu solicitud lista para enviar.</p>
              {!siteConfig.whatsappNumber && <p className="demo-note">Demo: WhatsApp pedirá elegir un contacto hasta configurar el número del prestador.</p>}
            </form>
          </div>
        </section>

        <div className="assurance-strip"><div className="container assurance-inner"><span><Check size={17} aria-hidden="true" /> Para hogares y negocios</span><span><Check size={17} aria-hidden="true" /> Atención según tu necesidad</span><span><Check size={17} aria-hidden="true" /> Cotización personalizada</span></div></div>

        <section className="section services-section" id="servicios" aria-labelledby="services-title"><div className="container">
          <div className="section-heading"><div><span className="section-kicker">01 / NUESTROS SERVICIOS</span><h2 id="services-title">Lo que necesitas,<br /><em>bien resuelto.</em></h2></div><p>Desde una reparación puntual hasta el cuidado continuo de un espacio. Elige el tipo de trabajo y conversemos sobre los detalles.</p></div>
          <div className="services-grid">{services.map((item) => { const Icon = item.icon; return <article className="service-card" key={item.id}><div className="service-top"><span>{item.number} / SERVICIO</span><Icon size={35} strokeWidth={1.4} aria-hidden="true" /></div><div><h3>{item.title}</h3><p>{item.description}</p></div><button type="button" onClick={() => chooseService(item.id)} aria-label={`Cotizar ${item.title}`}><span>Cotizar servicio</span><ArrowUpRight size={19} aria-hidden="true" /></button></article>; })}</div>
          <div className="other-services"><span>¿Tienes otro tipo de trabajo en mente?</span><button type="button" onClick={() => chooseService("Otro servicio")}>Cuéntanos qué necesitas <ArrowUpRight size={17} aria-hidden="true" /></button></div>
        </div></section>

        <section className="about-section" id="nosotros" aria-labelledby="about-title"><div className="container about-layout"><div className="about-art" aria-hidden="true"><div className="about-art-frame"><span>EL DETALLE<br />HACE LA<br /><em>DIFERENCIA.</em></span><Wrench size={112} strokeWidth={0.6} /></div><div className="about-art-caption">NEXO / SERVICIOS PARA CADA ESPACIO</div></div><div className="about-copy"><span className="section-kicker">02 / NUESTRA FORMA DE TRABAJAR</span><h2 id="about-title">Un servicio claro desde <em>el primer contacto.</em></h2><p>Entender el problema es el primer paso para resolverlo. Tanto una reparación puntual como el cuidado continuo de un espacio requieren conocer el alcance, acordar los tiempos y mantener una comunicación clara.</p><div className="about-points"><div><ShieldCheck size={24} strokeWidth={1.5} aria-hidden="true" /><span><strong>Alcance a tu medida</strong><small>La solución se define según el espacio y el trabajo requerido.</small></span></div><div><MessageCircle size={24} strokeWidth={1.5} aria-hidden="true" /><span><strong>Comunicación sencilla</strong><small>Tu solicitud llega con los datos necesarios para empezar a conversar.</small></span></div></div></div></div></section>

        <section className="section process-section" id="proceso" aria-labelledby="process-title"><div className="container"><div className="section-heading"><div><span className="section-kicker">03 / ASÍ COMENZAMOS</span><h2 id="process-title">De la necesidad<br /><em>a la solución.</em></h2></div><p>Una ruta sencilla para que el trabajo se entienda antes de empezar.</p></div><div className="steps"><div className="step"><span>01</span><div><h3>Cuéntanos qué pasa</h3><p>Elige el servicio y comparte la ubicación y los detalles de tu solicitud.</p></div><ArrowRight size={20} aria-hidden="true" /></div><div className="step"><span>02</span><div><h3>Revisamos el alcance</h3><p>Se aclaran las dudas, los tiempos y lo que hace falta para cotizar.</p></div><ArrowRight size={20} aria-hidden="true" /></div><div className="step"><span>03</span><div><h3>Coordinamos el trabajo</h3><p>Si la propuesta te funciona, se acuerdan los siguientes pasos directamente.</p></div><ArrowUpRight size={20} aria-hidden="true" /></div></div></div></section>

        <section className="contact-section" id="contacto" aria-labelledby="contact-title"><div className="container contact-inner"><div><span className="section-kicker">04 / EMPECEMOS</span><h2 id="contact-title">Tu espacio merece<br /><em>estar en buenas manos.</em></h2><p>Cuéntanos lo que necesitas. Cada proyecto empieza con una buena conversación.</p><a className="button button-cream" href="#cotizar">Solicitar cotización <ArrowUpRight size={18} aria-hidden="true" /></a></div><div className="contact-mark" aria-hidden="true">N<span>/</span></div></div></section>
      </main>

      <footer className="site-footer"><div className="container footer-main"><div className="footer-about"><Brand light /><p>Servicios prácticos para cuidar, reparar y mejorar tus espacios.</p></div><div className="footer-links"><h3>EXPLORA</h3><a href="#servicios">Servicios</a><a href="#nosotros">Nosotros</a><a href="#proceso">Cómo funciona</a><a href="#cotizar">Cotizar</a></div><div className="footer-links"><h3>CONTACTO</h3><span><MapPin size={17} aria-hidden="true" /> {siteConfig.serviceArea}</span><span><Clock3 size={17} aria-hidden="true" /> {siteConfig.businessHours}</span><a href={whatsappUrl("Hola, quisiera información sobre sus servicios.")} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} aria-hidden="true" /> WhatsApp</a>{siteConfig.email && <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>}</div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} {siteConfig.name.toUpperCase()} · SITIO DEMOSTRATIVO</span><span>Personalizable para profesionales y empresas de servicios.</span></div></footer>
    </>
  );
}
