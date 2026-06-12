import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import CardView from './pages/CardView'
import Vouchers from './pages/Vouchers'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'
import Scan from './pages/Scan'

export default function App() {
  return (
    <Routes>
      <Route path="/s/:slug" element={<Scan />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="card/:id" element={<CardView />} />
        <Route path="vouchers" element={<Vouchers />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
