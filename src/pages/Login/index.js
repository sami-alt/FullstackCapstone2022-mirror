import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginAction } from 'store/actions/index'

import { Card, Form, Input, Checkbox, Button, message } from 'antd'
import styles from './index.module.scss'
import logo from 'assets/tesy_logo.png'

const Login = () => {
  const dispatch = useDispatch()

  const [loadings, setLoadings] = useState(false)

  const onFinish = async (values) => {
    const { email, password } = values
    console.log(email, password)
    try {
      await dispatch(loginAction(email, password))
    } catch (e) {
      message.error(e.response?.data?.message || 'Login fails', 1, () => {
        setLoadings(false)
      })
    }
  }

  return (
    <div className={styles.root}>
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="tesy_logo" />
        <Form
          validateTrigger={['onBlur', 'onChange']}
          onFinish={onFinish}
          //! Only for development
          initialValues={{
            email: 'tesy123@tesy.com',
            password: '123456',
            remember: true,
          }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: 'input a correct email address',
                validateTrigger: 'onBlur',
              },
              {
                required: true,
                message: 'username can not be empty.',
              },
            ]}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 17,
            }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'password can not be empty.',
              },
            ]}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 17,
            }}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loadings}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
