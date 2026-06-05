import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ArrowLeft, Gift, Sparkles } from 'lucide-react'
import { customerCards } from '../data/mock'

function StampCircle({ index, filled, color, animate, total }) {
  const isReward = index === total - 1

  return (
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
        animate ? 'animate-stamp-pop' : ''
      }`}
      style={{
        borderColor: filled ? color : color + '40',
        backgroundColor: filled ? color : 'transparent',
        color: filled ? '#fff' : color + '80',
      }}
    >
      {isReward && !filled ? (
        <Gift size={18} style={{ color: color + '60' }} />
      ) : filled ? (
        '✓'
      ) : (
        index + 1
      )}
    </div>
  )
}

function CompletionOverlay({ card, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6">
      <div className="bg-white rounded-3xl p-8 text-center max-w-sm w-full animate-card-complete">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: card.color + '18' }}
        >
          <Sparkles size={40} style={{ color: card.color }} />
        </div>
        <h2 className="text-xl font-bold text-dark mb-2">¡Felicitaciones!</h2>
        <p className="text-gray-500 mb-2">Completaste tu tarjeta</p>
        <p className="text-lg font-semibold mb-6" style={{ color: card.color }}>
          {card.reward}
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Tu voucher ya está disponible en la sección de Vouchers.
        </p>
        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-pill text-white font-semibold text-sm"
          style={{ backgroundColor: card.color }}
        >
          ¡Genial!
        </button>
      </div>
    </div>
  )
}

export default function CardView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const card = customerCards.find((c) => c.id === id)
  const [showCompletion, setShowCompletion] = useState(false)
  const [animatedStamp, setAnimatedStamp] = useState(-1)

  useEffect(() => {
    if (card && card.completed) {
      const timer = setTimeout(() => setShowCompletion(true), 600)
      return () => clearTimeout(timer)
    }
  }, [card])

  // Simulate stamp animation on mount for the latest stamp
  useEffect(() => {
    if (card && card.stamps_collected > 0) {
      const timer = setTimeout(() => {
        setAnimatedStamp(card.stamps_collected - 1)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [card])

  if (!card) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Tarjeta no encontrada</p>
        <button onClick={() => navigate('/')} className="text-wafi-500 mt-2 text-sm font-medium">
          Volver
        </button>
      </div>
    )
  }

  const progress = Math.round((card.stamps_collected / card.stamps_required) * 100)

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 text-sm mb-6"
      >
        <ArrowLeft size={18} />
        Volver
      </button>

      {/* Card header */}
      <div
        className="rounded-2xl p-6 text-white mb-6"
        style={{ backgroundColor: card.color }}
      >
        <p className="text-sm opacity-70">{card.merchant_name}</p>
        <h1 className="text-xl font-bold mt-1">{card.card_name}</h1>
        <p className="text-sm opacity-80 mt-1">{card.reward}</p>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="opacity-70">
              {card.stamps_collected} / {card.stamps_required} sellos
            </span>
            <span className="font-semibold">{progress}%</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stamps grid */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <p className="text-sm font-medium text-gray-500 mb-4">Tus sellos</p>
        <div className="grid grid-cols-4 gap-3 justify-items-center">
          {Array.from({ length: card.stamps_required }).map((_, i) => (
            <StampCircle
              key={i}
              index={i}
              filled={i < card.stamps_collected}
              color={card.color}
              animate={i === animatedStamp}
              total={card.stamps_required}
            />
          ))}
        </div>

        {!card.completed && (
          <p className="text-center text-sm text-gray-400 mt-5">
            {card.stamps_required - card.stamps_collected === 1
              ? '¡Te falta solo 1 sello!'
              : `Faltan ${card.stamps_required - card.stamps_collected} sellos para tu recompensa`}
          </p>
        )}

        {card.completed && (
          <div className="mt-5 text-center">
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-sm font-semibold">
              <Sparkles size={16} />
              ¡Tarjeta completada!
            </span>
          </div>
        )}
      </div>

      {/* Last stamp info */}
      <p className="text-xs text-gray-400 text-center mt-4">
        Último sello: {new Date(card.last_stamp).toLocaleDateString('es-AR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </p>

      {showCompletion && (
        <CompletionOverlay card={card} onClose={() => setShowCompletion(false)} />
      )}
    </div>
  )
}
