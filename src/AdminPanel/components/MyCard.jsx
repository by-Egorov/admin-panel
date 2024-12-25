import React from 'react'
import { Card } from 'antd'
import { useNavigate } from 'react-router-dom'
import { UsergroupDeleteOutlined, DatabaseOutlined } from '@ant-design/icons'
const gridStyle = {
  width: '25%',
  textAlign: 'center',
}
const MyCard = () => {
  const navigate = useNavigate()
  return (
    <Card title='Управление' style={{ width: '100%' }}>
      <Card.Grid
        style={gridStyle}
        onClick={() => navigate('/api/admin-panel/data')}
      >
        <DatabaseOutlined style={{ paddingRight: 15 }} /> Товары
      </Card.Grid>
      <Card.Grid
        style={gridStyle}
        onClick={() => navigate('/api/admin-panel/users')}
      >
        {' '}
        <UsergroupDeleteOutlined style={{ paddingRight: 15 }} />
        Пользователи
      </Card.Grid>
      <Card.Grid style={gridStyle}>Content</Card.Grid>
      <Card.Grid style={gridStyle}>Content</Card.Grid>
    </Card>
  )
}
export default MyCard
