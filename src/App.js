import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from 'pages/Login'
import NotFound from 'pages/NotFound'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public Routes: */}
          <Route path="/" element={<Navigate to="/login" replace />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
