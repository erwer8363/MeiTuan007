import { Navigate, Outlet, useLocation } from 'react-router'
import { getCookie } from '@/utils/storage'

/**
 * 路由鉴权布局：未登录重定向到 /login，已登录渲染子路由。
 * 在渲染阶段直接判断，避免 useEffect 重定向造成的闪屏。
 */
export default function RequireAuth() {
  const location = useLocation()
  const token = getCookie('usertoken')

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return <Outlet />
}
