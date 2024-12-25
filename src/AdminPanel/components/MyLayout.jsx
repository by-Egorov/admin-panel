import React from 'react'
import { Breadcrumb, Layout, theme } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'


const { Header, Content } = Layout
const MyLayout = ({children}) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  const navigate = useNavigate()
  const user = useSelector(state => state.users)
  const userRole = user.users.roles[0]
  const isLoginToken = localStorage.getItem('token')

  const emailCurrentUser = user.users.email
  const roleCurrentUser = user.users.roles

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
                {
                  title: <Link to='/api/admin-panel/data'>товары</Link>
                }, 
              ]}
            />
            <div
              style={{
                padding: 24,
                minHeight: 380,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
             {children}
             </div>
          </Content>
    </>
  )
}
export default MyLayout
