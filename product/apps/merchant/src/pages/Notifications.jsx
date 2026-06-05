import { useState } from 'react'
import { Bell, MessageCircle, Cake, Clock } from 'lucide-react'
import { notifications as initialNotifications } from '../data/mock'

const iconMap = {
  almost_complete: MessageCircle,
  lapsed: Clock,
  birthday: Cake,
}

const colorMap = {
  almost_complete: '#8b3dff',
  lapsed: '#ff6900',
  birthday: '#ec4899',
}

function Toggle({ enabled, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
        enabled ? 'bg-wafi-500' : 'bg-gray-200'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ${
          enabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  )
}

export default function Notifications() {
  const [notifs, setNotifs] = useState(initialNotifications)

  const toggleNotif = (id) => {
    setNotifs((prev) =>
      prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n))
    )
  }

  const updateDays = (id, days) => {
    setNotifs((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, config: { ...n.config, days } } : n
      )
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-dark">Notificaciones</h1>
        <p className="text-gray-500 text-sm mt-1">
          Activá o desactivá las notificaciones automáticas para tus clientes.
        </p>
      </div>

      <div className="space-y-4">
        {notifs.map((notif) => {
          const Icon = iconMap[notif.type]
          const color = colorMap[notif.type]

          return (
            <div
              key={notif.id}
              className={`bg-white rounded-2xl border p-5 transition-all ${
                notif.enabled ? 'border-gray-100 shadow-sm' : 'border-gray-100 opacity-60'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: color + '18' }}
                >
                  <Icon size={20} style={{ color }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-semibold text-dark">{notif.title}</h3>
                    <Toggle
                      enabled={notif.enabled}
                      onChange={() => toggleNotif(notif.id)}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{notif.description}</p>

                  {/* Message preview */}
                  <div className="mt-3 bg-gray-50 rounded-xl px-4 py-3">
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Bell size={14} className="text-gray-400 shrink-0" />
                      {notif.type === 'lapsed'
                        ? notif.message.replace('{days}', notif.config.days)
                        : notif.message}
                    </p>
                  </div>

                  {/* Days config for lapsed notification */}
                  {notif.configurable && notif.enabled && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 mb-2">Enviar después de:</p>
                      <div className="flex gap-2">
                        {notif.config.options.map((days) => (
                          <button
                            key={days}
                            onClick={() => updateDays(notif.id, days)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                              notif.config.days === days
                                ? 'border-wafi-500 bg-wafi-50 text-wafi-700'
                                : 'border-gray-200 text-gray-500 hover:border-gray-300'
                            }`}
                          >
                            {days} días
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 bg-wafi-50 rounded-2xl p-5">
        <p className="text-sm text-wafi-800">
          <span className="font-semibold">¿Cómo funcionan?</span>{' '}
          Las notificaciones se envían automáticamente a los clientes que usan tu tarjeta.
          No necesitás hacer nada más que activarlas.
        </p>
      </div>
    </div>
  )
}
