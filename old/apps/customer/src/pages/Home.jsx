import { Link } from 'react-router-dom'
import { Gift, Coffee } from 'lucide-react'
import { customerCards, user, notifications } from '../data/mock'

const unreadCount = notifications.filter((n) => !n.read).length

function CreditCard({ card, index }) {
  const progress = Math.round((card.stamps_collected / card.stamps_required) * 100)
  const remaining = card.stamps_required - card.stamps_collected

  return (
    <Link
      to={`/card/${card.id}`}
      className="block active:scale-[0.97] transition-transform duration-200"
      style={{
        marginTop: index === 0 ? 0 : -80,
        zIndex: index,
        position: 'relative',
      }}
    >
      {/* Credit card shape: 85.6mm × 53.98mm ratio ≈ 1.586 */}
      <div
        className="rounded-2xl p-5 text-white shadow-xl relative overflow-hidden"
        style={{
          backgroundColor: card.color,
          aspectRatio: '1.586',
          boxShadow: `0 ${8 + index * 2}px ${20 + index * 4}px ${card.color}35`,
        }}
      >
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(circle at 80% 20%, white 0%, transparent 50%),
                              radial-gradient(circle at 20% 80%, white 0%, transparent 40%)`,
          }}
        />
        {/* Wafi watermark */}
        <img
          src="/wafi-logo.svg"
          alt=""
          className="absolute bottom-2.5 right-3 h-3 opacity-[0.15] pointer-events-none"
          style={{ filter: 'brightness(10)' }}
        />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between">
          {/* Top: merchant name + initials */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-base tracking-wide">{card.merchant_name}</h3>
              <p className="text-[11px] opacity-60 mt-0.5">{card.stamps_required} consumos = 1 premio</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-sm font-bold">
              {card.merchant_initial}
            </div>
          </div>

          {/* Middle: stamp progress dots */}
          <div className="flex gap-1.5">
            {Array.from({ length: card.stamps_required }).map((_, i) => (
              <div
                key={i}
                className="flex-1 h-2.5 rounded-full transition-all duration-500"
                style={{
                  backgroundColor: i < card.stamps_collected
                    ? 'rgba(255,255,255,0.9)'
                    : 'rgba(255,255,255,0.15)',
                }}
              />
            ))}
          </div>

          {/* Bottom: reward + status */}
          <div className="flex items-end justify-between">
            <div className="flex items-center gap-1.5 text-[11px] opacity-70 max-w-[60%]">
              <Gift size={11} className="shrink-0" />
              <span className="truncate">{card.reward}</span>
            </div>
            <div className="text-right">
              {card.completed ? (
                <span className="text-[11px] font-bold bg-white/25 px-2.5 py-1 rounded-full">
                  ¡Completa!
                </span>
              ) : (
                <div>
                  <p className="text-xl font-extrabold leading-none">
                    {card.stamps_collected}
                    <span className="text-sm font-medium opacity-50">/{card.stamps_required}</span>
                  </p>
                  <p className="text-[10px] opacity-50 mt-0.5">
                    {remaining === 1 ? '¡Falta 1!' : `Faltan ${remaining}`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function Home() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm text-gray-400">Hola,</p>
          <h1 className="text-2xl font-bold text-dark">{user.name.split(' ')[0]}</h1>
        </div>
        <Link
          to="/notifications"
          className="relative w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-wafi-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Link>
      </div>

      {/* Wallet stack */}
      {customerCards.length > 0 ? (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Coffee size={14} className="text-wafi-500" />
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Mis tarjetas
            </p>
          </div>
          <div className="pb-4">
            {customerCards.map((card, i) => (
              <CreditCard key={card.id} card={card} index={i} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-3xl bg-wafi-50 flex items-center justify-center mx-auto mb-4">
            <Coffee size={36} className="text-wafi-400" />
          </div>
          <h2 className="text-lg font-bold text-dark mb-2">Sin tarjetas todavía</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Escaneá el QR en tu café favorito para empezar a acumular sellos.
          </p>
        </div>
      )}
    </div>
  )
}
