/** 登录 / 注册请求体（对应 MeiTuan-api 的 /api/users/*） */
export interface LoginPayload {
  phone: string
  password: string
}

// TODO(ts): 注册、登录响应的类型，等阶段 5 做登录态时对照 MeiTuan-api/routes/users.js 补全
