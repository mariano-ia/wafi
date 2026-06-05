import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Download, Eye, ImagePlus, Gift } from 'lucide-react'
import { stampCard as initialCard, merchant } from '../data/mock'

const colorOptions = [
  { name: 'Violeta', value: '#8b3dff' },
  { name: 'Naranja', value: '#ff6900' },
  { name: 'Azul', value: '#0693e3' },
  { name: 'Verde', value: '#10b981' },
  { name: 'Rosa', value: '#ec4899' },
  { name: 'Rojo', value: '#ef4444' },
  { name: 'Oscuro', value: '#32373c' },
  { name: 'Café', value: '#78350f' },
]

const stampOptions = [4, 6, 8, 10, 12]

export default function MyCard() {
  const [card, setCard] = useState({
    stamps_required: initialCard.stamps_required,
    reward: initialCard.reward,
    color: initialCard.color,
    logo: initialCard.logo,
  })
  const [saved, setSaved] = useState(false)

  const update = (field, value) => {
    setCard((prev) => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const qrValue = `https://app.wafi.us/stamp/${merchant.id}`

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-dark">Mi Tarjeta</h1>
        <p className="text-gray-500 text-sm mt-1">
          Configurá tu tarjeta de sellos. Cada consumo en tu local = 1 sello, sin importar el monto.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Configuration */}
        <div className="flex-1 space-y-6">
          {/* Stamps required */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <label className="block text-sm font-semibold text-dark mb-1">
              ¿Cada cuántos consumos regalás?
            </label>
            <p className="text-xs text-gray-500 mb-3">
              Cada vez que un cliente paga y escanea el QR, suma 1 sello. Al completar todos, gana la recompensa.
            </p>
            <div className="flex gap-2">
              {stampOptions.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => update('stamps_required', n)}
                  className={`flex-1 py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                    card.stamps_required === n
                      ? 'border-wafi-500 bg-wafi-50 text-wafi-700'
                      : 'border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Reward */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <label className="block text-sm font-semibold text-dark mb-1">
              ¿Qué regalás?
            </label>
            <p className="text-xs text-gray-500 mb-3">
              Describí la recompensa que recibe el cliente al completar la tarjeta.
            </p>
            <input
              type="text"
              value={card.reward}
              onChange={(e) => update('reward', e.target.value)}
              placeholder="Ej: Un café con leche gratis"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-wafi-500 focus:ring-2 focus:ring-wafi-100 outline-none transition-all text-sm"
            />
          </div>

          {/* Color */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <label className="block text-sm font-semibold text-dark mb-3">
              Color de fondo
            </label>
            <div className="flex gap-3 flex-wrap">
              {colorOptions.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => update('color', c.value)}
                  className={`w-10 h-10 rounded-full transition-all ${
                    card.color === c.value
                      ? 'ring-2 ring-offset-2 scale-110'
                      : 'hover:scale-105'
                  }`}
                  style={{
                    backgroundColor: c.value,
                    ringColor: c.value,
                  }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Logo upload */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <label className="block text-sm font-semibold text-dark mb-1">
              Logo del local
            </label>
            <p className="text-xs text-gray-500 mb-3">
              Aparece en la tarjeta que ven tus clientes.
            </p>
            <button
              className="w-full py-8 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center gap-2 text-gray-400 hover:border-wafi-300 hover:text-wafi-500 transition-colors"
              onClick={() => {/* TODO: file upload */}}
            >
              <ImagePlus size={24} />
              <span className="text-sm font-medium">Subir logo</span>
              <span className="text-xs">PNG o JPG, máximo 2 MB</span>
            </button>
          </div>

          {/* Save */}
          <button
            onClick={handleSave}
            className={`w-full py-3.5 rounded-pill font-semibold text-sm transition-all ${
              saved
                ? 'bg-emerald-500 text-white'
                : 'bg-wafi-500 hover:bg-wafi-600 text-white'
            }`}
          >
            {saved ? '✓ Guardado' : 'Guardar cambios'}
          </button>
        </div>

        {/* Preview + QR */}
        <div className="md:w-80 space-y-4">
          {/* Card preview */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-8">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <Eye size={14} />
              Así la ven tus clientes
            </div>
            <div
              className="rounded-2xl p-5 text-white"
              style={{ backgroundColor: card.color }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-sm font-bold">
                  CR
                </div>
                <div>
                  <p className="font-bold text-sm">{merchant.name}</p>
                  <p className="text-xs opacity-70">{card.stamps_required} consumos = 1 premio</p>
                </div>
              </div>

              <div className="flex gap-1.5 mb-3">
                {Array.from({ length: card.stamps_required }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 h-2 rounded-full"
                    style={{
                      backgroundColor: i < Math.floor(card.stamps_required * 0.6)
                        ? 'rgba(255,255,255,0.9)'
                        : 'rgba(255,255,255,0.2)',
                    }}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1.5 text-xs opacity-70">
                <Gift size={12} />
                <span>{card.reward || 'Tu recompensa'}</span>
              </div>
            </div>

            {/* QR */}
            <div className="mt-5 text-center">
              <p className="text-sm font-semibold text-dark mb-1">QR para imprimir</p>
              <p className="text-xs text-gray-500 mb-4">
                Tus clientes escanean esto después de pagar
              </p>
              <div className="inline-block p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                <QRCodeSVG
                  value={qrValue}
                  size={160}
                  level="H"
                  fgColor={card.color}
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-2 font-mono">{qrValue}</p>

              <button className="w-full mt-4 flex items-center justify-center gap-2 bg-dark hover:bg-gray-700 text-white py-3 rounded-pill text-sm font-medium transition-colors">
                <Download size={16} />
                Descargar QR
              </button>

              <div className="mt-4 bg-amber-50 rounded-xl p-3">
                <p className="text-xs text-amber-700">
                  <strong>Anti-abuso:</strong> entre escaneo y escaneo del mismo cliente pasa mínimo 1 hora.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
