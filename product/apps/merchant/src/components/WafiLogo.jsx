export default function WafiLogo({ size = 28, className = '' }) {
  return (
    <img
      src="/wafi-logo.svg"
      alt="Wafi"
      width={size}
      height={size * (92.79 / 214.21)}
      className={className}
      style={{ height: 'auto' }}
    />
  )
}
