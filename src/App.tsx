import 'antd/dist/antd.min.css'
import { Routes } from './routes'
import { GlobalStyle } from './styles/GlobalStyle'

export function App() {
  return (
    <>
      <GlobalStyle />
      <Routes />
    </>
  )
}
