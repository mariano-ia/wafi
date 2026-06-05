import { useState, useEffect } from 'react'
import { useScrollReveal, useCountUp } from './hooks/useScrollReveal'
import {
  ScanLine, Gift, Bell, BarChart3, Shield, Zap,
  Check, ArrowRight, ChevronDown, Star, Menu, X,
  QrCode, Smartphone, Coffee, Users, TrendingUp,
  CreditCard, Clock, Sparkles
} from 'lucide-react'

// --- PHOTOS: Nano Banana Pro — specialty coffee, real people, global cities ---
const photos = {
  hero: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=900&q=80',
  cafe1: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80',
  cafe2: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=600&q=80',
  cafe3: 'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=600&q=80',
  person1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  person2: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  person3: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
  barista: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80',
  latte: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
}

// --- NAVBAR ---
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2">
          <img src="/wafi-logo.svg" alt="Wafi" className="h-7" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#como-funciona" className="text-sm font-medium text-gray-600 hover:text-dark transition-colors">Cómo funciona</a>
          <a href="#beneficios" className="text-sm font-medium text-gray-600 hover:text-dark transition-colors">Beneficios</a>
          <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-dark transition-colors">Precios</a>
          <a href="#pricing" className="bg-wafi-500 hover:bg-wafi-600 text-white px-5 py-2.5 rounded-pill text-sm font-semibold transition-all hover:shadow-lg hover:shadow-wafi-500/20 active:scale-95">
            Empezar gratis
          </a>
        </div>

        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
          <a href="#como-funciona" className="block text-sm font-medium py-2" onClick={() => setMobileOpen(false)}>Cómo funciona</a>
          <a href="#beneficios" className="block text-sm font-medium py-2" onClick={() => setMobileOpen(false)}>Beneficios</a>
          <a href="#pricing" className="block text-sm font-medium py-2" onClick={() => setMobileOpen(false)}>Precios</a>
          <a href="#pricing" className="block bg-wafi-500 text-white px-5 py-3 rounded-pill text-sm font-semibold text-center" onClick={() => setMobileOpen(false)}>
            Empezar gratis
          </a>
        </div>
      )}
    </nav>
  )
}

// --- HERO ---
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-wafi-50 via-white to-purple-50/50" />
      <div className="absolute top-20 -right-32 w-96 h-96 bg-wafi-200/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-32 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-0">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-wafi-50 border border-wafi-100 rounded-full px-4 py-1.5 mb-6 animate-float">
              <Sparkles size={14} className="text-wafi-500" />
              <span className="text-xs font-semibold text-wafi-700">Fidelización digital para cafeterías</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-dark leading-[1.05] mb-6">
              Tus clientes vuelven{' '}
              <span className="gradient-text">23% más seguido</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-8 max-w-lg">
              Un QR en la barra. Tu cliente escanea, suma sellos y gana recompensas.
              Sin apps, sin hardware, sin fricción.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a
                href="#pricing"
                className="bg-wafi-500 hover:bg-wafi-600 text-white px-8 py-4 rounded-pill text-base font-bold transition-all hover:shadow-xl hover:shadow-wafi-500/25 active:scale-95 text-center animate-pulse-glow"
              >
                Empezar gratis
              </a>
              <a
                href="#como-funciona"
                className="border-2 border-gray-200 hover:border-wafi-300 text-dark px-8 py-4 rounded-pill text-base font-bold transition-all hover:bg-wafi-50 active:scale-95 text-center flex items-center justify-center gap-2"
              >
                Ver cómo funciona <ChevronDown size={18} />
              </a>
            </div>

            {/* Social proof mini */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[photos.person1, photos.person2, photos.person3].map((src, i) => (
                  <img key={i} src={src} alt="" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                ))}
              </div>
              <div>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((i) => <Star key={i} size={12} className="text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-xs text-gray-500">+200 cafeterías ya usan Wafi</p>
              </div>
            </div>
          </div>

          {/* Right: mockup */}
          <div className="relative hidden md:block">
            <div className="animate-float">
              {/* Phone frame */}
              <div className="w-72 mx-auto bg-dark rounded-[2.5rem] p-3 shadow-2xl shadow-wafi-900/20">
                <div className="bg-white rounded-[2rem] overflow-hidden">
                  {/* Status bar mock */}
                  <div className="h-8 bg-wafi-500 flex items-center justify-center">
                    <span className="text-white text-[10px] font-semibold">Wafi</span>
                  </div>
                  {/* Card mock */}
                  <div className="p-4 space-y-3">
                    <p className="text-[11px] text-gray-400">Hola, Martina</p>
                    <div className="bg-wafi-500 rounded-xl p-4 text-white">
                      <p className="text-xs font-bold">Café Roma</p>
                      <p className="text-[10px] opacity-60 mb-2">8 consumos = 1 café gratis</p>
                      <div className="flex gap-1">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div key={i} className="flex-1 h-2 rounded-full" style={{
                            backgroundColor: i < 5 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.2)'
                          }} />
                        ))}
                      </div>
                      <p className="text-[9px] opacity-40 mt-1.5">Faltan 3</p>
                    </div>
                    <div className="bg-amber-800 rounded-xl p-4 text-white">
                      <p className="text-xs font-bold">Cuervo Café</p>
                      <p className="text-[10px] opacity-60 mb-2">6 consumos = tostado gratis</p>
                      <div className="flex gap-1">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div key={i} className="flex-1 h-2 rounded-full" style={{
                            backgroundColor: i < 2 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.2)'
                          }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -left-8 top-20 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2 animate-float-delayed">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <Check size={14} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-dark">¡Sello sumado!</p>
                <p className="text-[9px] text-gray-400">Hace 2 min</p>
              </div>
            </div>

            <div className="absolute -right-4 bottom-32 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2 animate-float">
              <div className="w-8 h-8 rounded-full bg-wafi-100 flex items-center justify-center">
                <Gift size={14} className="text-wafi-600" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-dark">¡Ganaste un café!</p>
                <p className="text-[9px] text-gray-400">Tarjeta completa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// --- LOGOS MARQUEE ---
function LogosMarquee() {
  const logos = ['Café Roma', 'Cuervo Café', 'La Biela', 'Lattente', 'Félix Specialty', 'Full City', 'Coffee Town', 'Brew Bar', 'Origen Café', 'Negro Cueva']

  return (
    <section className="py-12 border-y border-gray-100 overflow-hidden bg-gray-50/50">
      <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
        Cafeterías que ya eligen Wafi
      </p>
      <div className="relative">
        <div className="animate-marquee flex gap-12 whitespace-nowrap">
          {[...logos, ...logos].map((name, i) => (
            <span key={i} className="text-lg font-bold text-gray-300 flex items-center gap-2">
              <Coffee size={18} /> {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// --- STATS ---
function Stats() {
  const [ref, visible] = useScrollReveal(0.3)
  const [v1, start1] = useCountUp(23, 1200, true)
  const [v2, start2] = useCountUp(89, 1200, true)
  const [v3, start3] = useCountUp(3, 800, true)
  const [v4, start4] = useCountUp(47, 1200, true)

  useEffect(() => {
    if (visible) { start1(); start2(); start3(); start4(); }
  }, [visible])

  const items = [
    { value: `+${v1}%`, label: 'Aumento en frecuencia de visita', sub: 'Clientes que usan sellos digitales vuelven más seguido' },
    { value: `${v2}%`, label: 'Tarjetas se completan', sub: 'vs. 12% en tarjetas de cartón que se pierden' },
    { value: `${v3}min`, label: 'Setup completo', sub: 'Creás tu tarjeta, imprimís el QR y listo' },
    { value: `+${v4}%`, label: 'Aumento en ticket promedio', sub: 'Clientes fidelizados gastan más por visita' },
  ]

  return (
    <section ref={ref} className="py-24 px-6" id="beneficios">
      <div className={`max-w-6xl mx-auto stagger-children ${visible ? 'visible' : ''}`}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-dark mb-4">
            Los números hablan
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            La fidelización digital no es una moda. Es la diferencia entre un cliente que viene una vez y uno que vuelve siempre.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-gradient-to-b from-gray-50 to-white border border-gray-100 hover:border-wafi-200 hover:shadow-lg hover:shadow-wafi-500/5 transition-all duration-300 group">
              <p className="text-4xl md:text-5xl font-black gradient-text mb-2 group-hover:scale-110 transition-transform">
                {item.value}
              </p>
              <p className="text-sm font-bold text-dark mb-1">{item.label}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// --- HOW IT WORKS ---
function HowItWorks() {
  const [ref, visible] = useScrollReveal(0.2)

  const steps = [
    {
      icon: CreditCard,
      title: 'Creá tu tarjeta',
      desc: 'Elegí cada cuántos consumos regalás algo y qué es. 2 minutos.',
      color: '#8b3dff',
    },
    {
      icon: QrCode,
      title: 'Imprimí el QR',
      desc: 'Pegalo en la barra o en la caja. Es lo único que necesitás.',
      color: '#ba43ce',
    },
    {
      icon: Smartphone,
      title: 'Tu cliente escanea',
      desc: 'Después de pagar, escanea el QR y suma un sello automáticamente.',
      color: '#f143c4',
    },
    {
      icon: Gift,
      title: 'Gana recompensas',
      desc: 'Al completar la tarjeta, recibe un voucher para canjear en el local.',
      color: '#ff6900',
    },
  ]

  return (
    <section ref={ref} id="como-funciona" className="py-24 px-6 bg-dark text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-wafi-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative">
        <div className={`text-center mb-16 animate-on-scroll ${visible ? 'visible' : ''}`}>
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Así de simple
          </h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Sin hardware. Sin apps complicadas. Sin capacitación.
          </p>
        </div>

        <div className={`grid md:grid-cols-4 gap-8 stagger-children ${visible ? 'visible' : ''}`}>
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={i} className="text-center group">
                {/* Step number */}
                <div className="text-6xl font-black text-white/5 mb-2 group-hover:text-white/10 transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: step.color + '20' }}
                >
                  <Icon size={28} style={{ color: step.color }} />
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>

                {/* Connector arrow (not on last) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute" style={{ left: `${(i + 1) * 25 - 2}%`, top: '58%' }}>
                    <ArrowRight size={20} className="text-white/10" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// --- FEATURES ---
function Features() {
  const [ref, visible] = useScrollReveal(0.15)

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className={`animate-on-scroll ${visible ? 'visible' : ''}`}>
          <h2 className="text-3xl md:text-5xl font-black text-dark mb-4 text-center">
            Todo lo que necesitás
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto text-center mb-16">
            Sin lo que no necesitás.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: image */}
          <div className={`animate-on-scroll-left ${visible ? 'visible' : ''}`}>
            <div className="rounded-3xl overflow-hidden h-full min-h-[400px] relative">
              <img
                src={photos.barista}
                alt="Barista preparando café"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-xl font-bold mb-1">Pensado para la barra</p>
                <p className="text-white/70 text-sm">No necesitás una tablet, ni un POS especial. Solo el QR impreso.</p>
              </div>
            </div>
          </div>

          {/* Right: feature cards */}
          <div className={`space-y-4 stagger-children ${visible ? 'visible' : ''}`}>
            {[
              { icon: ScanLine, title: 'QR universal', desc: 'Funciona con cualquier cámara. No necesitan descargar nada.', color: '#8b3dff' },
              { icon: Shield, title: 'Anti-abuso', desc: '1 hora de cooldown entre escaneos. No hay forma de hacer trampa.', color: '#0693e3' },
              { icon: BarChart3, title: 'Dashboard en vivo', desc: 'Índice de fidelización, categorías de clientes y métricas en tiempo real.', color: '#ff6900' },
              { icon: Bell, title: 'Notificaciones automáticas', desc: '"Te falta 1 sello", recordatorios de inactividad y saludos de cumpleaños.', color: '#ec4899' },
              { icon: Zap, title: 'Setup en 3 minutos', desc: 'Elegí la recompensa, imprimí el QR, pegalo en la barra. Listo.', color: '#10b981' },
              { icon: Clock, title: 'Sin contratos', desc: 'Plan gratis para siempre. Escalá cuando quieras, cancelá cuando quieras.', color: '#6b7280' },
            ].map((feat, i) => {
              const Icon = feat.icon
              return (
                <div key={i} className="flex gap-4 p-4 rounded-2xl border border-gray-100 hover:border-wafi-200 hover:shadow-md transition-all duration-300 bg-white group cursor-default">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: feat.color + '12' }}
                  >
                    <Icon size={20} style={{ color: feat.color }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark mb-0.5">{feat.title}</h3>
                    <p className="text-sm text-gray-500">{feat.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// --- GALLERY ---
function Gallery() {
  const [ref, visible] = useScrollReveal(0.15)

  return (
    <section ref={ref} className="py-16 px-6 bg-gray-50">
      <div className={`max-w-6xl mx-auto stagger-children ${visible ? 'visible' : ''}`}>
        <div className="grid grid-cols-3 gap-4 h-72 md:h-96">
          <div className="rounded-2xl overflow-hidden">
            <img src={photos.cafe1} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img src={photos.latte} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img src={photos.cafe3} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      </div>
    </section>
  )
}

// --- PRICING ---
function Pricing() {
  const [ref, visible] = useScrollReveal(0.15)
  const [annual, setAnnual] = useState(true)

  const plans = [
    {
      name: 'Gratis',
      desc: 'Para probar Wafi sin compromiso',
      price: 0,
      priceAnnual: 0,
      cta: 'Empezar gratis',
      ctaStyle: 'border-2 border-gray-200 text-dark hover:border-wafi-300 hover:bg-wafi-50',
      features: [
        '1 tarjeta de sellos',
        'Hasta 50 clientes',
        'QR para imprimir',
        'Dashboard básico',
      ],
    },
    {
      name: 'Pro',
      desc: 'Para cafeterías que quieren crecer',
      price: 29,
      priceAnnual: 24,
      cta: 'Elegir Pro',
      ctaStyle: 'bg-wafi-500 text-white hover:bg-wafi-600 shadow-lg shadow-wafi-500/20',
      popular: true,
      features: [
        'Clientes ilimitados',
        'Dashboard completo',
        'Índice de fidelización Wafi',
        'Notificaciones automáticas',
        'Categorías de clientes',
        'Personalización de colores y logo',
        'Soporte prioritario',
      ],
    },
    {
      name: 'Business',
      desc: 'Para cadenas y multi-sucursal',
      price: 79,
      priceAnnual: 65,
      cta: 'Contactar ventas',
      ctaStyle: 'border-2 border-gray-200 text-dark hover:border-wafi-300 hover:bg-wafi-50',
      features: [
        'Todo lo de Pro',
        'Multi-sucursal',
        'API de integración',
        'Reportes avanzados',
        'Marca blanca',
        'Manager dedicado',
        'SLA 99.9%',
      ],
    },
  ]

  return (
    <section ref={ref} id="pricing" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className={`text-center mb-12 animate-on-scroll ${visible ? 'visible' : ''}`}>
          <h2 className="text-3xl md:text-5xl font-black text-dark mb-4">
            Precios simples
          </h2>
          <p className="text-lg text-gray-500 mb-8">
            Sin sorpresas. Sin letra chica. Cancelá cuando quieras.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                !annual ? 'bg-white shadow-sm text-dark' : 'text-gray-500'
              }`}
            >
              Mensual
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                annual ? 'bg-white shadow-sm text-dark' : 'text-gray-500'
              }`}
            >
              Anual <span className="text-emerald-500 text-xs ml-1">-17%</span>
            </button>
          </div>
        </div>

        <div className={`grid md:grid-cols-3 gap-6 stagger-children ${visible ? 'visible' : ''}`}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-3xl p-7 border-2 transition-all duration-300 hover:shadow-xl card-shine ${
                plan.popular
                  ? 'border-wafi-500 shadow-lg shadow-wafi-500/10'
                  : 'border-gray-100 hover:border-wafi-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-wafi-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                  Más popular
                </div>
              )}

              <h3 className="text-xl font-bold text-dark">{plan.name}</h3>
              <p className="text-sm text-gray-500 mb-5">{plan.desc}</p>

              <div className="flex items-end gap-1 mb-6">
                {plan.price === 0 ? (
                  <span className="text-4xl font-black text-dark">$0</span>
                ) : (
                  <>
                    <span className="text-4xl font-black text-dark">
                      ${annual ? plan.priceAnnual : plan.price}
                    </span>
                    <span className="text-gray-400 text-sm mb-1">USD/mes</span>
                  </>
                )}
              </div>

              <a
                href="#"
                className={`block w-full py-3.5 rounded-pill text-center text-sm font-bold transition-all active:scale-95 ${plan.ctaStyle}`}
              >
                {plan.cta}
              </a>

              <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                {plan.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Check size={16} className="text-wafi-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// --- TESTIMONIALS ---
function Testimonials() {
  const [ref, visible] = useScrollReveal(0.15)

  const testimonials = [
    {
      name: 'Sofía Pellegrini',
      role: 'Dueña de Lattente, Buenos Aires',
      img: photos.person2,
      text: 'Antes regalaba tarjetas de cartón que nadie completaba. Desde que pusimos Wafi, los clientes preguntan cuánto les falta. Es otra cosa.',
    },
    {
      name: 'Tomás Herrera',
      role: 'Gerente de Cuervo Café, Córdoba',
      img: photos.person1,
      text: 'Lo instalamos un lunes, el viernes ya teníamos 40 clientes escaneando. El dashboard me muestra quiénes son mis clientes VIP. Antes no tenía idea.',
    },
    {
      name: 'Matías Ríos',
      role: 'Fundador de Brew Bar, Montevideo',
      img: photos.person3,
      text: 'Probamos 3 herramientas antes. Wafi es la primera que mis baristas entienden sin explicar. Un QR y listo, no hay más que eso.',
    },
  ]

  return (
    <section ref={ref} className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 animate-on-scroll ${visible ? 'visible' : ''}`}>
          <h2 className="text-3xl md:text-5xl font-black text-dark mb-4">
            Lo dicen ellos
          </h2>
        </div>

        <div className={`grid md:grid-cols-3 gap-6 stagger-children ${visible ? 'visible' : ''}`}>
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="flex gap-0.5 mb-4">
                {[1,2,3,4,5].map((s) => <Star key={s} size={14} className="text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-bold text-dark">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// --- FAQ ---
function FAQ() {
  const [ref, visible] = useScrollReveal(0.15)
  const [open, setOpen] = useState(null)

  const faqs = [
    { q: '¿Mis clientes tienen que descargar una app?', a: 'No. Wafi funciona como una web app (PWA). El cliente escanea el QR con la cámara del celular y accede directo. Sin descargas, sin registro largo.' },
    { q: '¿Qué necesito para empezar?', a: 'Solo crear tu cuenta, configurar tu tarjeta de sellos (2 minutos) e imprimir el QR. Pegalo en la barra, en la caja, o donde quieras. Eso es todo.' },
    { q: '¿Cómo evitan que un cliente haga trampa?', a: 'Hay un cooldown de 1 hora entre escaneo y escaneo del mismo cliente en el mismo local. No se puede escanear dos veces seguidas.' },
    { q: '¿Puedo cambiar la recompensa después?', a: 'Sí, podés editar la recompensa, la cantidad de sellos y los colores de tu tarjeta en cualquier momento desde el dashboard.' },
    { q: '¿Hay contrato o permanencia mínima?', a: 'No. Pagás mes a mes (o año si preferís el descuento). Cancelás cuando quieras sin penalidad.' },
    { q: '¿Funciona para cadenas con varias sucursales?', a: 'Sí, el plan Business está pensado para eso. Dashboard multi-sucursal, reportes consolidados y un manager dedicado.' },
  ]

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className={`text-center mb-12 animate-on-scroll ${visible ? 'visible' : ''}`}>
          <h2 className="text-3xl md:text-5xl font-black text-dark mb-4">
            Preguntas frecuentes
          </h2>
        </div>

        <div className={`space-y-3 stagger-children ${visible ? 'visible' : ''}`}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-gray-100 rounded-2xl overflow-hidden hover:border-wafi-200 transition-colors"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-semibold text-dark pr-4">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-gray-400 shrink-0 transition-transform duration-300 ${
                    open === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="px-5 pb-5 text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// --- FINAL CTA ---
function FinalCTA() {
  const [ref, visible] = useScrollReveal(0.2)

  return (
    <section ref={ref} className="py-24 px-6">
      <div className={`max-w-4xl mx-auto animate-on-scroll-scale ${visible ? 'visible' : ''}`}>
        <div className="bg-gradient-to-br from-wafi-500 via-wafi-600 to-purple-700 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-60 h-60 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full blur-2xl" />

          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
              Tu próximo cliente habitual<br />empieza con un escaneo
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
              Configurá tu tarjeta en 3 minutos. Sin tarjeta de crédito, sin compromiso.
            </p>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 bg-white text-wafi-600 px-8 py-4 rounded-pill text-base font-bold hover:shadow-2xl hover:scale-105 transition-all active:scale-95"
            >
              Empezar gratis <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// --- FOOTER ---
function Footer() {
  return (
    <footer className="bg-dark text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <img src="/wafi-logo.svg" alt="Wafi" className="h-8 mb-4" style={{ filter: 'brightness(10)' }} />
            <p className="text-sm text-gray-400 leading-relaxed">
              Fidelización digital para cafeterías de especialidad. Simple, moderno, efectivo.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4">Producto</h4>
            <div className="space-y-2.5">
              <a href="#como-funciona" className="block text-sm text-gray-400 hover:text-white transition-colors">Cómo funciona</a>
              <a href="#pricing" className="block text-sm text-gray-400 hover:text-white transition-colors">Precios</a>
              <a href="#beneficios" className="block text-sm text-gray-400 hover:text-white transition-colors">Beneficios</a>
              <a href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">API</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4">Empresa</h4>
            <div className="space-y-2.5">
              <a href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">Sobre nosotros</a>
              <a href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">Blog</a>
              <a href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">Contacto</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4">Legal</h4>
            <div className="space-y-2.5">
              <a href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">Términos de servicio</a>
              <a href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">Privacidad</a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2026 Wafi. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Instagram</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Twitter</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// --- APP ---
export default function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <LogosMarquee />
      <Stats />
      <HowItWorks />
      <Features />
      <Gallery />
      <Pricing />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  )
}
