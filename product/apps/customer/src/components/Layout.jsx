import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'

export default function Layout() {
  return (
    <div className="min-h-screen max-w-md mx-auto relative bg-surface">
      <main className="pb-28 px-4 pt-6">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
