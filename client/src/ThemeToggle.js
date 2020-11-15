import React, { useState } from 'react'
import { Switch } from 'antd';
import { ThemeProvider } from 'styled-components'

const themes = {
    dark: {
      bgColor: '#222',
      textColor: '#fff'
    },
    light: {
      bgColor: '#fff',
      textColor: '#222'
    }
}
  
const Toggler = ({ onChange, currentTheme }) => (
    <>
      <Switch value = {currentTheme} onChange={onChange}/>
    </>
)

const ThemeToggle = ({ children, themeName }) => {
    const defaultTheme = themeName === 'light' ? themes.light : themes.dark
    const [theme, setTheme] = useState(defaultTheme)
    const onChangeTheme = (value) => {
        setTheme(value === true ? themes.dark : themes.light)
    }
    return (
      <>
        
        <ThemeProvider theme={theme}>
          <Toggler onChange={onChangeTheme} currentTheme={themeName} />
          {children}
        </ThemeProvider>
      </>
        
      );
      
}

export default ThemeToggle;
export { Toggler };
export { themes }; 
