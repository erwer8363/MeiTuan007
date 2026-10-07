import ReactDOM from 'react-dom/client'
import { initRem } from '@/utils/rem'
import App from './App'
import { BrowserRouter } from 'react-router'
// 引入初始化css样式文件
import '@/styles/reset.css'
// 引入字体图标
import 'font-awesome/css/font-awesome.min.css'

initRem()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
