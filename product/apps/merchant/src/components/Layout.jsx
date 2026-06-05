import { useState } from 'react'
import { Outlet, NavLink, Link } from 'react-router-dom'
import { LayoutDashboard, CreditCard, Users, Bell, ChevronRight } from 'lucide-react'
import WafiLogo from './WafiLogo'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/card', icon: CreditCard, label: 'Mi Tarjeta' },
  { to: '/customers', icon: Users, label: 'Clientes' },
  { to: '/notifications', icon: Bell, label: 'Notificaciones' },
]

function SidebarItem({ to, icon: Icon, label, expanded }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        `group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
          expanded ? '' : 'justify-center'
        } ${
          isActive
            ? 'bg-wafi-500 text-white'
            : 'text-gray-500 hover:bg-wafi-50 hover:text-wafi-700'
        }`
      }
    >
      <Icon size={20} className="shrink-0" />
      {expanded && <span className="whitespace-nowrap">{label}</span>}

      {/* Tooltip when collapsed */}
      {!expanded && (
        <div className="absolute left-full ml-3 px-3 py-1.5 bg-dark text-white text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 whitespace-nowrap z-50 pointer-events-none shadow-lg">
          {label}
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-dark rotate-45" />
        </div>
      )}
    </NavLink>
  )
}

export default function Layout() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="min-h-screen flex">
      {/* Sidebar — desktop */}
      <aside
        className={`hidden md:flex flex-col border-r border-gray-200 bg-white py-5 transition-all duration-300 ease-in-out ${
          expanded ? 'w-56 px-3' : 'w-[68px] px-2.5'
        }`}
      >
        {/* Logo + collapse toggle */}
        <div className={`flex items-center mb-6 ${expanded ? 'justify-between px-1' : 'justify-center'}`}>
          <Link to="/" className="flex items-center gap-2.5 min-w-0">
            <WafiLogo size={expanded ? 80 : 32} />
          </Link>
          <button
            onClick={() => setExpanded(!expanded)}
            className={`w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all ${
              expanded ? '' : 'absolute -right-3.5 top-7 bg-white border border-gray-200 shadow-sm z-10'
            }`}
          >
            <ChevronRight
              size={14}
              className={`text-gray-500 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => (
            <SidebarItem key={item.to} {...item} expanded={expanded} />
          ))}
        </nav>

        {/* Bottom: merchant info */}
        <div className={`mt-auto rounded-xl transition-all duration-200 ${
          expanded ? 'bg-wafi-50 p-3' : 'flex justify-center'
        }`}>
          {expanded ? (
            <>
              <p className="text-sm font-semibold text-wafi-800">Café Roma</p>
              <p className="text-xs text-wafi-600">Plan Gratis</p>
            </>
          ) : (
            <div className="group relative w-9 h-9 rounded-xl bg-wafi-50 flex items-center justify-center text-xs font-bold text-wafi-700">
              CR
              <div className="absolute left-full ml-3 px-3 py-1.5 bg-dark text-white text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 whitespace-nowrap z-50 pointer-events-none shadow-lg">
                Café Roma · Plan Gratis
                <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-dark rotate-45" />
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 z-50">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-1 text-xs font-medium ${
                isActive ? 'text-wafi-500' : 'text-gray-400'
              }`
            }
          >
            <Icon size={22} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 pb-20 md:pb-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
