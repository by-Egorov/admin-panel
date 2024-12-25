import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { LogoutOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Breadcrumb, Layout, theme, message } from 'antd'
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Select,
} from 'antd'

const { Header, Content } = Layout

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  let inputNode
  if (dataIndex === 'roles') {
    inputNode = (
      <Select style={{ width: '100%' }}>
        <Select.Option value='ADMIN'>ADMIN</Select.Option>
        <Select.Option value='USER'>USER</Select.Option>
        <Select.Option value='MANAGER'>MANAGER</Select.Option>
      </Select>
    )
  } else {
    inputNode = inputType === 'number' ? <InputNumber /> : <Input />
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

const Users = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user.currentUser)
  const users = useSelector(state => state.user.getUsers)
  const [userList, setUserList] = useState(users)
  const usersWithKeys = users.map(user => ({ ...user, key: user._id }))
  const userRole = user[0].roles
  const emailCurrentUser = user[0].email
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/api/login')
  }

  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [editingKey, setEditingKey] = useState('')
  const isEditing = record => record.key === editingKey
  const edit = record => {
    form.setFieldsValue({
      roles: record.roles ? record.roles[0] : '',
      ...record,
    })
    setEditingKey(record.key)
  }
  const formatDate = date => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }
    return new Intl.DateTimeFormat('ru-RU', options).format(new Date(date))
  }
  const save = async key => {
    try {
      const row = await form.validateFields()
      const newData = [...data]
      const index = newData.findIndex(item => key === item.key)
      if (index > -1) {
        const item = newData[index]

        newData.splice(index, 1, {
          ...item,
          ...row,
          roles: Array.isArray(row.roles) ? row.roles : [row.roles],
        })
        setData(newData)
        setEditingKey('')
      } else {
        newData.push(row)
        setData(newData)
        setEditingKey('')
        if (row._id) {
          const res = await axios.post(
            'http://localhost:5000/api/user/update',
            {
              userId: row._id,
              roles: row.roles,
            },
          )

          dispatch({
            type: 'UPDATE_USER',
            payload: {
              userId: row._id,
              roles: row.roles,
            },
          })
          message.success(`${res.data.message}`)
        } else {
          console.log(`not row.id: ${row._id}`)
        }
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }
  const cancel = () => {
    setEditingKey('')
    message.error('Изменения не сохранены')
  }
  const handleDelete = async key => {
    try {
      const newUserList = userList.filter(item => item._id !== key)

      const res = await axios.delete(`http://localhost:5000/api/users/${key}`)

      if (res.status !== 200) {
        throw new Error('Ошибка при удалении пользователя')
      }
      dispatch({
        type: 'REMOVE_USER',
        payload: key,
      })
      dispatch({
        type: 'FETCH_USERS_SUCCESS',
        payload: newUserList,
      })
      message.success(`${res.data.message}: ${res.data.user.email}`)
    } catch (error) {
      console.log(error)
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      width: '35%',
      editable: true,
    },
    {
      title: 'Почта',
      dataIndex: 'email',
      width: '25%',
      editable: true,
    },
    {
      title: 'Дата создания',
      dataIndex: 'createdAt',
      render: (text) => formatDate(text),
      width: '15%',
      editable: true,
    },
    {
      title: 'Статус',
      dataIndex: 'roles',
      width: '15%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record)
        return editable ? (
          <span style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginInlineEnd: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title='Sure to cancel?' onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Typography.Link
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>
            <Popconfirm
              title='Sure to delete?'
              onConfirm={() => handleDelete(record.key)}
            >
              <a>Delete</a>
            </Popconfirm>
          </div>
        )
      },
    },
  ]
  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      onCell: record => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })

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
              title: 'пользователи',
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
            <>
              <Form form={form} component={false}>
                <Table
                  components={{
                    body: {
                      cell: EditableCell,
                    },
                  }}
                  bordered
                  dataSource={usersWithKeys}
                  columns={mergedColumns}
                  rowClassName='editable-row'
                  pagination={{
                    onChange: cancel,
                  }}
                />
              </Form>
            </>
          ) : (
            <div>У вас пока нет доступа к данным</div>
          )}
        </div>
      </Content>
    </>
  )
}

export default Users
