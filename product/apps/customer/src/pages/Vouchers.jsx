import { useState, useEffect, useRef } from 'react'
import { Gift, Check, Clock, X, ShieldCheck } from 'lucide-react'
import { vouchers as initialVouchers } from '../data/mock'

const REDEEM_TIMER_SECONDS = 300 // 5 minutes

function RedeemScreen({ voucher, onClose }) {
  const [secondsLeft, setSecondsLeft] = useState(REDEEM_TIMER_SECONDS)
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [])

  const mins = Math.floor(secondsLeft / 60)
  const secs = secondsLeft % 60
  const progress = (secondsLeft / REDEEM_TIMER_SECONDS) * 100

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <span className="text-sm font-medium text-gray-500">Mostrá esto en el local</span>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <X size={18} className="text-gray-500" />
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Timer circle */}
        <div className="relative w-32 h-32 mb-8">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#f3f4f6" strokeWidth="6" />
            <circle
              cx="50" cy="50" r="45" fill="none"
              stroke={secondsLeft > 60 ? voucher.color : '#ef4444'}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-extrabold text-dark font-mono">
              {mins}:{secs.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] text-gray-400">restantes</span>
          </div>
        </div>

        {/* Merchant */}
        <p className="text-sm text-gray-500 mb-1">{voucher.merchant_name}</p>

        {/* Reward */}
        <h1 className="text-xl font-bold text-dark text-center mb-6">{voucher.reward}</h1>

        {/* Code — big and prominent */}
        <div
          className="w-full rounded-2xl p-6 text-center"
          style={{ backgroundColor: voucher.color + '10' }}
        >
          <p className="text-xs text-gray-500 mb-2">Código de canje</p>
          <p
            className="text-3xl font-extrabold tracking-widest font-mono"
            style={{ color: voucher.color }}
          >
            {voucher.code}
          </p>
        </div>

        {/* Verified badge */}
        <div className="flex items-center gap-2 mt-6">
          <ShieldCheck size={16} className="text-emerald-500" />
          <span className="text-xs text-gray-500">Voucher verificado por Wafi</span>
        </div>
      </div>

      {/* Timer bar at bottom */}
      <div className="px-4 pb-8">
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${progress}%`,
              backgroundColor: secondsLeft > 60 ? voucher.color : '#ef4444',
            }}
          />
        </div>
        {secondsLeft === 0 && (
          <p className="text-center text-sm text-red-500 font-medium mt-3">
            Tiempo agotado. El voucher fue marcado como canjeado.
          </p>
        )}
      </div>
    </div>
  )
}

function ConfirmModal({ voucher, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center sm:items-center px-4 pb-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm animate-card-complete">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: voucher.color + '15' }}
        >
          <Gift size={28} style={{ color: voucher.color }} />
        </div>
        <h2 className="text-lg font-bold text-dark text-center mb-2">¿Canjear ahora?</h2>
        <p className="text-sm text-gray-500 text-center mb-6 leading-relaxed">
          Una vez activado, tenés <strong>5 minutos</strong> para mostrarlo en el local.
          Después de eso, el voucher se marca como canjeado.
        </p>
        <button
          onClick={onConfirm}
          className="w-full py-3.5 rounded-pill text-white font-semibold text-sm mb-2"
          style={{ backgroundColor: voucher.color }}
        >
          Sí, canjear ahora
        </button>
        <button
          onClick={onCancel}
          className="w-full py-3 rounded-pill text-gray-500 font-medium text-sm"
        >
          Todavía no
        </button>
      </div>
    </div>
  )
}

function VoucherCard({ voucher, onRedeem }) {
  const isExpired = new Date(voucher.expires_at) < new Date() && !voucher.redeemed
  const isUsed = voucher.redeemed

  return (
    <div
      className={`rounded-2xl border overflow-hidden transition-all ${
        isUsed ? 'border-gray-200 grayscale' : 'border-gray-100 bg-white'
      }`}
      style={isUsed ? { backgroundColor: '#f5f5f5' } : {}}
    >
      {/* Top color bar */}
      <div
        className="h-1.5"
        style={{ backgroundColor: isUsed ? '#d1d5db' : voucher.color }}
      />

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className={`text-xs ${isUsed ? 'text-gray-400' : 'text-gray-500'}`}>
              {voucher.merchant_name}
            </p>
            <h3 className={`font-semibold mt-0.5 ${isUsed ? 'text-gray-400' : 'text-dark'}`}>
              {voucher.reward}
            </h3>
          </div>
          {isUsed ? (
            <span className="flex items-center gap-1 text-xs font-medium text-gray-400 bg-gray-200 px-2.5 py-1 rounded-full">
              <Check size={12} />
              Canjeado
            </span>
          ) : isExpired ? (
            <span className="text-xs font-medium text-red-500 bg-red-50 px-2.5 py-1 rounded-full">
              Vencido
            </span>
          ) : (
            <span className="text-xs font-medium bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full">
              Disponible
            </span>
          )}
        </div>

        {/* Code */}
        <div
          className="rounded-xl p-4 text-center"
          style={{ backgroundColor: isUsed ? '#e5e7eb' : voucher.color + '08' }}
        >
          <p className={`text-xs mb-1 ${isUsed ? 'text-gray-400' : 'text-gray-500'}`}>
            Tu código
          </p>
          <p
            className="text-2xl font-extrabold tracking-wider font-mono"
            style={{ color: isUsed ? '#9ca3af' : voucher.color }}
          >
            {voucher.code}
          </p>
        </div>

        {/* Dates */}
        <div className={`flex justify-between mt-3 text-xs ${isUsed ? 'text-gray-400' : 'text-gray-400'}`}>
          <span>
            Ganado: {new Date(voucher.earned_at).toLocaleDateString('es-AR')}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={11} />
            Vence: {new Date(voucher.expires_at).toLocaleDateString('es-AR')}
          </span>
        </div>

        {isUsed && voucher.redeemed_at && (
          <p className="text-xs text-gray-400 mt-2 text-center">
            Canjeado el {new Date(voucher.redeemed_at).toLocaleDateString('es-AR')}
          </p>
        )}

        {/* Redeem button — only for active, non-redeemed */}
        {!isUsed && !isExpired && (
          <button
            onClick={() => onRedeem(voucher)}
            className="w-full mt-4 py-3 rounded-pill text-white font-semibold text-sm active:scale-[0.97] transition-transform"
            style={{ backgroundColor: voucher.color }}
          >
            Canjear ahora
          </button>
        )}
      </div>
    </div>
  )
}

export default function Vouchers() {
  const [vouchersList, setVouchersList] = useState(initialVouchers)
  const [confirmVoucher, setConfirmVoucher] = useState(null)
  const [redeemingVoucher, setRedeemingVoucher] = useState(null)

  const handleConfirmRedeem = () => {
    setRedeemingVoucher(confirmVoucher)
    setConfirmVoucher(null)
  }

  const handleRedeemClose = () => {
    // Mark voucher as redeemed
    setVouchersList((prev) =>
      prev.map((v) =>
        v.id === redeemingVoucher.id
          ? { ...v, redeemed: true, activated: true, redeemed_at: new Date().toISOString().split('T')[0] }
          : v
      )
    )
    setRedeemingVoucher(null)
  }

  const active = vouchersList.filter((v) => !v.redeemed)
  const used = vouchersList.filter((v) => v.redeemed)

  return (
    <div>
      <h1 className="text-2xl font-bold text-dark mb-1">Mis Vouchers</h1>
      <p className="text-sm text-gray-500 mb-6">
        Activá tu voucher y mostralo en el local para canjear.
      </p>

      {vouchersList.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-wafi-50 flex items-center justify-center mx-auto mb-4">
            <Gift size={32} className="text-wafi-400" />
          </div>
          <h2 className="text-lg font-semibold text-dark mb-2">Sin vouchers todavía</h2>
          <p className="text-sm text-gray-500">
            Completá una tarjeta de sellos para ganar tu primera recompensa.
          </p>
        </div>
      ) : (
        <>
          {active.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Para canjear
              </h2>
              <div className="space-y-3">
                {active.map((v) => (
                  <VoucherCard
                    key={v.id}
                    voucher={v}
                    onRedeem={setConfirmVoucher}
                  />
                ))}
              </div>
            </div>
          )}

          {used.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Canjeados
              </h2>
              <div className="space-y-3">
                {used.map((v) => (
                  <VoucherCard key={v.id} voucher={v} onRedeem={() => {}} />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Confirm modal */}
      {confirmVoucher && (
        <ConfirmModal
          voucher={confirmVoucher}
          onConfirm={handleConfirmRedeem}
          onCancel={() => setConfirmVoucher(null)}
        />
      )}

      {/* Fullscreen redeem screen */}
      {redeemingVoucher && (
        <RedeemScreen
          voucher={redeemingVoucher}
          onClose={handleRedeemClose}
        />
      )}
    </div>
  )
}
