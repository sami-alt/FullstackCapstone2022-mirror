import {
  unstable_HistoryRouter as HistoryRouter,
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import AuthRoute from 'components/AuthRoute'
import { history } from 'utils/history'

import Login from 'pages/Login'
import NotFound from 'pages/NotFound'
import Layout from 'pages/Layout'
import Dashboard from 'pages/Dashboard'
import Animal from 'pages/Animal'
import Statistics from 'pages/Statistics'
import Registration from 'pages/Registration'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public Routes: */}
          <Route path="/" element={<Navigate to="/login" replace />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<NotFound />}></Route>

          {/* Auth Routes: */}
          <Route
            path="/home"
            element={
              <AuthRoute>
                <Layout />
              </AuthRoute>
            }
          >
            <Route path="/home/dashboard" element={<Dashboard />}></Route>
            <Route path="/home/animal" element={<Animal />}></Route>
            <Route path="/home/statistics" element={<Statistics />}></Route>
            <Route path="/home/registration" element={<Registration />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
