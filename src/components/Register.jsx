import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LockOutlined,
  MailOutlined,
  LoginOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import {
  Button,
  Checkbox,
  Flex,
  Form,
  Input,
  Alert,
  Breadcrumb,
  Layout,
  theme,
} from 'antd'
import axios from 'axios'

const { Header, Content } = Layout

const Register = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const isLogin = location.pathname === '/api/login'
  const isLoginToken = localStorage.getItem('token')

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  const login = async values => {
    const { email, password } = values
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          email,
          password,
        },
      )
      
      if (response.data) {
        dispatch({
          type: 'CURRENT_USER',
          payload: response.data,
        })
        localStorage.setItem('token', JSON.stringify(response.data.token))
        navigate('/')
      }
    } catch (error) {
      setError(error.response.data.message)
      console.warn(error)
    }
  }

  const register = async values => {
    const { email, password } = values
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        {
          email,
          password,
        },
      )
      dispatch({
        type: 'CURRENT_USER',
        payload: [response.data],
      })

      navigate('/api/admin-panel')
    } catch (e) {
      console.warn(e)
    }
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
        <div>{isLoginToken && roleCurrentUser}</div>
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
              title: isLogin ? (
                <span>
                  <LoginOutlined
                    style={{ color: 'green', paddingRight: '5px' }}
                  />{' '}
                  Log In{' '}
                </span>
              ) : (
                <span>
                  <LogoutOutlined
                    style={{ color: 'red', paddingRight: '5px' }}
                  />{' '}
                  Register{' '}
                </span>
              ),
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
          <Form
            name='login'
            initialValues={{
              remember: true,
            }}
            style={{
              width: 235,
            }}
            onFinish={isLogin ? login : register}
            onFinishFailed={onFinishFailed}
          >
            {error && (
              <Alert
                message={error}
                type='error'
                style={{ marginBottom: 10 }}
              />
            )}
            <Form.Item
              name='email'
              rules={[
                {
                  required: true,
                  message: 'Please input your Email!',
                },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder='email' />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type='password'
                placeholder='Password'
              />
            </Form.Item>
            {isLogin && (
              <Form.Item>
                <Flex justify='space-between' align='center'>
                  <Form.Item name='remember' valuePropName='checked' noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <a href=''>Forgot password</a>
                </Flex>
              </Form.Item>
            )}

            <Form.Item>
              <Button block type='primary' htmlType='submit'>
                {isLogin ? 'Log In' : 'Register'}
              </Button>
              or{' '}
              {isLogin ? (
                <Link to='/api/register'>Register now!</Link>
              ) : (
                <Link to='/api/login'>Log In</Link>
              )}
            </Form.Item>
          </Form>
        </div>
      </Content>
    </>
  )
}

export default Register
