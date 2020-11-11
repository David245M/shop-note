import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Tooltip, Option, Row, Col, Checkbox, Button } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

// const { Option } = Select;
// так як Велікій сенсей Міхаіл учіл
const formItemLayout = {
  labelCol: {
    sm: { span: 8},
    md: { span: 7},
    lg: { span: 8}
  },
  wrapperCol: {
    sm: { span: 9 },
    md: { span: 10 },
    lg: { span: 8 }
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    sm: {span: 17, offset: 10},
    md: {span: 13, offset: 9},
    lg: {span: 20, offset: 10},
  },
};

const RegisterPage = () => {
  const [nick, setNick] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [form] = Form.useForm();

  const onSubmit = async e => {
    try {
      e.preventDefault()
      const response = await fetch('/api/auth/register', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nick, email, password })
      })
      const result = response.json()
    } catch (err) {
      console.error(err)
    }
  }


  const prefixSelector = (//тут можна зробити вибор номера тэлэфона
    <Form.Item name="prefix" noStyle>
      {/* <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select> */}
    </Form.Item>
  );

  return (
    <>

      <Link to="/">Home</Link>    
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        // onFinish={onSubmit}
        initialValues={{
          prefix: '+380',//поки нічьо не робить
        }}
        // scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail"/>
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          // hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords that you entered do not match!');// це я взяв з сайта
              },
            }),
          ]}
        >
          <Input.Password value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
       </Form.Item>

       <Form.Item 
         name="nickname"
          label={
            <span>
              Nickname&nbsp;
              <Tooltip title="What do you want others to call you?">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
        >
          <Input value={nick} onChange={e => setNick(e.target.value)} placeholder="Nick"/>
        </Form.Item>
            {/*Це я оставив эслі захочим добавити тєлєф*/}
        {/* <Form.Item          
          name="phone"
          label="Phone Number"
          rules={[{ required: false, message: 'Please input your phone number!' }]}
        >
          <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
        </Form.Item> */}

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject('Should accept agreement'),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="/home">agreement</a>
          </Checkbox>
        </Form.Item>
      
        <Form.Item {...tailFormItemLayout} >
          <Row lg={{span: 24}} md={{span: 24}} sm={{span: 24}}>{/*я шось не придумав як по іншому зробити */}
            <Button type="primary" htmlType="rules" >
              Register
            </Button>
          </Row>
          <Link to="/login">...or log in</Link>
        </Form.Item>
      </Form>
        
        
    </>
  )
}

export default RegisterPage
