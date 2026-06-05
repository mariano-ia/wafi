import { QRCodeSVG } from 'qrcode.react'
import { User, Mail, Calendar, Hash, LogOut } from 'lucide-react'
import { user } from '../data/mock'

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="w-9 h-9 rounded-xl bg-wafi-50 flex items-center justify-center">
        <Icon size={16} className="text-wafi-500" />
      </div>
      <div className="flex-1">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-dark">{value}</p>
      </div>
    </div>
  )
}

export default function Profile() {
  const qrValue = `https://app.wafi.us/user/${user.user_code}`

  return (
    <div>
      <h1 className="text-2xl font-bold text-dark mb-6">Mi Perfil</h1>

      {/* Avatar & name */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 rounded-full bg-wafi-100 flex items-center justify-center mx-auto mb-3">
          <span className="text-2xl font-bold text-wafi-600">
            {user.name.split(' ').map((n) => n[0]).join('')}
          </span>
        </div>
        <h2 className="text-lg font-bold text-dark">{user.name}</h2>
        <p className="text-sm text-gray-500">Miembro Wafi</p>
      </div>

      {/* QR personal */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center mb-6">
        <p className="text-sm font-medium text-gray-500 mb-3">Tu QR personal</p>
        <div className="inline-block p-3 bg-white rounded-xl border border-gray-50 shadow-sm">
          <QRCodeSVG
            value={qrValue}
            size={160}
            level="H"
            fgColor="#8b3dff"
          />
        </div>
        <div className="mt-3">
          <p className="text-xs text-gray-400">Número de usuario</p>
          <p className="text-3xl font-extrabold text-wafi-500 tracking-widest font-mono mt-1">
            {user.user_code}
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="bg-white rounded-2xl border border-gray-100 px-5 divide-y divide-gray-50">
        <InfoRow icon={User} label="Nombre" value={user.name} />
        <InfoRow icon={Mail} label="Email" value={user.email} />
        <InfoRow
          icon={Calendar}
          label="Fecha de nacimiento"
          value={new Date(user.birthday).toLocaleDateString('es-AR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        />
        <InfoRow icon={Hash} label="Código de usuario" value={user.user_code} />
      </div>

      {/* Logout */}
      <button className="w-full flex items-center justify-center gap-2 mt-6 py-3 text-sm text-gray-400 hover:text-red-500 transition-colors">
        <LogOut size={16} />
        Cerrar sesión
      </button>
    </div>
  )
}
