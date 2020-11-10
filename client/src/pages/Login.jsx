import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/Auth'
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import { StepForwardOutlined } from 'antd';



// const layout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 8 },
//   textAlign: 'center'
// };
// const tailLayout = {
//   wrapperCol: { offset: 8, span: 8 },
//   textAlign: 'center'
// };


const LoginPage = () => {
  const auth = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async event => {
    try {
      event.preventDefault()
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const result = await response.json()
      if (result) {
        auth.login(result.token, result.userId)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>      
      <Link to="/">Home</Link>
      <h1>Authorisation</h1>
      
      <Form
      style = {{
        maxWidth: "400px",
        textAlign: "center",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",

      }}
      name="basic"
        initialValues={{
          remember: true,
        }}
      
      >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input prefix={<LockOutlined className="site-form-item-icon" />} value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password"/>
      </Form.Item>  
      <Form.Item style={{width: "100%", textAlign: 'center',}}>
        <Form.Item style={{float: "left"}} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Link style={{float: "right"}} to="/" >
          Forgot password
        </Link>
      </Form.Item>
      
      <Form.Item >
        <Button style={{width: "100%"}} type="primary" htmlType="submit" onClick={onSubmit}>
          Log in
        </Button>
        Or <Link to="/register" >Register</Link>
      </Form.Item>
      </Form> 
      
    </>
  )
}

export default LoginPage
