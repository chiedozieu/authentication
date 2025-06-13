import { Route, Routes } from 'react-router-dom'
import './App.css'
import FloatingShape from './components/FloatingShape'
import LoginPage from './pages/LoginPage'
import SignPage from './pages/SignupPage'
import EmailVerificationPage from './pages/EmailVerificationPage'

function App() {
  

  return (
   <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center relative overflow-hidden justify-center">
    <FloatingShape color="bg-green-500" top="-5%" left="10%" size="size-64" delay={0} />
    <FloatingShape color="bg-emerald-500" top="70%" left="80%" size="size-48" delay={5} />
    <FloatingShape color="bg-gradient-to-r from-lime-500 via-green-200 to-emerald-700" top="40%" left="-10%" size="size-32" delay={2} />
    <FloatingShape color="bg-gradient-to-r from-lime-500 via-green-200 to-emerald-700" top="60%" left="10%" size="size-24" delay={10} />

   <Routes>
    <Route path="/" element={<div className='text-3xl text-white'>Home</div>} />
    <Route path="/signup" element={<SignPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/very-email" element={<EmailVerificationPage />} />
   </Routes>
   </div>
  )
}

export default App
