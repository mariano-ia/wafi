import { supabase } from './supabase.js'

// Capa de datos de Wafi (cliente). Envuelve los RPC `public.wafi_*` y queries con RLS.
// El anti-fraude vive server-side en wafi_register_scan.

export async function getMerchant(slug) {
  const { data, error } = await supabase.rpc('wafi_get_merchant_public', { p_slug: slug })
  if (error) throw error
  return data
}

export async function registerScan(slug, { lat = null, lng = null, fingerprint = null } = {}) {
  const { data, error } = await supabase.rpc('wafi_register_scan', {
    p_slug: slug, p_lat: lat, p_lng: lng, p_fingerprint: fingerprint,
  })
  if (error) throw error
  return data
}

export async function myCards() {
  const { data, error } = await supabase
    .schema('wafi').from('memberships')
    .select('id, current_stamps, total_earned, category, last_stamp_at, merchant:merchants(id,name,slug,brand_color,logo_url), card:stamp_cards(stamps_required,reward_text,color)')
    .order('last_stamp_at', { ascending: false })
  if (error) throw error
  return data
}

export async function myVouchers(status = 'active') {
  const { data, error } = await supabase
    .schema('wafi').from('vouchers')
    .select('id, reward_text, code, status, earned_at, expires_at, merchant:merchants(name,brand_color)')
    .eq('status', status)
    .order('earned_at', { ascending: false })
  if (error) throw error
  return data
}

export async function issueRedeemToken(voucherId) {
  const { data, error } = await supabase.rpc('wafi_issue_redeem_token', { p_voucher: voucherId })
  if (error) throw error
  return data
}

export async function redeemVoucher(voucherId, token) {
  const { data, error } = await supabase.rpc('wafi_redeem_voucher', { p_voucher: voucherId, p_token: token })
  if (error) throw error
  return data
}

export async function myNotifications() {
  const { data, error } = await supabase
    .schema('wafi').from('notifications')
    .select('*').order('created_at', { ascending: false }).limit(50)
  if (error) throw error
  return data
}
