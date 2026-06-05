import { NavLink } from 'react-router-dom'
import { Home, Gift, User, ScanLine } from 'lucide-react'
import { useState } from 'react'
import ScanModal from './ScanModal'

export default function BottomNav() {
  const [showScan, setShowScan] = useState(false)

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 safe-bottom z-40">
        <div className="max-w-md mx-auto flex items-end justify-around px-2 pt-1 pb-2">
          {/* Inicio */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-4 py-1.5 transition-colors ${
                isActive ? 'text-wafi-500' : 'text-gray-400'
              }`
            }
          >
            <Home size={22} />
            <span className="text-[10px] font-medium">Inicio</span>
          </NavLink>

          {/* Vouchers */}
          <NavLink
            to="/vouchers"
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-4 py-1.5 transition-colors ${
                isActive ? 'text-wafi-500' : 'text-gray-400'
              }`
            }
          >
            <Gift size={22} />
            <span className="text-[10px] font-medium">Vouchers</span>
          </NavLink>

          {/* Scan button — center, elevated */}
          <button
            onClick={() => setShowScan(true)}
            className="relative -mt-7 flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full bg-wafi-500 shadow-lg shadow-wafi-500/30 flex items-center justify-center active:scale-95 transition-transform">
              <ScanLine size={28} className="text-white" />
            </div>
            <span className="text-[10px] font-semibold text-wafi-500 mt-1">Escanear</span>
          </button>

          {/* Avisos */}
          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-4 py-1.5 transition-colors ${
                isActive ? 'text-wafi-500' : 'text-gray-400'
              }`
            }
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="text-[10px] font-medium">Avisos</span>
          </NavLink>

          {/* Perfil */}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-4 py-1.5 transition-colors ${
                isActive ? 'text-wafi-500' : 'text-gray-400'
              }`
            }
          >
            <User size={22} />
            <span className="text-[10px] font-medium">Perfil</span>
          </NavLink>
        </div>

        {/* Subtle Wafi branding */}
        <div className="flex items-center justify-center gap-1.5 pb-1">
          <img src="/wafi-logo.svg" alt="Wafi" className="h-3 opacity-25" />
        </div>
      </nav>

      {showScan && <ScanModal onClose={() => setShowScan(false)} />}
    </>
  )
}
