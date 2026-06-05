import { supabase } from './supabase.js'

// Capa de datos de Wafi. Envuelve los RPC `public.wafi_*` (ver schema wafi en Supabase)
// y las queries con RLS. Todo el anti-fraude vive server-side en wafi_register_scan.

// ---------- Cliente final ----------

/** Branding público del comercio para la landing de escaneo (anon). */
export async function getMerchant(slug) {
  const { data, error } = await supabase.rpc('wafi_get_merchant_public', { p_slug: slug })
  if (error) throw error
  return data
}

/**
 * Registra un escaneo (suma un sello). El anti-fraude (cooldown 15min, tope diario,
 * presencia, geocerca) corre server-side. Requiere usuario autenticado.
 * @returns {status:'valid'|'cooldown'|'daily_cap'|'geofence_fail'|'invalid', ...}
 */
export async function registerScan(slug, { lat = null, lng = null, fingerprint = null } = {}) {
  const { data, error } = await supabase.rpc('wafi_register_scan', {
    p_slug: slug, p_lat: lat, p_lng: lng, p_fingerprint: fingerprint,
  })
  if (error) throw error
  return data
}

/** Tarjetas del cliente (membresías + branding del comercio). */
export async function myCards() {
  const { data, error } = await supabase
    .schema('wafi')
    .from('memberships')
    .select('id, current_stamps, total_earned, category, last_stamp_at, merchant:merchants(id,name,slug,brand_color,logo_url), card:stamp_cards(stamps_required,reward_text,color)')
    .order('last_stamp_at', { ascending: false })
  if (error) throw error
  return data
}

/** Vouchers del cliente. */
export async function myVouchers(status = 'active') {
  const { data, error } = await supabase
    .schema('wafi')
    .from('vouchers')
    .select('id, reward_text, code, status, earned_at, expires_at, merchant:merchants(name,brand_color)')
    .eq('status', status)
    .order('earned_at', { ascending: false })
  if (error) throw error
  return data
}

/** Emite el código rotativo de canje (válido 3 min). */
export async function issueRedeemToken(voucherId) {
  const { data, error } = await supabase.rpc('wafi_issue_redeem_token', { p_voucher: voucherId })
  if (error) throw error
  return data
}

/** Confirma el canje (quema el voucher) con el token vigente. */
export async function redeemVoucher(voucherId, token) {
  const { data, error } = await supabase.rpc('wafi_redeem_voucher', { p_voucher: voucherId, p_token: token })
  if (error) throw error
  return data
}

/** Notificaciones del cliente. */
export async function myNotifications() {
  const { data, error } = await supabase
    .schema('wafi')
    .from('notifications')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)
  if (error) throw error
  return data
}

// ---------- Comercio (panel) ----------

/** El comercio del usuario logueado (dueño). */
export async function myMerchant() {
  const { data, error } = await supabase
    .schema('wafi').from('merchants').select('*').limit(1).maybeSingle()
  if (error) throw error
  return data
}

/** Clientes del comercio (membresías). */
export async function merchantCustomers(merchantId) {
  const { data, error } = await supabase
    .schema('wafi').from('memberships')
    .select('id, current_stamps, total_earned, total_redeemed, category, last_stamp_at, customer:customers(name,email)')
    .eq('merchant_id', merchantId)
    .order('total_earned', { ascending: false })
  if (error) throw error
  return data
}

/** Actividad en vivo: últimos sellos válidos del comercio. */
export async function merchantActivity(merchantId, limit = 30) {
  const { data, error } = await supabase
    .schema('wafi').from('scans')
    .select('id, status, created_at, customer_id')
    .eq('merchant_id', merchantId).eq('status', 'valid')
    .order('created_at', { ascending: false }).limit(limit)
  if (error) throw error
  return data
}
