import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/Auth'
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, Row } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import { StepForwardOutlined } from 'antd';

//TODO: 

//использовать инлайновый css в данном случае плохо, так как
//у тебя не выравниваються инпуты в один столбик
//А вот это как раз надо было и использовать))
const layout = {
  labelCol: { 
    lg: { span:8,},
    md: { span: 8, offset: 2 },
    sm: { span: 7, offset: 2 },
  },
  wrapperCol: { 
    lg: { span: 6 },
    md: { span: 7 },
    sm: { span: 8 },
  },
};
const tailLayout = {
  wrapperCol: { 
    lg: { span: 8, offset: 8 },
    md: { span: 10, offset: 7},
    sm: { span: 12, offset: 5},
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
      <h1>Authorisation</h1>
      {/* Делай внятные отсупы, что бы было видно уровень вложенности */}
      <Form 
        {...layout}
      name="login" //название должно говорить о чем-то
        initialValues={{
          remember: true, //вот эта штучка пока ни на что не влияет))
        }}
        //сабмит формы лучше делать не на клике по кнопке а у формы есть специальный метод
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
        {/* если пропсов много то лучше их форматировать вот так */}
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
        rules={[
          {
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
      <Form.Item {...tailLayout}>
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
      
      {/* для кнопки попробуй выравнивание сделать сам */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Log in
        </Button>
        Or <Link to="/register" >Register</Link>
      </Form.Item>
      </Form> 
      
    </>
  )
}

export default LoginPage
