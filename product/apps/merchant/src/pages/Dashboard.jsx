import { Link } from 'react-router-dom'
import { Users, Stamp, Trophy, TrendingUp, Coffee, ArrowUpRight, ArrowUp, ArrowDown, Minus } from 'lucide-react'
import { stats, customers, getCategory, stampCard } from '../data/mock'

// --- Wafi Loyalty Index ---
// Compares this week's scans vs last week's scans.
// Index = (thisWeek / lastWeek) * 100. Above 100 = growing, below = declining.
const thisWeek = stats.weekly_stamps[stats.weekly_stamps.length - 1]
const lastWeek = stats.weekly_stamps[stats.weekly_stamps.length - 2]
const loyaltyIndex = lastWeek > 0 ? Math.round((thisWeek / lastWeek) * 100) : 100
const indexDelta = thisWeek - lastWeek
const indexPercent = lastWeek > 0 ? Math.round(((thisWeek - lastWeek) / lastWeek) * 100) : 0

function LoyaltyIndexCard() {
  const isUp = indexDelta > 0
  const isDown = indexDelta < 0
  const isFlat = indexDelta === 0

  return (
    <div className="bg-gradient-to-br from-wafi-500 via-wafi-600 to-purple-700 rounded-2xl p-6 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/5" />
      <div className="absolute -right-4 -bottom-12 w-32 h-32 rounded-full bg-white/5" />

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-white/70 font-medium">Índice de Fidelización</p>
            <p className="text-[10px] text-white/40 mt-0.5 uppercase tracking-wider">Powered by Wafi</p>
          </div>
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
            isUp ? 'bg-emerald-400/20 text-emerald-300' :
            isDown ? 'bg-red-400/20 text-red-300' :
            'bg-white/10 text-white/60'
          }`}>
            {isUp && <ArrowUp size={12} />}
            {isDown && <ArrowDown size={12} />}
            {isFlat && <Minus size={12} />}
            {isUp ? '+' : ''}{indexPercent}%
          </div>
        </div>

        {/* Big number */}
        <div className="flex items-end gap-2 mb-4">
          <span className="text-5xl font-extrabold leading-none">{loyaltyIndex}</span>
          <span className="text-lg text-white/50 font-medium pb-1">pts</span>
        </div>

        {/* Week comparison */}
        <div className="flex gap-6">
          <div>
            <p className="text-[11px] text-white/40">Esta semana</p>
            <p className="text-lg font-bold">{thisWeek} <span className="text-xs font-normal text-white/50">sellos</span></p>
          </div>
          <div>
            <p className="text-[11px] text-white/40">Semana pasada</p>
            <p className="text-lg font-bold">{lastWeek} <span className="text-xs font-normal text-white/50">sellos</span></p>
          </div>
          <div>
            <p className="text-[11px] text-white/40">Diferencia</p>
            <p className={`text-lg font-bold ${isUp ? 'text-emerald-300' : isDown ? 'text-red-300' : ''}`}>
              {isUp ? '+' : ''}{indexDelta}
            </p>
          </div>
        </div>

        {/* Mini bar comparison */}
        <div className="mt-4 flex gap-2 items-end h-8">
          <div className="flex-1">
            <div className="h-full bg-white/10 rounded-full overflow-hidden flex items-end">
              <div
                className="w-full bg-white/30 rounded-full transition-all"
                style={{ height: `${(lastWeek / Math.max(thisWeek, lastWeek)) * 100}%` }}
              />
            </div>
            <p className="text-[9px] text-white/30 text-center mt-1">Ant.</p>
          </div>
          <div className="flex-1">
            <div className="h-full bg-white/10 rounded-full overflow-hidden flex items-end">
              <div
                className="w-full bg-white/70 rounded-full transition-all"
                style={{ height: `${(thisWeek / Math.max(thisWeek, lastWeek)) * 100}%` }}
              />
            </div>
            <p className="text-[9px] text-white/50 text-center mt-1">Act.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, sublabel, color }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
        style={{ backgroundColor: color + '15' }}
      >
        <Icon size={16} style={{ color }} />
      </div>
      <p className="text-2xl font-bold text-dark">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
      {sublabel && <p className="text-[11px] text-emerald-500 font-medium mt-0.5">{sublabel}</p>}
    </div>
  )
}

function MiniBarChart({ data, labels, color }) {
  const max = Math.max(...data)
  return (
    <div className="flex items-end gap-2 h-24">
      {data.map((val, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-t-md transition-all duration-500"
            style={{
              height: `${(val / max) * 100}%`,
              backgroundColor: i === data.length - 1 ? color : color + '40',
              minHeight: 4,
            }}
          />
          <span className="text-[9px] text-gray-400">{labels[i]}</span>
        </div>
      ))}
    </div>
  )
}

function CategoryBadge({ label, color, bg }) {
  return (
    <span
      className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
      style={{ color, backgroundColor: bg }}
    >
      {label}
    </span>
  )
}

function CategoryBreakdown() {
  const cats = [
    { ...getCategory(61), count: stats.categories.VIP },
    { ...getCategory(31), count: stats.categories.Frecuente },
    { ...getCategory(11), count: stats.categories.Regular },
    { ...getCategory(0), count: stats.categories.Nuevo },
  ]
  const total = stats.total_customers

  return (
    <div className="space-y-2.5">
      {cats.map((cat) => (
        <div key={cat.label} className="flex items-center gap-3">
          <CategoryBadge {...cat} />
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${(cat.count / total) * 100}%`,
                backgroundColor: cat.color,
              }}
            />
          </div>
          <span className="text-sm font-semibold text-dark w-6 text-right">{cat.count}</span>
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const topCustomers = [...customers]
    .sort((a, b) => b.stamps_earned - a.stamps_earned)
    .slice(0, 5)

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-dark">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Café Roma · Resumen de actividad</p>
      </div>

      {/* Loyalty Index — hero position */}
      <div className="mb-6">
        <LoyaltyIndexCard />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard
          icon={Users}
          label="Clientes"
          value={stats.total_customers}
          sublabel={`+${stats.new_customers_this_week} esta semana`}
          color="#8b3dff"
        />
        <StatCard
          icon={Stamp}
          label="Sellos hoy"
          value={stats.stamps_today}
          color="#0693e3"
        />
        <StatCard
          icon={Trophy}
          label="Completadas"
          value={stats.cards_completed}
          color="#ff6900"
        />
        <StatCard
          icon={Coffee}
          label="Sellos totales"
          value={stats.total_stamps_earned}
          color="#ec4899"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {/* Weekly chart */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-dark">Sellos por semana</h2>
            <span className="text-xs text-gray-400">Últimas 8 semanas</span>
          </div>
          <MiniBarChart
            data={stats.weekly_stamps}
            labels={stats.weekly_labels}
            color="#8b3dff"
          />
        </div>

        {/* Category breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="font-semibold text-dark mb-4">Por categoría</h2>
          <CategoryBreakdown />
        </div>
      </div>

      {/* Card preview + top customers */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Card preview */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-dark">Tu tarjeta</h2>
            <Link to="/card" className="text-xs text-wafi-500 font-medium flex items-center gap-0.5">
              Editar <ArrowUpRight size={12} />
            </Link>
          </div>
          <div
            className="rounded-xl p-4 text-white"
            style={{ backgroundColor: stampCard.color }}
          >
            <p className="font-bold text-sm mb-1">Café Roma</p>
            <p className="text-xs opacity-70 mb-3">{stampCard.reward}</p>
            <div className="flex gap-1">
              {Array.from({ length: stampCard.stamps_required }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-1.5 rounded-full"
                  style={{
                    backgroundColor: i < 5 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.25)',
                  }}
                />
              ))}
            </div>
            <p className="text-[10px] opacity-50 mt-2">
              {stampCard.stamps_required} consumos = 1 recompensa
            </p>
          </div>
        </div>

        {/* Top customers */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-dark">Top clientes</h2>
            <Link to="/customers" className="text-xs text-wafi-500 font-medium flex items-center gap-0.5">
              Ver todos <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {topCustomers.map((customer, i) => {
              const cat = getCategory(customer.stamps_earned)
              return (
                <div key={customer.id} className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 w-4 text-right font-medium">
                    {i + 1}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                    {customer.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-dark truncate">{customer.name}</p>
                    <p className="text-xs text-gray-400">{customer.stamps_earned} sellos</p>
                  </div>
                  <CategoryBadge {...cat} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
