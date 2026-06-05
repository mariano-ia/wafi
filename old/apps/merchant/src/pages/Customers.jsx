import { useState } from 'react'
import { Search, ArrowUpDown, ChevronDown } from 'lucide-react'
import { customers, getCategory } from '../data/mock'

function CategoryBadge({ label, color, bg }) {
  return (
    <span
      className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap"
      style={{ color, backgroundColor: bg }}
    >
      {label}
    </span>
  )
}

function daysSince(dateStr) {
  const now = new Date()
  const date = new Date(dateStr)
  return Math.floor((now - date) / (1000 * 60 * 60 * 24))
}

export default function Customers() {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('stamps_earned') // stamps_earned, last_visit, member_since
  const [filterCategory, setFilterCategory] = useState('Todas')

  const filtered = customers
    .filter((c) => {
      if (search) {
        const q = search.toLowerCase()
        return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
      }
      return true
    })
    .filter((c) => {
      if (filterCategory === 'Todas') return true
      return getCategory(c.stamps_earned).label === filterCategory
    })
    .sort((a, b) => {
      if (sortBy === 'stamps_earned') return b.stamps_earned - a.stamps_earned
      if (sortBy === 'last_visit') return new Date(b.last_visit) - new Date(a.last_visit)
      if (sortBy === 'member_since') return new Date(a.member_since) - new Date(b.member_since)
      return 0
    })

  const categoryOptions = ['Todas', 'VIP', 'Frecuente', 'Regular', 'Nuevo']

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-dark">Clientes</h1>
        <p className="text-gray-500 text-sm mt-1">
          {customers.length} clientes registrados
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre o email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-wafi-500 focus:ring-2 focus:ring-wafi-100 outline-none text-sm"
          />
        </div>

        <div className="flex gap-2">
          {/* Category filter */}
          <div className="relative">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-8 text-sm font-medium text-gray-600 cursor-pointer focus:border-wafi-500 outline-none"
            >
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-8 text-sm font-medium text-gray-600 cursor-pointer focus:border-wafi-500 outline-none"
            >
              <option value="stamps_earned">Más sellos</option>
              <option value="last_visit">Última visita</option>
              <option value="member_since">Antigüedad</option>
            </select>
            <ArrowUpDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Cliente</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Categoría</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Sellos</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Canjeados</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Progreso actual</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Socio desde</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Última visita</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((customer) => {
                const cat = getCategory(customer.stamps_earned)
                return (
                  <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 shrink-0">
                          {customer.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-dark">{customer.name}</p>
                          <p className="text-xs text-gray-400">{customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <CategoryBadge {...cat} />
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="text-sm font-semibold text-dark">{customer.stamps_earned}</span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="text-sm text-gray-600">{customer.stamps_redeemed}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2 justify-end">
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(customer.current_stamps / 8) * 100}%`,
                              backgroundColor: cat.color,
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 w-8 text-right">{customer.current_stamps}/8</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm text-gray-500">
                        {new Date(customer.member_since).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-sm ${daysSince(customer.last_visit) > 7 ? 'text-amber-500' : 'text-gray-500'}`}>
                        {daysSince(customer.last_visit) === 0
                          ? 'Hoy'
                          : daysSince(customer.last_visit) === 1
                            ? 'Ayer'
                            : `Hace ${daysSince(customer.last_visit)} días`}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-gray-50">
          {filtered.map((customer) => {
            const cat = getCategory(customer.stamps_earned)
            return (
              <div key={customer.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                      {customer.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-dark">{customer.name}</p>
                      <p className="text-xs text-gray-400">{customer.email}</p>
                    </div>
                  </div>
                  <CategoryBadge {...cat} />
                </div>
                <div className="grid grid-cols-3 gap-3 mt-3">
                  <div>
                    <p className="text-xs text-gray-400">Sellos</p>
                    <p className="text-sm font-semibold text-dark">{customer.stamps_earned}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Canjeados</p>
                    <p className="text-sm font-semibold text-dark">{customer.stamps_redeemed}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Actual</p>
                    <p className="text-sm font-semibold text-dark">{customer.current_stamps}/8</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-gray-400">No se encontraron clientes</p>
          </div>
        )}
      </div>
    </div>
  )
}
