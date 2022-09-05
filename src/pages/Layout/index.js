import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAction } from 'store/actions'

import styles from './index.module.scss'
import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  UnorderedListOutlined,
  LineChartOutlined,
  FormOutlined,
  LogoutOutlined,
  TeamOutlined
} from '@ant-design/icons'
const { Header, Content, Sider } = Layout

const siderItems = [
  {
    key: '/home/dashboard',
    icon: <HomeOutlined />,
    label: <Link to="/home/dashboard">Home</Link>,
  },
  {
    key: '/home/animal',
    icon: <UnorderedListOutlined />,
    label: <Link to="/home/animal">Animal</Link>,
  },
  {
    key: '/home/statistics',
    icon: <LineChartOutlined />,
    label: <Link to="/home/statistics">Statistics</Link>,
  },
  {
    key: '/home/registration',
    icon: <FormOutlined />,
    label: <Link to="/home/registration">Registration</Link>,
  },
  {
    key: '/home/roles',
    icon: <TeamOutlined />,
    label: <Link to="/home/roles">Roles</Link>,
  },
]

const LayoutComponent = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const user = useSelector((state) => state.login)

  const logoutConfirm = () => {
    dispatch(logoutAction())
    navigate('/login', { replace: true })
  }

  return (
    <div className={styles.root}>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <div className="profile">
            <span>{user.email}</span>
            <span>
              {' '}
              <Popconfirm
                title="Are you sure to logout?"
                okText="Confirm"
                cancelText="Cancel"
                onConfirm={logoutConfirm}
              >
                <LogoutOutlined />
                {` `}Logout
              </Popconfirm>
            </span>
          </div>
        </Header>
        <Layout>
          <Sider width={200}>
            <Menu
              mode="inline"
              selectedKeys={[location.pathname]}
              style={{
                height: '100%',
                borderRight: 0,
              }}
              items={siderItems}
              theme="dark"
            ></Menu>
          </Sider>
          <Layout
            style={{
              padding: '24px',
              overflow: 'auto',
            }}
          >
            <Content className="site-layout-background">
              <Outlet></Outlet>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  )
}

export default LayoutComponent
