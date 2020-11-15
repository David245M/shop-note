
import React from 'react'
import { Switch as SwitchButton, Col, Row } from 'antd';
import { Route, Switch, Link } from 'react-router-dom';
// import themes from './ThemeToggle'
// import { generateThemeColor, changeAntdTheme } from 'mini-dynamic-antd-theme';

const Header = () => {
    // const onChange = (value) =>{
    //     (value === true ? themes.dark : themes.light)
    //     changeAntdTheme(generateThemeColor('black'))
    // }

    return (
      <h1 style={{heigth: 100, width:'100%', textAlign: 'center', background: 'primary'}}>
        <Row>
          <Col span={3}>
            <Link to="/">Home</Link>
          </Col>
          <Col span={17}>
            <Switch>
              <Route exact path="/">MAIN PA1GE</Route>
              <Route path="/login">NO HOME PAGE</Route>
              <Route path="/register">NO HOME PAGE</Route>
            </Switch>
          </Col>
          <Col span={4}>
              {/* <SwitchButton onChange={onChange}/> Тут маэ бути ця пагана світчбаттон але я не можу її тут поставити, я пеерероблю */}
          </Col>
        </Row>
      </h1>
    )
  }

  export default Header