import React, { useContext } from 'react'
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
  //смотри, хуки на каждое поле не нужны, можно получать к ним доступ 
  //из values в onSubmit
  //название поля будет братся из атрибута name у Form.Item, поэтому важно их не забывать

  const onSubmit = async (values) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
      const result = await response.json()
      response.ok && login(result.token, result.userId)
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
          //да, оно работает, но чекбокс ни на что не влияет
        }}
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
          type="email"
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
        <Row lg={{span: 24}} md={{span: 24}} sm={{span: 24}}>{/*бро, Row и так всю возможную ширину занимает, это бесполезно*/}
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Row>
          <Link to="/register" >...or register</Link>
      </Form.Item>
      </Form> 
      
    </>
  )
}

export default LoginPage
