export const merchant = {
  id: 'merch_01',
  name: 'Café Roma',
  email: 'info@caferoma.com.ar',
  logo: null, // URL or null
  plan: 'Gratis',
}

// Single stamp card for this merchant
export const stampCard = {
  id: 'card_01',
  stamps_required: 8,
  reward: 'Un café con leche gratis',
  color: '#8b3dff',
  logo: null,
  active: true,
  created_at: '2026-02-15',
}

// Customer categories by total stamps earned
// Nuevo: 0-10, Regular: 11-30, Frecuente: 31-60, VIP: 61+
export function getCategory(totalStamps) {
  if (totalStamps >= 61) return { label: 'VIP', color: '#8b3dff', bg: '#f3f0ff' }
  if (totalStamps >= 31) return { label: 'Frecuente', color: '#ff6900', bg: '#fff7ed' }
  if (totalStamps >= 11) return { label: 'Regular', color: '#0693e3', bg: '#eff6ff' }
  return { label: 'Nuevo', color: '#6b7280', bg: '#f3f4f6' }
}

export const customers = [
  {
    id: 'usr_01',
    name: 'Martina López',
    email: 'martina@gmail.com',
    member_since: '2026-01-12',
    stamps_earned: 72,
    stamps_redeemed: 64,
    current_stamps: 5,
    last_visit: '2026-03-18',
  },
  {
    id: 'usr_02',
    name: 'Federico Russo',
    email: 'fede.russo@gmail.com',
    member_since: '2026-01-20',
    stamps_earned: 48,
    stamps_redeemed: 40,
    current_stamps: 3,
    last_visit: '2026-03-17',
  },
  {
    id: 'usr_03',
    name: 'Camila Benítez',
    email: 'cami.benitez@hotmail.com',
    member_since: '2026-02-03',
    stamps_earned: 35,
    stamps_redeemed: 32,
    current_stamps: 7,
    last_visit: '2026-03-18',
  },
  {
    id: 'usr_04',
    name: 'Tomás Herrera',
    email: 'therrera@gmail.com',
    member_since: '2026-02-10',
    stamps_earned: 22,
    stamps_redeemed: 16,
    current_stamps: 6,
    last_visit: '2026-03-16',
  },
  {
    id: 'usr_05',
    name: 'Lucía Méndez',
    email: 'lu.mendez@yahoo.com',
    member_since: '2026-02-18',
    stamps_earned: 15,
    stamps_redeemed: 8,
    current_stamps: 2,
    last_visit: '2026-03-15',
  },
  {
    id: 'usr_06',
    name: 'Sebastián Díaz',
    email: 'seba.diaz@gmail.com',
    member_since: '2026-03-01',
    stamps_earned: 9,
    stamps_redeemed: 0,
    current_stamps: 4,
    last_visit: '2026-03-18',
  },
  {
    id: 'usr_07',
    name: 'Valentina Ríos',
    email: 'vale.rios@gmail.com',
    member_since: '2026-03-05',
    stamps_earned: 6,
    stamps_redeemed: 0,
    current_stamps: 6,
    last_visit: '2026-03-14',
  },
  {
    id: 'usr_08',
    name: 'Nicolás Aguirre',
    email: 'nico.aguirre@outlook.com',
    member_since: '2026-03-10',
    stamps_earned: 3,
    stamps_redeemed: 0,
    current_stamps: 3,
    last_visit: '2026-03-17',
  },
  {
    id: 'usr_09',
    name: 'Ana Paula Ferrero',
    email: 'apferrero@gmail.com',
    member_since: '2026-03-12',
    stamps_earned: 2,
    stamps_redeemed: 0,
    current_stamps: 2,
    last_visit: '2026-03-12',
  },
  {
    id: 'usr_10',
    name: 'Matías Sánchez',
    email: 'matias.s@gmail.com',
    member_since: '2026-03-15',
    stamps_earned: 1,
    stamps_redeemed: 0,
    current_stamps: 1,
    last_visit: '2026-03-15',
  },
]

// Aggregated stats
export const stats = {
  total_customers: customers.length,
  total_stamps_earned: customers.reduce((s, c) => s + c.stamps_earned, 0),
  total_stamps_redeemed: customers.reduce((s, c) => s + c.stamps_redeemed, 0),
  cards_completed: Math.floor(customers.reduce((s, c) => s + c.stamps_redeemed, 0) / 8),
  stamps_today: 12,
  stamps_this_week: 47,
  new_customers_this_week: 3,
  // Weekly stamp history (last 8 weeks)
  weekly_stamps: [18, 24, 31, 28, 35, 42, 38, 47],
  weekly_labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'],
  // Category distribution
  categories: {
    VIP: customers.filter((c) => c.stamps_earned >= 61).length,
    Frecuente: customers.filter((c) => c.stamps_earned >= 31 && c.stamps_earned < 61).length,
    Regular: customers.filter((c) => c.stamps_earned >= 11 && c.stamps_earned < 31).length,
    Nuevo: customers.filter((c) => c.stamps_earned < 11).length,
  },
}

export const notifications = [
  {
    id: 'notif_01',
    type: 'almost_complete',
    title: 'Casi completó la tarjeta',
    description: 'Se envía cuando al cliente le falta 1 sello para su recompensa.',
    message: '¡Te falta solo 1 café para tu recompensa en Café Roma! ☕',
    enabled: true,
    configurable: false,
  },
  {
    id: 'notif_02',
    type: 'lapsed',
    title: 'Cliente inactivo',
    description: 'Se envía cuando el cliente no visita hace X días.',
    message: 'Hace {days} días que no pasás por Café Roma, ¡te esperamos con un café! ☕',
    enabled: true,
    configurable: true,
    config: {
      days: 14,
      options: [7, 14, 30],
    },
  },
  {
    id: 'notif_03',
    type: 'birthday',
    title: 'Feliz cumpleaños',
    description: 'Se envía el día del cumpleaños del cliente.',
    message: '¡Feliz cumpleaños! Pasá hoy por Café Roma, tenés un regalo esperándote 🎂',
    enabled: false,
    configurable: false,
  },
]
