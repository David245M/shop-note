import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/Auth'
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, Row} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import { StepForwardOutlined } from 'antd';


const firstlayout = {
  labelCol: { 
    lg: { span: 8, },
    md: { span: 8, offset: 2 },
    sm: { span: 7, offset: 2 },
  },
  wrapperCol: { 
    lg: { span: 6 },
    md: { span: 7 },
    sm: { span: 8 },
  },
};
const secondLayout = {
  wrapperCol: { 
    lg: { span: 8, offset: 8},
    md: { span: 10, offset: 7},
    sm: { span: 12, offset: 5},
  },
};

const thirdLayout = {
  wrapperCol: { 
    lg: { span: 12, offset: 12 },
    md: { span: 16, offset: 12},
    sm: { span: 20, offset: 11},
  },
};

const LoginPage = () => {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (values) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
      const result = await response.json()
      if (result) {
        login(values)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>      
      <Link to="/">Home</Link>
      <Form 
        {...firstlayout}
        name="login"
        initialValues={{
          remember: true, //вот эта штучка пока ни на что не влияет)) 
          //нє, воно работає, воно при перезапуску сторінки ставить галочку
        }}
        //завжди проходить логін, незавжаючи на пароль і логін який вписаний
        onFinish={onSubmit}
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
        <Input 
          prefix={<UserOutlined className="site-form-item-icon" />} 
          value={email} 
          type="email"
          onChange={e => setEmail(e.target.value)} 
          placeholder="Email"
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input 
          prefix={<LockOutlined className="site-form-item-icon" />} 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          type="password" 
          placeholder="Password"
        />
      </Form.Item>  
      <Form.Item {...secondLayout}>
        <Row justify="space-between" align="middle">
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Link  to="/" >
              Forgot password
            </Link>
          </Form.Item>
        </Row>
      </Form.Item>
      
      
      <Form.Item {...thirdLayout} >
      <Row justify="space-between" align="middle">
        <Form.Item style={{width: "100%"}}>{/*Я щось не знаю як це зробити по іншому і там ошибка коли в режимі тєлєфа кнопка злітає*/}
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
        <Form.Item>
          Or <Link to="/register" >Register</Link>
        </Form.Item>
      </Row>
      
      </Form.Item>
      </Form> 
      
    </>
  )
}

export default LoginPage
