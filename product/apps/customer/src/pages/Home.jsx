import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Gift, Coffee, Loader2 } from 'lucide-react'
import { api, auth } from '../lib'

function initials(name) {
  return (name || '?').split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
}

// Mapea una membresía (datos reales) a la forma visual de la tarjeta.
function toCard(m) {
  return {
    id: m.id,
    color: m.merchant?.brand_color || m.card?.color || '#8b3dff',
    merchant_name: m.merchant?.name || 'Local',
    merchant_initial: initials(m.merchant?.name),
    stamps_required: m.card?.stamps_required ?? 8,
    stamps_collected: m.current_stamps ?? 0,
    reward: m.card?.reward_text || 'Premio',
  }
}

function CreditCard({ card, index }) {
  const remaining = card.stamps_required - card.stamps_collected
  return (
    <Link
      to={`/card/${card.id}`}
      className="block active:scale-[0.97] transition-transform duration-200"
      style={{ marginTop: index === 0 ? 0 : -80, zIndex: index, position: 'relative' }}
    >
      <div
        className="rounded-2xl p-5 text-white shadow-xl relative overflow-hidden"
        style={{ backgroundColor: card.color, aspectRatio: '1.586', boxShadow: `0 ${8 + index * 2}px ${20 + index * 4}px ${card.color}35` }}
      >
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: `radial-gradient(circle at 80% 20%, white 0%, transparent 50%), radial-gradient(circle at 20% 80%, white 0%, transparent 40%)` }} />
        <img src="/wafi-logo.svg" alt="" className="absolute bottom-2.5 right-3 h-3 opacity-[0.15] pointer-events-none" style={{ filter: 'brightness(10)' }} />
        <div className="relative h-full flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-base tracking-wide">{card.merchant_name}</h3>
              <p className="text-[11px] opacity-60 mt-0.5">{card.stamps_required} consumos = 1 premio</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-sm font-bold">
              {card.merchant_initial}
            </div>
          </div>
          <div className="flex gap-1.5">
            {Array.from({ length: card.stamps_required }).map((_, i) => (
              <div key={i} className="flex-1 h-2.5 rounded-full transition-all duration-500"
                style={{ backgroundColor: i < card.stamps_collected ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.15)' }} />
            ))}
          </div>
          <div className="flex items-end justify-between">
            <div className="flex items-center gap-1.5 text-[11px] opacity-70 max-w-[60%]">
              <Gift size={11} className="shrink-0" />
              <span className="truncate">{card.reward}</span>
            </div>
            <div className="text-right">
              <p className="text-xl font-extrabold leading-none">
                {card.stamps_collected}<span className="text-sm font-medium opacity-50">/{card.stamps_required}</span>
              </p>
              <p className="text-[10px] opacity-50 mt-0.5">{remaining === 1 ? '¡Falta 1!' : `Faltan ${remaining}`}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [cards, setCards] = useState([])
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const session = await auth.getSession()
        if (alive && session?.user?.email) setGreeting(session.user.email.split('@')[0])
        if (session) {
          const data = await api.myCards()
          if (alive) setCards((data || []).map(toCard))
        }
      } catch { /* sin sesión o error → estado vacío */ }
      finally { if (alive) setLoading(false) }
    })()
    return () => { alive = false }
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm text-gray-400">Hola,</p>
          <h1 className="text-2xl font-bold text-dark">{greeting || 'que volvés'}</h1>
        </div>
        <Link to="/notifications" className="relative w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-wafi-400" /></div>
      ) : cards.length > 0 ? (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Coffee size={14} className="text-wafi-500" />
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Mis tarjetas</p>
          </div>
          <div className="pb-4">
            {cards.map((card, i) => <CreditCard key={card.id} card={card} index={i} />)}
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-3xl bg-wafi-50 flex items-center justify-center mx-auto mb-4">
            <Coffee size={36} className="text-wafi-400" />
          </div>
          <h2 className="text-lg font-bold text-dark mb-2">Sin tarjetas todavía</h2>
          <p className="text-sm text-gray-500 leading-relaxed">Escaneá el QR en tu café favorito para empezar a acumular sellos.</p>
        </div>
      )}
    </div>
  )
}
