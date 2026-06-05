import { useState } from 'react'
import { ArrowLeft, Stamp, Gift, Clock, Cake, Bell } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { notifications as initialNotifs } from '../data/mock'

const iconMap = {
  stamp: Stamp,
  almost: Bell,
  voucher: Gift,
  lapsed: Clock,
  birthday: Cake,
}

function timeAgo(dateStr) {
  const now = new Date()
  const date = new Date(dateStr)
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 60) return `Hace ${diffMins} min`
  if (diffHours < 24) return `Hace ${diffHours}h`
  if (diffDays < 7) return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`
  return date.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })
}

export default function Notifications() {
  const navigate = useNavigate()
  const [notifs, setNotifs] = useState(initialNotifs)

  const markAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const unreadCount = notifs.filter((n) => !n.read).length

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-400">
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-xl font-bold text-dark">Notificaciones</h1>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-xs font-medium text-wafi-500"
          >
            Marcar todo leído
          </button>
        )}
      </div>

      {notifs.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
            <Bell size={28} className="text-gray-300" />
          </div>
          <p className="text-sm text-gray-400">No tenés notificaciones</p>
        </div>
      ) : (
        <div className="space-y-1">
          {notifs.map((notif) => {
            const Icon = iconMap[notif.type] || Bell

            return (
              <div
                key={notif.id}
                className={`flex items-start gap-3 p-3.5 rounded-2xl transition-colors ${
                  notif.read ? 'bg-transparent' : 'bg-wafi-50/50'
                }`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: notif.color + '15' }}
                >
                  <Icon size={18} style={{ color: notif.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm leading-snug ${notif.read ? 'text-gray-600' : 'text-dark font-semibold'}`}>
                      {notif.title}
                    </p>
                    {!notif.read && (
                      <div className="w-2 h-2 rounded-full bg-wafi-500 shrink-0 mt-1.5" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{notif.body}</p>
                  <p className="text-[11px] text-gray-400 mt-1">{timeAgo(notif.created_at)}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
