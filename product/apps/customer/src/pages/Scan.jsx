import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Coffee, Check, Clock, MapPin, Gift, Loader2, AlertCircle, PartyPopper } from 'lucide-react'
import { api, auth } from '../lib'

// Landing de escaneo. El QR estático del local apunta acá: /s/{slug}
// Flujo: cargar branding -> login (email OTP interino) -> pedir ubicación -> sumar sello (RPC real).

function deviceId() {
  try {
    let id = localStorage.getItem('wafi_device')
    if (!id) { id = crypto.randomUUID(); localStorage.setItem('wafi_device', id) }
    return id
  } catch { return null }
}

function getPosition() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) return resolve(null)
    navigator.geolocation.getCurrentPosition(
      (p) => resolve({ lat: p.coords.latitude, lng: p.coords.longitude }),
      () => resolve(null),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 },
    )
  })
}

// Header + contenedor (a nivel módulo: NO se remonta en cada render → no se pierde el foco)
function Shell({ color, name, card, children }) {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <div className="px-5 pt-10 pb-6 text-white" style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center font-bold text-lg">
            {name ? name.split(' ').map((w) => w[0]).slice(0, 2).join('') : <Coffee size={22} />}
          </div>
          <div>
            <p className="text-xs text-white/70">Tarjeta de sellos</p>
            <h1 className="text-xl font-bold leading-tight">{name || 'Wafi'}</h1>
          </div>
        </div>
        {card && <p className="text-sm text-white/80 mt-3">{card.stamps_required} sellos = {card.reward_text}</p>}
      </div>
      <div className="flex-1 px-5 py-6">{children}</div>
    </div>
  )
}

function ResultMsg({ icon: Icon, tone, title, text }) {
  const tones = { amber: 'bg-amber-100 text-amber-500', gray: 'bg-gray-100 text-gray-400' }
  return (
    <div className="text-center py-4">
      <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${tones[tone]}`}>
        <Icon size={36} />
      </div>
      <h2 className="font-bold text-dark text-lg mb-1">{title}</h2>
      <p className="text-sm text-gray-500 px-4">{text}</p>
    </div>
  )
}

export default function Scan() {
  const { slug } = useParams()
  const [phase, setPhase] = useState('loading') // loading|notfound|login|otp|ready|scanning|result
  const [branding, setBranding] = useState(null)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const color = branding?.merchant?.brand_color || '#8b3dff'
  const name = branding?.merchant?.name || ''
  const card = branding?.card

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const b = await api.getMerchant(slug)
        if (!alive) return
        if (!b?.found) return setPhase('notfound')
        setBranding(b)
        const session = await auth.getSession()
        setPhase(session ? 'ready' : 'login')
      } catch {
        if (alive) { setError('No pudimos cargar el local. Probá de nuevo.'); setPhase('notfound') }
      }
    })()
    return () => { alive = false }
  }, [slug])

  async function handleSendOtp(e) {
    e.preventDefault(); setError(''); setBusy(true)
    try { await auth.sendEmailOtp(email.trim()); setPhase('otp') }
    catch { setError('No pudimos enviar el código. Revisá el email.') }
    finally { setBusy(false) }
  }

  async function handleVerifyOtp(e) {
    e.preventDefault(); setError(''); setBusy(true)
    try { await auth.verifyEmailOtp(email.trim(), otp.trim()); setPhase('ready') }
    catch { setError('Código incorrecto o vencido.') }
    finally { setBusy(false) }
  }

  async function handleScan() {
    setError(''); setPhase('scanning')
    const pos = await getPosition()
    try {
      const r = await api.registerScan(slug, { lat: pos?.lat ?? null, lng: pos?.lng ?? null, fingerprint: deviceId() })
      setResult(r); setPhase('result')
    } catch {
      setResult({ status: 'invalid', reason: 'error' }); setPhase('result')
    }
  }

  if (phase === 'loading') {
    return <div className="min-h-screen bg-surface flex items-center justify-center"><Loader2 className="animate-spin text-wafi-500" /></div>
  }

  if (phase === 'notfound') {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-8 text-center">
        <AlertCircle className="text-gray-300 mb-4" size={48} />
        <h1 className="text-lg font-bold text-dark mb-1">No encontramos este local</h1>
        <p className="text-sm text-gray-500">{error || 'Revisá el QR e intentá de nuevo.'}</p>
      </div>
    )
  }

  if (phase === 'login') {
    return (
      <Shell color={color} name={name} card={card}>
        <h2 className="font-bold text-dark text-lg mb-1">Para guardar tu sello, ingresá tu email</h2>
        <p className="text-sm text-gray-500 mb-5">Te mandamos un código para confirmar tu cuenta. Es de una sola vez.</p>
        <form onSubmit={handleSendOtp} className="space-y-3">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com" autoComplete="email"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-wafi-400 outline-none" />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button disabled={busy} className="w-full py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-60" style={{ backgroundColor: color }}>
            {busy ? <Loader2 size={18} className="animate-spin" /> : 'Enviar código'}
          </button>
        </form>
      </Shell>
    )
  }

  if (phase === 'otp') {
    return (
      <Shell color={color} name={name} card={card}>
        <h2 className="font-bold text-dark text-lg mb-1">Ingresá el código</h2>
        <p className="text-sm text-gray-500 mb-5">Te lo mandamos a {email}.</p>
        <form onSubmit={handleVerifyOtp} className="space-y-3">
          <input inputMode="numeric" required value={otp} onChange={(e) => setOtp(e.target.value)}
            placeholder="● ● ● ● ● ●" maxLength={6}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-wafi-400 outline-none text-center text-lg tracking-widest" />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button disabled={busy} className="w-full py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-60" style={{ backgroundColor: color }}>
            {busy ? <Loader2 size={18} className="animate-spin" /> : 'Confirmar'}
          </button>
        </form>
      </Shell>
    )
  }

  if (phase === 'ready') {
    return (
      <Shell color={color} name={name} card={card}>
        <div className="text-center py-6">
          <div className="w-20 h-20 rounded-3xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: color + '15' }}>
            <MapPin size={34} style={{ color }} />
          </div>
          <h2 className="font-bold text-dark text-lg mb-1">Estás en {name}</h2>
          <p className="text-sm text-gray-500 mb-6 px-4">Tocá para sumar tu sello. Te vamos a pedir la ubicación para confirmar que estás en el local.</p>
          <button onClick={handleScan} className="w-full py-4 rounded-xl text-white font-bold text-lg" style={{ backgroundColor: color }}>
            Sumar mi sello
          </button>
        </div>
      </Shell>
    )
  }

  if (phase === 'scanning') {
    return (
      <Shell color={color} name={name} card={card}>
        <div className="text-center py-12">
          <Loader2 className="animate-spin mx-auto mb-4" style={{ color }} size={40} />
          <p className="text-sm text-gray-500">Confirmando que estás en el local…</p>
        </div>
      </Shell>
    )
  }

  // phase === 'result'
  const r = result || {}
  const remaining = (r.stamps_required ?? 0) - (r.current_stamps ?? 0)
  return (
    <Shell color={color} name={name} card={card}>
      {r.status === 'valid' && !r.completed && (
        <div className="text-center py-4">
          <div className="w-20 h-20 rounded-full bg-emerald-500 mx-auto mb-4 flex items-center justify-center animate-stamp-pop">
            <Check size={40} className="text-white" />
          </div>
          <h2 className="font-bold text-dark text-xl mb-1">¡Sello sumado!</h2>
          <p className="text-sm text-gray-500 mb-5">
            Llevás {r.current_stamps}/{r.stamps_required}. {remaining === 1 ? '¡Te falta 1!' : `Te faltan ${remaining}.`}
          </p>
          <div className="flex gap-1.5 justify-center flex-wrap max-w-xs mx-auto">
            {Array.from({ length: r.stamps_required }).map((_, i) => (
              <div key={i} className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: i < r.current_stamps ? color : color + '20' }}>
                {i < r.current_stamps && <Coffee size={12} className="text-white" />}
              </div>
            ))}
          </div>
        </div>
      )}

      {r.status === 'valid' && r.completed && (
        <div className="text-center py-4">
          <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center animate-stamp-pop" style={{ backgroundColor: color }}>
            <PartyPopper size={40} className="text-white" />
          </div>
          <h2 className="font-bold text-dark text-xl mb-1">¡Completaste la tarjeta!</h2>
          <p className="text-sm text-gray-500 mb-5">Ganaste: <b>{card?.reward_text}</b>. Tu premio te espera.</p>
          <a href="/vouchers" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold" style={{ backgroundColor: color }}>
            <Gift size={18} /> Canjear en Wafi
          </a>
        </div>
      )}

      {r.status === 'cooldown' && (
        <ResultMsg icon={Clock} tone="amber" title="Recién sumaste un sello"
          text="Tenés que esperar un rato entre escaneos en el mismo local. Volvé más tarde." />
      )}
      {(r.status === 'geofence_fail' || r.status === 'no_presence') && (
        <ResultMsg icon={MapPin} tone="amber" title="Tenés que estar en el local"
          text="Para sumar el sello necesitás estar en el café y permitir la ubicación. Activala e intentá de nuevo." />
      )}
      {r.status === 'daily_cap' && (
        <ResultMsg icon={Check} tone="amber" title="Ya sumaste por hoy"
          text="Mañana podés volver a sumar. ¡Gracias por la visita!" />
      )}
      {r.status === 'subscription_inactive' && (
        <ResultMsg icon={AlertCircle} tone="gray" title="El programa está en pausa"
          text="Este local todavía no reactivó su programa de sellos. Tus sellos anteriores siguen guardados." />
      )}
      {(r.status === 'invalid' || !['valid', 'cooldown', 'geofence_fail', 'no_presence', 'daily_cap', 'subscription_inactive'].includes(r.status)) && (
        <ResultMsg icon={AlertCircle} tone="gray" title="No pudimos sumar el sello"
          text="Probá de nuevo en un momento." />
      )}

      {r.status !== 'valid' && (
        <button onClick={() => setPhase('ready')} className="w-full mt-6 py-3 rounded-xl bg-gray-100 text-dark font-medium">Intentar de nuevo</button>
      )}
    </Shell>
  )
}
