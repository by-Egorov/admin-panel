import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Register from './components/Register'
import AdminPanel from './AdminPanel/AdminPanel'
import { Layout } from 'antd'
import axios from 'axios'

const App = () => {
  const dispatch = useDispatch()
  const isLoginToken = localStorage.getItem('token')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users')
        const res = response.data.users
    
        dispatch({
          type: 'FETCH_USERS_SUCCESS',
          payload: res,
        })
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [dispatch])

  return <Layout>{isLoginToken ? <AdminPanel /> : <Register />}</Layout>
}
export default App
