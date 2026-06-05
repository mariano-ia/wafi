import { useState, useEffect } from 'react'
import { X, ScanLine, Check, Clock } from 'lucide-react'

const COOLDOWN_MS = 60 * 60 * 1000 // 1 hour

function getCooldownRemaining(merchantId) {
  try {
    const lastScan = localStorage.getItem(`wafi_scan_${merchantId}`)
    if (!lastScan) return 0
    const elapsed = Date.now() - parseInt(lastScan, 10)
    return Math.max(0, COOLDOWN_MS - elapsed)
  } catch {
    return 0
  }
}

function formatCooldown(ms) {
  const mins = Math.ceil(ms / 60000)
  if (mins >= 60) return `${Math.floor(mins / 60)}h ${mins % 60}min`
  return `${mins} min`
}

export default function ScanModal({ onClose }) {
  const [status, setStatus] = useState('scanning') // scanning | success | cooldown
  const [cooldownLeft, setCooldownLeft] = useState(0)
  const [corners, setCorners] = useState(true)

  // Mock: simulate scanning "Café Roma" after 2s
  const mockMerchantId = 'merch_01'
  const mockMerchantName = 'Café Roma'

  useEffect(() => {
    const timer = setTimeout(() => {
      const remaining = getCooldownRemaining(mockMerchantId)
      if (remaining > 0) {
        setCooldownLeft(remaining)
        setStatus('cooldown')
      } else {
        // Record scan time
        localStorage.setItem(`wafi_scan_${mockMerchantId}`, Date.now().toString())
        setStatus('success')
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Auto-close after success
  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(onClose, 2000)
      return () => clearTimeout(timer)
    }
  }, [status, onClose])

  // Animate corners
  useEffect(() => {
    if (status !== 'scanning') return
    const interval = setInterval(() => setCorners((c) => !c), 600)
    return () => clearInterval(interval)
  }, [status])

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 relative z-10">
        <h2 className="text-white font-semibold text-lg">Escanear QR</h2>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
        >
          <X size={20} className="text-white" />
        </button>
      </div>

      {/* Camera area */}
      <div className="flex-1 flex items-center justify-center relative">
        <div className="w-64 h-64 relative">
          {/* Corner brackets */}
          <div className={`absolute inset-0 transition-all duration-300 ${status === 'scanning' && corners ? 'scale-100' : status === 'scanning' ? 'scale-[0.97]' : 'scale-100'}`}>
            <div className="absolute top-0 left-0 w-10 h-10 border-t-3 border-l-3 border-wafi-400 rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-10 h-10 border-t-3 border-r-3 border-wafi-400 rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-10 h-10 border-b-3 border-l-3 border-wafi-400 rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-3 border-r-3 border-wafi-400 rounded-br-xl" />
          </div>

          {status === 'scanning' && (
            <>
              <div className="absolute left-4 right-4 h-0.5 bg-wafi-400 shadow-lg shadow-wafi-400/50 animate-scan-line" />
              <div className="absolute inset-0 flex items-center justify-center">
                <ScanLine size={48} className="text-white/20" />
              </div>
            </>
          )}

          {status === 'success' && (
            <div className="absolute inset-0 flex items-center justify-center animate-stamp-pop">
              <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/40">
                <Check size={40} className="text-white" />
              </div>
            </div>
          )}

          {status === 'cooldown' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Clock size={36} className="text-amber-400" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom info */}
      <div className="px-6 pb-10 text-center">
        {status === 'scanning' && (
          <>
            <p className="text-white font-medium mb-1">Apuntá al QR del café</p>
            <p className="text-white/50 text-sm">El sello se suma automáticamente</p>
          </>
        )}
        {status === 'success' && (
          <>
            <p className="text-emerald-400 font-bold text-lg mb-1">¡Sello sumado!</p>
            <p className="text-white/50 text-sm">{mockMerchantName} — Sello #6 de 8</p>
          </>
        )}
        {status === 'cooldown' && (
          <>
            <p className="text-amber-400 font-bold text-lg mb-1">Todavía no podés sumar otro sello</p>
            <p className="text-white/50 text-sm mb-4">
              Tiene que pasar 1 hora entre cada escaneo en el mismo local.
            </p>
            <p className="text-amber-400 text-sm font-mono">
              Esperá {formatCooldown(cooldownLeft)}
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-8 py-3 bg-white/10 rounded-pill text-white text-sm font-medium"
            >
              Entendido
            </button>
          </>
        )}
      </div>
    </div>
  )
}
