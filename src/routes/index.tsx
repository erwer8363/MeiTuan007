// 独立配置文件
import { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import RequireAuth from '@/components/RequireAuth'
import Home from '@/pages/home'
const Order = lazy(() => import('@/pages/order'))
const Mine = lazy(() => import('@/pages/mine'))
const Cities = lazy(() => import('@/pages/cities'))
const Search = lazy(() => import('@/pages/search'))
const Login = lazy(() => import('@/pages/login'))
const Register = lazy(() => import('@/pages/register'))
const HomeDetail = lazy(() => import('@/pages/homeDetail'))
const HomeOrder = lazy(() => import('@/pages/homeDetail/HomeOrder'))
const HomeComment = lazy(() => import('@/pages/homeDetail/HomeComment'))
const HomeBusiness = lazy(() => import('@/pages/homeDetail/HomeBusiness'))

// lazy 动态加载的组件必须配合 Suspense 使用（见 App.tsx）
const RoutesConfig = () => {
  return (
    <Routes>
      {/* 公开路由 */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 需要登录的路由 */}
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/mine" element={<Mine />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/search" element={<Search />} />
        <Route path="/homedetail/:id" element={<HomeDetail />}>
          <Route index element={<Navigate to="order" replace />} />
          <Route path="order" element={<HomeOrder />} />
          <Route path="comment" element={<HomeComment />} />
          <Route path="business" element={<HomeBusiness />} />
        </Route>
        <Route path="*" element={<Mine />} />
      </Route>
      {/* 默认路由
                定义：在嵌套路由中，如果 URL 仅匹配了父级 URL，则Outlet中会显示带有index属性的子路由。可以使用在路由的任何层级
                   <Routes>
                 < Route path="/foo" element={Foo}>
                   <Route index element={Default}></Route>
                   <Route path="bar" element={Bar}></Route>
                 </Route>
                /Routes>
                当 url 为/foo时：Foo 中的 Outlet 会显示 Default 组件
                当 url 为/foo/bar时：Foo 中的 Outlet 会显示为 Bar 组件 */}
    </Routes>
  )
}

export default RoutesConfig
