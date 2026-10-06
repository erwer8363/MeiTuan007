import { post } from '../http'
import type { LoginPayload } from '@/types'

// TODO(ts): 响应类型对照 MeiTuan-api/routes/users.js 补全，替换 unknown
export const login = (payload: LoginPayload) => post<unknown, LoginPayload>('login', payload)
export const register = (payload: LoginPayload) => post<unknown, LoginPayload>('register', payload)
