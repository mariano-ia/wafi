// Edge Function: wallet-pass — genera/actualiza el pase (MVP-1, NO en MVP-0).
// Apple .pkpass (firmado con Pass Type ID) y Google Wallet object (JWT firmado).
// Regenera la imagen de la tira de sellos y empuja update cuando cambia la membresía.
// TODO(tokens): APPLE_PASS_TYPE_ID + cert, GOOGLE_WALLET_ISSUER_ID + service account.

Deno.serve(async (req) => {
  const url = new URL(req.url)
  const platform = url.searchParams.get('platform') // 'apple' | 'google'
  // TODO: armar el pase para la membresía, firmar, y devolver .pkpass / save-link.
  return Response.json({ todo: 'wallet-pass MVP-1', platform }, { status: 501 })
})
