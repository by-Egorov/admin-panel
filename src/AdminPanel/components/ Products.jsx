import React from 'react'
import { LogoutOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Breadcrumb, Layout, theme } from 'antd'


const { Header, Content } = Layout

const Products = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  const navigate = useNavigate()
  const user = useSelector(state => state.user.currentUser)
  const userRole = user[0].roles

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
              title: <Link to='/api/admin-panel'>админка</Link>,
            },
            {
              title: 'товары',
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
          {userRole === 'ADMIN' ? (
            <>продукты</>
          ) : (
            <div>У вас пока нет доступа к данным</div>
          )}
        </div>
      </Content>
    </>
  )
}

export default Products
