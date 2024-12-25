import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {store, persistor} from './store/index.js'
import App from './App.jsx'
import AdminPanel from './AdminPanel/AdminPanel.jsx'
import Register from './components/Register.jsx'
import Products from './AdminPanel/components/ Products.jsx'
import Users from './AdminPanel/components/Users/Users.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
<PersistGate loading={null} persistor={persistor}>
<Router>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/api/login' element={<Register />} />
      <Route path='/api/register' element={<Register />} />
      <Route path='/api/admin-panel' element={<AdminPanel />} />
      <Route path='/api/admin-panel/data' element={<Products />} />
      <Route path='/api/admin-panel/users' element={<Users />} />
    </Routes>
  </Router>
</PersistGate>
</Provider>
)
