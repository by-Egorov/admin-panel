import React from 'react'
import { Breadcrumb, Layout, theme } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MyCard from './components/MyCard'

const { Header, Content } = Layout
const AdminPanel = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  const navigate = useNavigate()
  const user = useSelector(state => state.user.currentUser)

  const emailCurrentUser = user[0].email

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/api/login')
  }

  return (
    <>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div className='demo-logo' style={{ color: 'white' }}>
          Logo
        </div>
        <div>{emailCurrentUser}</div>
      </Header>
      <Content
        style={{
          padding: '0 48px',
          height: 'calc(100vh - 128px)',
        }}
      >
        <Breadcrumb
          style={{
            padding: 15,
          }}
          separator='/'
          items={[
            {
              title: (
                <LogoutOutlined
                  style={{ color: 'red' }}
                  onClick={() => logout()}
                />
              ),
            },
            {
              title: 'админка',
            },
          ]}
        />
        <div
          style={{
            padding: 24,
            width: '100%',
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MyCard />
        </div>
      </Content>
    </>
  )
}
export default AdminPanel
