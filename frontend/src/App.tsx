import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import LandingPage from '../nataraja-landing/src/App'
import About from './pages/About.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

export default function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/about" element={<About />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Register />} />
				<Route path="/register" element={<Register />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
			<Toaster
				position="top-right"
				toastOptions={{
					style: {
						background: '#2D1200',
						color: '#FDF6E3',
						border: '1px solid rgba(212,175,55,0.3)',
					},
				}}
			/>
		</>
	)
}